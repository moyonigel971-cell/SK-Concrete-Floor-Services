import React, { useState, useId } from 'react';
import { Calculator as CalcIcon, Send, Phone, Info, Check, RefreshCw } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export const Calculator: React.FC = () => {
  const [projectType, setProjectType] = useState<'slab' | 'stairs' | 'foundation' | 'driveway'>('slab');
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(6);
  const [depthMm, setDepthMm] = useState<number>(150);
  const [concreteMpa, setConcreteMpa] = useState<number>(30);
  const [reinforcement, setReinforcement] = useState<'ref193' | 'ref245' | 'ref395' | 'rebar'>('ref245');
  const [finishType, setFinishType] = useState<'power_float' | 'polished' | 'broom' | 'hand_float'>('power_float');

  const lengthInputId = useId();
  const widthInputId = useId();
  const depthInputId = useId();

  // Calculations
  const areaM2 = Math.round(length * width * 10) / 10;
  const rawVolumeM3 = (areaM2 * (depthMm / 1000));
  // 5% standard compaction & wastage margin
  const concreteVolumeM3 = Math.round(rawVolumeM3 * 1.05 * 10) / 10;
  
  // Standard mesh sheet is 6m x 2.4m = 14.4 m2, accounting for 200mm lap
  const effectiveSheetArea = 12.5;
  const meshSheets = Math.ceil(areaM2 / effectiveSheetArea);

  // Cape Town pricing model benchmarks (ZAR)
  const baseRatePerM2 = 
    projectType === 'slab' ? 480 :
    projectType === 'stairs' ? 850 :
    projectType === 'foundation' ? 620 : 540;

  const mpaMultiplier = concreteMpa === 35 ? 1.15 : concreteMpa === 30 ? 1.08 : 1.0;
  const depthMultiplier = depthMm / 100;
  
  const finishCostPerM2 = 
    finishType === 'polished' ? 220 :
    finishType === 'power_float' ? 65 :
    finishType === 'broom' ? 35 : 20;

  const estimatedMinCost = Math.round((areaM2 * (baseRatePerM2 * mpaMultiplier * (depthMultiplier * 0.7 + 0.3) + finishCostPerM2)) * 0.95);
  const estimatedMaxCost = Math.round(estimatedMinCost * 1.20);

  const resetDefaults = () => {
    setLength(10);
    setWidth(6);
    setDepthMm(150);
    setConcreteMpa(30);
    setReinforcement('ref245');
    setFinishType('power_float');
  };

  const shareText = `Hi SK Concrete Floor Services, I used your website estimator for a ${projectType} project in Cape Town:\n- Area: ${areaM2} m² (${length}m x ${width}m)\n- Depth: ${depthMm}mm\n- Concrete: ${concreteMpa} MPa\n- Reinforcement: ${reinforcement}\n- Finish: ${finishType}\n- Estimated Vol: ${concreteVolumeM3} m³\nPlease contact me for a free formal quote!`;

  return (
    <section id="calculator" className="py-20 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-2">
            <CalcIcon className="w-4 h-4" />
            <span>Interactive Cape Town Concrete Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase tracking-tight text-white">
            Concrete Volume & Cost Calculator
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 leading-relaxed">
            Estimate ready-mix cubic meters ($m^3$), rebar mesh requirements, and projected investment brackets based on current Western Cape construction material rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Project Type Tabs */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-2">
                1. Select Concrete Service Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'slab', label: 'Floor Slab' },
                  { id: 'stairs', label: 'Concrete Stairs' },
                  { id: 'foundation', label: 'Foundations' },
                  { id: 'driveway', label: 'Deck / Driveway' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id as any)}
                    className={`px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors text-center border ${
                      projectType === type.id
                        ? 'bg-amber-500 text-zinc-950 border-amber-400 font-bold'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block">
                  2. Area & Slab Thickness
                </label>
                <span className="text-xs font-mono text-amber-400 tabular-nums">
                  Total Area: {areaM2} m²
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor={lengthInputId} className="text-[11px] text-zinc-400 block mb-1">Length (meters)</label>
                  <input
                    id={lengthInputId}
                    type="number"
                    min="1"
                    max="100"
                    step="0.5"
                    value={length}
                    onChange={(e) => setLength(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label htmlFor={widthInputId} className="text-[11px] text-zinc-400 block mb-1">Width (meters)</label>
                  <input
                    id={widthInputId}
                    type="number"
                    min="1"
                    max="100"
                    step="0.5"
                    value={width}
                    onChange={(e) => setWidth(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label htmlFor={depthInputId} className="text-[11px] text-zinc-400 block mb-1">Thickness (mm)</label>
                  <select
                    id={depthInputId}
                    value={depthMm}
                    onChange={(e) => setDepthMm(parseInt(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  >
                    <option value={100}>100 mm (Light pedestrian)</option>
                    <option value={125}>125 mm (Domestic driveway)</option>
                    <option value={150}>150 mm (Heavy vehicle/standard slab)</option>
                    <option value={200}>200 mm (Suspended deck / warehouse)</option>
                    <option value={250}>250 mm (Heavy industrial / foundation)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Concrete Strength (MPa) */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-2">
                3. Concrete Compressive Strength
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { mpa: 20, desc: '20 MPa (Domestic)' },
                  { mpa: 25, desc: '25 MPa (Standard)' },
                  { mpa: 30, desc: '30 MPa (Structural)' },
                  { mpa: 35, desc: '35 MPa (Industrial)' },
                ].map((item) => (
                  <button
                    key={item.mpa}
                    onClick={() => setConcreteMpa(item.mpa)}
                    className={`p-2 text-left rounded-lg border text-xs transition-colors ${
                      concreteMpa === item.mpa
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-semibold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="font-mono font-bold text-sm text-white">{item.mpa} MPa</div>
                    <div className="text-[10px] text-zinc-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Finishing */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-2">
                4. Surface Finish Option
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'power_float', label: 'Power Floated', sub: 'Smooth warehouse' },
                  { id: 'polished', label: 'Diamond Polished', sub: 'High gloss mirror' },
                  { id: 'broom', label: 'Broom Textured', sub: 'Outdoor non-slip' },
                  { id: 'hand_float', label: 'Troweled', sub: 'Under-tile screed' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFinishType(f.id as any)}
                    className={`p-2.5 text-left rounded-lg border text-xs transition-colors ${
                      finishType === f.id
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-semibold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{f.label}</div>
                    <div className="text-[10px] text-zinc-400">{f.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={resetDefaults}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Parameters</span>
              </button>

              <span className="text-[11px] text-zinc-500">
                Calculations include 5% compaction margin
              </span>
            </div>

          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 bg-zinc-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Estimated Bill of Quantities
                </span>
                <span className="text-xs text-zinc-400">Cape Town Rates</span>
              </div>

              {/* Volume & Spec Metrics */}
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">
                    Ready-Mix Concrete
                  </span>
                  <div className="text-3xl font-bold font-display text-white tabular-nums">
                    {concreteVolumeM3} <span className="text-sm font-normal text-zinc-400 font-sans">m³</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-1 block">Includes compaction factor</span>
                </div>

                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">
                    Mesh Reinforcement
                  </span>
                  <div className="text-3xl font-bold font-display text-white tabular-nums">
                    {meshSheets} <span className="text-sm font-normal text-zinc-400 font-sans">Sheets</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-1 block">Ref 193/245 standard (6x2.4m)</span>
                </div>
              </div>

              {/* Estimated Investment Bracket */}
              <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 mb-6">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>Estimated Total Investment Bracket (ZAR)</span>
                  <span className="text-emerald-400 font-medium">Free Quote Eligible</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-amber-400 tabular-nums">
                  R {estimatedMinCost.toLocaleString()} – R {estimatedMaxCost.toLocaleString()}
                </div>
                <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                  Includes ready-mix concrete, reinforcement, labor, precision screeding, and {finishType.replace('_', ' ')} finish. Final quote confirmed after on-site ground inspection.
                </p>
              </div>

              {/* What is Included checklist */}
              <div className="space-y-2 mb-6 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>SABS certified {concreteMpa} MPa concrete supply</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Sub-base leveling & edge formwork</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Expansion joint cutting & curing compound</span>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Send Estimate via WhatsApp</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Call {COMPANY_INFO.phoneFormatted} for Free Quote</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
