import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Monitor, Plus, Download, Search, Tv, Sparkles } from 'lucide-react';
import { SYSTEM_STATS } from '../data/projects';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenAddModal: () => void;
  isTvMode: boolean;
  setIsTvMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onExportPortfolio: () => void;
  isExportingPdf?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenAddModal,
  isTvMode,
  setIsTvMode,
  onExportPortfolio,
  isExportingPdf = false
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          
          {/* Company Brand & Command Center Identifier */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-900 to-emerald-500/20 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5 whitespace-nowrap">
                  <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">DURE NIGERIA</span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/80 uppercase tracking-wider font-semibold">
                    Command Center
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                National Health Data Platforms & Surveillance Matrix
              </p>
            </div>
          </div>

          {/* System Telemetry Clock & Quick Controls */}
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            
            {/* Live Clock Badge */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-mono">
              <Monitor className="w-3.5 h-3.5 text-cyan-400" />
              <span>LIVE CLOCK:</span>
              <span className="text-white font-semibold">{timeStr || '12:00:00 UTC'}</span>
            </div>

            {/* System Status Pill */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SYSTEMS:</span>
              <span className="text-emerald-300 font-bold uppercase tracking-wider">ALL OPERATIONAL</span>
            </div>

            {/* Search Input Quick Field */}
            <div className="relative w-full sm:w-48 md:w-56">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-xs text-slate-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => setIsTvMode(prev => !prev)}
              title={isTvMode ? "Exit Big Screen Presentation Mode" : "Enter Big Screen TV Presentation Mode"}
              className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
                isTvMode
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Tv className="w-4 h-4" />
              <span className="hidden xl:inline">{isTvMode ? "TV Mode Active" : "TV Mode"}</span>
            </button>

            <button
              onClick={onExportPortfolio}
              disabled={isExportingPdf}
              title="Export Current Analytics & Portfolio as PDF Report"
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              {isExportingPdf ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span className="hidden sm:inline text-cyan-300">Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span className="hidden sm:inline font-semibold">Export PDF Report</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenAddModal}
              className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-950/50 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
