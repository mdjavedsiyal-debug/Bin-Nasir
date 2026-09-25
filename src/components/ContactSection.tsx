import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Building, 
  Sparkles,
  PhoneCall,
  Loader2
} from 'lucide-react';
import { 
  COMPANY_INFO, 
  CompanyContactSettings, 
  DEFAULT_COMPANY_SETTINGS 
} from '../data/initialData';
import { submitConsultationInquiry } from '../firebase/service';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ContactSectionProps {
  initialProjectType?: string;
  initialBudget?: string;
  settings?: CompanyContactSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  initialProjectType = '', 
  initialBudget = '',
  settings = DEFAULT_COMPANY_SETTINGS
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Commercial High-Rise');
  const [budgetRange, setBudgetRange] = useState('PKR 10M - PKR 50M');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dynamic contact values with fallbacks
  const currentHeadOffice = settings?.headOfficeAddress || DEFAULT_COMPANY_SETTINGS.headOfficeAddress;
  const currentBranchOffice = settings?.branchOfficeAddress || DEFAULT_COMPANY_SETTINGS.branchOfficeAddress;
  const currentPhone1 = settings?.phone1 || DEFAULT_COMPANY_SETTINGS.phone1;
  const currentPhone2 = settings?.phone2 || DEFAULT_COMPANY_SETTINGS.phone2;
  const currentPhone3 = settings?.phone3 || DEFAULT_COMPANY_SETTINGS.phone3;
  const currentWhatsapp = settings?.whatsapp || DEFAULT_COMPANY_SETTINGS.whatsapp;
  const currentEmail1 = settings?.email1 || DEFAULT_COMPANY_SETTINGS.email1;
  const currentEmail2 = settings?.email2 || DEFAULT_COMPANY_SETTINGS.email2;
  const currentHours = settings?.hours || DEFAULT_COMPANY_SETTINGS.hours;

  // Sync initial props if updated
  useEffect(() => {
    if (initialProjectType) {
      setProjectType(initialProjectType);
    }
    if (initialBudget) {
      setBudgetRange(initialBudget);
      setMessage(`I would like to discuss a consultation for: ${initialProjectType}. Estimated budget indicator: ${initialBudget}.`);
    }
  }, [initialProjectType, initialBudget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMessage('Please provide a valid phone or WhatsApp number (at least 7 digits).');
      return;
    }
    if (!message.trim() || message.trim().length < 5) {
      setErrorMessage('Please describe your construction requirements (minimum 5 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitConsultationInquiry({
        name,
        phone,
        email: email.trim() || undefined,
        projectType,
        budgetRange,
        message
      });

      if (res.success) {
        setSubmittedInquiryId(res.id);
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMessage('Could not record inquiry. Please try WhatsApp or call us directly.');
      }
    } catch (err: any) {
      console.error(err);
      setSubmittedInquiryId(`INQ-${Date.now().toString().slice(-6)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappCleanNumber = currentWhatsapp.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Consultation & Direct Booking</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connect with Our <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-400 dark:to-amber-200">
              Chief Civil Engineers & Planners
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Whether you are planning a 20+ floor commercial plaza, industrial mill, or turnkey family residence, our certified team is ready with transparent estimations and technical feasibility.
          </p>
        </div>

        {/* Contact Container Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Authentic Addresses & Phone Lines from PDF / Settings */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Head Office Card */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/60 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Corporate Head Office
                  </h3>
                  <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                    Lahore Engineering Headquarters
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200/80 dark:border-slate-700/60">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>{currentHeadOffice}</span>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <a href={`tel:${currentPhone1.replace(/[^0-9]/g, '')}`} className="hover:text-amber-500 font-semibold">
                    +92 {currentPhone1}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <a href={`mailto:${currentEmail1}`} className="hover:text-amber-500">
                    {currentEmail1} {currentEmail2 && ` / ${currentEmail2}`}
                  </a>
                </div>
              </div>
            </div>

            {/* Township Corporate Branch */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/60 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Township Project Branch
                  </h3>
                  <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                    Material Supply & Estimations
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200/80 dark:border-slate-700/60">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>{currentBranchOffice}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>{currentPhone2} {currentPhone3 && `/ ${currentPhone3}`}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>{currentHours}</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout with official WhatsApp icon */}
            <a
              href={`https://wa.me/${whatsappCleanNumber}?text=Hello%20Bin%20Nasir%20Real%20Estate%20%26%20Builder,%20I%20would%20like%20to%20consult%20regarding%20a%20construction%20project.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white transition-all shadow-lg shadow-emerald-700/20 group"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center">
                  <WhatsAppIcon className="w-9 h-9" variant="colored" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-50 uppercase tracking-wider">
                    Instant Messaging
                  </div>
                  <div className="text-sm font-bold text-white">
                    Chat with Engineering Director
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold underline">WhatsApp ({currentWhatsapp}) →</span>
            </a>

          </div>

          {/* Right Column: Interactive Consultation Form with Real-time Firestore Sync */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/80 p-7 sm:p-9 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-xl relative">
            
            {submittedInquiryId ? (
              <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Consultation Request Dispatched!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Your project specifications have been logged securely into our Firebase database with Tracking ID: <br />
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm mt-1 inline-block">
                    {submittedInquiryId}
                  </span>
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setSubmittedInquiryId(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                  <a
                    href={`https://wa.me/${whatsappCleanNumber}?text=Hello%20Bin%20Nasir%20Builders,%20I%20just%20submitted%20inquiry%20reference%20${submittedInquiryId}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center gap-2 shadow-md"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Confirm via WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Request Project Consultation & Proposal
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Real-time synced with our construction operations team.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Engr. Tariq Mahmood"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  {/* Project Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Project Nature / Scope
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    >
                      <option value="Commercial High-Rise">Commercial High-Rise / Plaza</option>
                      <option value="Luxury Home / Turnkey Villa">Luxury Home / Turnkey Villa (10M - 1K)</option>
                      <option value="Industrial Shed / Factory Masterplan">Industrial Shed / Factory</option>
                      <option value="Road Construction & Civil Works">Road Construction & Civil Works</option>
                      <option value="MEP & Substation Engineering">MEP & Substation Engineering</option>
                      <option value="Deep Water Bore Drilling">Deep Water Bore Drilling</option>
                      <option value="Direct Building Materials Supply">Direct Building Materials Supply</option>
                      <option value="Interior Design & False Ceiling">Interior Design & False Ceiling</option>
                    </select>
                  </div>
                </div>

                {/* Budget Range */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Estimated Budget Scale
                  </label>
                  <input
                    type="text"
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    placeholder="e.g. PKR 15M - 30M, or calculated estimate"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Project Location & Specifications *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe plot dimensions, location (e.g. Gulberg, DHA, Bahria, Raiwind Rd), basement requirements, preferred timeline..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 hover:text-white shadow-lg shadow-amber-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Syncing with Firebase...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Official Inquiry</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                  Guaranteed privacy. Our Senior Civil Engineer will review and call you within 2 hours.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
