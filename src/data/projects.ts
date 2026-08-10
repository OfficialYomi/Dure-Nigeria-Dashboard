import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'naca-command-center',
    code: 'PRJ-NACA-01',
    name: 'NACA Command center',
    shortDescription: 'Integrating surveillance, prevention, treatment, laboratory, logistics, and community data to strengthen program performance, optimize resources, and accelerate progress toward ending AIDS in Nigeria.',
    fullDescription: 'Integrating surveillance, prevention, treatment, laboratory, logistics, and community data to strengthen program performance, optimize resources, and accelerate progress toward ending AIDS in Nigeria.',
    status: 'Live',
    completionPercentage: 100,
    category: 'National Surveillance',
    domain: 'Surveillance',
    iconName: 'ShieldCheck',
    accentColor: 'emerald',
    lastUpdated: new Date().toISOString().split('T')[0],
    version: 'v3.4.0',
    leadAgency: 'National Agency for the Control of AIDS (NACA)',
    targetAudience: 'Federal Ministers, Epidemiologists, State Program Managers, Global Fund Stakeholders',
    liveDemoUrl: 'https://dataeco.naca.gov.ng/',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostGIS', 'DHIS2 API', 'Recharts', 'Tailwind CSS'],
    summaryHighlights: [
      'Multi-source data ingestion pipeline processing 2M+ patient encounters monthly.',
      'Interactive geo-spatial maps highlighting treatment retention rates across 36 states.',
      'Automated early-warning alerts for facility-level ARV medicine stockouts.',
      'Federal executive dashboard tuned for 4K command center display screens.'
    ],
    keyMetrics: [
      { label: 'Treatment Current', value: '1,735,811', change: 'National ART Coverage', trend: 'neutral', description: 'Active patients currently receiving viral suppression therapy' },
      { label: 'Number Of Data Sources', value: '4', change: 'NDARS, ENNRIMS, NHMIS, NDR', trend: 'neutral', description: 'Data sources integrated into the ecosystem dashboard' },
      { label: 'Platform Uptime SLA', value: '99.94%', change: 'Zero critical downtime', trend: 'up', description: '24/7 mission-critical command center availability' },
      { label: 'Data Processing Velocity', value: '< 2.5s', change: 'Real-time sync', trend: 'up', description: 'Average response time for national queries' }
    ],
    modules: [
      { id: 'art-tracker', name: 'ART Coverage & Suppression Tracker', description: 'Tracks the 95-95-95 UNAIDS targets in real time with age/gender disaggregation.', status: 'Active', kpi: '1,735,811 Patients' },
      { id: 'facility-matrix', name: 'Facility Readiness & Sentinel Radar', description: 'Monitors clinical staffing, testing kit availability, and laboratory equipment calibration.', status: 'Active', kpi: '4 Data Sources Synced' },
      { id: 'supply-radar', name: 'National Stockout Risk Matrix', description: 'Predictive inventory tracker alerting warehouses 60 days before critical drug buffer depletion.', status: 'Active', kpi: '0% Critical Stockouts' },
      { id: 'executive-brief', name: 'Automated Briefing Generator', description: 'Generates one-click PDF executive policy digests for federal committee hearings.', status: 'Active', kpi: 'Weekly Automated Reports' }
    ],
    milestones: [
      { id: 'm1', quarter: 'Q1 2024', title: 'Data Architecture & Security Approval', description: 'Finalized federal data governance policy, HIPAA/NDPR encryption standards, and database architecture.', status: 'Completed', dateCompleted: 'Jan 2024' },
      { id: 'm2', quarter: 'Q2 2024', title: 'DHIS2 & Legacy Database Pipeline', description: 'Integrated legacy EMR systems and national DHIS2 API data connectors across geopolitical zones.', status: 'Completed', dateCompleted: 'May 2024' },
      { id: 'm3', quarter: 'Q3 2024', title: 'Six-Zone Pilot & Command Room Setup', description: 'Deployed pilot hardware in 6 regional centers with live video-wall data visualization dashboards.', status: 'Completed', dateCompleted: 'Aug 2024' },
      { id: 'm4', quarter: 'Q4 2024', title: 'Full National Commissioning & Live Rollout', description: 'Officially launched by Federal Health Leadership as the official national HIV surveillance cockpit.', status: 'Completed', dateCompleted: 'Nov 2024' }
    ],
    chartLabel: 'Monthly Treatment Current (HIV ART Patients)',
    secondaryChartLabel: 'Viral Load Suppression Rate (%)',
    chartData: [
      { month: 'Jan', value: 1550000, secondaryValue: 88.5 },
      { month: 'Feb', value: 1610000, secondaryValue: 89.2 },
      { month: 'Mar', value: 1640000, secondaryValue: 89.8 },
      { month: 'Apr', value: 1680000, secondaryValue: 90.4 },
      { month: 'May', value: 1670000, secondaryValue: 91.1 },
      { month: 'Jun', value: 1660000, secondaryValue: 92.0 },
      { month: 'Jul', value: 1720000, secondaryValue: 93.2 },
      { month: 'Aug', value: 1728000, secondaryValue: 93.8 },
      { month: 'Sep', value: 1731000, secondaryValue: 94.0 },
      { month: 'Oct', value: 1733000, secondaryValue: 94.1 },
      { month: 'Nov', value: 1734500, secondaryValue: 94.2 },
      { month: 'Dec', value: 1735811, secondaryValue: 94.5 }
    ]
  },
  {
    id: 'multi-disease-dashboard',
    code: 'PRJ-MDD-02',
    name: 'FMOH Multi disease Platform',
    shortDescription: 'Nigeria Multi-Disease Situation Room — Harmonized national surveillance across HIV, TB, Malaria, NCDs, NTDs, and Community-Led Monitoring.',
    fullDescription: 'Nigeria Multi-Disease Situation Room (Federal Ministry of Health and Social Welfare). Harmonized national surveillance across HIV, TB, Malaria, NCDs, NTDs, and Community-Led Monitoring — powering early warning and rapid outbreak response across Nigeria.',
    status: 'Live',
    completionPercentage: 95,
    category: 'Epidemic Intelligence',
    domain: 'Surveillance',
    iconName: 'Activity',
    accentColor: 'cyan',
    lastUpdated: new Date().toISOString().split('T')[0],
    version: 'v2.9.0',
    leadAgency: 'Department of Public Health, Federal Ministry of Health and Social Welfare',
    targetAudience: 'State DPH, State Ministry of Health',
    liveDemoUrl: 'https://mdd.health.gov.ng/nigeria_dashboard/',
    techStack: ['React', 'Python', 'TypeScript', 'PowerBI', 'PostgreSQL', 'AWS Server', 'Tailwind CSS'],
    summaryHighlights: [
      'Harmonized national surveillance across HIV, TB, Malaria, NCDs, NTDs, and Community-Led Monitoring.',
      'Already deployed in 5 states (Abia, Kano, Rivers, Lagos, Bauchi).',
      'Deployment to 11 states (ongoing).',
      'Synchronized telemetry with NACA Data Ecosystem, NDARS, and NHMIS.'
    ],
    keyMetrics: [
      { label: 'Coordinating Body', value: 'FMOH DPH', change: 'Dept of Public Health', trend: 'neutral', description: 'Department of Public Health, Federal Ministry of Health and Social Welfare' },
      { label: 'Target Deployment', value: 'State DPH & MOH', change: '36 States Target', trend: 'neutral', description: 'State DPH, State Ministry of Health' },
      { label: 'Records Ingested', value: '24.8M Records', change: '+1.2M this month', trend: 'up', description: 'MDD FMOH records' },
      { label: 'Deployment Footprint', value: '5 States Active', change: '11 States Ongoing', trend: 'up', description: 'Deployed in Abia, Kano, Rivers, Lagos, Bauchi' }
    ],
    modules: [
      { id: 'situation-room', name: 'Nigeria Multi-Disease Situation Room', description: 'Harmonized national surveillance across HIV, TB, Malaria, NCDs, NTDs, and CLM.', status: 'Active', kpi: '24.8M Records Ingested' },
      { id: 'tri-sync', name: 'Tri-System Sync Gateway (NACA, NDARS, NHMIS)', description: 'Real-time telemetry data pipelines feeding national outbreak intelligence.', status: 'Active', kpi: 'Synchronized (18ms Latency)' },
      { id: 'early-warning', name: 'Outbreak Early Warning & Predictive Signals', description: 'Automated statistical anomaly detection engine for early outbreak containment.', status: 'Active', kpi: '98.4% Signal Accuracy' },
      { id: 'state-rollout', name: 'State DPH Expansion Engine', description: 'Command center setup and training for State Ministries of Health.', status: 'Active', kpi: '5 Deployed / 11 Ongoing' }
    ],
    milestones: [
      { id: 'm1', quarter: 'Q1 2025', title: 'Multi-Program Schema Standardization & National Approval', description: 'Harmonized data schemas across HIV, TB, Malaria, NCDs, and NTDs vertical frameworks under the Federal Ministry of Health.', status: 'Completed', dateCompleted: 'Feb 2025' },
      { id: 'm2', quarter: 'Q2 2025', title: '5-State Initial Deployment (Abia, Kano, Rivers, Lagos, Bauchi)', description: 'Successfully deployed Situation Room dashboards & command nodes in Abia, Kano, Rivers, Lagos, and Bauchi State Ministries of Health.', status: 'Completed', dateCompleted: 'May 2025' },
      { id: 'm3', quarter: 'Q3 2025', title: 'Tri-System Sync Engine (NACA, NDARS, NHMIS)', description: 'Established automated high-throughput API ingestion pipelines connecting NACA Data Ecosystem, NDARS, and NHMIS into 24.8M MDD FMOH record repository.', status: 'Completed', dateCompleted: 'Aug 2025' },
      { id: 'm4', quarter: 'Q4 2025', title: 'Predictive Analytics & Community-Led Monitoring (CLM) Ingestion', description: 'Launched predictive epidemic surge models, early-warning outbreak signal detectors, and CLM feedback loops.', status: 'Completed', dateCompleted: 'Nov 2025' },
      { id: 'm5', quarter: 'Q1 2026', title: 'Deployment to 11 States (Ongoing)', description: 'Expanding state-level DPH deployment and Situation Room setup across 11 additional State Ministries of Health.', status: 'In Progress' }
    ],
    chartLabel: 'Weekly Ingested MDD FMOH Records (Millions)',
    secondaryChartLabel: 'System Sync Accuracy (%)',
    chartData: [
      { month: 'Wk 1', value: 21.2, secondaryValue: 98.2 },
      { month: 'Wk 2', value: 21.8, secondaryValue: 98.6 },
      { month: 'Wk 3', value: 22.4, secondaryValue: 98.9 },
      { month: 'Wk 4', value: 23.0, secondaryValue: 99.1 },
      { month: 'Wk 5', value: 23.6, secondaryValue: 99.3 },
      { month: 'Wk 6', value: 24.1, secondaryValue: 99.5 },
      { month: 'Wk 7', value: 24.5, secondaryValue: 99.7 },
      { month: 'Wk 8', value: 24.8, secondaryValue: 99.9 }
    ]
  },
  {
    id: 'css-survey-app',
    code: 'PRJ-CSS-03',
    name: 'CSS Dashboard',
    shortDescription: 'Nigeria Integrated CLM Platform — Real-Time TB, HIV & Malaria Insights for 36 States + FCT.',
    fullDescription: 'Nigeria Integrated Community Systems Strengthening & Community-Led Monitoring (CLM) Dashboard. Empowering communities with real-time TB, HIV, and Malaria insights. Integrated dashboard strengthening communities through data-driven action, monitoring disease trends, detecting hotspots, and generating predictive insights for health workers, civil society organizations, national programs, and policymakers across Nigeria. Includes a dedicated WhatsApp chatbot accessible to everyone.',
    status: 'Active Sprint',
    completionPercentage: 92,
    category: 'Quality of Care',
    domain: 'Health Platforms',
    iconName: 'MessageSquareHeart',
    accentColor: 'amber',
    lastUpdated: new Date().toISOString().split('T')[0],
    version: 'v2.1.0',
    leadAgency: 'ACCOMIN, TB Network, NEPWHAN',
    targetAudience: '36 States + FCT, All Communities',
    liveDemoUrl: 'https://apps.duredemos.com/demos/ntblcp/',
    techStack: ['React', 'Python', 'TypeScript', 'PowerBI', 'PostgreSQL', 'AWS Server', 'Tailwind CSS'],
    summaryHighlights: [
      'Nigeria Integrated Community Systems Strengthening (CSS) & Community-Led Monitoring (CLM) Platform.',
      'Coordinating bodies: ACCOMIN, TB Network, and NEPWHAN.',
      'Dedicated WhatsApp Chatbot integrated and publicly accessible to everyone.',
      'Implementation ongoing in 13 states with coverage target across 36 States + FCT and all communities.'
    ],
    keyMetrics: [
      { label: 'Coordinating Body', value: 'ACCOMIN, TB Network, NEPWHAN', change: '3 Lead CSOs', trend: 'neutral', description: 'Coordinating bodies: ACCOMIN, TB Network, and NEPWHAN' },
      { label: 'Target Deployment', value: '36 States + FCT', change: 'All Communities', trend: 'neutral', description: '36 states + FCT, all communities' },
      { label: 'Community Responses Logged', value: '710,000+', change: '+24K this month', trend: 'up', description: 'CSS Dashboard' },
      { label: 'Disease Areas Reporting', value: '3', change: 'HIV, TB, Malaria', trend: 'up', description: 'Reporting across HIV, TB, and Malaria' }
    ],
    modules: [],
    milestones: [
      { id: 'm1', quarter: 'Q1 2026', title: 'Integrated CLM Data Schema & Core Platform', description: 'Established harmonized CLM data schemas across HIV, TB, and Malaria civil society reporting networks.', status: 'Completed', dateCompleted: 'Jan 2026' },
      { id: 'm2', quarter: 'Q1 2026', title: 'Public WhatsApp Chatbot Launch', description: 'Launched dedicated WhatsApp chatbot for community members to report issues and access rights education.', status: 'Completed', dateCompleted: 'Feb 2026' },
      { id: 'm3', quarter: 'Q1 2026', title: 'National CLM Dashboard Deployment', description: 'Deploys centralized real-time analytics portal for ACCOMIN, TB Network, and NEPWHAN leadership.', status: 'Completed', dateCompleted: 'Mar 2026' },
      { id: 'm4', quarter: 'Q3 2026', title: '13-State Rollout & Field Implementation (Ongoing)', description: 'Implementing community-led monitoring nodes in 13 states, targeted completion by August 2026.', status: 'In Progress' }
    ],
    chartLabel: 'Monthly CLM Community Reports Ingested',
    secondaryChartLabel: 'Response Validation Rate (%)',
    chartData: [
      { month: 'Oct', value: 72000, secondaryValue: 96.4 },
      { month: 'Nov', value: 81000, secondaryValue: 97.1 },
      { month: 'Dec', value: 89000, secondaryValue: 97.5 },
      { month: 'Jan', value: 95000, secondaryValue: 98.0 },
      { month: 'Feb', value: 104000, secondaryValue: 98.4 },
      { month: 'Mar', value: 112000, secondaryValue: 98.8 },
      { month: 'Apr', value: 121000, secondaryValue: 99.2 }
    ]
  },
  {
    id: 'one-impact-app',
    code: 'PRJ-ONEMPACT-04',
    name: 'One Impact App',
    shortDescription: 'Mobile & web application for community-level Tuberculosis (TB) impact tracking, patient rights education, and stigma reporting.',
    fullDescription: 'Groundbreaking mobile and web platform empowering individuals affected by Tuberculosis (TB) across Nigeria. Managed in-country by the TB Network (Civil Society Organization) and coordinated with NTBLCP, the platform enables community members to locate nearby free care clinics, report care access barriers and stigma, access verified rights education, and participate in community-led monitoring (CLM) of TB health service delivery.',
    status: 'Live',
    completionPercentage: 96,
    category: 'Community Empowerment',
    domain: 'Community',
    iconName: 'Smartphone',
    accentColor: 'indigo',
    lastUpdated: new Date().toISOString().split('T')[0],
    version: 'v4.1.2',
    leadAgency: 'NTBLCP & TB Network (Civil Society Organization)',
    targetAudience: 'TB Patients, Community Advocates, TB Network CBO Officers, Health Rights Monitors',
    liveDemoUrl: 'https://play.google.com/store/apps/details?id=com.duretechnologies.apps.android.oneimpactnigeria&hl=en',
    techStack: ['React Native', 'React Web', 'TypeScript', 'Express', 'MongoDB', 'Tailwind CSS', 'Mapbox'],
    summaryHighlights: [
      'Empowering 88,000+ active mobile app users with Tuberculosis rights-based health tools.',
      'In-country community monitoring managed by the TB Network (Civil Society Organization).',
      'Coordinated with NTBLCP for national Tuberculosis program performance alignment.',
      'Geolocated directory of 3,100+ verified free TB diagnosis and DOTS treatment facilities.'
    ],
    keyMetrics: [
      { label: 'In-Country Managing CSO', value: 'TB Network', change: 'Civil Society Organization', trend: 'neutral', description: 'Lead CSO managing community interventions & response' },
      { label: 'National Coordinating Body', value: 'NTBLCP', change: 'Federal Ministry of Health', trend: 'neutral', description: 'National TB, Leprosy & Buruli Ulcer Control Programme' },
      { label: 'Active Mobile Downloads', value: '88,400+', change: '+18% active user base', trend: 'up', description: 'Verified Play Store & iOS app installations' },
      { label: 'Barriers Reported & Resolved', value: '14,280', change: '89.4% Resolution Rate', trend: 'up', description: 'Community care barriers and stigma reports handled' }
    ],
    modules: [
      { id: 'barrier-reporter', name: 'Anonymous Service Barrier Reporter', description: 'Structured photo/text submission flow for reporting clinic supply stockouts or stigma.', status: 'Active', kpi: '14.2K Reports Handled' },
      { id: 'clinic-locator', name: 'Verified Free Clinic Finder', description: 'GPS-guided interactive map showing nearest DOTS treatment points with open hours and stock status.', status: 'Active', kpi: '3,100 Clinics Listed' },
      { id: 'rights-library', name: 'Interactive Patient Rights Charter', description: 'Bite-sized visual and audio guides explaining legal health rights and patient protections.', status: 'Active', kpi: '4 Languages Available' },
      { id: 'cbo-gateway', name: 'Community Response Case Management', description: 'Dashboard for community advocates to assign case officers and verify clinic resolutions.', status: 'Active', kpi: '89.4% Resolution Speed' }
    ],
    milestones: [
      { id: 'm1', quarter: 'Q1 2024', title: 'Community Co-Design & Human Rights Framework', description: 'Conducted 14 focus groups with TB survivors to establish trauma-informed UX guidelines.', status: 'Completed', dateCompleted: 'Feb 2024' },
      { id: 'm2', quarter: 'Q2 2024', title: 'Android & Cross-Platform Web Release', description: 'Published native mobile and web app with lightweight low-bandwidth data mode.', status: 'Completed', dateCompleted: 'Jun 2024' },
      { id: 'm3', quarter: 'Q3 2024', title: 'CBO Escalation Portal & SMS Gateway Integration', description: 'Connected app to SMS gateway enabling feature-phone users to submit reports via shortcodes.', status: 'Completed', dateCompleted: 'Sep 2024' },
      { id: 'm4', quarter: 'Q4 2024', title: 'Global Fund Recognition & Expansion', description: 'Featured as international best practice model for Community-Led Health Monitoring.', status: 'Completed', dateCompleted: 'Nov 2024' }
    ],
    chartLabel: 'Monthly Active Mobile Users',
    secondaryChartLabel: 'Barriers Successfully Resolved',
    chartData: [
      { month: 'Jan', value: 42000, secondaryValue: 820 },
      { month: 'Feb', value: 46500, secondaryValue: 910 },
      { month: 'Mar', value: 44200, secondaryValue: 880 },
      { month: 'Apr', value: 51800, secondaryValue: 1050 },
      { month: 'May', value: 49500, secondaryValue: 1010 },
      { month: 'Jun', value: 58200, secondaryValue: 1220 },
      { month: 'Jul', value: 55400, secondaryValue: 1150 },
      { month: 'Aug', value: 63100, secondaryValue: 1380 },
      { month: 'Sep', value: 60800, secondaryValue: 1310 },
      { month: 'Oct', value: 67400, secondaryValue: 1490 },
      { month: 'Nov', value: 65100, secondaryValue: 1420 },
      { month: 'Dec', value: 72500, secondaryValue: 1610 }
    ]
  }
];

export const SYSTEM_STATS = {
  totalProjects: PROJECTS.length,
  liveProjects: PROJECTS.filter(p => p.status === 'Live').length,
  inProgressProjects: PROJECTS.filter(p => p.status === 'In Progress').length,
  averageCompletion: Math.round(PROJECTS.reduce((acc, p) => acc + p.completionPercentage, 0) / PROJECTS.length),
  totalActivePatients: '2.35M+',
  healthFacilitiesConnected: '3,800+',
  systemUptime: '99.96%',
  dataStreamsIngested: '28.4M/mo'
};
