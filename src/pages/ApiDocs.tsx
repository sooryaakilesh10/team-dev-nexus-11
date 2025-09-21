import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Key,
  Lock,
  Play,
  Server,
} from "lucide-react";

const ApiDocs = () => {
  const apiEndpoints = [
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
  ];

  const authenticationMethods = [
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
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "text-success bg-success/10 border-success/20";
      case "POST":
        return "text-primary bg-primary/10 border-primary/20";
      case "PUT":
        return "text-warning bg-warning/10 border-warning/20";
      case "DELETE":
        return "text-destructive bg-destructive/10 border-destructive/20";
      default:
        return "text-muted-foreground bg-muted border-muted";
    }
  };

  const exampleResponse = {
    "success": true,
    "data": {
      "buildId": "build-12345",
      "status": "running",
      "service": "user-service",
      "type": "backend",
      "startedAt": "2024-01-20T10:30:00Z",
      "estimatedDuration": "5m"
    },
    "meta": {
      "requestId": "req-67890",
      "timestamp": "2024-01-20T10:30:05Z"
    }
  };

  return (
    <div className="p-6 space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Documentation</h1>
          <p className="text-muted-foreground">
            Complete REST API specification for the Internal Developer Platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export OpenAPI
          </Button>
          <Button className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Postman Collection
          </Button>
        </div>
      </div>

      <Tabs defaultValue="endpoints" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="schemas">Schemas</TabsTrigger>
        </TabsList>

        {/* Endpoints Tab */}
        <TabsContent value="endpoints" className="space-y-6">
          {apiEndpoints.map((category) => (
            <Card key={category.category} className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.endpoints.map((endpoint, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={getMethodColor(endpoint.method)}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {endpoint.path}
                        </code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{endpoint.auth}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{endpoint.description}</p>

                    {endpoint.parameters.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Parameters</h4>
                        <div className="space-y-2">
                          {endpoint.parameters.map((param, paramIndex) => (
                            <div key={paramIndex} className="flex items-center gap-4 text-sm">
                              <code className="font-mono bg-muted px-2 py-1 rounded">
                                {param.name}
                              </code>
                            <Badge variant="outline">
                              {param.type}
                            </Badge>
                            {param.required && (
                              <Badge variant="outline" className="text-destructive">
                                required
                              </Badge>
                            )}
                              <span className="text-muted-foreground">{param.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium mb-2">Responses</h4>
                      <div className="space-y-1">
                        {Object.entries(endpoint.response).map(([code, description]) => (
                          <div key={code} className="flex items-center gap-2 text-sm">
                            <Badge
                              variant="outline"
                              className={
                                code.startsWith('2')
                                  ? "text-success bg-success/10 border-success/20"
                                  : code.startsWith('4')
                                  ? "text-warning bg-warning/10 border-warning/20"
                                  : "text-destructive bg-destructive/10 border-destructive/20"
                              }
                            >
                              {code}
                            </Badge>
                            <span className="text-muted-foreground">{description as string}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button size="sm" variant="outline">
                        <Play className="mr-2 h-4 w-4" />
                        Test Endpoint
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Authentication Tab */}
        <TabsContent value="authentication" className="space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Authentication Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {authenticationMethods.map((auth, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{auth.name}</h3>
                    <div className="flex gap-1">
                      {auth.scopes.map((scope) => (
                        <Badge key={scope} variant="outline">
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{auth.description}</p>
                  <div className="bg-muted p-3 rounded font-mono text-sm">
                    {auth.example}
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">API Rate Limits</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Standard</h4>
                    <p className="text-2xl font-bold text-primary">1000</p>
                    <p className="text-sm text-muted-foreground">requests/hour</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Authenticated</h4>
                    <p className="text-2xl font-bold text-success">5000</p>
                    <p className="text-sm text-muted-foreground">requests/hour</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Service API</h4>
                    <p className="text-2xl font-bold text-warning">10000</p>
                    <p className="text-sm text-muted-foreground">requests/hour</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Examples Tab */}
        <TabsContent value="examples" className="space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Request/Response Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Example: Trigger Build</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Request</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`POST /api/v1/builds/trigger
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "service": "user-service",
  "type": "backend",
  "environment": "staging"
}`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Response</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      {JSON.stringify(exampleResponse, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Example: Scale Service</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Request</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`PUT /api/v1/services/user-service/scale
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "replicas": 5,
  "environment": "production"
}`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Response</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "service": "user-service",
    "environment": "production",
    "previousReplicas": 3,
    "newReplicas": 5,
    "scalingStatus": "in-progress"
  },
  "meta": {
    "requestId": "req-scale-001",
    "timestamp": "2024-01-20T11:00:00Z"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schemas Tab */}
        <TabsContent value="schemas" className="space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Response Schemas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Standard Response Schema</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "success": boolean,
  "data": object | array | null,
  "error": {
    "code": string,
    "message": string,
    "details": object
  } | null,
  "meta": {
    "requestId": string,
    "timestamp": string,
    "pagination": {
      "page": number,
      "limit": number,
      "total": number
    } | null
  }
}`}
                  </pre>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Service Schema</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "name": string,
  "version": string,
  "status": "running" | "stopped" | "error" | "pending",
  "replicas": number,
  "environment": string,
  "health": {
    "cpu": string,
    "memory": string,
    "uptime": string
  },
  "deployment": {
    "lastDeployedAt": string,
    "deployedBy": string,
    "commitHash": string
  }
}`}
                  </pre>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Build Schema</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "id": string,
  "service": string,
  "type": "backend" | "frontend" | "fullstack",
  "status": "pending" | "running" | "success" | "failed",
  "startedAt": string,
  "completedAt": string | null,
  "duration": string | null,
  "logs": string[],
  "artifacts": {
    "docker_image": string,
    "build_artifacts": string[]
  }
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDocs;