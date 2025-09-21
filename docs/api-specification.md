# API Specification - Alerts Management System

## 1. Overview

This document defines the RESTful API specification for the Alerts Management System, including authentication, request/response formats, error handling, and WebSocket connections.

## 2. Base Configuration

### 2.1 Base URL
```
Production: https://api.alerts.example.com/v1
Staging: https://api-staging.alerts.example.com/v1
Development: http://localhost:3000/api/v1
```

### 2.2 Authentication
- **Type**: Bearer Token (JWT)
- **Header**: `Authorization: Bearer <token>`
- **Token Expiry**: 24 hours (configurable)
- **Refresh Token**: Available for token renewal

### 2.3 Content Type
- **Request**: `application/json`
- **Response**: `application/json`
- **File Upload**: `multipart/form-data`

### 2.4 Rate Limiting
- **Authenticated Users**: 1000 requests/hour
- **Public Endpoints**: 100 requests/hour
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## 3. Authentication Endpoints

### 3.1 User Registration
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "teamId": "uuid-team-id" // optional
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "operator",
      "teamId": "uuid-team-id",
      "createdAt": "2024-01-15T10:00:00Z"
    },
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token",
    "expiresIn": 86400
  }
}
```

### 3.2 User Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "operator",
      "teamId": "uuid-team-id",
      "lastLogin": "2024-01-15T10:00:00Z"
    },
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token",
    "expiresIn": 86400
  }
}
```

### 3.3 Token Refresh
```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "refresh-token"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "new-jwt-token",
    "expiresIn": 86400
  }
}
```

