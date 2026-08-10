import React, { useState } from 'react';
import { 
  X, 
  Activity, 
  ShieldCheck, 
  Smartphone, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  RefreshCw, 
  MapPin, 
  Star, 
  Database,
  Building2,
  Users,
  ExternalLink
} from 'lucide-react';
import { Project } from '../types';

interface LivePortalModalProps {
  project: Project | null;
  onClose: () => void;
}

export const LivePortalModal: React.FC<LivePortalModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // Local interactive states for NACA demo
  const [selectedState, setSelectedState] = useState<'Lagos' | 'Abuja FCT' | 'Kano' | 'Rivers'>('Lagos');
  
  // Local interactive states for MDD demo
  const [selectedDisease, setSelectedDisease] = useState<'HIV' | 'TB' | 'Malaria' | 'NCDs' | 'NTDs'>('HIV');

  // Local interactive states for CSS demo
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [submittedFeedback, setSubmittedFeedback] = useState<boolean>(false);

  // Local interactive states for OneImpact demo
  const [reportType, setReportType] = useState<string>('Medicine Stockout');
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  const stateData = {
    Lagos: { patients: '242,500', suppression: '96.2%', facilities: '342', status: 'Optimal' },
    'Abuja FCT': { patients: '118,200', suppression: '95.4%', facilities: '180', status: 'Optimal' },
    Kano: { patients: '184,000', suppression: '93.8%', facilities: '290', status: 'Watchlist' },
    Rivers: { patients: '156,800', suppression: '94.9%', facilities: '220', status: 'Optimal' }
  };

  const diseaseData = {
    HIV: { activeCases: '1,735,811', metricName: 'Treatment Current (TX_CURR)', source: 'NDARS', growth: '+6.4% YoY Growth', status: 'Controlled' },
    TB: { activeCases: '406,662', metricName: 'TB Notified Cases', source: 'NTBLCP', growth: '100% Ingested', status: 'Active Surveillance' },
    Malaria: { activeCases: '33,168,249', metricName: 'Confirmed Cases', source: 'NHMIS', growth: '+11.0% Seasonal Inflow', status: 'Surge Tracked' },
    NCDs: { activeCases: '249,335 Diabetes', metricName: 'Diabetes (249k), Arthritis (245k), Asthma (67.9k)', source: 'NHMIS', growth: '+9.5% YoY Growth', status: 'Continuous Ingestion' },
    NTDs: { activeCases: '17,151 Snake Bites', metricName: 'Snake Bites (17.1k), Elephantiasis (1.5k)', source: 'NHMIS', growth: '+179.2% Ingested', status: 'Priority Monitor' }
  };

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedFeedback(true);
  };

  const handleBarrierReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">{project.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  LIVE INTERACTIVE PREVIEW
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Interactive Walkthrough Environment for Client Demonstrations
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 hover:text-emerald-100 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with Specific Project Demos */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* DEMO 1: NACA Command Center */}
          {project.id === 'naca-command-center' && (
            <div className="space-y-6">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400">NACA Situation Room Interactive State Selector</span>
                  <p className="text-xs text-slate-300">Click a regional state node to inspect real-time ART indicators:</p>
                </div>
                <div className="flex gap-2">
                  {(['Lagos', 'Abuja FCT', 'Kano', 'Rivers'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedState(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        selectedState === st
                          ? 'bg-cyan-600 text-white shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 text-xs font-mono block">Active Patients</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">{stateData[selectedState].patients}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 text-xs font-mono block">Suppression Rate</span>
                  <span className="text-2xl font-bold font-mono text-cyan-400">{stateData[selectedState].suppression}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 text-xs font-mono block">Connected Clinics</span>
                  <span className="text-2xl font-bold font-mono text-white">{stateData[selectedState].facilities}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 text-xs font-mono block">Supply Status</span>
                  <span className="text-2xl font-bold font-mono text-emerald-300">{stateData[selectedState].status}</span>
                </div>
              </div>
            </div>
          )}

          {/* DEMO 2: Multi-Disease Dashboard */}
          {project.id === 'multi-disease-dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800">
                {(['HIV', 'TB', 'Malaria', 'NCDs', 'NTDs'] as const).map((dis) => (
                  <button
                    key={dis}
                    onClick={() => setSelectedDisease(dis)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                      selectedDisease === dis
                        ? 'bg-cyan-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                    }`}
                  >
                    {dis} Program
                  </button>
                ))}
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                  <span>Selected Program: <strong className="text-cyan-300">{selectedDisease}</strong></span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Real-Time Ingestion Active
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono block uppercase">Ingested Volume</span>
                    <span className="text-xl font-extrabold font-mono text-white">{diseaseData[selectedDisease].activeCases}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono block uppercase">Metric Standard</span>
                    <span className="text-xs font-bold font-mono text-cyan-300">{diseaseData[selectedDisease].metricName}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono block uppercase">Primary Source System</span>
                    <span className="text-sm font-bold font-mono text-amber-400">{diseaseData[selectedDisease].source}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono block uppercase">Surge / Trend Rate</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">{diseaseData[selectedDisease].growth}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DEMO 3: CSS Patient Platform */}
          {project.id === 'css-survey-app' && (
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
              <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-2xl space-y-3">
                <ExternalLink className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Live Nigeria Integrated CLM Platform</h4>
                <p className="text-xs text-slate-300 font-mono max-w-lg mx-auto">
                  The CSS Dashboard is live in production across 36 States + FCT. Access the official live platform and dedicated WhatsApp chatbot channel directly.
                </p>
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono transition-all shadow-lg"
                >
                  <span>Open Live CSS Dashboard</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* DEMO 4: OneImpact Mobile Preview */}
          {project.id === 'one-impact-app' && (
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <span>OneImpact Community Barrier Reporting Flow</span>
              </h4>

              {reportSubmitted ? (
                <div className="p-6 bg-indigo-950/60 border border-indigo-800 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-indigo-400 mx-auto" />
                  <h5 className="text-base font-bold text-white">Community Barrier Report Logged!</h5>
                  <p className="text-xs text-slate-300 font-mono">
                    Assigned Case ID #ONEMPACT-2026-902. Assigned to Local CBO Advocate Officer.
                  </p>
                  <button
                    onClick={() => setReportSubmitted(false)}
                    className="px-4 py-2 bg-slate-900 border border-slate-700 text-xs font-mono rounded-xl text-slate-200"
                  >
                    Test Another Barrier Submission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBarrierReportSubmit} className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-slate-400 mb-2">Select Barrier Category:</label>
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2.5 rounded-xl"
                    >
                      <option value="Medicine Stockout">Medicine Stockout (DOTS / ARV)</option>
                      <option value="Stigma & Discrimination">Stigma & Discrimination at Clinic</option>
                      <option value="Facility Closure">Facility Unscheduled Closure</option>
                      <option value="Transport Barrier">Excessive Distance / Transport Fee</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Log Barrier Report to CBO Advocate</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* DEMO DEFAULT / OTHER */}
          {!['naca-command-center', 'multi-disease-dashboard', 'css-survey-app', 'one-impact-app'].includes(project.id) && (
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
              <Database className="w-10 h-10 text-cyan-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Active System Data Stream</h4>
              <p className="text-xs text-slate-300 font-mono max-w-lg mx-auto">
                Connected to {project.name} API gateway. Ingesting live telemetry records with 99.9% uptime.
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div>
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
              >
                <span>Open official {project.name} live web system in new tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold"
          >
            Close Preview
          </button>
        </div>

      </div>

    </div>
  );
};
