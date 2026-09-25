import React from 'react';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Clock, 
  ArrowUp,
  Award,
  ChevronRight,
  HardHat
} from 'lucide-react';
import { COMPANY_INFO, CompanyContactSettings, DEFAULT_COMPANY_SETTINGS } from '../data/initialData';
import { PolicyType } from './PolicyModal';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onOpenPolicy: (type: PolicyType) => void;
  onOpenAnalytics: () => void;
  onOpenAdmin?: () => void;
  settings?: CompanyContactSettings;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenPolicy, 
  onOpenAnalytics, 
  onOpenAdmin,
  settings = DEFAULT_COMPANY_SETTINGS 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const headAddress = settings?.headOfficeAddress || DEFAULT_COMPANY_SETTINGS.headOfficeAddress;
  const branchAddress = settings?.branchOfficeAddress || DEFAULT_COMPANY_SETTINGS.branchOfficeAddress;
  const phone1 = settings?.phone1 || DEFAULT_COMPANY_SETTINGS.phone1;
  const phone2 = settings?.phone2 || DEFAULT_COMPANY_SETTINGS.phone2;
  const whatsappNum = settings?.whatsapp || DEFAULT_COMPANY_SETTINGS.whatsapp;
  const email1 = settings?.email1 || DEFAULT_COMPANY_SETTINGS.email1;
  const whatsappClean = whatsappNum.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-lg shadow-amber-600/30">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-bold text-lg text-white tracking-wider uppercase font-serif-luxury">
                  BIN NASIR
                </span>
                <span className="block text-[10px] tracking-widest uppercase font-semibold text-amber-400">
                  REAL ESTATE & BUILDER
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Premier civil engineering, skyscraper development, luxury residential villas, and heavy infrastructure contractor in Pakistan. Operating with unwavering integrity since 2005.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="text-amber-400 font-bold">ISO 9001:2015 Accredited</div>
                <div className="text-slate-400">Integrated Management System</div>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Services Catalog</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Project Portfolio</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>About & Leadership</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Contact Engineering</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={onOpenAnalytics}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Live App Analytics</span>
                </button>
              </li>
              {onOpenAdmin && (
                <li>
                  <button 
                    onClick={onOpenAdmin}
                    className="hover:text-amber-400 text-amber-500/90 font-semibold transition-colors flex items-center gap-1.5 text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                    <span>Owner Admin Panel</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Policy & Compliance Links as requested */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Compliance & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenPolicy('quality')}
                  className="hover:text-amber-400 text-left transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Quality Assurance & ISO Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('safety')}
                  className="hover:text-amber-400 text-left transition-colors flex items-center gap-1.5"
                >
                  <HardHat className="w-3.5 h-3.5 text-amber-400" />
                  <span>Health, Safety & HSE Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('csr')}
                  className="hover:text-amber-400 text-left transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Corporate Social Responsibility</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-amber-400 text-left transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Client Data & Blueprint Privacy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-amber-400 text-left transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Terms of Construction Contract</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct Footprint */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>{headAddress}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>{branchAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href={`tel:${phone1.replace(/[^0-9]/g, '')}`} className="hover:text-amber-400 font-bold text-white">
                  {phone1} {phone2 && `/ ${phone2}`}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 flex-shrink-0" variant="colored" />
                <a 
                  href={`https://wa.me/${whatsappClean}?text=Hello%20Bin%20Nasir%20Real%20Estate%20%26%20Builder,%20I%20would%20like%20to%20consult%20regarding%20a%20construction%20project.`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-400 font-bold text-emerald-400"
                >
                  WhatsApp: {whatsappNum}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href={`mailto:${email1}`} className="hover:text-amber-400 truncate">
                  {email1}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Sub-Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300">BIN NASIR REAL ESTATE & BUILDER</strong>. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400">
              Motto: <em className="text-amber-400">"Let Your Dreams Be Our Project"</em>
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 border border-slate-800"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
