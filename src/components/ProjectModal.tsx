import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Layers, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { Project } from '../data/initialData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (projectName: string, category: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onInquire }) => {
  if (!project) return null;

  const [activeImage, setActiveImage] = useState<string>(project.imageUrl);
  const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.imageUrl];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              {project.category}
            </span>
            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
              project.status === 'Completed' 
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
            }`}>
              {project.status}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Title & Key Specs Bar */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-2 text-sm text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-amber-500" />
                {project.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-amber-500" />
                {project.duration}
              </span>
            </div>
          </div>

          {/* Image & Gallery Showcase */}
          <div className="space-y-3">
            <div className="relative aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800">
              <img 
                src={activeImage} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium text-white">
                Structure: {project.floors}
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImage === img 
                        ? 'border-amber-500 ring-2 ring-amber-500/20' 
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Financial & Architectural Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Work / Financial Scale</div>
              <div className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-400 mt-0.5">
                {project.workAmount}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Floor Configuration</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {project.floors}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Quality Compliance</div>
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                ISO 9001 Audited
              </div>
            </div>
          </div>

          {/* Project Detailed Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Engineering & Construction Scope
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Highlights & Engineering Features */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Key Technical Deliverables
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {project.highlights.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-700/40">
                  <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer with Direct Inquiry CTA */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Have a commercial tower, luxury villa, or civil project in mind?
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onInquire(project.title, project.category);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 hover:text-white shadow-md transition-all active:scale-95"
            >
              <span>Request Project Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
