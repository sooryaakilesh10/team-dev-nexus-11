import { useState, useEffect } from "react";
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
import {
  dashboardApi,
  servicesApi,
  alertsApi,
  buildsApi,
} from "@/services/api";

const Infrastructure = () => {
  const { toast } = useToast();
  const [selectedEnvironment, setSelectedEnvironment] = useState("production");
  const [selectedService, setSelectedService] = useState("");

  const [services, setServices] = useState([]);
  const [deploymentHistory, setDeploymentHistory] = useState([]);
  const [infraMetrics, setInfraMetrics] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const environments = ["sandbox", "qa", "production"];

  useEffect(() => {
    const fetchInfrastructureData = async () => {
      setLoading(true);
      try {
        // Fetch services
        const servicesResponse = await servicesApi.getServices({
          environment: selectedEnvironment,
        });
        if (servicesResponse.success) {
          setServices(servicesResponse.data);
        }

        // Fetch deployment history
        const deploymentsResponse = await dashboardApi.getRecentDeployments();
        if (deploymentsResponse.success) {
          setDeploymentHistory(deploymentsResponse.data);
        }

        // Fetch infrastructure metrics
        const metricsResponse = await dashboardApi.getStats();
        if (metricsResponse.success) {
          const metricsWithIcons = metricsResponse.data.map((metric: any) => {
            let icon = Server;
            if (metric.name === "CPU Usage") icon = Cpu;
            if (metric.name === "Memory Usage") icon = MemoryStick;
            if (metric.name === "Network I/O") icon = Network;
            return { ...metric, icon };
          });
          setInfraMetrics(metricsWithIcons);
        }

        // Fetch alerts
        const alertsResponse = await alertsApi.getAlerts();
        if (alertsResponse.success) {
          setAlerts(alertsResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch infrastructure data", error);
        toast({
          title: "An unexpected error occurred",
          description: "Could not fetch infrastructure data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInfrastructureData();
  }, [selectedEnvironment, toast]);

  const handleTriggerDeploy = async () => {
    if (!selectedService || !selectedEnvironment) {
      toast({
        title: "Missing Information",
        description: "Please select both service and environment",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await buildsApi.triggerBuild({
        service: selectedService,
        environment: selectedEnvironment,
        type: "deploy",
      });

       if (response.success) {
         toast({
           title: "Deployment Triggered",
           description: `Deploying ${selectedService} to ${selectedEnvironment}`,
         });
       }
    } catch (error) {
      toast({
        title: "Deployment Error",
        description:
          "An unexpected error occurred while triggering the deployment.",
        variant: "destructive",
      });
      console.error("Deployment trigger failed", error);
    }
  };

  const handleRestartService = async () => {
    if (!selectedService) {
      toast({
        title: "Missing Information",
        description: "Please select a service to restart",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await servicesApi.restartService(
        selectedService,
        selectedEnvironment
      );
       if (response.success) {
         toast({
           title: "Service Restart Initiated",
           description: `Restarting ${selectedService}`,
         });
       }
    } catch (error) {
      toast({
        title: "Restart Error",
        description:
          "An unexpected error occurred while restarting the service.",
        variant: "destructive",
      });
      console.error("Service restart failed", error);
    }
  };

  const handleResolveAlert = async (alertId: string) => {
    try {
      const response = await alertsApi.resolveAlert(alertId);
      if (response.success) {
        toast({
          title: "Alert Resolved",
          description: "Alert has been marked as resolved",
        });
        // Refresh alerts data
        const alertsResponse = await alertsApi.getAlerts();
        if (alertsResponse.success) {
          setAlerts(alertsResponse.data);
        }
      }
    } catch (error) {
      toast({
        title: "Resolution Error",
        description: "An unexpected error occurred while resolving the alert.",
        variant: "destructive",
      });
      console.error("Alert resolution failed", error);
    }
  };

  const handleViewLogs = async (serviceName: string) => {
    try {
      const response = await servicesApi.getServiceLogs(serviceName, { lines: 100 });
      if (response.success) {
        toast({
          title: "Logs Retrieved",
          description: `Fetched logs for ${serviceName}`,
        });
        // In a real app, this would open a logs modal or navigate to logs page
        console.log('Service logs:', response.data);
      }
    } catch (error) {
      toast({
        title: "Logs Error",
        description: "Could not retrieve service logs.",
        variant: "destructive",
      });
      console.error("Failed to get logs", error);
    }
  };

  const handleViewMetrics = (serviceName: string) => {
    toast({
      title: "Metrics Dashboard",
      description: `Opening metrics for ${serviceName}`,
    });
    // In a real app, this would navigate to a metrics dashboard
    console.log('Opening metrics for:', serviceName);
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
        {loading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="card-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                <div className="h-5 w-5 bg-muted animate-pulse rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          infraMetrics.map((metric) => (
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
          ))
        )}
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
                      <SelectValue placeholder="Select service (pod-name)" />
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
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewLogs(service.name)}
                    >
                      <Activity className="mr-2 h-4 w-4" />
                      Logs
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewMetrics(service.name)}
                    >
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
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleResolveAlert(alert.id)}
                    >
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