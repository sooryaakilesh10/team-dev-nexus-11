// Mock Data - All mock responses for development/testing
// This file contains all the static data currently used in components

export const mockDashboardData = {
  stats: [
    {
      name: "Total Services",
      value: "24",
      change: "+2",
      status: "success",
    },
    {
      name: "CPU Usage",
      value: "68%",
      change: "+5%",
      status: "warning",
    },
    {
      name: "Memory Usage",
      value: "72%",
      change: "+3%",
      status: "warning",
    },
    {
      name: "Network I/O",
      value: "1.2GB/s",
      change: "-0.1GB/s",
      status: "success",
    },
  ],
  
  recentDeployments: [
    {
      id: "d-001",
      service: "user-service",
      version: "v1.2.3",
      environment: "production",
      status: "success",
      deployedBy: "john.doe",
      deployedAt: "2 hours ago",
      duration: "4m 32s",
    },
    {
      id: "d-002",
      service: "api-gateway",
      version: "v2.1.0",
      environment: "production",
      status: "success",
      deployedBy: "jane.smith",
      deployedAt: "5 hours ago",
      duration: "6m 18s",
    },
    {
      id: "d-003",
      service: "notification-service",
      version: "v1.0.8",
      environment: "production",
      status: "failed",
      deployedBy: "mike.wilson",
      deployedAt: "8 hours ago",
      duration: "2m 45s",
    },
    {
      id: "d-004",
      service: "auth-service",
      version: "v3.4.1",
      environment: "staging",
      status: "success",
      deployedBy: "sarah.connor",
      deployedAt: "1 day ago",
      duration: "5m 12s",
    },
  ],
  
  teamMetrics: [
    { team: "Backend Team", prs: 8, avgTime: "2.3 days", coverage: "94%" },
    { team: "Frontend Team", prs: 6, avgTime: "1.8 days", coverage: "89%" },
    { team: "DevOps Team", prs: 4, avgTime: "1.2 days", coverage: "97%" },
  ],
};

export const mockServicesData = {
  services: [
    {
      name: "user-service",
      version: "v1.2.3",
      status: "running",
      replicas: 3,
      environment: "production",
      cpu: "45%",
      memory: "62%",
      uptime: "99.9%",
    },
    {
      name: "api-gateway",
      version: "v2.1.0",
      status: "running",
      replicas: 5,
      environment: "production",
      cpu: "78%",
      memory: "71%",
      uptime: "99.8%",
    },
    {
      name: "notification-service",
      version: "v1.0.8",
      status: "error",
      replicas: 2,
      environment: "production",
      cpu: "12%",
      memory: "34%",
      uptime: "98.2%",
    },
    {
      name: "auth-service",
      version: "v3.4.1",
      status: "running",
      replicas: 4,
      environment: "production",
      cpu: "56%",
      memory: "48%",
      uptime: "99.7%",
    },
    {
      name: "payment-service",
      version: "v1.5.2",
      status: "pending",
      replicas: 2,
      environment: "production",
      cpu: "23%",
      memory: "41%",
      uptime: "99.5%",
    },
  ],
};

export const mockInfrastructureData = {
  alerts: [
    {
      id: "alert-001",
      service: "notification-service",
      type: "error",
      message: "High error rate detected (>5%)",
      timestamp: "5 minutes ago",
      severity: "critical",
    },
    {
      id: "alert-002",
      service: "api-gateway",
      type: "warning",
      message: "CPU usage above 75%",
      timestamp: "15 minutes ago",
      severity: "warning",
    },
    {
      id: "alert-003",
      service: "user-service",
      type: "info",
      message: "Deployment completed successfully",
      timestamp: "2 hours ago",
      severity: "info",
    },
  ],
};

