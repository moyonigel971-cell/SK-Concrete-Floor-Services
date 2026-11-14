import React, { useState } from 'react';
import { ArrowUpRight, Check, Shield, Layers, Hammer, Activity } from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data/content';
import { ServiceItem } from '../types/concrete';

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);

  return (
    <section id="services" className="py-20 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
              Construction & Real Estate Services
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase tracking-tight text-white">
              Specialized Concrete Solutions
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg mt-3 leading-relaxed">
              Engineered concrete structures built to exact architectural drawings and SABS structural specifications across Cape Town.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Free Quote: {COMPANY_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>

        {/* 4 Core Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES.map((service, index) => {
            const isSelected = selectedService.id === service.id;
            const itemNumber = `0${index + 1}.`;

            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`relative rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'border-amber-500 bg-zinc-900 shadow-xl shadow-amber-500/5' 
                    : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                {/* Image showcase */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-zinc-950">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                  
                  {/* Service Number & Category */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-zinc-950/80 text-amber-400 border border-zinc-800">
                      {itemNumber} {service.tagline.split(',')[0]}
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-2xl font-bold font-display uppercase tracking-tight text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-zinc-300 font-medium">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Key Features List */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specs Pill-free Row */}
                  <div className="pt-4 border-t border-zinc-800 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-zinc-500 block">Concrete Grade</span>
                      <span className="text-zinc-200 font-semibold">{service.specs.concreteGrade}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">Reinforcement</span>
                      <span className="text-zinc-200 font-semibold">{service.specs.reinforcement}</span>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(`Hi SK Concrete, I'm interested in a quote for ${service.title} in Cape Town.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Inquire About {service.title}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs text-zinc-400 hover:text-white underline underline-offset-4"
                    >
                      View Full Technical Specs
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Service Technical Specification Deep-Dive Box */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                Engineering Blueprint & Quality Compliance
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white">
                Technical Profile: {selectedService.title}
              </h3>
            </div>
            
            <a
              href="#quote-form"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap self-start lg:self-auto"
            >
              <span>Request On-Site Inspection</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Specified Strength</span>
              </div>
              <div className="text-sm font-semibold text-white">{selectedService.specs.concreteGrade}</div>
              <p className="text-[11px] text-zinc-500 mt-1">Ready-mix supplied with batch certificates</p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Hammer className="w-4 h-4 text-amber-500" />
                <span>Dimensions / Depth</span>
              </div>
              <div className="text-sm font-semibold text-white">{selectedService.specs.thicknessOrSpan}</div>
              <p className="text-[11px] text-zinc-500 mt-1">Configured for required live & dead load</p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Shield className="w-4 h-4 text-amber-500" />
                <span>Reinforcing Steel</span>
              </div>
              <div className="text-sm font-semibold text-white">{selectedService.specs.reinforcement}</div>
              <p className="text-[11px] text-zinc-500 mt-1">Tensile mesh & deformed rebar cages</p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Activity className="w-4 h-4 text-amber-500" />
                <span>Hydration & Curing</span>
              </div>
              <div className="text-sm font-semibold text-white">{selectedService.specs.cureTime}</div>
              <p className="text-[11px] text-zinc-500 mt-1">Chemical curing compound or water ponding</p>
            </div>
          </div>

          {/* Suitable applications */}
          <div className="mt-6 pt-6 border-t border-zinc-800 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-300">Recommended Applications:</span>
            {selectedService.suitableFor.map((app, i) => (
              <React.Fragment key={i}>
                <span>{app}</span>
                {i < selectedService.suitableFor.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
