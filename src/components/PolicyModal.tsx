import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle, Scale, HardHat } from 'lucide-react';

export type PolicyType = 'quality' | 'csr' | 'safety' | 'privacy' | 'terms';

interface PolicyModalProps {
  policyType: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  const contentMap: Record<PolicyType, { title: string; subtitle: string; icon: React.ReactNode; body: React.ReactNode }> = {
    quality: {
      title: "Quality & Customer Care Policy",
      subtitle: "Accredited to ISO Quality Standards & Integrated Management System",
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            At <strong>BIN NASIR REAL ESTATE & BUILDER</strong>, customer service excellence forms the basis of all our work. In addition to our Excellent Delivery philosophy, our organization is accredited to internationally recognized <strong>ISO Quality Standards</strong> and we manage our business operations in strict accordance with our Integrated Management System.
          </p>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200">
            <h4 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-1">
              "Excellent Delivery" Commitment
            </h4>
            <p className="text-xs italic">
              "A positive attitude to provide excellent customer service and continuous improvement within our business for the benefit of our clients, staff, and supply chain."
            </p>
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white pt-2">The Four Cornerstones of Delivery:</h4>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span><strong>On Time:</strong> Rigorous milestone schedules to guarantee delivery on agreed timescales.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span><strong>Snag Free:</strong> Comprehensive pre-handover defect rectifications to deliver completely snag-free buildings.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span><strong>Delighted Client:</strong> From project inception, striving tirelessly to exceed client expectations.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span><strong>Recommended:</strong> Building relationships of trust so that every client gladly recommends us to friends and partners.</span>
            </li>
          </ul>
        </div>
      )
    },
    csr: {
      title: "Corporate Social Responsibility (CSR)",
      subtitle: "Ethical Workforce, Community Enrichment & Environmental Stewardship",
      icon: <FileText className="w-6 h-6 text-amber-500" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            We strive to maintain a productive and open dialogue with all parties who have an interest in our activities including shareholders, customers, suppliers, and our workforce.
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">Equal Opportunities & Local Employment:</h4>
          <p>
            We are an equal opportunities employer and aim to recruit locally at all times. We empower craftspeople, certified tradesmen, and apprentices from local districts in Punjab and across Pakistan.
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">Continuous Training Policy:</h4>
          <p>
            All employees and jobsite workers are provided with basic training regarding Health & Safety and Environmental Awareness, which is refreshed and enhanced on a regular basis. Our training policy ensures that every worker possesses the correct certification and safety skills required for their role.
          </p>
        </div>
      )
    },
    safety: {
      title: "Health, Safety & Environment (HSE) Policy",
      subtitle: "Zero-Accident Philosophy on High-Rise & Heavy Civil Job Sites",
      icon: <HardHat className="w-6 h-6 text-amber-500" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Operating cranes, 6-level subterranean excavations, and 29-floor scaffolding requires an uncompromising culture of safety. Bin Nasir maintains zero tolerance for safety violations on every active site.
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Mandatory PPE (helmets, harnesses, high-vis vests, steel-toe boots) enforced 100% on site.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Daily toolbox talks and certified safety officer inspections on deep excavations and tower cranes.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Dewatering and shoring wall continuous structural monitoring to protect adjacent public infrastructure.</span>
            </li>
          </ul>
        </div>
      )
    },
    privacy: {
      title: "Privacy & Data Confidentiality Policy",
      subtitle: "Safeguarding Client Information, Architectural Blueprints & Financial Data",
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Bin Nasir Real Estate & Builder treats all client consultations, architectural floorplans, structural drawings, and budgetary documents with strict confidentiality.
          </p>
          <p>
            Information submitted through our website and consultation forms is stored securely via encrypted cloud databases and is never shared, rented, or distributed to third-party marketing brokers.
          </p>
          <p>
            Patrons may request complete deletion or inspection of their consultation logs at any time by contacting our corporate office at <code>info@binnasirbuilders.com</code>.
          </p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service & Contract Delivery",
      subtitle: "Transparent Engineering, Clear Bill of Quantities (BOQ) & Legal Compliance",
      icon: <Scale className="w-6 h-6 text-amber-500" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            All construction and real estate development contracts initiated with Bin Nasir Real Estate & Builder are governed by formal, stamped Bill of Quantities (BOQ), certified engineering drawings, and staged milestone payment schedules.
          </p>
          <p>
            Material testing (cube crush testing for concrete, tensile elongation tests for steel rebars) are documented and signed off jointly with the client or supervising engineering consultant before each structural casting.
          </p>
        </div>
      )
    }
  };

  const current = contentMap[policyType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              {current.icon}
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                {current.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {current.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {current.body}
        </div>

        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
};
