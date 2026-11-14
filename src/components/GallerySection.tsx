import React, { useState } from 'react';
import { Play, ZoomIn, Video, Image as ImageIcon, MapPin } from 'lucide-react';
import { MEDIA_GALLERY, COMPANY_INFO } from '../data/content';
import { ProjectMedia } from '../types/concrete';

interface GallerySectionProps {
  onSelectMedia: (item: ProjectMedia) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectMedia }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredMedia = MEDIA_GALLERY.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'videos') return item.type === 'video';
    if (activeFilter === 'slabs') return item.category === 'slabs' || item.id === 'vid-warehouse-floor' || item.id === 'vid-floor-inspection';
    if (activeFilter === 'foundations') return item.category === 'foundations' || item.id === 'vid-steel-frame';
    if (activeFilter === 'decking') return item.category === 'decking' || item.id === 'vid-formwork-drainage' || item.category === 'stairs';
    return true;
  });

  return (
    <section id="projects" className="py-20 bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
              Verified Western Cape Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase tracking-tight text-white">
              Real Project Footage & Photos
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 leading-relaxed">
              Every video and photograph below is authentic job-site documentation of SK Concrete Floor Services executing structural pours, foundation cages, and mirror polished floors in Cape Town.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="text-xs font-semibold text-zinc-300 hover:text-white px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              Have a Site in Mind? Call {COMPANY_INFO.phoneFormatted}
            </a>
          </div>
        </div>

        {/* Interactive Filter Tabs (Functional segmented buttons per frontend-design rules) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-zinc-950 rounded-xl border border-zinc-800 mb-10 overflow-x-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Work ({MEDIA_GALLERY.length})
          </button>
          
          <button
            onClick={() => setActiveFilter('videos')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === 'videos'
                ? 'bg-amber-500 text-zinc-950 shadow-sm font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Job Site Videos (4)</span>
          </button>

          <button
            onClick={() => setActiveFilter('slabs')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'slabs'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Floor Slabs & Polished
          </button>

          <button
            onClick={() => setActiveFilter('foundations')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'foundations'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Columns & Foundations
          </button>

          <button
            onClick={() => setActiveFilter('decking')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeFilter === 'decking'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Decking, Stairs & Driveways
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => {
            const isVideo = item.type === 'video';

            return (
              <div
                key={item.id}
                onClick={() => onSelectMedia(item)}
                className="group relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-amber-500/70 transition-all duration-300 cursor-pointer flex flex-col shadow-lg"
              >
                {/* Visual Media Container */}
                <div className="relative aspect-[16/10] bg-black overflow-hidden">
                  {isVideo ? (
                    <>
                      <video
                        src={item.src}
                        preload="metadata"
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={item.src}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="w-10 h-10 rounded-full bg-zinc-950/80 backdrop-blur-sm text-white flex items-center justify-center shadow-md">
                          <ZoomIn className="w-4 h-4" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Type Badge Top Left */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-1 rounded bg-zinc-950/90 text-zinc-200 border border-zinc-800">
                      {isVideo ? <Video className="w-3 h-3 text-amber-400" /> : <ImageIcon className="w-3 h-3 text-emerald-400" />}
                      <span>{isVideo ? 'Site Video' : 'Site Photo'}</span>
                    </span>
                  </div>

                  {/* Highlight Top Right */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-amber-500/90 text-zinc-950">
                      {item.highlight}
                    </span>
                  </div>
                </div>

                {/* Card Content & Metadata (Zero-pill text separators) */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-zinc-950">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {item.location}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-display uppercase tracking-tight text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs text-amber-400 font-medium">
                    <span>{isVideo ? 'Click to play full video' : 'Click to enlarge view'}</span>
                    <span className="text-zinc-500 group-hover:text-amber-400 transition-colors">&rarr;</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-white font-display uppercase">Want to see our team in action on your site?</h4>
            <p className="text-xs text-zinc-400 mt-0.5">We conduct site visits anywhere across Cape Town, Stellenbosch, Somerset West, and Paarl.</p>
          </div>
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap"
          >
            Call {COMPANY_INFO.phoneFormatted}
          </a>
        </div>

      </div>
    </section>
  );
};
