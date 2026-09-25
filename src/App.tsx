/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AnalyticsModal } from './components/AnalyticsModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { 
  Project, 
  Service, 
  Testimonial, 
  TeamMember,
  CompanyContactSettings,
  INITIAL_PROJECTS, 
  INITIAL_SERVICES, 
  INITIAL_TESTIMONIALS,
  TEAM_MEMBERS,
  DEFAULT_COMPANY_SETTINGS
} from './data/initialData';
import { 
  subscribeToProjects, 
  subscribeToServices, 
  subscribeToTestimonials, 
  subscribeToTeam,
  subscribeToCompanySettings,
  subscribeToAnalytics, 
  recordPageView, 
  bootstrapFirestoreData,
  AnalyticsMetrics 
} from './firebase/service';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [team, setTeam] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [settings, setSettings] = useState<CompanyContactSettings>(DEFAULT_COMPANY_SETTINGS);
  const [metrics, setMetrics] = useState<AnalyticsMetrics>({
    id: 'metrics',
    pageViews: 12480,
    projectViews: 38450,
    inquiriesCount: 420,
    lastUpdated: new Date().toISOString()
  });

  // Active section tracking
  const [activeSection, setActiveSection] = useState('home');

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  // Pre-fill state for contact form
  const [formPreFill, setFormPreFill] = useState<{ projectType: string; budget: string }>({
    projectType: '',
    budget: ''
  });

  // Initialize Firebase subscriptions and pageview counter on mount
  useEffect(() => {
    // Non-blocking firestore setup test & counter increment
    bootstrapFirestoreData();
    recordPageView();

    const unsubProjects = subscribeToProjects((data) => {
      if (data && data.length > 0) setProjects(data);
    });

    const unsubServices = subscribeToServices((data) => {
      if (data && data.length > 0) setServices(data);
    });

    const unsubTestimonials = subscribeToTestimonials((data) => {
      if (data && data.length > 0) setTestimonials(data);
    });

    const unsubTeam = subscribeToTeam((data) => {
      if (data && data.length > 0) setTeam(data);
    });

    const unsubSettings = subscribeToCompanySettings((data) => {
      if (data) setSettings(data);
    });

    const unsubAnalytics = subscribeToAnalytics((data) => {
      if (data) setMetrics(data);
    });

    return () => {
      unsubProjects();
      unsubServices();
      unsubTestimonials();
      unsubTeam();
      unsubSettings();
      unsubAnalytics();
    };
  }, []);

  // Scroll spy to highlight active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'projects', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleApplyEstimateToForm = (type: string, budget: string) => {
    setFormPreFill({ projectType: type, budget });
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireFromModal = (projectName: string, category: string) => {
    setFormPreFill({
      projectType: `${category} Construction (Ref: ${projectName})`,
      budget: 'Standard Market Rate (To be calculated)'
    });
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentWhatsapp = settings?.whatsapp || DEFAULT_COMPANY_SETTINGS.whatsapp;
  const whatsappCleanNumber = currentWhatsapp.replace(/[^0-9]/g, '');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased transition-colors duration-300">
        
        {/* Navigation Bar */}
        <Navbar 
          onOpenAnalytics={() => setAnalyticsOpen(true)}
          onOpenAdmin={() => setAdminOpen(true)}
          activeSection={activeSection}
          settings={settings}
        />

        {/* Hero Section */}
        <main className="flex-1">
          <Hero />

          {/* Services Section with Construction Cost Estimator */}
          <ServicesSection 
            services={services} 
            onApplyEstimateToForm={handleApplyEstimateToForm}
          />

          {/* Dedicated Projects Section with Filtering & Dossier Previews */}
          <ProjectsSection 
            projects={projects}
            onSelectProject={(project) => setSelectedProject(project)}
          />

          {/* About Us, Leadership & Core Values: The Engineering & Management Team */}
          <AboutSection 
            team={team}
            settings={settings}
          />

          {/* Client Testimonials: Trusted by Pakistan's Foremost Developers & Institutions */}
          <TestimonialsSection 
            testimonials={testimonials}
          />

          {/* Contact Section: Connect with Our Chief Civil Engineers & Planners */}
          <ContactSection 
            initialProjectType={formPreFill.projectType}
            initialBudget={formPreFill.budget}
            settings={settings}
          />
        </main>

        {/* Comprehensive Footer with Policy Links */}
        <Footer 
          onOpenPolicy={(type) => setActivePolicy(type)}
          onOpenAnalytics={() => setAnalyticsOpen(true)}
          onOpenAdmin={() => setAdminOpen(true)}
          settings={settings}
        />

        {/* Floating Quick Action Button: Official WhatsApp with authentic icon */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
          <a
            href={`https://wa.me/${whatsappCleanNumber}?text=Hello%20Bin%20Nasir%20Real%20Estate%20%26%20Builder,%20I%20would%20like%20to%20consult%20regarding%20a%20construction%20project.`}
            target="_blank"
            rel="noreferrer"
            aria-label="Direct WhatsApp Chat"
            className="flex items-center gap-2.5 p-2 sm:p-2.5 pr-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl hover:shadow-emerald-600/40 transition-all active:scale-95 group border-2 border-white/20"
            title="Chat with Us on WhatsApp"
          >
            <WhatsAppIcon className="w-9 h-9" variant="colored" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider leading-none text-emerald-100">
                Direct Chat
              </span>
              <span className="text-xs font-extrabold whitespace-nowrap leading-tight">
                WhatsApp Us
              </span>
            </div>
          </a>
        </div>

        {/* Project Dossier Modal */}
        <ProjectModal 
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onInquire={handleInquireFromModal}
        />

        {/* Owner Admin Panel Modal */}
        <AdminPanelModal
          isOpen={adminOpen}
          onClose={() => setAdminOpen(false)}
          projects={projects}
          team={team}
          testimonials={testimonials}
          settings={settings}
        />

        {/* Live Real-time Analytics Modal */}
        <AnalyticsModal 
          metrics={metrics}
          isOpen={analyticsOpen}
          onClose={() => setAnalyticsOpen(false)}
        />

        {/* Policy Modals (Quality, HSE, CSR, Privacy, Terms) */}
        <PolicyModal 
          policyType={activePolicy}
          onClose={() => setActivePolicy(null)}
        />

      </div>
    </ThemeProvider>
  );
}
