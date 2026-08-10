import React from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, Tag } from 'lucide-react';
import { StatusFilter, DomainFilter } from '../types';

interface FilterBarProps {
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
  domainFilter: DomainFilter;
  setDomainFilter: (domain: DomainFilter) => void;
  sortBy: 'completion-desc' | 'completion-asc' | 'name-asc' | 'updated-desc';
  setSortBy: (sort: 'completion-desc' | 'completion-asc' | 'name-asc' | 'updated-desc') => void;
  totalMatches: number;
  liveCount: number;
  inProgressCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  statusFilter,
  setStatusFilter,
  domainFilter,
  setDomainFilter,
  sortBy,
  setSortBy,
  totalMatches,
  liveCount,
  inProgressCount,
}) => {
  const domains: DomainFilter[] = ['All', 'Surveillance', 'Health Platforms', 'Community'];

  return (
    <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 mb-8 backdrop-blur-md shadow-xl transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800/80 w-fit">
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              statusFilter === 'All'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>All Projects</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-slate-800 text-slate-300 font-bold">
              {liveCount + inProgressCount}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('Live')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              statusFilter === 'Live'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live / Prod</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-800/60">
              {liveCount}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('Active Sprint')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              statusFilter === 'Active Sprint'
                ? 'bg-amber-950 text-amber-300 border border-amber-800/80 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Active Sprint</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-amber-950 text-amber-300 font-bold border border-amber-800/60">
              {inProgressCount}
            </span>
          </button>
        </div>

        {/* Domain Filters & Sort Control */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Domain Dropdown / Pills */}
          <div className="flex items-center space-x-2">
            <Tag className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">Domain:</span>
            <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0 max-w-full">
              {domains.map((dom) => (
                <button
                  key={dom}
                  onClick={() => setDomainFilter(dom)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all ${
                    domainFilter === dom
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-800/60 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden md:block"></div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 ml-auto lg:ml-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono py-1.5 px-2.5 rounded-lg focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="completion-desc">Highest Completion %</option>
              <option value="completion-asc">Lowest Completion %</option>
              <option value="name-asc">Project Name (A-Z)</option>
              <option value="updated-desc">Recently Updated</option>
            </select>
          </div>

        </div>

      </div>

      {/* Matching Count Notification */}
      <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <Filter className="w-3 h-3 text-cyan-400" />
          Showing <strong className="text-white">{totalMatches}</strong> matching platforms
        </span>
        <span className="text-slate-500 hidden sm:inline">Click any card to inspect system telemetry & roadmap</span>
      </div>

    </div>
  );
};
