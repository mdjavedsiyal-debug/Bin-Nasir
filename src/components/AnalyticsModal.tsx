import React from 'react';
import { 
  X, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  CheckCircle, 
  Activity, 
  Globe, 
  Clock, 
  Database,
  ShieldCheck
} from 'lucide-react';
import { AnalyticsMetrics } from '../firebase/service';

interface AnalyticsModalProps {
  metrics: AnalyticsMetrics;
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ metrics, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                Live Portfolio Analytics & Metrics
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Firebase Real-Time Synchronized</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          
          {/* Main Key Counters */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <Eye className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {metrics.pageViews.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Live Page Views
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <Activity className="w-5 h-5 text-blue-500 mx-auto mb-1.5" />
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {metrics.projectViews.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Dossier Interactions
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto mb-1.5" />
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {metrics.inquiriesCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Client Inquiries
              </div>
            </div>
          </div>

          {/* Infrastructure Health Status */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 text-xs text-emerald-800 dark:text-emerald-300">
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Google Cloud Firestore Engine
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-200 font-bold">
                Operational
              </span>
            </div>
            <div className="text-[11px] opacity-90">
              Database instance: <code className="font-mono bg-black/10 dark:bg-white/10 px-1 rounded">ai-studio-9d631836...</code>. Zero latency client caching enabled for blazing fast loading speed.
            </div>
          </div>

          {/* Most Visited Projects from PDF */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Most Viewed Engineering Megaprojects
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
                <span className="font-semibold text-slate-800 dark:text-slate-200">1. High - Q Tower Gulberg (27 Floors)</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">38% Interest</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
                <span className="font-semibold text-slate-800 dark:text-slate-200">2. Gold Crest Mall & Residency DHA (18 Floors)</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">26% Interest</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
                <span className="font-semibold text-slate-800 dark:text-slate-200">3. Ibrahim Fiber Mills Industrial (34.7 Acre)</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">18% Interest</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
                <span className="font-semibold text-slate-800 dark:text-slate-200">4. Luxury Villas & KK House Lahore Cantt</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">18% Interest</span>
              </div>
            </div>
          </div>

          {/* Regional Demographics */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Globe className="w-4 h-4 text-amber-500" />
              <span>Primary Traffic: Lahore, Islamabad, Karachi, & Overseas Expatriates (UAE/UK)</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
