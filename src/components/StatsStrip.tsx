import React from 'react';
import { PhoneCall, Layers, ShieldCheck, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export const StatsStrip: React.FC = () => {
  return (
    <section className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
          
          {/* Stat 1: Free Quotes */}
          <div className="pt-4 sm:pt-0 sm:px-4 first:pl-0 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <PhoneCall className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Direct Hotline</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">
              062 806 7247
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Calls qualify for instant free quotes & site visits
            </p>
          </div>

          {/* Stat 2: Concrete Grades */}
          <div className="pt-4 sm:pt-0 sm:px-4 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <Layers className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Structural Grade</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">
              25 – 40 MPa
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Engineered ready-mix for residential to heavy industrial
            </p>
          </div>

          {/* Stat 3: Quality Compliance */}
          <div className="pt-4 sm:pt-0 sm:px-4 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">SABS Standard</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">
              100% Certified
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Reinforced rebar cages, slump tests & cube samples
            </p>
          </div>

          {/* Stat 4: Service Region */}
          <div className="pt-4 sm:pt-0 sm:px-4 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Coverage Region</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-white">
              Cape Town
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Greater Cape Town & Western Cape dispatch
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
