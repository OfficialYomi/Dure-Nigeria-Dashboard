import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Play, 
  Share2, 
  Download, 
  Layers, 
  Activity, 
  Calendar, 
  Users, 
  Cpu, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Server,
  Zap,
  Check,
  Copy,
  Database,
  Heart,
  FileText,
  MessageSquareHeart
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { Project } from '../types';
import { generatePdfReport } from '../utils/pdfExport';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onOpenLiveDemo: (project: Project) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onBack,
  onOpenLiveDemo
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'milestones' | 'modules' | 'telemetry'>('analytics');
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeChartMetric, setActiveChartMetric] = useState<'main' | 'secondary'>('main');
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);

  // Simulated Telemetry Ping Generator
  const [pings, setPings] = useState<Array<{ id: number; time: string; node: string; latency: string; status: string }>>(() => {
    if (project.id === 'multi-disease-dashboard') {
      return [
        { id: 1, time: '10:24:02', node: 'NACA Data Ecosystem', latency: '18ms', status: 'SYNCHRONIZED' },
        { id: 2, time: '10:24:05', node: 'NDARS Telemetry Gateway', latency: '24ms', status: 'SYNCHRONIZED' },
        { id: 3, time: '10:24:08', node: 'NHMIS National Pipeline', latency: '31ms', status: 'SYNCHRONIZED' }
      ];
    }
    if (project.id === 'css-survey-app') {
      return [
        { id: 1, time: '10:24:02', node: 'NEPWHAN', latency: '18ms', status: 'SYNCHRONIZED' },
        { id: 2, time: '10:24:05', node: 'ACCOMIN', latency: '24ms', status: 'SYNCHRONIZED' },
        { id: 3, time: '10:24:08', node: 'TB NETWORK', latency: '31ms', status: 'SYNCHRONIZED' }
      ];
    }
    return [
      { id: 1, time: '10:24:02', node: 'Node-EU-West (Primary)', latency: '18ms', status: 'SYNCHRONIZED' },
      { id: 2, time: '10:24:05', node: 'Node-AF-Central (Gateway)', latency: '32ms', status: 'STREAMING' },
      { id: 3, time: '10:24:08', node: 'Node-US-East (Backup)', latency: '44ms', status: 'STANDBY' }
    ];
  });

  // Keyboard shortcut ESC to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const isLive = project.status === 'Live';
  const isNaca = project.id === 'naca-command-center';
  const isFmoh = project.id === 'multi-disease-dashboard';
  const isCss = project.id === 'css-survey-app';
  const todayFormatted = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const nacaTopStatesData = [
    { name: 'Benue', value: 185400 },
    { name: 'Akwa Ibom', value: 162000 },
    { name: 'Lagos', value: 160500 },
    { name: 'Rivers', value: 138000 },
    { name: 'Nasarawa', value: 115200 },
    { name: 'Cross River', value: 112000 },
    { name: 'Kaduna', value: 110500 },
    { name: 'Enugu', value: 108000 },
    { name: 'Anambra', value: 105000 },
    { name: 'Delta', value: 102000 }
  ];

  const nacaTopLgasData = [
    { name: 'Ukum', value: 48200 },
    { name: 'Obio Akpor', value: 42100 },
    { name: 'Makurdi', value: 40500 },
    { name: 'Jos North', value: 38200 },
    { name: 'AMAC', value: 36900 },
    { name: 'Mushin', value: 34500 },
    { name: 'Gboko', value: 33100 },
    { name: 'Uyo', value: 31800 },
    { name: 'Port Harcourt', value: 29400 },
    { name: 'Kwande', value: 28100 }
  ];

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    try {
      await generatePdfReport(project, 'project-detail-report-content');
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleTriggerTelemetryPing = () => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const nodes = isFmoh 
      ? ['NACA Data Ecosystem', 'NDARS Telemetry Gateway', 'NHMIS National Pipeline', 'State DPH Command Node']
      : isCss
      ? ['NEPWHAN', 'ACCOMIN', 'TB NETWORK']
      : ['Node-AF-West-01', 'Node-HQ-Command', 'Node-Lab-Gateway-04', 'Node-Mobile-Relay'];
    const lat = Math.floor(Math.random() * 20 + 12) + 'ms';
    const newPing = {
      id: Date.now(),
      time,
      node: nodes[Math.floor(Math.random() * nodes.length)],
      latency: lat,
      status: 'SYNCHRONIZED'
    };
    setPings(prev => [newPing, ...prev.slice(0, 5)]);
  };

  // Circular gauge math
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (project.completionPercentage / 100) * circumference;

  return (
    <div id="project-detail-report-content" className="min-h-screen bg-slate-950 text-slate-100 pb-16 animate-fadeIn">
      
      {/* Top Sticky Navigation Bar */}
      <div className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3 no-print">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between">
          
          <button
            onClick={onBack}
            className="group px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-mono flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-slate-950 text-[10px] text-slate-500 border border-slate-800 font-mono">
              ESC
            </kbd>
          </button>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">System Code:</span>
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800/80">
              {project.code}
            </span>

            {/* Prominent Top Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="px-3.5 py-2 rounded-xl bg-cyan-950 border border-cyan-800/80 hover:bg-cyan-900 text-cyan-300 hover:text-white text-xs font-semibold font-mono flex items-center gap-1.5 shadow-md transition-all active:scale-95 disabled:opacity-50"
              title="Download full project details as PDF Report"
            >
              {isExportingPdf ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download PDF Report</span>
                </>
              )}
            </button>

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-300 hover:text-emerald-100 text-xs font-semibold font-mono flex items-center gap-1.5 shadow-md transition-all active:scale-95"
              >
                <span>Visit Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            )}

            {!isNaca && !isCss && (
              <button
                onClick={() => onOpenLiveDemo(project)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs font-semibold font-mono flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400 fill-current" />
                <span className="hidden sm:inline">Simulate Portal</span>
              </button>
            )}
          </div>

        </div>
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Executive Hero Banner */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden shadow-2xl">
          
          {/* Ambient Background Radial Glow */}
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isLive ? 'bg-emerald-500/10' : 'bg-amber-500/10'
          }`} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            
            {/* Left Header Content */}
            <div className="lg:col-span-8">
              
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/80 uppercase font-semibold">
                  {project.domain}
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Updated: {todayFormatted}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                {isNaca ? 'Nigeria HIV & AIDS Data Ecosystem' : project.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl font-sans mb-6">
                {project.fullDescription}
              </p>

              {/* Coordinating Body & Target Deployment Badges */}
              <div className="flex flex-wrap gap-6 text-xs font-mono text-slate-400 pt-4 border-t border-slate-800/80">
                {project.leadAgency && (
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Coordinating body</span>
                    <strong className="text-cyan-300 font-bold">{project.leadAgency}</strong>
                  </div>
                )}
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Target Deployment</span>
                  <strong className="text-slate-200">{project.targetAudience}</strong>
                </div>
              </div>

            </div>

            {/* Right Side: Circular Gauge & Quick Action Panel */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-6 lg:pt-0 lg:pl-8">
              
              {/* Large Circular Gauge */}
              <div className="flex items-center space-x-4 mb-6">
                
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-28 h-28 transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r={radius}
                      className="stroke-slate-800"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r={radius}
                      className={`transition-all duration-1000 ease-out ${
                        isLive ? 'stroke-emerald-400' : 'stroke-amber-400'
                      }`}
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-2xl font-bold font-mono text-white block">
                      {project.completionPercentage}%
                    </span>
                    <span className="text-[9px] font-mono uppercase text-slate-400 block">Complete</span>
                  </div>
                </div>

                <div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold mb-2 border ${
                    isLive || project.status === 'Active' || project.status === 'In Production' || project.status === 'Active Sprint'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
                      : 'bg-amber-950 text-amber-300 border-amber-800'
                  }`}>
                    {isLive || project.status === 'Active' || project.status === 'In Production' || project.status === 'Active Sprint' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span>{project.status === 'Active Sprint' ? 'Active Sprint (In Production)' : project.status}</span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Version: <strong className="text-white">{project.version}</strong>
                  </div>
                </div>

              </div>

              {/* Utility Action Buttons */}
              <div className="flex flex-wrap gap-2 w-full justify-center lg:justify-end">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="px-4 py-2.5 rounded-xl bg-cyan-950 border border-cyan-800/80 hover:bg-cyan-900 text-cyan-300 text-xs font-semibold font-mono flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download PDF Report</span>
                </button>

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold font-mono flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all active:scale-95"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-4 h-4 text-white" />
                  </a>
                )}

                {!isNaca && (
                  <button
                    onClick={() => onOpenLiveDemo(project)}
                    className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs font-semibold font-mono flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Interactive Simulator</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* NACA Screenshot 1 Hero Ecosystem Cards (3 Hero Cards) */}
        {isNaca && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                  <Database className="w-5 h-5" />
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div>
                <div className="text-3xl font-extrabold font-mono text-white mb-1">4</div>
                <div className="text-xs font-mono font-bold text-slate-300 mb-1">Number Of Data Sources</div>
                <div className="text-xs font-mono text-emerald-400 font-semibold">NDARS, ENNRIMS, NHMIS, NDR</div>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/80">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              </div>
              <div>
                <div className="text-3xl font-extrabold font-mono text-white mb-1">37 | 774</div>
                <div className="text-xs font-mono font-bold text-slate-300 mb-1">Number of States & LGAs</div>
                <div className="text-xs font-mono text-slate-400">Full National Geographic Disaggregation</div>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800/80">
                  <Users className="w-5 h-5" />
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
              </div>
              <div>
                <div className="text-3xl font-extrabold font-mono text-white mb-1">1</div>
                <div className="text-xs font-mono font-bold text-slate-300 mb-1">Number of Community</div>
                <div className="text-xs font-mono text-indigo-400 font-semibold">Nephwan</div>
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics Grid (4 Prominent Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {project.keyMetrics.map((metric, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl relative overflow-hidden group transition-all"
            >
              <div className="text-xs font-mono text-slate-400 mb-1">{metric.label}</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mb-2">
                {metric.value}
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold">{metric.change}</span>
                {metric.description && (
                  <span className="text-slate-500 text-[10px] truncate max-w-[120px]" title={metric.description}>
                    {metric.description}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Tabs Navigation */}
        <div className="border-b border-slate-800 mb-8">
          <nav className="flex space-x-2 overflow-x-auto pb-1">
            
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Performance Analytics & Tech Stack</span>
            </button>

            <button
              onClick={() => setActiveTab('milestones')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'milestones'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Milestones & Implementation Roadmap</span>
            </button>

            {project.modules && project.modules.length > 0 && (
              <button
                onClick={() => setActiveTab('modules')}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'modules'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>System Modules ({project.modules.length})</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'telemetry'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Command Telemetry Radar</span>
            </button>

          </nav>
        </div>

        {/* Tab 1: Performance Analytics */}
        {activeTab === 'analytics' && (
          isNaca ? (
            <div className="space-y-8">
              {/* Header Banner for Interactive Disease Surveillance */}
              <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                      <span>Interactive Disease Surveillance - HIV</span>
                      <span className="text-red-500 text-xl">🎗️</span>
                    </h2>
                    <p className="text-xs text-slate-400 font-sans mt-1">
                      Explore data by disease program with real-time visualizations.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-400">Program:</span>
                    <span className="px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-xs font-bold">
                      HIV / ART
                    </span>
                  </div>
                </div>
              </div>

              {/* Main 2-Column Disease Surveillance Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: HIV Trend Analysis Chart */}
                <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-base font-bold text-emerald-400 font-sans">
                          HIV — Trend Analysis
                        </h3>
                        <div className="text-xs text-slate-400 font-mono">Treatment Current</div>
                      </div>
                      <select className="bg-slate-950 text-slate-200 border border-slate-800 rounded-lg text-xs font-mono px-3 py-1.5 focus:outline-none focus:border-emerald-500">
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                      </select>
                    </div>

                    <div className="h-80 w-full pt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={project.chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <defs>
                            <linearGradient id="nacaGreenGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                          <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                          <YAxis 
                            stroke="#64748b" 
                            fontSize={10} 
                            tickLine={false} 
                            domain={[1500000, 1750000]}
                            tickFormatter={(val) => `${(val / 1000000).toFixed(2)}M`}
                          />
                          <Tooltip 
                            formatter={(value: any) => [Number(value).toLocaleString(), 'Treatment Current']}
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981', borderRadius: '12px', fontSize: '12px' }}
                            labelStyle={{ color: '#10b981', fontWeight: 'bold' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#10b981" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#nacaGreenGradient)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Highlights at bottom of chart */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">National Benchmark</span>
                      <span className="text-emerald-400 font-bold">1.74M Target Achieved</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">Ecosystem Coverage</span>
                      <span className="text-white font-bold">36 States + FCT</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Treatment Current Box & Top 10 States & Top 10 LGAs */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Top Right Card: Treatment Current Scoreboard */}
                  <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl text-center sm:text-left shadow-lg">
                    <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-1">
                      TREATMENT CURRENT
                    </div>
                    <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight">
                      1,735,811
                    </div>
                    <div className="text-xs text-slate-400 font-sans mt-2">
                      Active Patients currently receiving antiretroviral therapy (ART) nationwide.
                    </div>
                  </div>

                  {/* Middle Right Card: Top 10 States Bar Chart */}
                  <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                    <h3 className="text-xs font-mono uppercase font-bold text-slate-300 mb-3 tracking-wider">
                      TOP 10 STATES
                    </h3>
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={nacaTopStatesData} margin={{ top: 5, right: 5, left: -20, bottom: 25 }}>
                          <XAxis dataKey="name" stroke="#64748b" fontSize={9} interval={0} angle={-35} textAnchor="end" />
                          <YAxis stroke="#64748b" fontSize={9} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                          <Tooltip 
                            formatter={(v: any) => [Number(v).toLocaleString(), 'Patients']}
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981', borderRadius: '8px', fontSize: '11px' }}
                          />
                          <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Bottom Right Card: Top 10 LGAs Bar Chart */}
                  <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                    <h3 className="text-xs font-mono uppercase font-bold text-slate-300 mb-3 tracking-wider">
                      TOP 10 LGAS
                    </h3>
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={nacaTopLgasData} margin={{ top: 5, right: 5, left: -20, bottom: 25 }}>
                          <XAxis dataKey="name" stroke="#64748b" fontSize={9} interval={0} angle={-35} textAnchor="end" />
                          <YAxis stroke="#64748b" fontSize={9} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                          <Tooltip 
                            formatter={(v: any) => [Number(v).toLocaleString(), 'Patients']}
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981', borderRadius: '8px', fontSize: '11px' }}
                          />
                          <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                </div>

              </div>

              {/* Tech Stack & System Specs */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
                <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                  <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                    Key Strategic Deliverables
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {project.summaryHighlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                  <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>Architecture & Tech Stack</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-xs font-mono font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
          <div className="space-y-8">
            {/* Dedicated WhatsApp Chatbot Spotlight for CSS Dashboard */}
            {isCss && (
              <div className="bg-slate-900/90 border border-emerald-800/60 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-950 text-emerald-400 rounded-2xl border border-emerald-800 shrink-0">
                      <MessageSquareHeart className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold uppercase text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                          Dedicated WhatsApp Chatbot
                        </span>
                        <span className="text-[10px] font-mono text-emerald-300 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          Publicly Accessible To Everyone
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">Public Integrated WhatsApp Chatbot Channel</h3>
                      <p className="text-xs text-slate-300 font-sans mt-1 max-w-3xl leading-relaxed">
                        The CSS Dashboard is paired with a dedicated, universally accessible WhatsApp Chatbot for citizen engagement across all 36 States + FCT. Community members can submit anonymous feedback, report healthcare bottlenecks, track service delivery, and access health rights guidance in real time.
                      </p>
                    </div>
                  </div>
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono flex items-center gap-2 shrink-0 transition-all shadow-lg"
                  >
                    <span>Launch CSS Platform</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {/* Special FMOH National Overview Multi-Disease Grid */}
            {isFmoh && (
              <div className="bg-slate-900/90 border border-cyan-900/50 p-6 rounded-2xl shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      <span className="uppercase tracking-wider font-bold">Nigeria Multi-Disease Situation Room</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">National Multi-Disease Indicators Overview</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Harmonized reporting across HIV, Tuberculosis, Malaria, NCDs, and NTDs (Federal Ministry of Health)
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-cyan-950/80 px-3 py-1.5 rounded-xl border border-cyan-800 text-xs font-mono text-cyan-300">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <span>24.8M MDD FMOH Records Ingested</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  
                  {/* HIV/AIDS Card */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-red-900/40 relative overflow-hidden group hover:border-red-500/50 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono uppercase text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-900/60 font-bold">
                        HIV / AIDS
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">NDARS</span>
                    </div>
                    <div className="text-xl font-extrabold text-white font-mono mt-2">1,735,811</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">Treatment Current</div>
                    <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-2 font-bold">
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                      <span>+6.4% YoY Growth</span>
                    </div>
                  </div>

                  {/* TB Card */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-amber-900/40 relative overflow-hidden group hover:border-amber-500/50 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-900/60 font-bold">
                        Tuberculosis
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">NTBLCP</span>
                    </div>
                    <div className="text-xl font-extrabold text-white font-mono mt-2">406,662</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">TB Notified Cases</div>
                    <div className="text-[10px] text-amber-300 font-mono flex items-center gap-1 mt-2 font-bold">
                      <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      <span>100% Ingested</span>
                    </div>
                  </div>

                  {/* Malaria Card */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-900/60 font-bold">
                        Malaria
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">NHMIS</span>
                    </div>
                    <div className="text-xl font-extrabold text-white font-mono mt-2">33,168,249</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">Confirmed Cases</div>
                    <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-2 font-bold">
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                      <span>+11.0% Seasonal Inflow</span>
                    </div>
                  </div>

                  {/* NCDs Card */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-purple-900/40 relative overflow-hidden group hover:border-purple-500/50 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono uppercase text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-900/60 font-bold">
                        NCDs (New Cases)
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">NHMIS</span>
                    </div>
                    <div className="space-y-1.5 mt-2">
                      <div className="flex justify-between items-center text-[11px] font-mono">
                        <span className="text-slate-300">Diabetes:</span>
                        <span className="text-white font-bold">249,335 <span className="text-emerald-400 text-[10px]">(+9.5%)</span></span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-mono">
                        <span className="text-slate-300">Arthritis:</span>
                        <span className="text-white font-bold">245,066 <span className="text-emerald-400 text-[10px]">(+9.5%)</span></span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-mono">
                        <span className="text-slate-300">Asthma:</span>
                        <span className="text-white font-bold">67,907 <span className="text-cyan-400 text-[10px]">(-25.7%)</span></span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-900">
                        <span>Breast: 7,137 | Cervical: 5,492</span>
                      </div>
                    </div>
                  </div>

                  {/* NTDs Card */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-cyan-900/40 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-900/60 font-bold">
                        NTDs (New Cases)
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">NHMIS</span>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                        <div className="text-[10px] text-slate-400 font-mono">Snake Bites:</div>
                        <div className="text-base font-extrabold text-white font-mono">17,151</div>
                        <div className="text-[9px] text-emerald-400 font-mono">+179.2% Ingested</div>
                      </div>
                      <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                        <div className="text-[10px] text-slate-400 font-mono">Elephantiasis:</div>
                        <div className="text-base font-extrabold text-white font-mono">1,503</div>
                        <div className="text-[9px] text-emerald-400 font-mono">+89.8% YoY Increase</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Chart Area */}
            <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>Operational Data Stream</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {project.chartLabel}
                  </p>
                </div>

                {project.secondaryChartLabel && (
                  <div className="flex items-center space-x-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setActiveChartMetric('main')}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded ${
                        activeChartMetric === 'main' ? 'bg-cyan-900 text-cyan-200 font-bold' : 'text-slate-400'
                      }`}
                    >
                      Volume
                    </button>
                    <button
                      onClick={() => setActiveChartMetric('secondary')}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded ${
                        activeChartMetric === 'secondary' ? 'bg-emerald-900 text-emerald-200 font-bold' : 'text-slate-400'
                      }`}
                    >
                      Rate %
                    </button>
                  </div>
                )}
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {activeChartMetric === 'main' ? (
                    <AreaChart data={project.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                        labelStyle={{ color: '#38bdf8', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#chartGradient)" />
                    </AreaChart>
                  ) : (
                    <BarChart data={project.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                      />
                      <Bar dataKey="secondaryValue" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>

              {/* Summary Bullet Highlights */}
              <div className="mt-6 pt-6 border-t border-slate-800">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Key Strategic Deliverables
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {project.summaryHighlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Tech Stack & System Specs */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Architecture & Tech Stack</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-xs font-mono font-medium hover:border-cyan-800 hover:text-cyan-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  System Specifications
                </h3>
                <dl className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <dt className="text-slate-500">System Code</dt>
                    <dd className="text-white font-bold">{project.code}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <dt className="text-slate-500">Security Standard</dt>
                    <dd className="text-emerald-400 font-semibold">NDPR / HIPAA Encrypted</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <dt className="text-slate-500">Data Pipeline</dt>
                    <dd className="text-cyan-300 font-semibold">Real-Time Sync</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="text-slate-500">Deployment SLA</dt>
                    <dd className="text-white font-bold">99.9% High Availability</dd>
                  </div>
                </dl>
              </div>

            </div>

          </div>
        </div>
        )
      )}

        {/* Tab 2: Milestones & Roadmap */}
        {activeTab === 'milestones' && (
          <div className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-2xl">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>Project Implementation Stepper & Milestones</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-8">
              Chronological milestone tracking from initial stakeholder governance to full live commissioning.
            </p>

            <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 space-y-8">
              {project.milestones.map((m, idx) => (
                <div key={m.id} className="relative pl-6 sm:pl-8 group">
                  
                  {/* Stepper Dot */}
                  <div className={`absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    m.status === 'Completed'
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-400'
                      : m.status === 'In Progress'
                      ? 'bg-amber-950 border-amber-400 text-amber-400 animate-pulse'
                      : 'bg-slate-950 border-slate-700 text-slate-600'
                  }`}>
                    {m.status === 'Completed' && <Check className="w-3 h-3 stroke-[3]" />}
                    {m.status === 'In Progress' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 group-hover:border-slate-700 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
                          {m.quarter}
                        </span>
                        <h4 className="text-sm font-bold text-white">{m.title}</h4>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${
                        m.status === 'Completed'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                          : m.status === 'In Progress'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}>
                        {m.status} {m.dateCompleted && `(${m.dateCompleted})`}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {m.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 3: Core System Modules */}
        {activeTab === 'modules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.modules.map((mod) => (
              <div 
                key={mod.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>{mod.name}</span>
                  </h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                    mod.status === 'Active'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : mod.status === 'Beta'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {mod.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-sans mb-4 leading-relaxed">
                  {mod.description}
                </p>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Module Performance KPI:</span>
                  <span className="text-cyan-300 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-900">
                    {mod.kpi}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Command Telemetry Radar */}
        {activeTab === 'telemetry' && (
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span>Live Command Telemetry Simulator</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Simulated network node diagnostic stream verifying live data pipeline integrity.
                </p>
              </div>

              <button
                onClick={handleTriggerTelemetryPing}
                className="px-3.5 py-2 rounded-xl bg-cyan-950 border border-cyan-800 hover:bg-cyan-900 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 shadow transition-all active:scale-95"
              >
                <Server className="w-4 h-4" />
                <span>Fire Telemetry Ping</span>
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {pings.map((ping) => (
                <div 
                  key={ping.id}
                  className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-fadeIn"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-slate-500">[{ping.time}]</span>
                    <span className="text-white font-bold">{ping.node}</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-slate-400">
                      Latency: <strong className="text-cyan-400">{ping.latency}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-[10px]">
                      {ping.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
