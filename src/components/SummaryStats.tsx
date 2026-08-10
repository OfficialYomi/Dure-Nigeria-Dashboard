import React from 'react';
import { Layers, CheckCircle2, Clock, Activity, Users, Database, Shield } from 'lucide-react';
import { Project } from '../types';

interface SummaryStatsProps {
  projects: Project[];
  isTvMode?: boolean;
}

export const SummaryStats: React.FC<SummaryStatsProps> = ({ projects, isTvMode }) => {
  const total = projects.length;
  const deployedCount = projects.filter(p => p.status === 'Live' || p.status === 'Active' || p.status === 'In Production' || p.status === 'Active Sprint').length;
  const activeSprintCount = projects.filter(p => p.status === 'Active Sprint' || p.status === 'In Progress').length;
  const avgCompletion = total > 0 
    ? Math.round(projects.reduce((acc, p) => acc + p.completionPercentage, 0) / total) 
    : 0;

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 ${isTvMode ? 'scale-105 my-4' : ''}`}>
      
      {/* Card 1: Total Portfolio Platforms */}
      <div className="bg-slate-900/80 backdrop-blur border border-slate-800/80 hover:border-slate-700/80 p-4 rounded-xl relative overflow-hidden group transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl -mr-6 -mt-6 group-hover:bg-cyan-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total Platforms</span>
          <div className="p-2 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-white">{total}</span>
          <span className="text-xs text-slate-400 font-mono">Systems Monitored</span>
        </div>
        <div className="mt-2 text-[11px] text-slate-500 font-mono flex items-center gap-1">
          <Database className="w-3 h-3 text-cyan-400" />
          <span>Extensible Registry</span>
        </div>
      </div>

      {/* Card 2: Live Deployments */}
      <div className="bg-slate-900/80 backdrop-blur border border-slate-800/80 hover:border-emerald-900/60 p-4 rounded-xl relative overflow-hidden group transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl -mr-6 -mt-6 group-hover:bg-emerald-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Deployed in Prod</span>
          <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">{deployedCount}</span>
          <span className="text-xs text-slate-400 font-mono">({Math.round((deployedCount/total)*100 || 0)}%)</span>
        </div>
        <div className="mt-2 text-[11px] text-emerald-500/90 font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>All 4 Systems Live & Deployed</span>
        </div>
      </div>

      {/* Card 3: Active Sprint */}
      <div className="bg-slate-900/80 backdrop-blur border border-slate-800/80 hover:border-amber-900/60 p-4 rounded-xl relative overflow-hidden group transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl -mr-6 -mt-6 group-hover:bg-amber-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Active Sprint</span>
          <div className="p-2 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/50">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">{activeSprintCount}</span>
        </div>
        <div className="mt-2 text-[11px] text-amber-500/90 font-mono flex items-center gap-1">
          <Activity className="w-3 h-3 text-amber-400" />
          <span>Deployed with Active Sprint</span>
        </div>
      </div>

      {/* Card 4: Average Completion Rate */}
      <div className="bg-slate-900/80 backdrop-blur border border-slate-800/80 hover:border-blue-900/60 p-4 rounded-xl relative overflow-hidden group transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl -mr-6 -mt-6 group-hover:bg-blue-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Avg Completion</span>
          <div className="p-2 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-800/50">
            <Shield className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-cyan-300">{avgCompletion}%</span>
          <span className="text-xs text-slate-400 font-mono">Portfolio Health</span>
        </div>
        
        {/* Compact Progress Bar */}
        <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-1.5 rounded-full transition-all duration-1000"
            style={{ width: `${avgCompletion}%` }}
          ></div>
        </div>
      </div>

    </div>
  );
};
