import React, { useEffect } from 'react';
import { X, MapPin, CheckCircle2 } from 'lucide-react';
import { ProjectMedia } from '../types/concrete';

interface MediaModalProps {
  item: ProjectMedia | null;
  onClose: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/80">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wide uppercase">
              <span>{item.highlight}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-zinc-400">
                <MapPin className="w-3 h-3 text-zinc-400" />
                {item.location}
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-100 font-display mt-0.5">{item.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Container */}
        <div className="relative bg-black flex items-center justify-center min-h-[300px] max-h-[70vh] overflow-hidden">
          {item.type === 'video' ? (
            <video 
              src={item.src} 
              controls 
              autoPlay 
              playsInline
              className="max-h-[70vh] w-auto mx-auto object-contain"
            />
          ) : (
            <img 
              src={item.src} 
              alt={item.title} 
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto mx-auto object-contain"
            />
          )}
        </div>

        {/* Caption & Specs */}
        <div className="p-6 bg-zinc-900">
          <p className="text-zinc-300 text-sm leading-relaxed mb-4">{item.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800 text-xs text-zinc-400">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>SK Concrete Verified Cape Town Project Footage</span>
            </div>
            <a 
              href="tel:0628067247" 
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold rounded-lg transition-colors"
            >
              Request Free Quote for Similar Work
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
