import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Play,
  RefreshCw,
  Terminal,
  Settings,
  Zap,
  Database,
  Plus,
  Minus,
  AlertCircle,
  CheckCircle,
  Server,
  Activity,
  Save,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DevOps = () => {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState("");
  const [selectedEnvironment, setSelectedEnvironment] = useState("");
  const [logLevel, setLogLevel] = useState("");
  const [replicas, setReplicas] = useState(3);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [envConfig, setEnvConfig] = useState({
    DATABASE_URL: "postgresql://localhost:5432/myapp",
    REDIS_URL: "redis://localhost:6379",
    API_KEY: "****",
    JWT_SECRET: "****",
    LOG_LEVEL: "info",
    PORT: "3000",
    NODE_ENV: "production",
    MAX_CONNECTIONS: "100",
  });

  const services = [
    { name: "user-service", status: "running", replicas: 3, version: "v1.2.3" },
    { name: "api-gateway", status: "running", replicas: 5, version: "v2.1.0" },
    { name: "notification-service", status: "error", replicas: 2, version: "v1.0.8" },
    { name: "auth-service", status: "running", replicas: 4, version: "v3.4.1" },
    { name: "payment-service", status: "pending", replicas: 2, version: "v1.5.2" },
  ];

  const environments = ["development", "staging", "production"];
  const logLevels = ["ALL", "DEBUG", "INFO", "WARN", "ERROR"];

  const mockLogs = [
    { timestamp: "2024-01-15 14:32:15.234", level: "INFO", service: "user-service", message: "User authentication successful for user_id: 12345", requestId: "req_abc123" },
    { timestamp: "2024-01-15 14:32:14.891", level: "DEBUG", service: "api-gateway", message: "Route matched: POST /api/v1/users/login", requestId: "req_abc123" },
    { timestamp: "2024-01-15 14:32:13.756", level: "WARN", service: "notification-service", message: "Rate limit approaching for email notifications: 95/100", userId: "12345" },
    { timestamp: "2024-01-15 14:32:12.523", level: "ERROR", service: "payment-service", message: "Payment processing failed: insufficient funds", orderId: "ord_789", userId: "12345" },
    { timestamp: "2024-01-15 14:32:11.445", level: "INFO", service: "auth-service", message: "Token validation completed successfully", tokenId: "jwt_xyz789" },
    { timestamp: "2024-01-15 14:32:10.337", level: "DEBUG", service: "user-service", message: "Database query executed: SELECT * FROM users WHERE id = $1", queryTime: "23ms" },
    { timestamp: "2024-01-15 14:32:09.198", level: "INFO", service: "api-gateway", message: "Health check passed for all downstream services", services: "5/5" },
    { timestamp: "2024-01-15 14:32:08.067", level: "WARN", service: "notification-service", message: "Queue depth increasing: 45 pending notifications", queueName: "email_queue" },
    { timestamp: "2024-01-15 14:32:07.934", level: "ERROR", service: "auth-service", message: "Redis connection timeout", host: "redis-cluster-1", timeout: "5000ms" },
    { timestamp: "2024-01-15 14:32:06.801", level: "DEBUG", service: "payment-service", message: "Webhook received from Stripe", eventType: "payment_intent.succeeded" },
  ];

  const buildHistory = [
    { id: "b-001", service: "user-service", status: "success", duration: "2m 34s", time: "10 minutes ago" },
    { id: "b-002", service: "api-gateway", status: "failed", duration: "1m 12s", time: "15 minutes ago" },
    { id: "b-003", service: "auth-service", status: "success", duration: "3m 45s", time: "22 minutes ago" },
    { id: "b-004", service: "notification-service", status: "success", duration: "1m 58s", time: "1 hour ago" },
  ];

  const handleTriggerBuild = (type: string) => {
    toast({
      title: "Build Triggered",
      description: `${type} build has been queued for ${selectedService}`,
    });
  };

  const handleRestartPod = () => {
    toast({
      title: "Pod Restart Initiated",
      description: `Restarting pods for ${selectedService} in ${selectedEnvironment}`,
    });
  };

  const handleUpdateReplicas = (change: number) => {
    const newReplicas = Math.max(1, replicas + change);
    setReplicas(newReplicas);
    toast({
      title: "Replicas Updated",
      description: `${selectedService} scaled to ${newReplicas} replicas`,
    });
  };

  const handleSetLogLevel = () => {
    toast({
      title: "Log Level Updated",
      description: `${selectedService} log level set to ${logLevel}`,
    });
  };

  const handleManageConfiguration = () => {
    setIsConfigModalOpen(true);
  };

  const handleSaveConfiguration = () => {
    toast({
      title: "Configuration Updated",
      description: `Environment configuration for ${selectedEnvironment} has been saved`,
    });
    setIsConfigModalOpen(false);
  };

  const handleConfigChange = (key: string, value: string) => {
    setEnvConfig(prev => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
      case "success":
        return "success";
      case "error":
      case "failed":
        return "error";
      case "pending":
        return "pending";
      default:
        return "info";
    }
  };

  return (
    <div className="p-6 space-y-8 animate-slide-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Terminal className="h-6 w-6 text-primary" />
            </div>
            Developer Operations
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage builds, deployments, and service operations
          </p>
        </div>
      </div>

      <Tabs defaultValue="builds" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="builds">Builds</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="pods">Pod Management</TabsTrigger>
        </TabsList>

        {/* Builds Tab */}
        <TabsContent value="builds" className="space-y-6">
          {/* Trigger Build Section */}
          <Card className="hover-lift animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Play className="h-5 w-5 text-primary" />
                </div>
                Trigger Build
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service-select">Service</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="focus-ring">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.name} value={service.name}>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              service.status === 'running' ? 'bg-success animate-pulse' : 'bg-muted'
                            }`} />
                            {service.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Build Type</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <Button 
                      onClick={() => handleTriggerBuild("Backend")}
                      disabled={!selectedService}
                      className="flex items-center gap-2 hover-lift"
                    >
                      <Terminal className="h-4 w-4" />
                      Trigger Backend Build
                    </Button>
                    <Button 
                      onClick={() => handleTriggerBuild("Frontend")}
                      disabled={!selectedService}
                      variant="outline"
                      className="flex items-center gap-2 hover-lift"
                    >
                      <Zap className="h-4 w-4" />
                      Trigger Frontend Build
                    </Button>
                    <Button 
                      onClick={() => handleTriggerBuild("Full Stack")}
                      disabled={!selectedService}
                      variant="outline"
                      className="flex items-center gap-2 hover-lift"
                    >
                      <Play className="h-4 w-4" />
                      Trigger Full Stack Build
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Service Status */}
            <Card className="hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Server className="h-5 w-5 text-accent" />
                  </div>
                  Service Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {services.map((service, index) => (
                    <div 
                      key={service.name} 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover-scale animate-slide-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <StatusBadge status={getStatusColor(service.status)}>
                          {service.status}
                        </StatusBadge>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {service.replicas} replicas • {service.version}
                          </p>
                        </div>
                      </div>
                      {service.status === "running" ? (
                        <div className="p-1 rounded-full bg-success/20">
                          <CheckCircle className="h-4 w-4 text-success" />
                        </div>
                      ) : (
                        <div className="p-1 rounded-full bg-destructive/20">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Build History */}
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-success/10">
                  <Activity className="h-5 w-5 text-success" />
                </div>
                Build History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {buildHistory.map((build, index) => (
                  <div 
                    key={build.id} 
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover-scale animate-slide-in-right"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <StatusBadge status={getStatusColor(build.status)}>
                        {build.status}
                      </StatusBadge>
                      <div>
                        <p className="font-medium">{build.service}</p>
                        <p className="text-sm text-muted-foreground">ID: {build.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{build.duration}</p>
                      <p className="text-sm text-muted-foreground">{build.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Log Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Service</Label>
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
                  <Label>Environment</Label>
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

                <div className="space-y-2">
                  <Label>Log Level</Label>
                  <Select value={logLevel} onValueChange={setLogLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select log level" />
                    </SelectTrigger>
                    <SelectContent>
                      {logLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSetLogLevel} disabled={!selectedService || !logLevel}>
                  Set Log Level
                </Button>
                <Button variant="outline" disabled={!selectedService}>
                  View Logs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Log Viewer */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Live Logs
                <Badge variant="outline" className="ml-auto">
                  Streaming
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
                {mockLogs.map((log, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 py-1 hover:bg-white/5 px-2 rounded animate-slide-in-right"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="text-muted-foreground shrink-0 text-xs">
                      {log.timestamp}
                    </span>
                    <span className={`shrink-0 text-xs px-2 py-0.5 rounded ${
                      log.level === 'ERROR' ? 'bg-destructive/20 text-destructive' :
                      log.level === 'WARN' ? 'bg-warning/20 text-warning' :
                      log.level === 'INFO' ? 'bg-success/20 text-success' :
                      'bg-muted/20 text-muted-foreground'
                    }`}>
                      {log.level}
                    </span>
                    <span className="text-primary shrink-0 text-xs">
                      [{log.service}]
                    </span>
                    <span className="text-white flex-1 text-xs">
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <span>Showing last 10 entries</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pod Management Tab */}
        <TabsContent value="pods" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Pod Operations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Service</Label>
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
                    <Label>Environment</Label>
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
                </div>

                <Button 
                  onClick={handleRestartPod}
                  disabled={!selectedService || !selectedEnvironment}
                  className="w-full"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Restart Pods
                </Button>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Scale Replicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Current Replicas</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateReplicas(-1)}
                      disabled={replicas <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{replicas}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateReplicas(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Target Service</Label>
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="config" className="space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Environment Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Service</Label>
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
                  <Label>Environment</Label>
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
              </div>

              <Button 
                onClick={handleManageConfiguration}
                disabled={!selectedService || !selectedEnvironment} 
                className="w-full"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      {/* Environment Configuration Modal */}
      <Dialog open={isConfigModalOpen} onOpenChange={setIsConfigModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Environment Configuration</DialogTitle>
            <DialogDescription>
              Manage environment variables and configuration settings for {selectedEnvironment} environment.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(envConfig).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 gap-4 items-center">
                  <Label className="font-medium">{key}</Label>
                  <Input
                    value={value}
                    onChange={(e) => handleConfigChange(key, e.target.value)}
                    placeholder={`Enter ${key}`}
                    className="col-span-2"
                    type={key.includes("SECRET") || key.includes("KEY") ? "password" : "text"}
                  />
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Add New Variable</h4>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variable
                </Button>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h5 className="font-medium mb-2">Environment Info</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Environment:</span>
                    <span className="ml-2 font-medium">{selectedEnvironment}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Service:</span>
                    <span className="ml-2 font-medium">{selectedService}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span className="ml-2 font-medium">2 hours ago</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Variables:</span>
                    <span className="ml-2 font-medium">{Object.keys(envConfig).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveConfiguration}>
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DevOps;