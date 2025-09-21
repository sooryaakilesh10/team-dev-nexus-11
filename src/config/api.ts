// API Configuration
// Change this flag to switch between mock data and real API calls
export const API_CONFIG = {
  // Set to false to use real API endpoints
  useMockData: true,
  
  // Base URL for real API calls
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.yourproductionurl.com' 
    : 'http://localhost:3001/api',
  
  // API version
  version: 'v1',
  
  // Request timeout in milliseconds
  timeout: 10000,
  
  // Default headers for all requests
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
} as const;

// API Endpoints - centralized endpoint definitions
export const API_ENDPOINTS = {
  // Dashboard endpoints
  dashboard: {
    stats: '/dashboard/stats',
    deployments: '/dashboard/deployments',
    teamMetrics: '/dashboard/team-metrics',
  },
  
  // Alerts endpoints
  alerts: {
    list: '/alerts',
    acknowledge: '/alerts/:id/acknowledge',
    resolve: '/alerts/:id/resolve',
    rules: '/alerts/rules',
    stats: '/alerts/stats',
  },
  
  // Analytics endpoints
  analytics: {
    usage: '/analytics/usage',
    performance: '/analytics/performance',
    services: '/analytics/services',
    endpoints: '/analytics/endpoints',
    kpis: '/analytics/kpis',
  },
  
  // API Documentation endpoints
  apiDocs: {
    endpoints: '/docs/endpoints',
    authentication: '/docs/authentication',
    schemas: '/docs/schemas',
  },
  
  // Services endpoints
  services: {
    list: '/services',
    restart: '/services/:name/restart',
    scale: '/services/:name/scale',
    logs: '/services/:name/logs',
  },
  
  // Builds endpoints
  builds: {
    trigger: '/builds/trigger',
    status: '/builds/:id/status',
    logs: '/builds/:id/logs',
  },
  
  // Pull Requests endpoints
  pullRequests: {
    list: '/pull-requests',
    metrics: '/pull-requests/:id/metrics',
    summary: '/pull-requests/:id/summary',
  },
  
  // Configuration endpoints
  config: {
    environment: '/config/:environment',
    logLevel: '/services/:name/log-level',
  },
  
  // Database endpoints
  database: {
    query: '/database/query',
  },
  
  // QA Testing endpoints
  testing: {
    trigger: '/tests/trigger',
    results: '/tests/:id/results',
  },
} as const;