import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  MessageSquareHeart, 
  Smartphone, 
  Truck, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Globe, 
  ArrowUpRight,
  ExternalLink,
  Database
} from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  isTvMode?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, isTvMode }) => {

  // Dynamic Lucide icon getter
  const renderIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-cyan-400" />;
      case 'MessageSquareHeart': return <MessageSquareHeart className="w-5 h-5 text-amber-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-indigo-400" />;
      case 'Truck': return <Truck className="w-5 h-5 text-amber-400" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-emerald-400" />;
      default: return <Globe className="w-5 h-5 text-cyan-400" />;
    }
  };

  const isLive = project.status === 'Live';
  
  // Circular progress ring math
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (project.completionPercentage / 100) * circumference;

  return (
    <div
      onClick={() => onSelect(project)}
      className={`group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.18)] hover:-translate-y-1 overflow-hidden ${
        isTvMode ? 'p-6 scale-[1.02]' : ''
      }`}
    >
      {/* Background Subtle Gradient Glow */}
      <div 
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-all group-hover:scale-150 ${
          isLive ? 'bg-emerald-500/10 group-hover:bg-emerald-500/20' : 'bg-amber-500/10 group-hover:bg-amber-500/20'
        }`}
      />

      {/* Grid Pattern Motif Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-15 group-hover:opacity-25 pointer-events-none" />

      <div>
        {/* Top Bar: Code & Status Badge */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
              {project.code}
            </span>
            <span className="text-[11px] font-mono text-cyan-400/90 font-medium px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900/60">
              {project.domain}
            </span>
          </div>

          {/* Status Badge */}
          <div 
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border shadow-sm ${
              isLive || project.status === 'Active' || project.status === 'In Production'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80 shadow-emerald-950/50'
                : project.status === 'Active Sprint'
                ? 'bg-emerald-950/90 text-amber-300 border-amber-800/80 shadow-amber-950/50'
                : 'bg-amber-950/80 text-amber-300 border-amber-800/80 shadow-amber-950/50'
            }`}
          >
            {isLive || project.status === 'Active' || project.status === 'In Production' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{project.status}</span>
              </>
            ) : project.status === 'Active Sprint' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Sprint</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>{project.status}</span>
              </>
            )}
          </div>

        </div>

        {/* Project Name & Domain Icon Header */}
        <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
              <span>{project.name}</span>
            </h2>
            <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed font-sans">
              {project.shortDescription}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/40 transition-colors shrink-0 shadow-inner">
            {renderIcon(project.iconName)}
          </div>
        </div>

        {/* Key Highlight Metric Badge */}
        {project.keyMetrics && project.keyMetrics[0] && (
          <div className="my-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs font-mono relative z-10">
            <span className="text-slate-400 truncate pr-2">{project.keyMetrics[0].label}:</span>
            <span className="text-emerald-400 font-bold font-mono text-sm whitespace-nowrap">
              {project.keyMetrics[0].value}
            </span>
          </div>
        )}

      </div>

      {/* Bottom Section: Completion Percentage Indicator & Action Arrow */}
      <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between relative z-10">
        
        {/* Progress Gauge */}
        <div className="flex items-center space-x-3">
          
          {/* SVG Circular Ring */}
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            <svg className="w-14 h-14 transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r={radius}
                className={`transition-all duration-1000 ease-out ${
                  isLive ? 'stroke-emerald-400' : 'stroke-amber-400'
                }`}
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[11px] font-bold font-mono text-white">
              {project.completionPercentage}%
            </span>
          </div>

          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Completion</div>
            <div className="text-xs font-semibold text-slate-200">
              {isLive ? 'Full Operations' : `${project.modules.length} Modules in Dev`}
            </div>
          </div>

        </div>

        {/* Action Buttons: Live Link & Inspect Details */}
        <div className="flex items-center gap-2">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 hover:text-emerald-100 border border-emerald-800/80 text-xs font-mono font-semibold flex items-center gap-1 transition-all shadow-sm active:scale-95 z-20"
              title={`Open ${project.name} live platform in a new tab`}
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          )}

          <div className="flex items-center gap-1 text-xs font-mono text-cyan-400 group-hover:text-cyan-300 transition-all">
            <span className="hidden sm:inline font-semibold">Inspect</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:text-cyan-200" />
          </div>
        </div>

      </div>

    </div>
  );
};