export const mockAlertsData = {
  alerts: [
    {
      id: "ALT-001",
      title: "High CPU Usage on Production Server",
      description: "CPU utilization has exceeded 85% for the last 10 minutes on prod-web-01",
      severity: "critical",
      status: "active",
      service: "web-server",
      timestamp: "2 minutes ago",
      source: "Monitoring",
    },
    {
      id: "ALT-002", 
      title: "Database Connection Pool Exhausted",
      description: "Connection pool for production database has reached maximum capacity",
      severity: "high",
      status: "acknowledged",
      service: "database",
      timestamp: "15 minutes ago",
      source: "Database",
    },
    {
      id: "ALT-003",
      title: "SSL Certificate Expiring Soon",
      description: "SSL certificate for api.example.com expires in 7 days",
      severity: "medium",
      status: "active",
      service: "api-gateway",
      timestamp: "1 hour ago",
      source: "Security",
    },
    {
      id: "ALT-004",
      title: "Failed Login Attempts Spike",
      description: "Unusual number of failed login attempts detected from multiple IPs",
      severity: "high",
      status: "investigating",
      service: "auth-service",
      timestamp: "3 hours ago",
      source: "Security",
    },
    {
      id: "ALT-005",
      title: "Disk Space Low on Staging Server",
      description: "Available disk space on staging-db-01 is below 15%",
      severity: "medium",
      status: "resolved",
      service: "staging",
      timestamp: "6 hours ago",
      source: "Infrastructure",
    },
  ],
  
  alertRules: [
    {
      name: "CPU Usage Threshold",
      condition: "cpu_usage > 80%",
      severity: "critical",
      enabled: true,
      service: "All Servers",
    },
    {
      name: "Memory Usage Warning",
      condition: "memory_usage > 85%",
      severity: "high",
      enabled: true,
      service: "Production",
    },
    {
      name: "Response Time Alert",
      condition: "response_time > 2000ms",
      severity: "medium",
      enabled: true,
      service: "API Gateway",
    },
    {
      name: "Error Rate Monitor",
      condition: "error_rate > 5%",
      severity: "high",
      enabled: false,
      service: "All Services",
    },
  ],
  
  alertStats: [
    { name: "Active Alerts", value: 12, trend: "up", severity: "critical" },
    { name: "Resolved Today", value: 28, trend: "down", severity: "success" },
    { name: "Average Resolution", value: "15m", trend: "stable", severity: "info" },
    { name: "False Positives", value: "3%", trend: "down", severity: "warning" },
  ],
};

export const mockAnalyticsData = {
  usageData: [
    { name: "Jan", users: 1200, requests: 45000, errors: 120 },
    { name: "Feb", users: 1400, requests: 52000, errors: 98 },
    { name: "Mar", users: 1600, requests: 58000, errors: 156 },
    { name: "Apr", users: 1800, requests: 64000, errors: 89 },
    { name: "May", users: 2100, requests: 71000, errors: 134 },
    { name: "Jun", users: 2300, requests: 78000, errors: 67 },
  ],
  
  performanceData: [
    { name: "00:00", responseTime: 120, throughput: 850 },
    { name: "04:00", responseTime: 98, throughput: 650 },
    { name: "08:00", responseTime: 180, throughput: 1200 },
    { name: "12:00", responseTime: 220, throughput: 1800 },
    { name: "16:00", responseTime: 195, throughput: 1650 },
    { name: "20:00", responseTime: 165, throughput: 1100 },
  ],
  
  serviceUsage: [
    { name: "API Gateway", value: 35, fill: "hsl(var(--primary))" },
    { name: "User Service", value: 25, fill: "hsl(var(--success))" },
    { name: "Auth Service", value: 20, fill: "hsl(var(--warning))" },
    { name: "Payment Service", value: 15, fill: "hsl(var(--accent))" },
    { name: "Others", value: 5, fill: "hsl(var(--muted))" },
  ],
  
  errorRateData: [
    { name: "Week 1", rate: 0.8 },
    { name: "Week 2", rate: 1.2 },
    { name: "Week 3", rate: 0.6 },
    { name: "Week 4", rate: 0.9 },
    { name: "Week 5", rate: 0.4 },
    { name: "Week 6", rate: 0.7 },
  ],
  
  kpiMetrics: [
    { 
      name: "Total Users", 
      value: "2,347", 
      change: "+12.5%", 
      trend: "up",
      icon: "Users",
      description: "Active monthly users"
    },
    { 
      name: "API Requests", 
      value: "1.2M", 
      change: "+8.3%", 
      trend: "up",
      icon: "Activity",
      description: "Total requests this month"
    },
    { 
      name: "Avg Response Time", 
      value: "145ms", 
      change: "-5.2%", 
      trend: "down",
      icon: "Clock",
      description: "Average API response time"
    },
    { 
      name: "Success Rate", 
      value: "99.2%", 
      change: "+0.3%", 
      trend: "up",
      icon: "Target",
      description: "Request success rate"
    },
  ],
  
  topEndpoints: [
    { endpoint: "/api/v1/users", requests: "450K", avgTime: "98ms", errors: "0.2%" },
    { endpoint: "/api/v1/auth/login", requests: "320K", avgTime: "156ms", errors: "0.8%" },
    { endpoint: "/api/v1/orders", requests: "280K", avgTime: "189ms", errors: "0.5%" },
    { endpoint: "/api/v1/payments", requests: "190K", avgTime: "245ms", errors: "1.2%" },
    { endpoint: "/api/v1/products", requests: "150K", avgTime: "134ms", errors: "0.3%" },
  ],
};

