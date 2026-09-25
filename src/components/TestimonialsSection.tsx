import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle, 
  MessageSquare, 
  Building2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Testimonial } from '../data/initialData';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onSubmitFeedbackOpen?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ 
  testimonials,
  onSubmitFeedbackOpen 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-slate-100/60 dark:bg-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Client Endorsements & Proof</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by Pakistan's <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-400 dark:to-amber-200">
              Foremost Developers & Institutions
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Real feedback from project directors, institutional heads, and private villa patrons across our 18-year engineering history.
          </p>
        </div>

        {/* Featured Testimonial Carousel Spotlight */}
        {testimonials.length > 0 && (
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
              <Quote className="absolute top-6 right-6 w-24 h-24 text-amber-500/10 pointer-events-none" />

              <div className="space-y-6">
                
                {/* Rating & Project Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2">
                      {testimonials[activeIndex].ratingText || `${testimonials[activeIndex].rating}.0 Verified Rating`}
                    </span>
                  </div>

                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    Project: {testimonials[activeIndex].projectRef}
                  </span>
                </div>

                {/* Feedback Quote */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-200 font-serif-luxury italic leading-relaxed">
                  "{testimonials[activeIndex].feedback}"
                </p>

                {/* Author Info */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {testimonials[activeIndex].avatarUrl ? (
                      <img 
                        src={testimonials[activeIndex].avatarUrl} 
                        alt={testimonials[activeIndex].name} 
                        className="w-12 h-12 rounded-full object-cover shadow-md border border-amber-500/30"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-700 text-white font-bold text-base flex items-center justify-center shadow-md">
                        {testimonials[activeIndex].name[0]}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{testimonials[activeIndex].name}</span>
                        <span title="Verified Client">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {testimonials[activeIndex].role} • {testimonials[activeIndex].company}
                      </div>
                    </div>
                  </div>

                  {/* Navigation controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevTestimonial}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      aria-label="Previous review"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      aria-label="Next review"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* 3 Grid Mini Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  "{item.feedback}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {item.avatarUrl ? (
                    <img 
                      src={item.avatarUrl} 
                      alt={item.name} 
                      className="w-8 h-8 rounded-full object-cover border border-amber-500/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 font-bold flex items-center justify-center text-xs">
                      {item.name[0]}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{item.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{item.company}</div>
                  </div>
                </div>
                {item.ratingText && (
                  <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    {item.ratingText}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
