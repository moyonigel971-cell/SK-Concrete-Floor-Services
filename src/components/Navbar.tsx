import React, { useState } from 'react';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-20">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a 
          href="#" 
          className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-3 h-3 bg-amber-500 rounded-xs inline-block"></span>
          <span>SK CONCRETE FLOOR SERVICES</span>
        </a>

        {/* Zone 2: 4–5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-zinc-300">
          <a href="#services" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Services
          </a>
          <a href="#projects" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Projects
          </a>
          <a href="#calculator" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Estimator
          </a>
          <a href="#coverage" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Coverage
          </a>
          <a href="#reviews" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Reviews
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>Call {COMPANY_INFO.phoneFormatted}</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="p-2 text-zinc-950 bg-amber-500 rounded-lg sm:hidden"
            aria-label="Call direct"
          >
            <Phone className="w-4 h-4 fill-current" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-zinc-200">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-amber-400 border-b border-zinc-900"
            >
              Services (Stairs, Slabs, Foundations, Decking)
            </a>
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-amber-400 border-b border-zinc-900"
            >
              Project Video & Photo Gallery
            </a>
            <a 
              href="#calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-amber-400 border-b border-zinc-900"
            >
              Concrete Slab Cost Estimator
            </a>
            <a 
              href="#coverage" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-amber-400 border-b border-zinc-900"
            >
              Cape Town & Western Cape Service Areas
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-amber-400"
            >
              Google & Client Reviews
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold uppercase tracking-wider text-zinc-950 bg-amber-500 rounded-lg"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call {COMPANY_INFO.phoneFormatted} (Free Quote)</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Hello SK Concrete Floor Services, I would like to request a quote for my project in Cape Town.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <span>Instant Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
