import React, { useState } from 'react';
import { X, Plus, ShieldCheck, Activity, Smartphone, Truck, Globe } from 'lucide-react';
import { Project, ProjectStatus } from '../types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (newProject: Project) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('In Progress');
  const [completionPercentage, setCompletionPercentage] = useState<number>(75);
  const [domain, setDomain] = useState<string>('Surveillance');
  const [category, setCategory] = useState<string>('Public Health');
  const [iconName, setIconName] = useState<string>('Activity');
  const [leadAgency, setLeadAgency] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [metricLabel, setMetricLabel] = useState('Monitored Facilities');
  const [metricValue, setMetricValue] = useState('500+');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !shortDescription.trim()) return;

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const code = `PRJ-${id.substring(0, 6).toUpperCase()}`;

    const newProj: Project = {
      id,
      code,
      name,
      shortDescription,
      fullDescription: fullDescription || shortDescription,
      status,
      completionPercentage,
      category,
      domain,
      iconName,
      accentColor: status === 'Live' ? 'emerald' : 'amber',
      lastUpdated: new Date().toISOString().split('T')[0],
      version: 'v1.0.0',
      leadAgency: leadAgency || 'Ministry of Health & Tech Partners',
      targetAudience: 'Health Care Workers & Program Managers',
      liveDemoUrl: liveDemoUrl.trim() || 'https://duretechnologies.com',
      summaryHighlights: [
        'Structured modular health platform added to portfolio.',
        'Supports real-time data ingestion and indicator analytics.'
      ],
      keyMetrics: [
        { label: metricLabel, value: metricValue, change: 'Newly Deployed', trend: 'up' },
        { label: 'Target Completion', value: `${completionPercentage}%`, change: 'On Track', trend: 'neutral' }
      ],
      modules: [
        { id: 'm-1', name: 'Core Indicator Tracker', description: 'Real-time telemetry ingestion module.', status: 'Active', kpi: 'Operational' }
      ],
      milestones: [
        { id: 'ms-1', quarter: 'Q3 2026', title: 'System Architecture & Setup', description: 'Initial schema initialization and stakeholder approval.', status: 'Completed', dateCompleted: 'Aug 2026' },
        { id: 'ms-2', quarter: 'Q4 2026', title: 'Live Field Deployment', description: 'Full regional rollout.', status: status === 'Live' ? 'Completed' : 'In Progress' }
      ],
      chartLabel: 'Monthly Operational Activity',
      chartData: [
        { month: 'May', value: 120, secondaryValue: 70 },
        { month: 'Jun', value: 240, secondaryValue: 80 },
        { month: 'Jul', value: 380, secondaryValue: 88 },
        { month: 'Aug', value: 500, secondaryValue: 92 }
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js']
    };

    onAddProject(newProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Add New Health Tech Platform</h3>
              <p className="text-xs text-slate-400 font-mono">Extend structured portfolio data dynamically</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs font-mono">
          
          <div>
            <label className="block text-slate-400 mb-1">Project Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Immunization Cold Chain Monitor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">One-Line Short Description *</label>
            <input
              type="text"
              required
              placeholder="e.g. Real-time temperature and buffer stock monitoring for primary vaccines."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Live Platform Website URL (Opens in New Tab)</label>
            <input
              type="url"
              placeholder="e.g. https://duretechnologies.com/solutions"
              value={liveDemoUrl}
              onChange={(e) => setLiveDemoUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
              >
                <option value="Live">Live (Green Badge)</option>
                <option value="In Progress">In Progress (Amber Badge)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Completion Percentage ({completionPercentage}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={completionPercentage}
                onChange={(e) => setCompletionPercentage(Number(e.target.value))}
                className="w-full accent-cyan-500 mt-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Domain</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
              >
                <option value="Surveillance">Surveillance</option>
                <option value="Health Platforms">Health Platforms</option>
                <option value="Community">Community</option>
                <option value="Logistics">Logistics</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Domain Icon</label>
              <select
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
              >
                <option value="ShieldCheck">ShieldCheck (Security/Health)</option>
                <option value="Activity">Activity (Surveillance/Pulse)</option>
                <option value="MessageSquareHeart">MessageSquareHeart (Patient Feedback)</option>
                <option value="Smartphone">Smartphone (Mobile App)</option>
                <option value="Truck">Truck (Logistics)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Key Metric Label</label>
              <input
                type="text"
                placeholder="e.g. Active Facilities"
                value={metricLabel}
                onChange={(e) => setMetricLabel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Key Metric Value</label>
              <input
                type="text"
                placeholder="e.g. 1,250 Centers"
                value={metricValue}
                onChange={(e) => setMetricValue(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md"
            >
              Add Platform to Portfolio
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
