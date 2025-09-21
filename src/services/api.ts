// API Service Layer - All API calls centralized here
// This is the main interface between components and the API/mock data
import { apiClient, replacePathParams, type ApiResponse } from './apiClient';
import { API_ENDPOINTS } from '@/config/api';

// Dashboard API
export const dashboardApi = {
  getStats: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.dashboard.stats);
  },

  getRecentDeployments: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.dashboard.deployments);
  },

  getTeamMetrics: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.dashboard.teamMetrics);
  },
};

// Alerts API
export const alertsApi = {
  getAlerts: (filters?: { severity?: string; status?: string; search?: string }): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.alerts.list, filters);
  },

  acknowledgeAlert: (alertId: string): Promise<ApiResponse> => {
    const endpoint = replacePathParams(API_ENDPOINTS.alerts.acknowledge, { id: alertId });
    return apiClient.post(endpoint);
  },

  resolveAlert: (alertId: string): Promise<ApiResponse> => {
    const endpoint = replacePathParams(API_ENDPOINTS.alerts.resolve, { id: alertId });
    return apiClient.post(endpoint);
  },

  getAlertRules: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.alerts.rules);
  },

  getAlertStats: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.alerts.stats);
  },
};

// Analytics API
export const analyticsApi = {
  getUsageData: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.analytics.usage);
  },

  getPerformanceData: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.analytics.performance);
  },

  getServiceUsage: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.analytics.services);
  },

  getTopEndpoints: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.analytics.endpoints);
  },

  getKPIMetrics: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.analytics.kpis);
  },
};

// API Documentation API
export const apiDocsApi = {
  getApiEndpoints: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.apiDocs.endpoints);
  },

  getAuthenticationMethods: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.apiDocs.authentication);
  },

  getSchemas: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.apiDocs.schemas);
  },
};

// Services API
export const servicesApi = {
  getServices: (filters?: { environment?: string; status?: string }): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.services.list, filters);
  },

  restartService: (serviceName: string, environment: string): Promise<ApiResponse> => {
    const endpoint = replacePathParams(API_ENDPOINTS.services.restart, { name: serviceName });
    return apiClient.post(endpoint, { environment });
  },

  scaleService: (serviceName: string, replicas: number, environment: string): Promise<ApiResponse> => {
    const endpoint = replacePathParams(API_ENDPOINTS.services.scale, { name: serviceName });
    return apiClient.put(endpoint, { replicas, environment });
  },

  getServiceLogs: (serviceName: string, options?: { follow?: boolean; lines?: number }): Promise<ApiResponse> => {
    const endpoint = replacePathParams(API_ENDPOINTS.services.logs, { name: serviceName });
    return apiClient.get(endpoint, options);
  },
};

// Builds API
export const buildsApi = {
  triggerBuild: (buildData: { service: string; type: string; environment?: string }): Promise<ApiResponse> => {
    return apiClient.post(API_ENDPOINTS.builds.trigger, buildData);
  },

  getBuildStatus: (buildId: string): Promise<ApiResponse> => {
    const endpoint = replacePathParams(API_ENDPOINTS.builds.status, { id: buildId });
    return apiClient.get(endpoint);
  },

  getBuildLogs: (buildId: string, follow?: boolean): Promise<ApiResponse> => {
    const endpoint = replacePathParams(API_ENDPOINTS.builds.logs, { id: buildId });
    return apiClient.get(endpoint, { follow });
  },
};

// Pull Requests API
export const pullRequestsApi = {
  getPullRequests: (filters?: { status?: string; author?: string; repository?: string; limit?: number }): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.pullRequests.list, filters);
  },

  getPRMetrics: (prId: string): Promise<ApiResponse> => {
    const endpoint = replacePathParams(API_ENDPOINTS.pullRequests.metrics, { id: prId });
    return apiClient.get(endpoint);
  },

  generatePRSummary: (prId: string, includeComments?: boolean): Promise<ApiResponse> => {
    const endpoint = replacePathParams(API_ENDPOINTS.pullRequests.summary, { id: prId });
    return apiClient.post(endpoint, { includeComments });
  },
};

// Configuration API
export const configApi = {
  getEnvironmentConfig: (environment: string, service?: string): Promise<ApiResponse> => {
    const endpoint = replacePathParams(API_ENDPOINTS.config.environment, { environment });
    return apiClient.get(endpoint, service ? { service } : undefined);
  },

  setServiceLogLevel: (serviceName: string, level: string, environment: string): Promise<ApiResponse> => {
    const endpoint = replacePathParams(API_ENDPOINTS.config.logLevel, { name: serviceName });
    return apiClient.put(endpoint, { level, environment });
  },
};

// Database API
export const databaseApi = {
  executeQuery: (query: string, environment: string, limit?: number): Promise<ApiResponse> => {
    return apiClient.post(API_ENDPOINTS.database.query, { query, environment, limit });
  },
};

// QA Testing API
export const testingApi = {
  triggerTests: (testData: { suite: string; environment: string; parallel?: boolean }): Promise<ApiResponse> => {
    return apiClient.post(API_ENDPOINTS.testing.trigger, testData);
  },

  getTestResults: (testId: string, format?: string): Promise<ApiResponse> => {
    const endpoint = replacePathParams(API_ENDPOINTS.testing.results, { id: testId });
    return apiClient.get(endpoint, format ? { format } : undefined);
  },
};

// Re-export everything for convenience
export { apiClient, ApiError } from './apiClient';
export type { ApiResponse } from './apiClient';