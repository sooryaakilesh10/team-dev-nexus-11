import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Filter,
  Search,
  Zap,
  Shield,
  Activity,
  Server,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Alerts = () => {
  const { toast } = useToast();
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const alerts = [
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
  ];

  const alertRules = [
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
  ];

  const alertStats = [
    { name: "Active Alerts", value: 12, trend: "up", severity: "critical" },
    { name: "Resolved Today", value: 28, trend: "down", severity: "success" },
    { name: "Average Resolution", value: "15m", trend: "stable", severity: "info" },
    { name: "False Positives", value: "3%", trend: "down", severity: "warning" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-destructive bg-destructive/10 border-destructive/20";
      case "high":
        return "text-warning bg-warning/10 border-warning/20";
      case "medium":
        return "text-primary bg-primary/10 border-primary/20";
      case "low":
        return "text-muted-foreground bg-muted border-muted";
      default:
        return "text-muted-foreground bg-muted border-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "error";
      case "acknowledged":
        return "pending";
      case "investigating":
        return "info";
      case "resolved":
        return "success";
      default:
        return "info";
    }
  };

  const handleAcknowledge = (alertId: string) => {
    toast({
      title: "Alert Acknowledged",
      description: `Alert ${alertId} has been acknowledged`,
    });
  };

  const handleResolve = (alertId: string) => {
    toast({
      title: "Alert Resolved",
      description: `Alert ${alertId} has been marked as resolved`,
    });
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case "web-server":
        return <Server className="h-4 w-4" />;
      case "database":
        return <Activity className="h-4 w-4" />;
      case "api-gateway":
        return <Zap className="h-4 w-4" />;
      case "auth-service":
        return <Shield className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    return (selectedSeverity === "all" || alert.severity === selectedSeverity) &&
           (selectedStatus === "all" || alert.status === selectedStatus) &&
           (!searchTerm || alert.title.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="p-6 space-y-8 animate-slide-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            System Alerts & Notifications
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitor system alerts, configure notifications, and manage incident responses
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configure
          </Button>
          <Button className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Create Alert
          </Button>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {alertStats.map((stat, index) => (
          <Card key={stat.name} className="hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-muted-foreground">{stat.name}</div>
                <Badge variant="outline" className={getSeverityColor(stat.severity)}>
                  {stat.trend}
                </Badge>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="rules">Alert Rules</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
        </TabsList>

        {/* Active Alerts */}
        <TabsContent value="active" className="space-y-6">
          {/* Filters */}
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                    <SelectTrigger>
                      <SelectValue placeholder="All severities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="acknowledged">Acknowledged</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedSeverity("all");
                      setSelectedStatus("all");
                      setSearchTerm("");
                    }}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert, index) => (
              <Card key={alert.id} className="hover-lift animate-scale-in transition-smooth hover:glow-primary" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <StatusBadge status={getStatusColor(alert.status)}>
                          {alert.status}
                        </StatusBadge>
                        <span className="text-sm text-muted-foreground">{alert.id}</span>
                      </div>

                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        {getServiceIcon(alert.service)}
                        {alert.title}
                      </h3>

                      <p className="text-muted-foreground mb-4">{alert.description}</p>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Server className="h-4 w-4" />
                          <span>{alert.service}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{alert.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          <span>{alert.source}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {alert.status === "active" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAcknowledge(alert.id)}
                            className="hover-scale"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Acknowledge
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleResolve(alert.id)}
                            className="hover-scale"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Resolve
                          </Button>
                        </>
                      )}
                      {alert.status === "acknowledged" && (
                        <Button
                          size="sm"
                          onClick={() => handleResolve(alert.id)}
                          className="hover-scale"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <Card className="animate-fade-in">
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Alerts Found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || selectedSeverity || selectedStatus 
                    ? "No alerts match your current filters."
                    : "All systems are running smoothly!"
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-6">
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Bell className="h-5 w-5 text-accent" />
                </div>
                Alert Assignments & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current User Status */}
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-primary">Your Status</h4>
                    <p className="text-sm text-muted-foreground">Let others know you're investigating alerts</p>
                  </div>
                  <Button size="sm" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Mark as Investigating
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Status: <Badge variant="outline" className="text-primary bg-primary/10">Available</Badge>
                </div>
              </div>

              {/* Currently Working On */}
              <div>
                <h4 className="font-medium mb-4">People Currently Working on Alerts</h4>
                <div className="space-y-3">
                  {[
                    { name: "Alex Johnson", alert: "ALT-001", status: "investigating", time: "15 minutes ago" },
                    { name: "Sarah Chen", alert: "ALT-004", status: "resolving", time: "32 minutes ago" },
                    { name: "Mike Rodriguez", alert: "ALT-002", status: "monitoring", time: "1 hour ago" },
                  ].map((person, index) => (
                    <div 
                      key={person.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 animate-slide-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-sm font-medium">{person.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p className="font-medium">{person.name}</p>
                          <p className="text-sm text-muted-foreground">Working on {person.alert}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={person.status === "investigating" ? "pending" : person.status === "resolving" ? "info" : "success"}>
                          {person.status}
                        </StatusBadge>
                        <p className="text-xs text-muted-foreground mt-1">{person.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assignment Notifications */}
              <div>
                <h4 className="font-medium mb-4">Assignment Notifications</h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-success/20">
                        <CheckCircle className="h-4 w-4 text-success" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Alert ALT-005 Resolved</p>
                        <p className="text-sm text-muted-foreground">Mike Rodriguez successfully resolved the disk space alert on staging server</p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-warning/20">
                        <Clock className="h-4 w-4 text-warning" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">New Assignment: ALT-001</p>
                        <p className="text-sm text-muted-foreground">High CPU usage alert assigned to Alex Johnson</p>
                        <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alert Rules */}
        <TabsContent value="rules" className="space-y-6">
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Alert Rules Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map((rule, index) => (
                  <div 
                    key={rule.name} 
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover-scale animate-slide-in-right"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${rule.enabled ? 'bg-success animate-pulse' : 'bg-muted'}`} />
                      <div>
                        <p className="font-medium">{rule.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">{rule.condition}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={getSeverityColor(rule.severity)}>
                        {rule.severity}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{rule.service}</span>
                      <Button size="sm" variant="outline" className="hover-scale">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="space-y-6">
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Alert History & Analytics</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      View historical alert data, trends, and comprehensive analytics to optimize your monitoring strategy.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Assistant */}
        <TabsContent value="ai-assistant" className="space-y-6">
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                  <Zap className="h-5 w-5 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent" />
                </div>
                AI Alert Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200/50 dark:border-purple-800/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                      AI-Powered Alert Analysis
                    </p>
                    <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                      Get intelligent insights about your alerts, root cause analysis, and proactive recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <ChatInterface alerts={alerts} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Alerts;