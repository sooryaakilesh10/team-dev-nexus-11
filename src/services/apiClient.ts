// API Client - Centralized HTTP client with mock/real API switching
import { API_CONFIG, API_ENDPOINTS } from '@/config/api';
import { 
  mockDashboardData, 
  mockAlertsData, 
  mockAnalyticsData, 
  mockApiDocsData,
  mockServicesData,
  mockInfrastructureData
} from '@/data/mockData';

// Types
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

// HTTP Client class
class HttpClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = `${API_CONFIG.baseURL}/${API_CONFIG.version}`;
    this.timeout = API_CONFIG.timeout;
    this.defaultHeaders = API_CONFIG.defaultHeaders;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    config.signal = controller.signal;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError({
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
        });
      }

      const data = await response.json();
      return {
        data,
        success: true,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError({
            message: 'Request timeout',
            status: 408,
            code: 'TIMEOUT',
          });
        }
      }
      
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return this.request<T>(url.pathname + url.search);
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Mock Client - returns mock data with simulated delays
class MockClient {
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private wrapResponse<T>(data: T): ApiResponse<T> {
    return {
      data,
      success: true,
    };
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    await this.delay();
    
    // Route to appropriate mock data based on endpoint
    switch (endpoint) {
      case API_ENDPOINTS.dashboard.stats:
        return this.wrapResponse(mockDashboardData.stats as T);
      
      case API_ENDPOINTS.dashboard.deployments:
        return this.wrapResponse(mockDashboardData.recentDeployments as T);
      
      case API_ENDPOINTS.dashboard.teamMetrics:
        return this.wrapResponse(mockDashboardData.teamMetrics as T);
      
      case API_ENDPOINTS.alerts.list:
        return this.wrapResponse(mockAlertsData.alerts as T);
      
      case API_ENDPOINTS.alerts.rules:
        return this.wrapResponse(mockAlertsData.alertRules as T);
      
      case API_ENDPOINTS.alerts.stats:
        return this.wrapResponse(mockAlertsData.alertStats as T);
      
      case API_ENDPOINTS.analytics.usage:
        return this.wrapResponse(mockAnalyticsData.usageData as T);
      
      case API_ENDPOINTS.analytics.performance:
        return this.wrapResponse(mockAnalyticsData.performanceData as T);
      
      case API_ENDPOINTS.analytics.services:
        return this.wrapResponse(mockAnalyticsData.serviceUsage as T);
      
      case API_ENDPOINTS.analytics.endpoints:
        return this.wrapResponse(mockAnalyticsData.topEndpoints as T);
      
      case API_ENDPOINTS.analytics.kpis:
        return this.wrapResponse(mockAnalyticsData.kpiMetrics as T);
      
      case API_ENDPOINTS.apiDocs.endpoints:
        return this.wrapResponse(mockApiDocsData.apiEndpoints as T);
      
      case API_ENDPOINTS.apiDocs.authentication:
        return this.wrapResponse(mockApiDocsData.authenticationMethods as T);
      
      case API_ENDPOINTS.services.list:
        return this.wrapResponse(mockServicesData.services as T);
      
      default:
        // Handle dynamic endpoints with path parameters
        if (endpoint.includes('/services/') && endpoint.includes('/logs')) {
          return this.wrapResponse({ logs: ['Service log entry 1', 'Service log entry 2'] } as T);
        }
        
        throw new ApiError({
          message: `Mock endpoint not found: ${endpoint}`,
          status: 404,
          code: 'MOCK_NOT_FOUND',
        });
    }
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    await this.delay();
    
    // Simulate successful operations for common POST endpoints
    switch (endpoint) {
      case API_ENDPOINTS.builds.trigger:
        return this.wrapResponse({ buildId: 'build-12345', status: 'triggered' } as T);
      
      case API_ENDPOINTS.testing.trigger:
        return this.wrapResponse({ testId: 'test-67890', status: 'started' } as T);
      
      default:
        // For alert acknowledgments and resolutions, return success
        if (endpoint.includes('/acknowledge') || endpoint.includes('/resolve')) {
          return this.wrapResponse({ success: true } as T);
        }
        
        // For service restart endpoints
        if (endpoint.includes('/services/') && endpoint.includes('/restart')) {
          return this.wrapResponse({ success: true, message: 'Service restart initiated' } as T);
        }
        
        return this.wrapResponse({ success: true, message: 'Operation completed' } as T);
    }
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    await this.delay();
    return this.wrapResponse({ success: true, message: 'Updated successfully' } as T);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    await this.delay();
    return this.wrapResponse({ success: true, message: 'Deleted successfully' } as T);
  }
}

// Custom error class
export class ApiError extends Error {
  status: number;
  code?: string;

  constructor({ message, status, code }: { message: string; status: number; code?: string }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

// Export the appropriate client based on configuration
export const apiClient = API_CONFIG.useMockData ? new MockClient() : new HttpClient();

// Utility function to replace path parameters
export const replacePathParams = (path: string, params: Record<string, string>): string => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(`:${key}`, value);
  }, path);
};