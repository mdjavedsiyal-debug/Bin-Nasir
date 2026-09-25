import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  Layers, 
  Calendar, 
  ArrowUpRight, 
  Filter, 
  Sparkles,
  SlidersHorizontal,
  DollarSign
} from 'lucide-react';
import { Project } from '../data/initialData';
import { recordProjectInteraction } from '../firebase/service';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

type CategoryFilter = 'All' | 'Commercial' | 'Residential' | 'Healthcare' | 'Industrial' | 'Institutional' | 'Infrastructure';

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'budget-high' | 'recent'>('default');

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: 'All Projects', value: 'All' },
    { label: 'Commercial & High-Rise', value: 'Commercial' },
    { label: 'Residential Villas', value: 'Residential' },
    { label: 'Healthcare & Medical', value: 'Healthcare' },
    { label: 'Industrial Plants', value: 'Industrial' },
    { label: 'Institutional & Campus', value: 'Institutional' },
    { label: 'Civil Infrastructure', value: 'Infrastructure' },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
      const matchesSearch = 
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.floors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.duration.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'budget-high') {
        const numA = parseFloat(a.workAmount.replace(/[^0-9.]/g, '')) || 0;
        const numB = parseFloat(b.workAmount.replace(/[^0-9.]/g, '')) || 0;
        return numB - numA;
      }
      if (sortBy === 'recent') {
        return b.duration.localeCompare(a.duration);
      }
      return 0;
    });
  }, [projects, selectedCategory, searchQuery, sortBy]);

  const handleCardClick = (project: Project) => {
    // Record analytics click in Firestore
    recordProjectInteraction(project.id);
    onSelectProject(project);
  };

  return (
    <section id="projects" className="py-20 bg-slate-100/70 dark:bg-slate-950/70 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Documented Project Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Landmark Megaprojects & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-400 dark:to-amber-200">
              Structural Achievements
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Directly derived from our verified engineering portfolio across Lahore and Pakistan. Over PKR 2.5 Billion in executed structural milestones.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar justify-start lg:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat.value
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search project, Gulberg, DHA, floors..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort projects"
                className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              >
                <option value="default">Featured First</option>
                <option value="budget-high">Highest Work Amount</option>
                <option value="recent">Recent Timeline</option>
              </select>

              <div className="text-xs font-bold px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 whitespace-nowrap">
                {filteredProjects.length} Projects
              </div>
            </div>
          </div>

        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleCardClick(project)}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-amber-500/5 hover:border-amber-500/50 transition-all duration-300 cursor-pointer flex flex-col transform hover:-translate-y-1.5"
            >
              {/* Image Preview with Floating Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-sm">
                      Landmark
                    </span>
                  )}
                </div>

                {/* Structure / Floors Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md font-medium border border-white/10 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    {project.floors}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-300 bg-black/60 px-2 py-1 rounded-md">
                    {project.duration}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors flex-shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Financial Scope & Technical Footprint */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Work Amount</span>
                    <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm">
                      {project.workAmount}
                    </span>
                  </div>
                  
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 group-hover:text-amber-500 flex items-center gap-1">
                    <span>View Dossier</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">No projects found</h4>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your category filter or search keywords.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
