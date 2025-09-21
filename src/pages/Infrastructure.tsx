import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cloud,
  Server,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Zap,
  RefreshCw,
  Play,
  Square,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Infrastructure = () => {
  const { toast } = useToast();
  const [selectedEnvironment, setSelectedEnvironment] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const environments = ["development", "staging", "production"];

  const services = [
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
  ];

  const deploymentHistory = [
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
  ];

  const infraMetrics = [
    {
      name: "Total Services",
      value: "24",
      change: "+2",
      status: "success",
      icon: Server,
    },
    {
      name: "CPU Usage",
      value: "68%",
      change: "+5%",
      status: "warning",
      icon: Cpu,
    },
    {
      name: "Memory Usage",
      value: "72%",
      change: "+3%",
      status: "warning",
      icon: MemoryStick,
    },
    {
      name: "Network I/O",
      value: "1.2GB/s",
      change: "-0.1GB/s",
      status: "success",
      icon: Network,
    },
  ];

  const alerts = [
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
  ];

  const handleTriggerDeploy = () => {
    if (!selectedService || !selectedEnvironment) {
      toast({
        title: "Missing Information",
        description: "Please select both service and environment",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Deployment Triggered",
      description: `Deploying ${selectedService} to ${selectedEnvironment}`,
    });
  };

  const handleRestartService = () => {
    if (!selectedService) {
      toast({
        title: "Missing Information",
        description: "Please select a service to restart",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Service Restart Initiated",
      description: `Restarting ${selectedService}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
      case "success":
        return "text-success bg-success/10 border-success/20";
      case "error":
      case "failed":
        return "text-destructive bg-destructive/10 border-destructive/20";
      case "warning":
        return "text-warning bg-warning/10 border-warning/20";
      case "pending":
        return "text-primary bg-primary/10 border-primary/20";
      default:
        return "text-muted-foreground bg-muted border-muted";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-destructive bg-destructive/10 border-destructive/20";
      case "warning":
        return "text-warning bg-warning/10 border-warning/20";
      case "info":
        return "text-primary bg-primary/10 border-primary/20";
      default:
        return "text-muted-foreground bg-muted border-muted";
    }
  };

  return (
    <div className="p-6 space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Infrastructure & Monitoring</h1>
          <p className="text-muted-foreground">
            Monitor services, manage deployments, and track system health
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {infraMetrics.map((metric) => (
          <Card key={metric.name} className="card-shadow transition-smooth hover:glow-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <metric.icon className={`h-5 w-5 ${getStatusColor(metric.status).split(' ')[0]}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span className={metric.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                  {metric.change}
                </span>
                <span className="ml-1">from yesterday</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          {/* Service Management */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Service Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service</label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.name} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Environment</label>
                  <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      {environments.map((env) => (
                        <SelectItem key={env} value={env}>
                          {env}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end gap-2">
                  <Button onClick={handleRestartService} className="flex-1">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Status Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.name} className="card-shadow transition-smooth hover:glow-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {service.version} • {service.replicas} replicas
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">CPU</span>
                      </div>
                      <p className="text-lg font-semibold">{service.cpu}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MemoryStick className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Memory</span>
                      </div>
                      <p className="text-lg font-semibold">{service.memory}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Uptime</span>
                    </div>
                    <p className="text-lg font-semibold text-success">{service.uptime}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Activity className="mr-2 h-4 w-4" />
                      Logs
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Metrics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Deployments Tab */}
        <TabsContent value="deployments" className="space-y-6">
          {/* Deploy Actions */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Deploy Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service</label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.name} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Environment</label>
                  <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      {environments.map((env) => (
                        <SelectItem key={env} value={env}>
                          {env}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button onClick={handleTriggerDeploy} className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Deploy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deployment History */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Deployment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deploymentHistory.map((deployment) => (
                  <div key={deployment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={getStatusColor(deployment.status)}>
                        {deployment.status}
                      </Badge>
                      <div>
                        <p className="font-medium">{deployment.service}</p>
                        <p className="text-sm text-muted-foreground">
                          {deployment.version} → {deployment.environment}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{deployment.duration}</p>
                      <p className="text-sm text-muted-foreground">
                        by {deployment.deployedBy} • {deployment.deployedAt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Monitoring Dashboard</h3>
                <p className="text-muted-foreground mb-4">
                  Real-time metrics and monitoring charts would be displayed here
                </p>
                <Button variant="outline">
                  View Full Monitoring Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex-shrink-0">
                      {alert.severity === "critical" && (
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      )}
                      {alert.severity === "warning" && (
                        <AlertTriangle className="h-5 w-5 text-warning" />
                      )}
                      {alert.severity === "info" && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <span className="text-sm font-medium">{alert.service}</span>
                      </div>
                      <p className="text-sm mb-1">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Resolve
                    </Button>
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

export default Infrastructure;