export type ProjectStatus = 'Live' | 'In Progress' | 'Active' | 'In Production' | 'Active Sprint';

export interface Milestone {
  id: string;
  quarter: string;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  dateCompleted?: string;
}

export interface Metric {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
}

export interface ProjectModule {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Beta' | 'In Development';
  kpi: string;
}

export interface ChartDataPoint {
  month: string;
  value: number;
  target?: number;
  secondaryValue?: number;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  status: ProjectStatus;
  completionPercentage: number;
  category: string;
  domain: string;
  iconName: string;
  accentColor: string; // e.g. 'emerald' | 'amber' | 'cyan' | 'indigo'
  lastUpdated: string;
  version: string;
  leadAgency?: string;
  targetAudience: string;
  keyMetrics: Metric[];
  modules: ProjectModule[];
  milestones: Milestone[];
  chartData: ChartDataPoint[];
  chartLabel: string;
  secondaryChartLabel?: string;
  techStack: string[];
  liveDemoUrl?: string;
  summaryHighlights: string[];
}

export type StatusFilter = 'All' | 'Live' | 'Active Sprint';
export type DomainFilter = 'All' | 'Surveillance' | 'Health Platforms' | 'Community';