export const mockApiDocsData = {
  apiEndpoints: [
    {
      category: "Builds",
      endpoints: [
        {
          method: "POST",
          path: "/api/v1/builds/trigger",
          description: "Trigger a new build for a service",
          auth: "Bearer Token",
          parameters: [
            { name: "service", type: "string", required: true, description: "Service name" },
            { name: "type", type: "string", required: true, description: "Build type (backend, frontend, fullstack)" },
            { name: "environment", type: "string", required: false, description: "Target environment" },
          ],
          response: {
            "200": "Build triggered successfully",
            "400": "Invalid request parameters",
            "401": "Authentication required",
            "403": "Insufficient permissions",
          },
        },
        {
          method: "GET",
          path: "/api/v1/builds/{buildId}/status",
          description: "Get build status and logs",
          auth: "Bearer Token",
          parameters: [
            { name: "buildId", type: "string", required: true, description: "Build ID" },
          ],
          response: {
            "200": "Build status retrieved",
            "404": "Build not found",
          },
        },
        {
          method: "GET",
          path: "/api/v1/builds/{buildId}/logs",
          description: "Stream build logs",
          auth: "Bearer Token",
          parameters: [
            { name: "buildId", type: "string", required: true, description: "Build ID" },
            { name: "follow", type: "boolean", required: false, description: "Stream live logs" },
          ],
          response: {
            "200": "Logs retrieved successfully",
            "404": "Build not found",
          },
        },
      ],
    },
    {
      category: "Services",
      endpoints: [
        {
          method: "GET",
          path: "/api/v1/services",
          description: "List all services",
          auth: "Bearer Token",
          parameters: [
            { name: "environment", type: "string", required: false, description: "Filter by environment" },
            { name: "status", type: "string", required: false, description: "Filter by status" },
          ],
          response: {
            "200": "Services retrieved successfully",
          },
        },
        {
          method: "POST",
          path: "/api/v1/services/{serviceName}/restart",
          description: "Restart service pods",
          auth: "Bearer Token",
          parameters: [
            { name: "serviceName", type: "string", required: true, description: "Service name" },
            { name: "environment", type: "string", required: true, description: "Environment" },
          ],
          response: {
            "200": "Service restart initiated",
            "404": "Service not found",
          },
        },
        {
          method: "PUT",
          path: "/api/v1/services/{serviceName}/scale",
          description: "Scale service replicas",
          auth: "Bearer Token",
          parameters: [
            { name: "serviceName", type: "string", required: true, description: "Service name" },
            { name: "replicas", type: "integer", required: true, description: "Number of replicas" },
            { name: "environment", type: "string", required: true, description: "Environment" },
          ],
          response: {
            "200": "Service scaled successfully",
            "400": "Invalid replica count",
            "404": "Service not found",
          },
        },
      ],
    },
    {
      category: "Pull Requests",
      endpoints: [
        {
          method: "GET",
          path: "/api/v1/pull-requests",
          description: "List pull requests",
          auth: "Bearer Token",
          parameters: [
            { name: "status", type: "string", required: false, description: "Filter by status" },
            { name: "author", type: "string", required: false, description: "Filter by author" },
            { name: "repository", type: "string", required: false, description: "Filter by repository" },
            { name: "limit", type: "integer", required: false, description: "Number of results" },
          ],
          response: {
            "200": "Pull requests retrieved successfully",
          },
        },
        {
          method: "GET",
          path: "/api/v1/pull-requests/{prId}/metrics",
          description: "Get PR metrics and analytics",
          auth: "Bearer Token",
          parameters: [
            { name: "prId", type: "string", required: true, description: "Pull request ID" },
          ],
          response: {
            "200": "PR metrics retrieved",
            "404": "Pull request not found",
          },
        },
        {
          method: "POST",
          path: "/api/v1/pull-requests/{prId}/summary",
          description: "Generate PR summary report",
          auth: "Bearer Token",
          parameters: [
            { name: "prId", type: "string", required: true, description: "Pull request ID" },
            { name: "includeComments", type: "boolean", required: false, description: "Include comment analysis" },
          ],
          response: {
            "200": "Summary generated successfully",
            "404": "Pull request not found",
          },
        },
      ],
    },
    {
      category: "Configuration",
      endpoints: [
        {
          method: "GET",
          path: "/api/v1/config/{environment}",
          description: "Get environment configuration",
          auth: "Bearer Token",
          parameters: [
            { name: "environment", type: "string", required: true, description: "Environment name" },
            { name: "service", type: "string", required: false, description: "Specific service config" },
          ],
          response: {
            "200": "Configuration retrieved",
            "404": "Environment not found",
          },
        },
        {
          method: "PUT",
          path: "/api/v1/services/{serviceName}/log-level",
          description: "Set service log level",
          auth: "Bearer Token",
          parameters: [
            { name: "serviceName", type: "string", required: true, description: "Service name" },
            { name: "level", type: "string", required: true, description: "Log level (DEBUG, INFO, WARN, ERROR)" },
            { name: "environment", type: "string", required: true, description: "Environment" },
          ],
          response: {
            "200": "Log level updated",
            "400": "Invalid log level",
            "404": "Service not found",
          },
        },
      ],
    },
    {
      category: "Database",
      endpoints: [
        {
          method: "POST",
          path: "/api/v1/database/query",
          description: "Execute read-only database query",
          auth: "Bearer Token + DB Access",
          parameters: [
            { name: "query", type: "string", required: true, description: "SQL query (SELECT only)" },
            { name: "environment", type: "string", required: true, description: "Database environment" },
            { name: "limit", type: "integer", required: false, description: "Result limit (max 1000)" },
          ],
          response: {
            "200": "Query executed successfully",
            "400": "Invalid query or non-SELECT statement",
            "403": "Database access denied",
          },
        },
      ],
    },
    {
      category: "QA Testing",
      endpoints: [
        {
          method: "POST",
          path: "/api/v1/tests/trigger",
          description: "Trigger automated test suite",
          auth: "Bearer Token",
          parameters: [
            { name: "suite", type: "string", required: true, description: "Test suite name" },
            { name: "environment", type: "string", required: true, description: "Test environment" },
            { name: "parallel", type: "boolean", required: false, description: "Run tests in parallel" },
          ],
          response: {
            "200": "Tests triggered successfully",
            "404": "Test suite not found",
          },
        },
        {
          method: "GET",
          path: "/api/v1/tests/{testId}/results",
          description: "Get test results and coverage",
          auth: "Bearer Token",
          parameters: [
            { name: "testId", type: "string", required: true, description: "Test run ID" },
            { name: "format", type: "string", required: false, description: "Result format (json, junit, html)" },
          ],
          response: {
            "200": "Test results retrieved",
            "404": "Test run not found",
          },
        },
      ],
    },
  ],
  
  authenticationMethods: [
    {
      name: "Bearer Token",
      description: "JWT token for API authentication",
      example: "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      scopes: ["read", "write", "admin"],
    },
    {
      name: "API Key",
      description: "Service-to-service authentication",
      example: "X-API-Key: your-api-key-here",
      scopes: ["service"],
    },
  ],
};