### 3.4 Logout
```http
POST /auth/logout
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

## 4. Alert Management Endpoints

### 4.1 Get Alerts
```http
GET /alerts
```

**Query Parameters:**
- `page` (integer, default: 1): Page number
- `limit` (integer, default: 20, max: 100): Items per page
- `severity` (string): Filter by severity (critical, high, medium, low)
- `status` (string): Filter by status (active, acknowledged, investigating, resolved)
- `service` (string): Filter by service name
- `search` (string): Search in title and description
- `sortBy` (string, default: createdAt): Sort field
- `sortOrder` (string, default: desc): Sort order (asc, desc)
- `dateFrom` (ISO string): Filter alerts from date
- `dateTo` (ISO string): Filter alerts to date

**Response (200):**
```json
{
  "success": true,
  "data": {
    "alerts": [
      {
        "id": "uuid",
        "title": "High CPU Usage on Production Server",
        "description": "CPU utilization has exceeded 85%",
        "severity": "critical",
        "status": "active",
        "source": "Monitoring",
        "serviceName": "web-server",
        "assignedTo": {
          "id": "uuid",
          "firstName": "John",
          "lastName": "Doe"
        },
        "metadata": {
          "server": "prod-web-01",
          "cpuUsage": 87.5,
          "threshold": 85
        },
        "createdAt": "2024-01-15T10:00:00Z",
        "updatedAt": "2024-01-15T10:05:00Z",
        "resolvedAt": null
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 100,
      "itemsPerPage": 20,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### 4.2 Get Alert by ID
```http
GET /alerts/{alertId}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "alert": {
      "id": "uuid",
      "title": "High CPU Usage on Production Server",
      "description": "CPU utilization has exceeded 85%",
      "severity": "critical",
      "status": "active",
      "source": "Monitoring",
      "serviceName": "web-server",
      "assignedTo": {
        "id": "uuid",
        "firstName": "John",
        "lastName": "Doe"
      },
      "metadata": {
        "server": "prod-web-01",
        "cpuUsage": 87.5,
        "threshold": 85
      },
      "history": [
        {
          "id": "uuid",
          "action": "created",
          "userId": "uuid",
          "timestamp": "2024-01-15T10:00:00Z",
          "details": "Alert created by monitoring system"
        },
        {
          "id": "uuid",
          "action": "acknowledged",
          "userId": "uuid",
          "timestamp": "2024-01-15T10:05:00Z",
          "details": "Acknowledged by John Doe"
        }
      ],
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:05:00Z",
      "resolvedAt": null
    }
  }
}
```

### 4.3 Create Alert
```http
POST /alerts
```

**Request Body:**
```json
{
  "title": "Database Connection Pool Exhausted",
  "description": "Connection pool has reached maximum capacity",
  "severity": "high",
  "source": "Database Monitor",
  "serviceName": "database",
  "metadata": {
    "database": "prod-db-01",
    "maxConnections": 100,
    "currentConnections": 100
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "alert": {
      "id": "uuid",
      "title": "Database Connection Pool Exhausted",
      "description": "Connection pool has reached maximum capacity",
      "severity": "high",
      "status": "active",
      "source": "Database Monitor",
      "serviceName": "database",
      "assignedTo": null,
      "metadata": {
        "database": "prod-db-01",
        "maxConnections": 100,
        "currentConnections": 100
      },
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "resolvedAt": null
    }
  }
}
```

### 4.4 Update Alert
```http
PUT /alerts/{alertId}
```

**Request Body:**
```json
{
  "status": "acknowledged",
  "assignedTo": "uuid-user-id",
  "metadata": {
    "notes": "Investigating the issue"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "alert": {
      "id": "uuid",
      "title": "Database Connection Pool Exhausted",
      "status": "acknowledged",
      "assignedTo": {
        "id": "uuid",
        "firstName": "John",
        "lastName": "Doe"
      },
      "updatedAt": "2024-01-15T10:10:00Z"
    }
  }
}
```

### 4.5 Resolve Alert
```http
POST /alerts/{alertId}/resolve
```

**Request Body:**
```json
{
  "resolution": "Increased connection pool size to 150",
  "rootCause": "High traffic during peak hours"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "alert": {
      "id": "uuid",
      "status": "resolved",
      "resolvedAt": "2024-01-15T10:30:00Z",
      "resolution": "Increased connection pool size to 150",
      "rootCause": "High traffic during peak hours"
    }
  }
}
```

### 4.6 Bulk Alert Operations
```http
POST /alerts/bulk
```

**Request Body:**
```json
{
  "action": "acknowledge", // acknowledge, resolve, assign
  "alertIds": ["uuid1", "uuid2", "uuid3"],
  "data": {
    "assignedTo": "uuid-user-id", // for assign action
    "resolution": "Bulk resolution", // for resolve action
    "notes": "Bulk operation performed"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "processed": 3,
    "failed": 0,
    "results": [
      {
        "alertId": "uuid1",
        "success": true
      },
      {
        "alertId": "uuid2",
        "success": true
      },
      {
        "alertId": "uuid3",
        "success": true
      }
    ]
  }
}
```

## 5. Alert Rules Management

### 5.1 Get Alert Rules
```http
GET /alert-rules
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "rules": [
      {
        "id": "uuid",
        "name": "CPU Usage Threshold",
        "condition": "cpu_usage > 80",
        "severity": "critical",
        "enabled": true,
        "serviceFilter": "web-servers",
        "createdBy": {
          "id": "uuid",
          "firstName": "Admin",
          "lastName": "User"
        },
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ]
  }
}
```

### 5.2 Create Alert Rule
```http
POST /alert-rules
```

**Request Body:**
```json
{
  "name": "Memory Usage Warning",
  "condition": "memory_usage > 85",
  "severity": "high",
  "enabled": true,
  "serviceFilter": "production",
  "description": "Alert when memory usage exceeds 85%"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "rule": {
      "id": "uuid",
      "name": "Memory Usage Warning",
      "condition": "memory_usage > 85",
      "severity": "high",
      "enabled": true,
      "serviceFilter": "production",
      "description": "Alert when memory usage exceeds 85%",
      "createdBy": {
        "id": "uuid",
        "firstName": "John",
        "lastName": "Doe"
      },
      "createdAt": "2024-01-15T10:00:00Z"
    }
  }
}
```

### 5.3 Update Alert Rule
```http
PUT /alert-rules/{ruleId}
```

### 5.4 Delete Alert Rule
```http
DELETE /alert-rules/{ruleId}
```

## 6. Analytics & Reporting

### 6.1 Get Alert Statistics
```http
GET /analytics/stats
```

**Query Parameters:**
- `timeRange` (string): 1h, 24h, 7d, 30d, 90d
- `groupBy` (string): severity, status, service, hour, day

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalAlerts": 1250,
    "activeAlerts": 12,
    "resolvedToday": 28,
    "averageResolutionTime": "15m 30s",
    "falsePositiveRate": 3.2,
    "severityBreakdown": {
      "critical": 45,
      "high": 120,
      "medium": 200,
      "low": 885
    },
    "statusBreakdown": {
      "active": 12,
      "acknowledged": 5,
      "investigating": 3,
      "resolved": 1230
    },
    "trends": {
      "alertVolume": [
        { "timestamp": "2024-01-15T00:00:00Z", "count": 15 },
        { "timestamp": "2024-01-15T01:00:00Z", "count": 23 }
      ],
      "resolutionTimes": [
        { "timestamp": "2024-01-15T00:00:00Z", "averageMinutes": 18 },
        { "timestamp": "2024-01-15T01:00:00Z", "averageMinutes": 12 }
      ]
    }
  }
}
```

### 6.2 Generate Report
```http
POST /analytics/reports
```

**Request Body:**
```json
{
  "type": "summary", // summary, detailed, compliance
  "dateFrom": "2024-01-01T00:00:00Z",
  "dateTo": "2024-01-31T23:59:59Z",
  "format": "pdf", // pdf, csv, json
  "filters": {
    "severity": ["critical", "high"],
    "services": ["web-server", "database"]
  }
}
```

**Response (202):**
```json
{
  "success": true,
  "data": {
    "reportId": "uuid",
    "status": "processing",
    "estimatedCompletion": "2024-01-15T10:05:00Z"
  }
}
```

### 6.3 Get Report Status
```http
GET /analytics/reports/{reportId}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "reportId": "uuid",
    "status": "completed", // processing, completed, failed
    "downloadUrl": "https://api.alerts.example.com/v1/analytics/reports/uuid/download",
    "expiresAt": "2024-01-22T10:00:00Z",
    "fileSize": 2458624,
    "format": "pdf"
  }
}
```

## 7. User Management

### 7.1 Get Users
```http
GET /users
```

**Query Parameters:**
- `page`, `limit`, `search`, `role`, `teamId`

### 7.2 Get Current User Profile
```http
GET /users/me
```

### 7.3 Update User Profile
```http
PUT /users/me
```

### 7.4 Change Password
```http
POST /users/me/change-password
```

## 8. Team Management

### 8.1 Get Teams
```http
GET /teams
```

### 8.2 Create Team
```http
POST /teams
```

### 8.3 Add User to Team
```http
POST /teams/{teamId}/members
```

## 9. Notification Settings

### 9.1 Get Notification Preferences
```http
GET /notifications/preferences
```

### 9.2 Update Notification Preferences
```http
PUT /notifications/preferences
```

**Request Body:**
```json
{
  "email": {
    "enabled": true,
    "severities": ["critical", "high"],
    "quietHours": {
      "enabled": true,
      "start": "22:00",
      "end": "08:00",
      "timezone": "America/New_York"
    }
  },
  "sms": {
    "enabled": true,
    "severities": ["critical"],
    "phoneNumber": "+1234567890"
  },
  "slack": {
    "enabled": true,
    "webhookUrl": "https://hooks.slack.com/...",
    "channel": "#alerts"
  }
}
```

## 10. WebSocket API

### 10.1 Connection
```javascript
const ws = new WebSocket('wss://api.alerts.example.com/v1/ws');

