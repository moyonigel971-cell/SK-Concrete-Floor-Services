import React from 'react';
import { Phone, MapPin, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/content';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-amber-500 rounded-xs inline-block"></span>
              <span className="text-xl font-bold font-display uppercase tracking-tight text-white">
                {COMPANY_INFO.name}
              </span>
            </div>
            
            <p className="text-amber-400 font-display text-sm uppercase tracking-wider font-semibold">
              "{COMPANY_INFO.slogan}"
            </p>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Specialist contractors for reinforced concrete stairs, concrete floor slabs, columns & foundations, suspended decking, and heavy vehicle driveways across Cape Town and Western Cape.
            </p>

            <div className="pt-2 text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 font-bold">Free Quote Line:</span>
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-white hover:text-amber-400 font-mono font-bold text-sm">
                  {COMPANY_INFO.phoneFormatted}
                </a>
              </div>
              <span className="text-[11px] text-zinc-500 block mt-0.5">
                All incoming calls qualify for free quotation and site inspection
              </span>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-xs font-bold font-display uppercase tracking-wider text-white mb-4">
              Concrete Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-amber-400 transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Polished Concrete Floors
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Power Floated Warehouse Slabs
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-xs font-bold font-display uppercase tracking-wider text-white mb-4">
              Cape Town Coverage
            </h4>
            <ul className="space-y-2.5">
              <li><span>Atlantic Seaboard</span></li>
              <li><span>City Bowl & Foreshore</span></li>
              <li><span>Southern Suburbs</span></li>
              <li><span>Northern Suburbs</span></li>
              <li><span>West Coast & Table View</span></li>
              <li><span>Helderberg & Somerset West</span></li>
              <li><span>Cape Winelands & Industrial</span></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold font-display uppercase tracking-wider text-white mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-white hover:text-amber-400 font-medium">
                    {COMPANY_INFO.phoneFormatted}
                  </a>
                  <span className="text-[10px] text-zinc-500 block">Calls qualify for free quotes</span>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-zinc-300 hover:text-amber-400 transition-colors break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>

              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}, {COMPANY_INFO.location}</span>
              </li>

              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Mon – Sat: 07:00 – 18:00</span>
              </li>

              <li className="pt-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Hello SK Concrete Floor Services, I would like to request a quote.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. SABS Compliant Concrete Flooring & Foundations.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">Cape Town, Western Cape</span>
            <span aria-hidden="true">·</span>
            <a href={`tel:${COMPANY_INFO.phone}`} className="text-amber-400 hover:underline">
              {COMPANY_INFO.phoneFormatted}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
