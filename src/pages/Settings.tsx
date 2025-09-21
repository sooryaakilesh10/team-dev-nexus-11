import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Zap,
  Save,
  RefreshCw,
  Key,
  Cloud,
  Database,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  // General settings state
  const [platformName, setPlatformName] = useState("IDP Platform");
  const [description, setDescription] = useState("Internal Developer Platform for production operations");
  const [timezone, setTimezone] = useState("UTC");
  const [theme, setTheme] = useState("dark");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState("critical");
  
  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [apiRateLimit, setApiRateLimit] = useState("1000");
  
  // Integration settings
  const [kubernetesEndpoint, setKubernetesEndpoint] = useState("");
  const [databaseUrl, setDatabaseUrl] = useState("");
  const [monitoringEnabled, setMonitoringEnabled] = useState(true);
  const [backupEnabled, setBackupEnabled] = useState(true);

  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "General configuration has been updated successfully",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notifications Updated",
      description: "Notification preferences have been saved",
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Updated",
      description: "Security configuration has been applied",
    });
  };

  const handleSaveIntegrations = () => {
    toast({
      title: "Integrations Configured",
      description: "Integration settings have been updated",
    });
  };

  const configCategories = [
    {
      name: "Platform Configuration",
      status: "configured",
      description: "Basic platform settings and preferences",
      lastUpdated: "2 hours ago",
    },
    {
      name: "Kubernetes Integration",
      status: "pending",
      description: "Container orchestration and deployment settings",
      lastUpdated: "1 day ago",
    },
    {
      name: "Database Configuration", 
      status: "configured",
      description: "Production database connections and settings",
      lastUpdated: "3 hours ago",
    },
    {
      name: "Monitoring & Alerts",
      status: "warning",
      description: "System monitoring and alerting configuration",
      lastUpdated: "5 hours ago",
    },
    {
      name: "Security Policies",
      status: "configured",
      description: "Access control and security configurations",
      lastUpdated: "1 hour ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "configured":
        return "text-success bg-success/10 border-success/20";
      case "pending":
        return "text-warning bg-warning/10 border-warning/20";
      case "warning":
        return "text-destructive bg-destructive/10 border-destructive/20";
      default:
        return "text-muted-foreground bg-muted border-muted";
    }
  };

  return (
    <div className="p-6 space-y-8 animate-slide-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <SettingsIcon className="h-6 w-6 text-primary" />
            </div>
            Platform Configuration
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage platform settings, integrations, and system configuration
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Configuration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {configCategories.map((category, index) => (
          <Card key={category.name} className="hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  {category.name.includes("Kubernetes") ? <Cloud className="h-5 w-5 text-primary" /> :
                   category.name.includes("Database") ? <Database className="h-5 w-5 text-primary" /> :
                   category.name.includes("Security") ? <Shield className="h-5 w-5 text-primary" /> :
                   category.name.includes("Monitoring") ? <Bell className="h-5 w-5 text-primary" /> :
                   <SettingsIcon className="h-5 w-5 text-primary" />}
                </div>
                <Badge variant="outline" className={getStatusColor(category.status)}>
                  {category.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
                <p className="text-xs text-muted-foreground">Updated {category.lastUpdated}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="hover-lift animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Platform Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input
                    id="platformName"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className="focus-ring"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="focus-ring">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Platform Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px] focus-ring"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Theme Preference</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="focus-ring">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSaveGeneral} className="flex items-center gap-2 hover-lift">
                <Save className="h-4 w-4" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="hover-lift animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive alerts and updates via email</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Browser push notifications for critical alerts</p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Alert Threshold</Label>
                <Select value={alertThreshold} onValueChange={setAlertThreshold}>
                  <SelectTrigger className="focus-ring">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Alerts</SelectItem>
                    <SelectItem value="high">High & Critical Only</SelectItem>
                    <SelectItem value="critical">Critical Only</SelectItem>
                    <SelectItem value="none">No Alerts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSaveNotifications} className="flex items-center gap-2 hover-lift">
                <Save className="h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="hover-lift animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Enhanced security for admin access</p>
                  </div>
                  <Switch
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="focus-ring"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiRateLimit">API Rate Limit (requests/hour)</Label>
                  <Input
                    id="apiRateLimit"
                    type="number"
                    value={apiRateLimit}
                    onChange={(e) => setApiRateLimit(e.target.value)}
                    className="focus-ring"
                  />
                </div>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-warning">Security Notice</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Changes to security settings will require admin approval and may log out all users.
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveSecurity} className="flex items-center gap-2 hover-lift">
                <Save className="h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className="hover-lift animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                System Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                {/* Kubernetes Configuration */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-4">
                    <Cloud className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Kubernetes Configuration</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="kubernetesEndpoint">Kubernetes API Endpoint</Label>
                      <Input
                        id="kubernetesEndpoint"
                        placeholder="https://kubernetes.example.com:6443"
                        value={kubernetesEndpoint}
                        onChange={(e) => setKubernetesEndpoint(e.target.value)}
                        className="focus-ring"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="hover-scale">
                        <Key className="h-4 w-4 mr-2" />
                        Configure Auth
                      </Button>
                      <Button size="sm" variant="outline" className="hover-scale">
                        Test Connection
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Database Configuration */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-4">
                    <Database className="h-5 w-5 text-success" />
                    <h3 className="font-semibold">Database Configuration</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="databaseUrl">Database Connection String</Label>
                      <Input
                        id="databaseUrl"
                        placeholder="postgresql://user:pass@host:5432/dbname"
                        value={databaseUrl}
                        onChange={(e) => setDatabaseUrl(e.target.value)}
                        type="password"
                        className="focus-ring"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="hover-scale">
                        Test Connection
                      </Button>
                      <Button size="sm" variant="outline" className="hover-scale">
                        Migrate Schema
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Monitoring & Backup Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium">System Monitoring</p>
                        <p className="text-sm text-muted-foreground">Enable performance monitoring</p>
                      </div>
                      <Switch
                        checked={monitoringEnabled}
                        onCheckedChange={setMonitoringEnabled}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium">Automated Backups</p>
                        <p className="text-sm text-muted-foreground">Daily database backups</p>
                      </div>
                      <Switch
                        checked={backupEnabled}
                        onCheckedChange={setBackupEnabled}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-success">Integration Status</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      All integrations are properly configured and operational.
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveIntegrations} className="flex items-center gap-2 hover-lift">
                <Save className="h-4 w-4" />
                Save Integration Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;