// Authentication after connection
ws.send(JSON.stringify({
  type: 'auth',
  token: 'jwt-token'
}));
```

### 10.2 Real-time Events

**Alert Created:**
```json
{
  "type": "alert.created",
  "data": {
    "alert": { /* alert object */ }
  },
  "timestamp": "2024-01-15T10:00:00Z"
}
```

**Alert Updated:**
```json
{
  "type": "alert.updated",
  "data": {
    "alertId": "uuid",
    "changes": {
      "status": "acknowledged",
      "assignedTo": "uuid"
    },
    "updatedBy": {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe"
    }
  },
  "timestamp": "2024-01-15T10:05:00Z"
}
```

**Alert Resolved:**
```json
{
  "type": "alert.resolved",
  "data": {
    "alertId": "uuid",
    "resolvedBy": {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe"
    },
    "resolution": "Issue fixed by restarting service"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 10.3 Subscriptions
```javascript
// Subscribe to specific alert
ws.send(JSON.stringify({
  type: 'subscribe',
  resource: 'alert',
  resourceId: 'uuid'
}));

// Subscribe to all team alerts
ws.send(JSON.stringify({
  type: 'subscribe',
  resource: 'team.alerts',
  filters: {
    severity: ['critical', 'high']
  }
}));
```

## 11. Error Handling

### 11.1 Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ],
    "requestId": "uuid",
    "timestamp": "2024-01-15T10:00:00Z"
  }
}
```

### 11.2 HTTP Status Codes
- `200` - Success
- `201` - Created
- `202` - Accepted (async operations)
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error
- `503` - Service Unavailable

### 11.3 Common Error Codes
- `VALIDATION_ERROR` - Request validation failed
- `AUTHENTICATION_FAILED` - Invalid credentials
- `AUTHORIZATION_FAILED` - Insufficient permissions
- `RESOURCE_NOT_FOUND` - Requested resource not found
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error
- `SERVICE_UNAVAILABLE` - Service temporarily unavailable

## 12. Webhook API

### 12.1 Incoming Webhooks
```http
POST /webhooks/alerts/{source}
```

**Example for Prometheus:**
```json
{
  "alerts": [
    {
      "status": "firing",
      "labels": {
        "alertname": "HighCPUUsage",
        "instance": "prod-web-01",
        "severity": "critical"
      },
      "annotations": {
        "summary": "High CPU usage detected",
        "description": "CPU usage is above 85%"
      },
      "startsAt": "2024-01-15T10:00:00Z",
      "endsAt": "0001-01-01T00:00:00Z",
      "generatorURL": "http://prometheus:9090/graph?g0.expr=..."
    }
  ]
}
```

### 12.2 Outgoing Webhooks
Configure webhook endpoints to receive alert notifications:

```json
{
  "url": "https://your-service.com/webhook",
  "events": ["alert.created", "alert.resolved"],
  "filters": {
    "severity": ["critical", "high"]
  },
  "headers": {
    "Authorization": "Bearer your-token"
  }
}
```

## 13. API Versioning

- **Current Version**: v1
- **Version Header**: `API-Version: v1`
- **Deprecation Notice**: 6 months advance notice
- **Backward Compatibility**: Maintained for 2 versions

## 14. SDKs and Libraries

### 14.1 JavaScript/TypeScript
```bash
npm install @alerts-system/js-sdk
```

```javascript
import { AlertsClient } from '@alerts-system/js-sdk';

const client = new AlertsClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.alerts.example.com/v1'
});

const alerts = await client.alerts.list({ severity: 'critical' });
```

### 14.2 Python
```bash
pip install alerts-system-python
```

```python
from alerts_system import AlertsClient

client = AlertsClient(
    api_key='your-api-key',
    base_url='https://api.alerts.example.com/v1'
)

alerts = client.alerts.list(severity='critical')
```

## 15. Testing

### 15.1 Test Environment
- **Base URL**: `https://api-test.alerts.example.com/v1`
- **Test Data**: Pre-populated with sample alerts and users
- **Rate Limits**: Relaxed for testing purposes

### 15.2 Postman Collection
Available at: `https://documenter.getpostman.com/alerts-system-api`

### 15.3 OpenAPI Specification
Full OpenAPI 3.0 specification available at: `/api/v1/openapi.json`