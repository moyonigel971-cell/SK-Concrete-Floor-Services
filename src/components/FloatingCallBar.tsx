import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export const FloatingCallBar: React.FC = () => {
  return (
    <aside 
      aria-label="Quick contact"
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 p-2.5 px-4 shadow-2xl"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href={`tel:${COMPANY_INFO.phone}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-amber-500 active:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 fill-current" />
          <span>Call: {COMPANY_INFO.phoneFormatted}</span>
        </a>

        <a
          href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Hello SK Concrete Floor Services, I would like to get a free quote for my Cape Town project.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-emerald-600 active:bg-emerald-500 text-white rounded-lg flex items-center justify-center"
          aria-label="WhatsApp Quote"
        >
          <MessageSquare className="w-4 h-4" />
        </a>
      </div>
    </aside>
  );
};
