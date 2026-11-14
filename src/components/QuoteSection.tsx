import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, CAPE_TOWN_SUBURBS } from '../data/content';
import { QuoteFormData } from '../types/concrete';

export const QuoteSection: React.FC = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    suburb: 'Atlantic Seaboard (Camps Bay, Sea Point, Clifton)',
    serviceType: 'Concrete Floor Slabs',
    estimatedArea: '120',
    projectStage: 'Ready for Immediate Pour (Next 1–2 Weeks)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber) return;
    
    // Asynchronously submit lead to server API
    fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).catch((err) => {
      console.warn('API quote logging offline fallback:', err);
    });

    setSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const text = `*New Quote Request - SK Concrete Floor Services*
Name: ${formData.fullName}
Phone: ${formData.phoneNumber}
Email: ${formData.email || 'N/A'}
Location: ${formData.suburb}
Service: ${formData.serviceType}
Estimated Area: ${formData.estimatedArea} m²
Timeline: ${formData.projectStage}
Notes: ${formData.notes || 'Please provide free quote & site visit availability.'}`;
    return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="quote-form" className="py-20 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Phone CTA & Trust Info */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
              Free Quotations & Site Assessments
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase tracking-tight text-white mb-4">
              Get Your Project Moving Today
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
              Whether you are an architect, property developer, or homeowner, contact SK Concrete Floor Services for engineer-grade concrete work across Cape Town.
            </p>

            {/* Direct Phone Card */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/50 mb-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Phone className="w-24 h-24 text-amber-500" />
              </div>

              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Immediate Telephone Quotes
                </span>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-3xl sm:text-4xl font-bold font-mono text-white hover:text-amber-400 transition-colors block mb-2 tabular-nums"
                >
                  {COMPANY_INFO.phoneFormatted}
                </a>
                <p className="text-xs text-emerald-400 font-medium mb-4">
                  Calls qualify for Free Quotes & Site Inspection Scheduling
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Hello SK Concrete Floor Services, I would like to arrange a site visit and free quote in Cape Town.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs rounded-lg transition-colors border border-zinc-700"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Key Contact Details */}
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Operating Base: {COMPANY_INFO.location}, South Africa</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Hours: {COMPANY_INFO.businessHours}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Insured, SABS Ready-Mix Compliant & Safety Certified</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display uppercase text-white">
                  Quote Request Received!
                </h3>
                <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.fullName}</strong>. Our Cape Town concrete supervisor will review your project details and contact you at <strong className="text-amber-400">{formData.phoneNumber}</strong>.
                </p>

                {/* Instant WhatsApp bridge button */}
                <div className="pt-4 max-w-md mx-auto">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Specifications Directly to WhatsApp (Instant)</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs text-zinc-400 hover:text-white underline underline-offset-4"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-zinc-800 pb-3 mb-4">
                  <h3 className="text-xl font-bold font-display uppercase tracking-tight text-white">
                    Request an Itemized Free Quote
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Fill out the project scope below or call 0628067247 for immediate assistance.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Johan Van Der Merwe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                      Phone Number * (Free Quote)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 062 806 7247"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.co.za"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                      Project Location / Suburb
                    </label>
                    <select
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {CAPE_TOWN_SUBURBS.map((sub, i) => (
                        <option key={i} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                      Service Required *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Concrete Floor Slabs">Concrete Floor Slabs</option>
                      <option value="Reinforced Concrete Stairs">Reinforced Concrete Stairs</option>
                      <option value="Columns & Foundations">Columns & Foundations</option>
                      <option value="Decking & Driveways">Decking & Driveways</option>
                      <option value="Polished & Power Floated Floors">Polished & Power Floated Floors</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                      Approximate Area / Size (m²)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 150 m² or 2 stair flights"
                      value={formData.estimatedArea}
                      onChange={(e) => setFormData({ ...formData, estimatedArea: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                    Project Stage / Timeline
                  </label>
                  <select
                    value={formData.projectStage}
                    onChange={(e) => setFormData({ ...formData, projectStage: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Urgent Pour (This Week)">Urgent Pour (This Week)</option>
                    <option value="Ready for Immediate Pour (Next 1–2 Weeks)">Ready for Immediate Pour (Next 1–2 Weeks)</option>
                    <option value="Planning & Costing (1 Month)">Planning & Costing (1 Month)</option>
                    <option value="Tender / Architectural Drawings">Tender / Architectural Drawings</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                    Project Notes & Specifications
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any details about site access, ground conditions, slab thickness, or engineer drawings..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-lg cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit for Free Quote & Site Inspection</span>
                </button>

                <p className="text-[11px] text-zinc-500 text-center pt-1">
                  Or call directly at <a href={`tel:${COMPANY_INFO.phone}`} className="text-amber-400 hover:underline">{COMPANY_INFO.phoneFormatted}</a>. All calls qualify for free quotes.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
