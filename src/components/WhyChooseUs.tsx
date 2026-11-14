import React from 'react';
import { ShieldCheck, Award, Wrench, CheckCircle, Quote } from 'lucide-react';
import { TESTIMONIALS, COMPANY_INFO } from '../data/content';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-20 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
            Contractor Excellence & Structural Rigor
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase tracking-tight text-white">
            Why Builders Choose SK Concrete
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 leading-relaxed">
            From single residential driveways to 5,000 m² industrial logistics centers, we bring engineering precision, structural integrity, and transparent pricing to every job.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-tight text-white mb-2">
              SABS Standards & Cube Tests
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every pour uses certified ready-mix concrete formulations with verified slump measurements and compression cube test compliance for engineer sign-off.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-tight text-white mb-2">
              Industrial Power Floating
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Equipped with mechanical power trowels, laser levels, and diamond polishing rigs for mirror-flat industrial floors and long-term durability.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-tight text-white mb-2">
              Precision Steel Rebar
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Expert shuttering carpenters and steel fixers who tie high-tensile column cages, starter bars, and ground beams strictly per structural drawings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-tight text-white mb-2">
              Free Quotes & Direct Line
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Call 0628067247 to speak straight with our site team. Every phone inquiry qualifies for a free on-site assessment and itemized quotation.
            </p>
          </div>

        </div>

        {/* Testimonials from Cape Town Projects */}
        <div className="border-t border-zinc-800 pt-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-6">
            Western Cape Client Testimonials
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-6 h-6 text-amber-500/40 mb-3" />
                  <p className="text-xs text-zinc-300 leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>
                
                <div className="pt-4 border-t border-zinc-800/80">
                  <div className="font-semibold text-sm text-white">{t.author}</div>
                  <div className="text-xs text-amber-400">{t.role}</div>
                  <div className="text-[11px] text-zinc-500">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
