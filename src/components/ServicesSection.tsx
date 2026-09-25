import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Route, 
  Truck, 
  Drill, 
  Cpu, 
  Zap, 
  Wrench, 
  Maximize, 
  Palette, 
  Layers, 
  ShieldAlert, 
  Umbrella, 
  Hammer, 
  Paintbrush, 
  PackageCheck
} from 'lucide-react';
import { Service } from '../data/initialData';

interface ServicesSectionProps {
  services: Service[];
  onApplyEstimateToForm?: (projectType: string, estimatedBudget: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Home: <Home className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Route: <Route className="w-6 h-6" />,
  Truck: <Truck className="w-6 h-6" />,
  Drill: <Drill className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Maximize: <Maximize className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6" />,
  Umbrella: <Umbrella className="w-6 h-6" />,
  Hammer: <Hammer className="w-6 h-6" />,
  Paintbrush: <Paintbrush className="w-6 h-6" />,
  PackageCheck: <PackageCheck className="w-6 h-6" />
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Core Construction');

  const categories = [
    'Core Construction',
    'Specialized Engineering',
    'Finishes & Interior',
    'Building Materials & Supply'
  ];

  const filteredServices = services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Turnkey Engineering & Products</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Services & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-400 dark:to-amber-200">
              Direct Supply Division
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Full-spectrum capabilities from structural civil construction to MEP engineering, deep water bore, architectural finishes, and verified building materials supply.
          </p>
        </div>

        {/* Category Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-700/60 flex flex-col justify-between hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 group"
            >
              <div className="space-y-4">
                
                {/* Icon & Category */}
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                    {ICON_MAP[service.icon] || <Building2 className="w-6 h-6" />}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-200/70 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300">
                    {service.category}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Bullet Features from PDF */}
                <div className="pt-2 space-y-2">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Equipment / Brand Partnerships from PDF */}
              {service.equipmentOrBrands && service.equipmentOrBrands.length > 0 && (
                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700/80">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Verified Materials / Equipment:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.equipmentOrBrands.map((brand, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
