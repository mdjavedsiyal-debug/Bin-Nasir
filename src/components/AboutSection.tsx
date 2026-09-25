import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Clock, 
  CheckCircle2, 
  Quote, 
  Check, 
  HeartHandshake,
  Target,
  Sparkles
} from 'lucide-react';
import { 
  COMPANY_INFO, 
  TEAM_MEMBERS, 
  TeamMember, 
  CompanyContactSettings,
  DEFAULT_COMPANY_SETTINGS 
} from '../data/initialData';

interface AboutSectionProps {
  team?: TeamMember[];
  settings?: CompanyContactSettings;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  team = TEAM_MEMBERS, 
  settings = DEFAULT_COMPANY_SETTINGS 
}) => {
  const currentCeoName = settings?.ceoName || COMPANY_INFO.ceoName;
  const currentCeoRole = settings?.ceoRole || 'Chief Executive Officer (CEO)';
  const currentCeoMessage = settings?.ceoMessage || COMPANY_INFO.ceoMessage;
  const currentFounderName = settings?.founderName || COMPANY_INFO.founderName;

  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Legacy & Proven Leadership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-400 dark:to-amber-200">
              BIN NASIR REAL ESTATE & BUILDER
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Formed in 2005 by Founder Mr. {currentFounderName} and steered to contemporary heights by CEO Mr. {currentCeoName}, evolving into Pakistan's respected engineering partner across commercial, civil, and residential sectors.
          </p>
        </div>

        {/* CEO Message & Heritage Spotlight Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* CEO Message Quote Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-7 sm:p-9 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <Quote className="absolute top-6 right-6 w-20 h-20 text-white/5 pointer-events-none" />

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5" />
                <span>Executive Vision</span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-white">
                CEO Leadership Message
              </h3>

              <p className="text-lg text-slate-200 font-serif-luxury italic leading-relaxed pt-2">
                "{currentCeoMessage}"
              </p>
            </div>

            <div className="pt-8 border-t border-slate-800/80 flex items-center justify-between mt-6">
              <div>
                <div className="font-extrabold text-base text-white">{currentCeoName}</div>
                <div className="text-xs text-amber-400 font-medium">{currentCeoRole}</div>
              </div>
              <div className="px-3 py-1 rounded-lg bg-white/10 text-xs font-bold tracking-widest text-slate-300 uppercase">
                Est. 2005
              </div>
            </div>
          </div>

          {/* Heritage & Quality Assurance Highlights */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-9 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Quality & Customer Care</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                ISO Certified & Integrated Systems
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Bin Nasir Real Estate & Builder is accredited to ISO Quality Standards, running operations under a rigorous Integrated Management System. Every foundation, structural slab, and turnkey fitout adheres strictly to verified architectural codes and safety benchmarks.
              </p>
            </div>

            {/* 4 Cornerstones */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {COMPANY_INFO.cornerstones.map((corner, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>{corner.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {corner.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Core Values from PDF */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Our Guiding Company Ethos
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              The four foundational pillars that govern our decisions on every construction site.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMPANY_INFO.values.map((val, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-sm mb-3">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">{val.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Management Team from PDF */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <Users className="w-4 h-4" />
              <span>Leadership Directory</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              The Engineering & Management Team
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
              >
                <div>
                  {member.imageUrl ? (
                    <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-3 shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform border border-amber-500/20 bg-slate-950">
                      <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-700 text-white font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
                      {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                  )}
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{member.name}</h4>
                  <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                    {member.role}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
