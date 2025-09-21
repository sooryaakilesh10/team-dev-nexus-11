# API Abstraction Layer

This document explains the centralized API abstraction layer that allows the application to switch between mock data and real API calls seamlessly.

## Structure Overview

```
src/
├── config/
│   └── api.ts              # API configuration and endpoints
├── data/
│   └── mockData.ts         # All mock responses for testing
├── services/
│   ├── apiClient.ts        # HTTP client with mock/real switching
│   └── api.ts              # High-level API service functions
└── components/
    └── [components using API services]
```

## Quick Start

### Switching Between Mock and Real Data

To switch between mock data and real API calls, update **one line** in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  // Set to false to use real API endpoints
  useMockData: true,  // ← Change this to false for real APIs
  
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.yourproductionurl.com' 
    : 'http://localhost:3001/api',
  version: 'v1',
  timeout: 10000,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
} as const;
```

### Updating API Endpoints

When your backend is ready, update the base URLs in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  useMockData: false,  // Switch to real APIs
  
  // Update these URLs to match your backend
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-api.com/api'     // ← Update production URL
    : 'http://localhost:3000/api',               // ← Update development URL
  version: 'v1',
  timeout: 10000,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
} as const;
```

## How It Works

### 1. Configuration Layer (`src/config/api.ts`)
- **API_CONFIG**: Central configuration for switching between mock/real data
- **API_ENDPOINTS**: Centralized endpoint definitions used throughout the app

### 2. Mock Data (`src/data/mockData.ts`)
- Contains all static mock data organized by feature
- Matches the exact structure expected by components
- Easy to update and maintain

### 3. API Client (`src/services/apiClient.ts`)
- **HttpClient**: Handles real HTTP requests with proper error handling
- **MockClient**: Returns mock data with simulated delays
- Automatically switches based on `API_CONFIG.useMockData`

### 4. API Services (`src/services/api.ts`)
- High-level functions organized by feature (dashboard, alerts, analytics, etc.)
- Components import and use these functions
- Abstracts away the complexity of endpoints and data fetching

## Usage in Components

### Before (Direct Mock Data)
```typescript
// ❌ Old way - direct mock data in component
const Dashboard = () => {
  const stats = [
    { title: "Active Services", value: "24", ... },
    // ... hardcoded data
  ];
};
```

### After (API Service Layer)
```typescript
// ✅ New way - using API service
import { dashboardApi } from "@/services/api";

const Dashboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardApi.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);
};
```

## Available API Services

### Dashboard API
```typescript
import { dashboardApi } from "@/services/api";

// Get dashboard statistics
await dashboardApi.getStats();

// Get recent deployments
await dashboardApi.getRecentDeployments();

// Get team metrics
await dashboardApi.getTeamMetrics();
```

### Alerts API
```typescript
import { alertsApi } from "@/services/api";

// Get alerts with optional filters
await alertsApi.getAlerts({ severity: 'critical', status: 'active' });

// Acknowledge an alert
await alertsApi.acknowledgeAlert('ALT-001');

// Resolve an alert
await alertsApi.resolveAlert('ALT-001');
```

### Analytics API
```typescript
import { analyticsApi } from "@/services/api";

// Get usage data
await analyticsApi.getUsageData();

// Get performance metrics
await analyticsApi.getPerformanceData();

// Get service usage distribution
await analyticsApi.getServiceUsage();
```

### Services API
```typescript
import { servicesApi } from "@/services/api";

// List all services
await servicesApi.getServices();

// Restart a service
await servicesApi.restartService('user-service', 'production');

// Scale a service
await servicesApi.scaleService('api-gateway', 3, 'production');
```

## Adding New Endpoints

### 1. Add endpoint to config
```typescript
// src/config/api.ts
export const API_ENDPOINTS = {
  // ... existing endpoints
  newFeature: {
    list: '/new-feature',
    create: '/new-feature',
    update: '/new-feature/:id',
  },
};
```

### 2. Add mock data
```typescript
// src/data/mockData.ts
export const mockNewFeatureData = {
  items: [
    { id: 1, name: "Item 1", status: "active" },
    // ... mock data
  ],
};
```

### 3. Update mock client
```typescript
// src/services/apiClient.ts - in MockClient.get() method
switch (endpoint) {
  // ... existing cases
  case API_ENDPOINTS.newFeature.list:
    return this.wrapResponse(mockNewFeatureData.items as T);
}
```

### 4. Add API service functions
```typescript
// src/services/api.ts
export const newFeatureApi = {
  getItems: (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.newFeature.list);
  },
  
  createItem: (data: any): Promise<ApiResponse> => {
    return apiClient.post(API_ENDPOINTS.newFeature.create, data);
  },
};
```

## Error Handling

All API calls return a consistent response format:

```typescript
interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}
```

Errors are thrown as `ApiError` instances with status codes:

```typescript
try {
  const response = await dashboardApi.getStats();
  // Handle success
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error ${error.status}: ${error.message}`);
  }
}
```

## Benefits

1. **Single Point of Control**: Change one flag to switch between mock and real data
2. **Easy Backend Integration**: When backend is ready, just update endpoints
3. **Consistent Interface**: All API calls follow the same pattern
4. **Type Safety**: Full TypeScript support with proper types
5. **Error Handling**: Centralized error handling and timeout management
6. **Development Workflow**: Work with mock data while backend is being developed
7. **Testing**: Easy to test with predictable mock responses

## Migration Path

1. ✅ **Phase 1**: Refactor existing components to use API services (Complete)
2. 🔄 **Phase 2**: Develop and test with mock data
3. 🔄 **Phase 3**: Create backend APIs matching the defined endpoints
4. 🔄 **Phase 4**: Update `API_CONFIG.useMockData = false` and test with real APIs
5. 🔄 **Phase 5**: Deploy to production

The entire codebase will continue to work throughout this process without any additional code changes!
