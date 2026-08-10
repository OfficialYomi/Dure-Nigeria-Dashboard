import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SummaryStats } from './components/SummaryStats';
import { FilterBar } from './components/FilterBar';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { LivePortalModal } from './components/LivePortalModal';
import { AddProjectModal } from './components/AddProjectModal';
import { PROJECTS as INITIAL_PROJECTS } from './data/projects';
import { Project, StatusFilter, DomainFilter } from './types';
import { Activity, ShieldCheck, Database, Layers, Sparkles, Monitor, ArrowUpRight, Cpu } from 'lucide-react';
import { generatePdfReport } from './utils/pdfExport';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Filters & Controls
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'completion-desc' | 'completion-asc' | 'name-asc' | 'updated-desc'>('completion-desc');

  // Presentation & Modal States
  const [isTvMode, setIsTvMode] = useState<boolean>(false);
  const [liveDemoProject, setLiveDemoProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Status Filter
      if (statusFilter === 'Live') {
        if (project.status !== 'Live' && project.status !== 'Active' && project.status !== 'In Production') {
          return false;
        }
      } else if (statusFilter === 'Active Sprint') {
        if (project.status !== 'Active Sprint' && project.status !== 'In Progress') {
          return false;
        }
      }
      // Domain Filter
      if (domainFilter !== 'All' && project.domain !== domainFilter) {
        return false;
      }
      // Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = project.name.toLowerCase().includes(query);
        const matchesShortDesc = project.shortDescription.toLowerCase().includes(query);
        const matchesFullDesc = project.fullDescription.toLowerCase().includes(query);
        const matchesCode = project.code.toLowerCase().includes(query);
        const matchesTech = project.techStack.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesShortDesc && !matchesFullDesc && !matchesCode && !matchesTech) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'completion-desc') {
        return b.completionPercentage - a.completionPercentage;
      } else if (sortBy === 'completion-asc') {
        return a.completionPercentage - b.completionPercentage;
      } else if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'updated-desc') {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
      return 0;
    });
  }, [projects, statusFilter, domainFilter, searchQuery, sortBy]);

  const liveCount = projects.filter(p => p.status === 'Live' || p.status === 'Active' || p.status === 'In Production').length;
  const inProgressCount = projects.filter(p => p.status === 'In Progress' || p.status === 'Active Sprint').length;

  const handleAddProject = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const handleExportPortfolio = async () => {
    setIsExportingPdf(true);
    try {
      const elementId = selectedProject ? 'project-detail-report-content' : 'dashboard-report-content';
      await generatePdfReport(selectedProject, elementId);
    } catch (err) {
      console.error("PDF Export error:", err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 transition-all ${
      isTvMode ? 'text-lg' : ''
    }`}>
      
      {/* Background Decorative Mesh Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.12),rgba(255,255,255,0))] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Detail View or Landing Grid View */}
      {selectedProject ? (
        <ProjectDetail
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
          onOpenLiveDemo={(proj) => setLiveDemoProject(proj)}
        />
      ) : (
        <div className="relative z-10 flex flex-col min-h-screen">
          
          {/* Header Bar */}
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            isTvMode={isTvMode}
            setIsTvMode={setIsTvMode}
            onExportPortfolio={handleExportPortfolio}
            isExportingPdf={isExportingPdf}
          />

          {/* Main Dashboard Content Area */}
          <main id="dashboard-report-content" className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* TV Mode Notification Banner */}
            {isTvMode && (
              <div className="mb-6 p-4 rounded-2xl bg-cyan-950/80 border border-cyan-800 text-cyan-200 text-xs font-mono flex items-center justify-between shadow-lg animate-fadeIn">
                <div className="flex items-center space-x-2">
                  <Monitor className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <div>
                    <strong className="text-white">BIG SCREEN PRESENTATION MODE ACTIVE:</strong> Enhanced typography, high contrast telemetry gauges, and expanded card density optimized for client situation room displays.
                  </div>
                </div>
                <button
                  onClick={() => setIsTvMode(false)}
                  className="px-3 py-1 rounded-lg bg-cyan-900 hover:bg-cyan-800 text-white font-bold"
                >
                  Exit TV Mode
                </button>
              </div>
            )}

            {/* High Level KPI Summary Bar */}
            <SummaryStats projects={projects} isTvMode={isTvMode} />

            {/* Interactive Filters & Sort Bar */}
            <FilterBar
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              domainFilter={domainFilter}
              setDomainFilter={setDomainFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalMatches={filteredProjects.length}
              liveCount={liveCount}
              inProgressCount={inProgressCount}
            />

            {/* Project Landing Grid: 4 cards on 1 line on desktop */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={(p) => setSelectedProject(p)}
                    isTvMode={isTvMode}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-12 text-center max-w-lg mx-auto my-12">
                <Database className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No Matching Platforms Found</h3>
                <p className="text-xs text-slate-400 font-mono mb-6">
                  No projects match your current filter query "{searchQuery || statusFilter || domainFilter}".
                </p>
                <button
                  onClick={() => {
                    setStatusFilter('All');
                    setDomainFilter('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-900 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </main>

          {/* Footer Bar */}
          <footer className="mt-16 bg-slate-950/90 border-t border-slate-900 py-6 text-xs font-mono text-slate-500">
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>DURE NIGERIA COMMAND CENTER v3.4.0 • HIGH-AVAILABILITY DATA PLATFORMS</span>
              </div>

              <div className="flex items-center space-x-6 text-[11px] text-slate-500">
                <span>ENCRYPTED TELEMETRY STREAM</span>
                <span>•</span>
                <span>36 STATES COVERAGE</span>
                <span>•</span>
                <span>NATIONAL HEALTH DATA GOVERNANCE</span>
              </div>

            </div>
          </footer>

        </div>
      )}

      {/* Modals */}
      <LivePortalModal
        project={liveDemoProject}
        onClose={() => setLiveDemoProject(null)}
      />

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddProject}
      />

    </div>
  );
}
