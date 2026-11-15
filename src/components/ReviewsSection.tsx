import React, { useState, useEffect, useId } from 'react';
import { Star, ExternalLink, MessageSquarePlus, CheckCircle2, Quote, X } from 'lucide-react';
import { INITIAL_REVIEWS, GOOGLE_LINKS, SERVICES, CAPE_TOWN_SUBURBS, COMPANY_INFO } from '../data/content';
import { ClientReview } from '../types/concrete';

const LOCAL_STORAGE_KEY = 'sk_concrete_submitted_reviews_v1';

const GoogleMark: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
    />
  </svg>
);

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ClientReview[]>(INITIAL_REVIEWS);
  const [serviceFilter, setServiceFilter] = useState<string>('All');
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [companyOrSuburb, setCompanyOrSuburb] = useState(CAPE_TOWN_SUBURBS[0]);
  const [serviceType, setServiceType] = useState(SERVICES[0].title);
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');

  const authorId = useId();
  const roleId = useId();
  const suburbId = useId();
  const serviceId = useId();
  const quoteId = useId();

  useEffect(() => {
    const mergeUnique = (incoming: ClientReview[], base: ClientReview[]) => {
      const seen = new Set<string>();
      const combined: ClientReview[] = [];
      for (const item of [...incoming, ...base]) {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          combined.push(item);
        }
      }
      return combined;
    };

    let localReviews: ClientReview[] = [];
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          localReviews = parsed;
        }
      }
    } catch {
      // Ignore storage errors
    }

    if (localReviews.length > 0) {
      setReviews(mergeUnique(localReviews, INITIAL_REVIEWS));
    }

    fetch('/api/reviews')
      .then(async (res) => {
        if (!res.ok) return null;
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) return null;
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(mergeUnique([...data.reviews, ...localReviews], INITIAL_REVIEWS));
        }
      })
      .catch(() => {
        // Offline or Vite-only dev fallback
      });
  }, []);

  const filteredReviews =
    serviceFilter === 'All'
      ? reviews
      : reviews.filter((r) => r.serviceType === serviceFilter);

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!author.trim() || !quote.trim()) {
      setErrorMsg('Please enter your name and project feedback.');
      return;
    }

    setSubmitting(true);

    const now = new Date();
    const fallbackReview: ClientReview = {
      id: 'rev_' + Date.now(),
      author: author.trim(),
      role: role.trim() || 'Property Owner',
      companyOrSuburb: companyOrSuburb.trim(),
      serviceType,
      rating,
      quote: quote.trim(),
      date: now.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' }),
      source: 'Submitted Review',
    };

    let savedReview = fallbackReview;

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: fallbackReview.author,
          role: fallbackReview.role,
          companyOrSuburb: fallbackReview.companyOrSuburb,
          serviceType: fallbackReview.serviceType,
          rating: fallbackReview.rating,
          quote: fallbackReview.quote,
        }),
      });
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (data?.review) {
            savedReview = data.review;
          }
        }
      }
    } catch {
      // Proceed with local storage persistence
    }

    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const existing: ClientReview[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([savedReview, ...existing]));
    } catch {
      // Ignore storage quota errors
    }

    setReviews((prev) => [savedReview, ...prev]);
    setSubmitting(false);
    setSubmitSuccess(true);
    setAuthor('');
    setRole('');
    setQuote('');
    setRating(5);
  };

  return (
    <section id="reviews" className="py-20 bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Heading + Google Business Profile Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
              Google & Client Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase tracking-tight text-white">
              Trusted Across Cape Town
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
              Read project feedback from Western Cape developers, architects, and homeowners, check our listing on Google, or share a review of your completed pour.
            </p>
          </div>

          {/* Google Reviews Direct Hub Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center gap-6 shrink-0">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <GoogleMark />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Google Business Listing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1 tabular-nums">
                  <span className="font-semibold text-amber-400">{averageRating} / 5.0 Client Rating</span>
                  <span aria-hidden="true">·</span>
                  <span>{reviews.length} Project Reviews</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={GOOGLE_LINKS.searchReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>View on Google</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>

              <a
                href={GOOGLE_LINKS.mapsSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>Review Us on Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter Bar + Write Site Review Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-1.5 p-1.5 bg-zinc-950 rounded-xl border border-zinc-800 overflow-x-auto">
            {['All', ...SERVICES.map((s) => s.title)].map((category) => (
              <button
                key={category}
                onClick={() => setServiceFilter(category)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  serviceFilter === category
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {category === 'All' ? `All Services (${reviews.length})` : category}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setShowReviewForm((prev) => !prev);
              setSubmitSuccess(false);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {showReviewForm ? (
              <>
                <X className="w-4 h-4 text-zinc-400" />
                <span>Close Review Form</span>
              </>
            ) : (
              <>
                <MessageSquarePlus className="w-4 h-4 text-amber-500" />
                <span>Add a Client Review</span>
              </>
            )}
          </button>
        </div>

        {/* Collapsible Client Review Submission Form */}
        {showReviewForm && (
          <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800">
            {submitSuccess ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold text-white font-display uppercase">
                      Thank You for Your Review
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Your project review is now published below. You can also copy your feedback directly to our Google Business listing.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={GOOGLE_LINKS.mapsSearch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>Also Post on Google</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-lg border border-zinc-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
                  <div>
                    <h3 className="text-lg font-bold font-display uppercase text-white">
                      Share Your Experience With {COMPANY_INFO.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Tell fellow Cape Town builders and homeowners about your slab, stairs, foundation, or driveway project.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-zinc-400 mr-1">Rating:</span>
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => setRating(starValue)}
                        aria-label={`Rate ${starValue} out of 5 stars`}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            starValue <= rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/80 text-xs text-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor={authorId} className="text-xs font-medium text-zinc-300 block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id={authorId}
                      type="text"
                      required
                      placeholder="e.g. Pieter Botha"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor={roleId} className="text-xs font-medium text-zinc-300 block mb-1.5">
                      Role or Property Type
                    </label>
                    <input
                      id={roleId}
                      type="text"
                      placeholder="e.g. Homeowner / Site Manager"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor={suburbId} className="text-xs font-medium text-zinc-300 block mb-1.5">
                      Cape Town Area
                    </label>
                    <select
                      id={suburbId}
                      value={companyOrSuburb}
                      onChange={(e) => setCompanyOrSuburb(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {CAPE_TOWN_SUBURBS.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor={serviceId} className="text-xs font-medium text-zinc-300 block mb-1.5">
                      Service Completed
                    </label>
                    <select
                      id={serviceId}
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor={quoteId} className="text-xs font-medium text-zinc-300 block mb-1.5">
                    Your Review *
                  </label>
                  <textarea
                    id={quoteId}
                    rows={3}
                    required
                    placeholder="Share details about the concrete finish, schedule adherence, and site team..."
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    {submitting ? 'Publishing...' : 'Publish Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="p-10 rounded-2xl bg-zinc-950 border border-zinc-800 text-center">
            <p className="text-sm text-zinc-300 font-medium">
              No reviews filtered under {serviceFilter} yet.
            </p>
            <button
              onClick={() => setServiceFilter('All')}
              className="mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4"
            >
              Show all client reviews
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <article
                key={review.id}
                className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between"
              >
                <div>
                  {/* Clean star row + unboxed metadata */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((starIdx) => (
                        <Star
                          key={starIdx}
                          className={`w-4 h-4 ${
                            starIdx <= review.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-zinc-800'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500">{review.date}</span>
                  </div>

                  {/* Quiet unboxed service metadata line */}
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                    <span className="text-amber-400 font-medium">{review.serviceType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{review.source}</span>
                  </div>

                  <Quote className="w-5 h-5 text-amber-500/30 mb-2" />
                  <p className="text-sm text-zinc-200 leading-relaxed mb-6">
                    "{review.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-900">
                  <div className="font-semibold text-sm text-white">{review.author}</div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {review.role}
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span className="text-zinc-500">{review.companyOrSuburb}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
