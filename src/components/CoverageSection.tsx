import React from 'react';
import { MapPin, Truck, Clock, ShieldAlert, Phone } from 'lucide-react';
import { CAPE_TOWN_SUBURBS, COMPANY_INFO } from '../data/content';

export const CoverageSection: React.FC = () => {
  return (
    <section id="coverage" className="py-20 bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
              Service Region & Logistics
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase tracking-tight text-white mb-4">
              Cape Town & Western Cape
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
              SK Concrete Floor Services operates dedicated mobile crews and coordinates ready-mix truck logistics across the entire Greater Cape Town metropolitan area and the Western Cape interior.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <Truck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ready-Mix Plant Partnerships</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Direct relationships with premier batch plants in Epping, Blackheath, and Montague Gardens for fresh slump pours.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Rapid Site Inspections</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Calls to 0628067247 schedule same-week on-site assessments and free formal quotes for contractors.</p>
                </div>
              </div>
            </div>

            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Inquire for Your Suburb: {COMPANY_INFO.phoneFormatted}</span>
            </a>
          </div>

          {/* Right Suburb Grid */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Active Operational Districts
              </span>
              <span className="text-xs text-emerald-400 font-medium">Daily Dispatch</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CAPE_TOWN_SUBURBS.map((suburb, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/50 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-xs font-medium text-zinc-200">{suburb}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
              <span>Are you situated outside these zones? (e.g. Hermanus, Langebaan, Worcester)</span>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
              >
                Call for regional availability
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
