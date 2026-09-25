import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  PackageCheck,
  Calculator, 
  Sparkles, 
  PhoneCall, 
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';
import { COMPANY_INFO } from '../data/initialData';

interface HeroProps {
  onOpenEstimator?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimator }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background with dark overlay & subtle architectural blueprint grid */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=2000&q=85" 
          alt="Bin Nasir Real Estate and Builder Megaprojects" 
          className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-[1.1] scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80" />
        
        {/* Subtle geometric grid line accents */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left py-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-8 text-white space-y-6">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>ISO 9001:2015 Accredited • 18+ Years Construction Legacy</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Engineering Pakistan's <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                Landmark Horizons
              </span> & Luxury Living
            </h1>

            {/* Subheading with Company Slogan */}
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl font-light leading-relaxed">
              From <span className="text-white font-medium">High-Q Tower (27 Floors)</span> and <span className="text-white font-medium">Gold Crest Mall DHA (18 Floors)</span> to industrial complexes and bespoke turnkey luxury villas.
            </p>

            {/* Company Tagline Block */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                    Official Motto
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-white italic">
                    "{COMPANY_INFO.tagline}"
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 hover:text-white hover:brightness-110 shadow-lg shadow-amber-600/30 transition-all active:scale-95"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all"
              >
                <PackageCheck className="w-4 h-4 text-amber-400" />
                <span>Explore Our Services</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/80 hover:bg-slate-900 text-slate-200 border border-slate-700/80 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Contact Engineering Team</span>
              </a>
            </div>

            {/* 4 Cornerstones Pills */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
              {COMPANY_INFO.cornerstones.map((corner, i) => (
                <div key={i} className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="font-semibold text-white truncate">{corner.title}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Showcase Card: Key Metrics from PDF Achievements */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900/85 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-slate-700/60 shadow-2xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-300">Track Record Highlights</span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Verified</span>
              </div>

              <div className="grid grid-cols-2 gap-4 py-5">
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/40">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">16+</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">Mega Landmarks</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/40">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">PKR 2.5B+</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">Portfolio Scale</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/40">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">29 Floors</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">Tallest Structure</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/40">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">6 Levels</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">Deep Basements</div>
                </div>
              </div>

              {/* Featured Project Callout */}
              <div className="mt-2 p-3.5 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-900/10 border border-amber-500/30 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span>Crown Achievement</span>
                  <span>PKR 697.4M</span>
                </div>
                <div className="font-semibold text-white">High - Q Tower (UICP) Gulberg</div>
                <div className="text-slate-300 text-[11px]">4 Basements + 23 Upper Floors • Main Boulevard</div>
              </div>
            </div>

            {/* Quick Contact Banner */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm text-center">
              <span className="text-xs text-slate-300">Need Immediate Construction Assessment? </span>
              <a 
                href="https://wa.me/923004687544" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-bold text-amber-400 hover:text-amber-300 underline inline-block ml-1"
              >
                Chat on WhatsApp (+92 300 4687544)
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Ticker for Credibility */}
      <div className="absolute bottom-0 left-0 right-0 bg-slate-950/90 border-t border-slate-800/80 py-2.5 overflow-hidden z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 text-amber-400 font-bold flex-shrink-0">
            <Building2 className="w-4 h-4" />
            <span className="uppercase tracking-wider">Major Clients & Projects:</span>
          </div>
          <div className="overflow-x-auto whitespace-nowrap pl-4 no-scrollbar flex items-center gap-6 text-[11px] sm:text-xs">
            <span>High-Q Tower (697.4M)</span>
            <span className="text-slate-600">•</span>
            <span>Gold Crest Mall DHA (472.6M)</span>
            <span className="text-slate-600">•</span>
            <span>Ibrahim Fiber Mills (357.3M)</span>
            <span className="text-slate-600">•</span>
            <span>High Court Admin Block (Mall Rd)</span>
            <span className="text-slate-600">•</span>
            <span>Ganga Ram Hospital</span>
            <span className="text-slate-600">•</span>
            <span>Beaconhouse TNS-2</span>
            <span className="text-slate-600">•</span>
            <span>Allied Bank ACCL</span>
            <span className="text-slate-600">•</span>
            <span>Galleria Mall Gulberg</span>
          </div>
        </div>
      </div>
    </section>
  );
};
