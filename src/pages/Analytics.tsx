import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  Download,
  Calendar,
  Target,
  Clock,
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";

const Analytics = () => {
  const usageData = [
    { name: "Jan", users: 1200, requests: 45000, errors: 120 },
    { name: "Feb", users: 1400, requests: 52000, errors: 98 },
    { name: "Mar", users: 1600, requests: 58000, errors: 156 },
    { name: "Apr", users: 1800, requests: 64000, errors: 89 },
    { name: "May", users: 2100, requests: 71000, errors: 134 },
    { name: "Jun", users: 2300, requests: 78000, errors: 67 },
  ];

  const performanceData = [
    { name: "00:00", responseTime: 120, throughput: 850 },
    { name: "04:00", responseTime: 98, throughput: 650 },
    { name: "08:00", responseTime: 180, throughput: 1200 },
    { name: "12:00", responseTime: 220, throughput: 1800 },
    { name: "16:00", responseTime: 195, throughput: 1650 },
    { name: "20:00", responseTime: 165, throughput: 1100 },
  ];

  const serviceUsage = [
    { name: "API Gateway", value: 35, fill: "hsl(var(--primary))" },
    { name: "User Service", value: 25, fill: "hsl(var(--success))" },
    { name: "Auth Service", value: 20, fill: "hsl(var(--warning))" },
    { name: "Payment Service", value: 15, fill: "hsl(var(--accent))" },
    { name: "Others", value: 5, fill: "hsl(var(--muted))" },
  ];

  const errorRateData = [
    { name: "Week 1", rate: 0.8 },
    { name: "Week 2", rate: 1.2 },
    { name: "Week 3", rate: 0.6 },
    { name: "Week 4", rate: 0.9 },
    { name: "Week 5", rate: 0.4 },
    { name: "Week 6", rate: 0.7 },
  ];

  const kpiMetrics = [
    { 
      name: "Total Users", 
      value: "2,347", 
      change: "+12.5%", 
      trend: "up",
      icon: Users,
      description: "Active monthly users"
    },
    { 
      name: "API Requests", 
      value: "1.2M", 
      change: "+8.3%", 
      trend: "up",
      icon: Activity,
      description: "Total requests this month"
    },
    { 
      name: "Avg Response Time", 
      value: "145ms", 
      change: "-5.2%", 
      trend: "down",
      icon: Clock,
      description: "Average API response time"
    },
    { 
      name: "Success Rate", 
      value: "99.2%", 
      change: "+0.3%", 
      trend: "up",
      icon: Target,
      description: "Request success rate"
    },
  ];

  const topEndpoints = [
    { endpoint: "/api/v1/users", requests: "450K", avgTime: "98ms", errors: "0.2%" },
    { endpoint: "/api/v1/auth/login", requests: "320K", avgTime: "156ms", errors: "0.8%" },
    { endpoint: "/api/v1/orders", requests: "280K", avgTime: "189ms", errors: "0.5%" },
    { endpoint: "/api/v1/payments", requests: "190K", avgTime: "245ms", errors: "1.2%" },
    { endpoint: "/api/v1/products", requests: "150K", avgTime: "134ms", errors: "0.3%" },
  ];

  return (
    <div className="p-6 space-y-8 animate-slide-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            Platform Analytics
          </h1>
          <p className="text-muted-foreground text-lg">
            Usage metrics, performance analytics, and system insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <Card key={metric.name} className="hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <metric.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge 
                  variant="outline" 
                  className={metric.trend === 'up' ? 'text-success bg-success/10' : 'text-success bg-success/10'}
                >
                  {metric.change}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.description}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="usage" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="services">Service Metrics</TabsTrigger>
          <TabsTrigger value="endpoints">Top Endpoints</TabsTrigger>
        </TabsList>

        {/* Usage Analytics */}
        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth */}
            <Card className="hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  User Growth & API Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        stackId="1"
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary) / 0.3)" 
                        name="Active Users"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="requests" 
                        stackId="2"
                        stroke="hsl(var(--success))" 
                        fill="hsl(var(--success) / 0.3)" 
                        name="API Requests (K)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Error Rate Trends */}
            <Card className="hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle>Error Rate Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={errorRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        stroke="hsl(var(--destructive))" 
                        strokeWidth={3}
                        name="Error Rate (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Summary */}
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle>Monthly Usage Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="requests" fill="hsl(var(--primary))" name="API Requests" />
                    <Bar dataKey="errors" fill="hsl(var(--destructive))" name="Errors" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="hover-lift animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="responseTime" 
                      stroke="hsl(var(--warning))" 
                      strokeWidth={3}
                      name="Response Time (ms)"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="throughput" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={3}
                      name="Throughput (req/min)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Metrics */}
        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Service Usage Distribution */}
            <Card className="hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle>Service Usage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceUsage}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {serviceUsage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Service Health */}
            <Card className="hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle>Service Health Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "API Gateway", status: "healthy", uptime: "99.9%", latency: "45ms" },
                  { name: "User Service", status: "healthy", uptime: "99.7%", latency: "67ms" },
                  { name: "Auth Service", status: "warning", uptime: "98.2%", latency: "120ms" },
                  { name: "Payment Service", status: "healthy", uptime: "99.5%", latency: "89ms" },
                ].map((service, index) => (
                  <div 
                    key={service.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 animate-slide-in-right"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'healthy' ? 'bg-success animate-pulse' : 'bg-warning'
                      }`} />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{service.uptime}</div>
                        <div className="text-muted-foreground">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{service.latency}</div>
                        <div className="text-muted-foreground">Latency</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Top Endpoints */}
        <TabsContent value="endpoints" className="space-y-6">
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Most Used API Endpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topEndpoints.map((endpoint, index) => (
                  <div 
                    key={endpoint.endpoint}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover-scale animate-slide-in-right"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div>
                      <p className="font-mono font-medium">{endpoint.endpoint}</p>
                      <p className="text-sm text-muted-foreground">
                        {endpoint.requests} requests
                      </p>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{endpoint.avgTime}</div>
                        <div className="text-muted-foreground">Avg Time</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-medium ${
                          parseFloat(endpoint.errors) > 1 ? 'text-destructive' : 'text-success'
                        }`}>
                          {endpoint.errors}
                        </div>
                        <div className="text-muted-foreground">Error Rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;