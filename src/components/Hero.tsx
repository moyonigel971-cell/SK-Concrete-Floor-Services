import React, { useState, useRef } from 'react';
import { Phone, Mail, MessageSquare, Play, Pause, Volume2, VolumeX, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface HeroProps {
  onOpenVideoModal?: (videoSrc: string, title: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-zinc-950 border-b border-zinc-800/80">
      {/* Subtle concrete grid background */}
      <div className="absolute inset-0 concrete-grid-pattern opacity-40 pointer-events-none" />

      {/* Ambient gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Direct Phone Action */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Region / Category Kicker (Quiet unboxed text with separator) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
              <span>Cape Town & Western Cape</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-400">Professional Concrete Contracting</span>
            </div>

            {/* Slogan & Dominant Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display uppercase tracking-tight text-white text-balance leading-[1.08] mb-6">
              Strength in Every <span className="text-amber-500 underline decoration-zinc-700 underline-offset-8">Foundation.</span>
            </h1>

            {/* Value Proposition Description */}
            <p className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl mb-8">
              Cape Town's specialized concrete team for industrial & commercial floor slabs, custom reinforced concrete stairs, high-load columns & footings, suspended decking, and heavy vehicle driveways.
            </p>

            {/* Free Quote Banner Highlight */}
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-amber-500/30 mb-8 max-w-2xl shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 block">
                      Direct Site Supervisor Hotline
                    </span>
                    <a 
                      href={`tel:${COMPANY_INFO.phone}`} 
                      className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white hover:text-amber-400 transition-colors tabular-nums"
                    >
                      {COMPANY_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>
                <div className="text-xs text-zinc-400 sm:text-right border-t sm:border-t-0 sm:border-l border-zinc-800 pt-2 sm:pt-0 sm:pl-4">
                  <span className="text-emerald-400 font-medium block">All Calls Qualify For Free Quotes</span>
                  <span>On-site visits across Western Cape</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-amber-400 transition-colors font-medium break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
                <span className="text-zinc-500">{COMPANY_INFO.address}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Call {COMPANY_INFO.phoneFormatted}</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Hello SK Concrete Floor Services, I would like to get a free quote for my concrete project in Cape Town.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-all whitespace-nowrap shrink-0"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Quote</span>
              </a>

              <a
                href="#calculator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-amber-400 py-3 px-2 transition-colors whitespace-nowrap"
              >
                <span>Calculate Cost Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* 3 Core Trust Badges (Plain text layout with subtle separators) */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-500 shrink-0" />
                <span>SABS Standard C25–C40 Ready Mix</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Superflat Laser Floor Tolerances</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Cape Town Metro & Winelands Dispatch</span>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic Media Stage (Real Project Footage) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
              
              {/* Media Title Overlay */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-semibold text-white bg-zinc-950/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="uppercase tracking-wider">Cape Town Job Site Video</span>
                </div>
                <span className="text-zinc-400 font-mono">1,800 m² Polished Slab</span>
              </div>

              {/* Video Element */}
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-black overflow-hidden">
                <video
                  ref={videoRef}
                  src="/assets/aistudio/WhatsApp_Video_2026-10-25_at_19.39.32_92dc47e8.mp4"
                  poster="/assets/aistudio/WhatsApp_Image_2026-10-25_at_19.39.33__1__23435292.jpeg"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Subtle dark gradient scrim at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

                {/* Controls overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="p-2.5 rounded-lg bg-zinc-900/90 text-white hover:text-amber-400 border border-zinc-700/80 backdrop-blur-sm transition-colors"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2.5 rounded-lg bg-zinc-900/90 text-white hover:text-amber-400 border border-zinc-700/80 backdrop-blur-sm transition-colors"
                      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <a 
                    href="#projects"
                    className="text-xs font-semibold text-zinc-300 hover:text-white px-3 py-2 bg-zinc-900/90 rounded-lg border border-zinc-700 backdrop-blur-sm transition-colors"
                  >
                    View All 10 Projects &rarr;
                  </a>
                </div>
              </div>

              {/* Bottom Feature Strip */}
              <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>Heavy-load polished concrete warehouse floor</span>
                </div>
                <span className="text-zinc-500">Cape Town, ZA</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
