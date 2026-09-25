import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  BarChart3, 
  PhoneCall, 
  ShieldCheck, 
  ChevronRight, 
  Lock, 
  Settings 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CompanyContactSettings, DEFAULT_COMPANY_SETTINGS } from '../data/initialData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface NavbarProps {
  onOpenAnalytics: () => void;
  onOpenEstimator?: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
  settings?: CompanyContactSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenAnalytics, 
  onOpenEstimator, 
  onOpenAdmin,
  activeSection,
  settings = DEFAULT_COMPANY_SETTINGS
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phoneNum = settings?.phone1 || DEFAULT_COMPANY_SETTINGS.phone1;
  const whatsappNum = settings?.whatsapp || DEFAULT_COMPANY_SETTINGS.whatsapp;
  const whatsappClean = whatsappNum.replace(/[^0-9]/g, '');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Contact Us', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-lg shadow-black/5 border-b border-slate-200/80 dark:border-slate-800/80 py-3' 
          : 'bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent text-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a 
            href="#home" 
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md shadow-amber-600/30 ring-2 ring-amber-400/20 group-hover:scale-105 transition-transform duration-300">
              <Building className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950" title="Firebase Online" />
            </div>
            <div>
              <span className={`block font-bold text-lg tracking-wider uppercase font-serif-luxury ${
                isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'
              }`}>
                BIN NASIR
              </span>
              <span className="block text-[10px] tracking-widest uppercase font-semibold text-amber-500 dark:text-amber-400">
                REAL ESTATE & BUILDER
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative ${
                    isScrolled
                      ? isActive
                        ? 'text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/40'
                        : 'text-slate-700 hover:text-amber-600 dark:text-slate-200 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                      : isActive
                        ? 'text-amber-400 font-bold bg-white/10'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Tools: Admin Portal, Analytics, Dark Mode, Phone */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Owner Admin Panel Button */}
            <button
              onClick={onOpenAdmin}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isScrolled
                  ? 'border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10 bg-amber-50/50 dark:bg-amber-950/30'
                  : 'border-amber-400/40 text-amber-300 hover:bg-amber-500/20 bg-amber-500/10'
              }`}
              title="Owner Admin Panel"
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Admin Panel</span>
            </button>

            {/* Live Analytics Button */}
            <button
              onClick={onOpenAnalytics}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isScrolled
                  ? 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 bg-slate-50 dark:bg-slate-900'
                  : 'border-white/20 text-slate-200 hover:bg-white/10 hover:border-white/40'
              }`}
              title="Live Real-time Analytics"
            >
              <BarChart3 className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Analytics</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle dark mode"
              className={`p-2 rounded-lg text-sm transition-colors border ${
                isScrolled
                  ? 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'border-white/20 text-slate-200 hover:bg-white/10'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Direct Consultation / Quick Call Button */}
            <a
              href={`tel:${phoneNum.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md shadow-amber-600/20 active:scale-95 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{phoneNum}</span>
            </a>

            {/* Direct WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/${whatsappClean}?text=Hello%20Bin%20Nasir%20Real%20Estate%20%26%20Builder,%20I%20would%20like%20to%20consult%20regarding%20a%20construction%20project.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" variant="mono" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAdmin}
              type="button"
              className="p-2 rounded-lg border border-amber-500/40 text-amber-400 bg-amber-500/10 text-xs font-bold"
              title="Owner Admin"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle dark mode"
              className={`p-2 rounded-lg border ${
                isScrolled
                  ? 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  : 'border-white/20 text-white'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className={`p-2 rounded-lg border ${
                isScrolled
                  ? 'border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white'
                  : 'border-white/20 text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-xl px-4 text-slate-900 dark:text-white animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                    activeSection === link.id
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </nav>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
              >
                <Lock className="w-4 h-4" />
                <span>Owner Admin Panel (Manage Projects)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAnalytics();
                }}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60"
              >
                <BarChart3 className="w-4 h-4 text-amber-500" />
                <span>View Real-Time Analytics Dashboard</span>
              </button>

              <a
                href="https://wa.me/923004687544?text=Hello%20Bin%20Nasir%20Real%20Estate%20%26%20Builder,%20I%20would%20like%20to%20inquire%20about%20a%20construction%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2"
              >
                <span>WhatsApp (0300-4687544)</span>
              </a>

              <a
                href="tel:03004687544"
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center bg-amber-500 hover:bg-amber-600 text-white shadow-md flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Hotline (0300-4687544)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
