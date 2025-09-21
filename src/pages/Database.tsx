import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Database as DatabaseIcon,
  Play,
  Download,
  Upload,
  Search,
  Activity,
  BarChart3,
  Settings,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  Save,
  Pencil,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Database = () => {
  const { toast } = useToast();
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedDatabaseToManage, setSelectedDatabaseToManage] = useState("");
  const [configSettings, setConfigSettings] = useState({
    maxConnections: "100",
    connectionTimeout: "30",
    queryTimeout: "300",
    backupRetention: "30",
    logLevel: "info",
    maintenanceWindow: "03:00",
  });

  const databases = [
    { name: "production", status: "healthy", connections: 45, size: "2.3TB", version: "PostgreSQL 14.5" },
    { name: "staging", status: "healthy", connections: 12, size: "890GB", version: "PostgreSQL 14.5" },
    { name: "development", status: "warning", connections: 8, size: "234GB", version: "PostgreSQL 14.3" },
  ];

  const tables = [
    { name: "users", rows: "2.4M", size: "450MB", indexes: 8, status: "healthy" },
    { name: "orders", rows: "5.2M", size: "890MB", indexes: 12, status: "healthy" },
    { name: "products", rows: "120K", size: "89MB", indexes: 6, status: "healthy" },
    { name: "sessions", rows: "890K", size: "234MB", indexes: 4, status: "warning" },
    { name: "logs", rows: "45M", size: "2.1GB", indexes: 3, status: "healthy" },
  ];

  const queries = [
    { id: "Q-001", query: "SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '7 days'", duration: "0.12s", status: "completed" },
    { id: "Q-002", query: "UPDATE orders SET status = 'processed' WHERE payment_confirmed = true", duration: "2.34s", status: "running" },
    { id: "Q-003", query: "SELECT * FROM products p JOIN categories c ON p.category_id = c.id", duration: "0.89s", status: "completed" },
    { id: "Q-004", query: "DELETE FROM sessions WHERE expires_at < NOW()", duration: "failed", status: "error" },
  ];

  const performanceMetrics = [
    { name: "Query Response Time", value: "12ms", trend: "down", status: "good" },
    { name: "Active Connections", value: "45/100", trend: "stable", status: "good" },
    { name: "Cache Hit Ratio", value: "94.5%", trend: "up", status: "good" },
    { name: "Disk Usage", value: "78%", trend: "up", status: "warning" },
  ];

  const handleExecuteQuery = () => {
    if (!sqlQuery.trim()) return;
    
    toast({
      title: "Query Executed",
      description: "SQL query has been executed successfully",
    });
  };

  const handleBackup = () => {
    toast({
      title: "Backup Started",
      description: `Creating backup for ${selectedDatabase} database`,
    });
  };

  const handleManageDatabase = (dbName: string) => {
    setSelectedDatabaseToManage(dbName);
    setIsManageModalOpen(true);
  };

  const handleSaveConfiguration = () => {
    toast({
      title: "Configuration Updated",
      description: "Environment configuration has been saved successfully",
    });
    setIsConfigModalOpen(false);
  };

  const handleConfigurationChange = (key: string, value: string) => {
    setConfigSettings(prev => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "completed":
      case "good":
        return "success";
      case "warning":
        return "pending";
      case "error":
      case "failed":
        return "error";
      case "running":
        return "info";
      default:
        return "info";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <BarChart3 className="h-4 w-4 text-success" />;
      case "down":
        return <BarChart3 className="h-4 w-4 text-success rotate-180" />;
      case "stable":
        return <Activity className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-6 space-y-8 animate-slide-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <DatabaseIcon className="h-6 w-6 text-primary" />
            </div>
            Database Management
          </h1>
          <p className="text-muted-foreground text-lg">
            Multi-tier database management, monitoring, and ER diagram visualization
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button className="flex items-center gap-2" onClick={handleBackup}>
            <Upload className="h-4 w-4" />
            Create Backup
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="qa">QA</TabsTrigger>
          <TabsTrigger value="sandbox">Sandbox</TabsTrigger>
          <TabsTrigger value="er-diagram">ER Diagram</TabsTrigger>
          <TabsTrigger value="query">Query Console</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Database Status */}
            {databases.map((db, index) => (
              <Card key={db.name} className="hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DatabaseIcon className="h-5 w-5" />
                      {db.name}
                    </div>
                    <StatusBadge status={getStatusColor(db.status)}>
                      {db.status}
                    </StatusBadge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Connections</p>
                      <p className="font-medium">{db.connections}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Size</p>
                      <p className="font-medium">{db.size}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Version</p>
                    <p className="font-medium">{db.version}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full hover-scale"
                    onClick={() => handleManageDatabase(db.name)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Multi-tier Summary */}
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Activity className="h-5 w-5 text-accent" />
                </div>
                Multi-Tier Database Environment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-destructive/10">
                  <h3 className="font-semibold text-destructive mb-2">Production</h3>
                  <p className="text-2xl font-bold text-destructive">2.3TB</p>
                  <p className="text-sm text-muted-foreground">45 active connections</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-warning/10">
                  <h3 className="font-semibold text-warning mb-2">QA Testing</h3>
                  <p className="text-2xl font-bold text-warning">890GB</p>
                  <p className="text-sm text-muted-foreground">12 active connections</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-success/10">
                  <h3 className="font-semibold text-success mb-2">Sandbox</h3>
                  <p className="text-2xl font-bold text-success">234GB</p>
                  <p className="text-sm text-muted-foreground">8 active connections</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tables Overview */}
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-accent/10">
                  <BarChart3 className="h-5 w-5 text-accent" />
                </div>
                Database Tables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tables.map((table, index) => (
                  <div 
                    key={table.name} 
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover-scale animate-slide-in-right"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <StatusBadge status={getStatusColor(table.status)}>
                        {table.status}
                      </StatusBadge>
                      <div>
                        <p className="font-medium">{table.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {table.rows} rows • {table.indexes} indexes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{table.size}</p>
                        <p className="text-muted-foreground">Size</p>
                      </div>
                      <Button size="sm" variant="outline" className="hover-scale">
                        <Search className="h-4 w-4 mr-2" />
                        Browse
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Production Environment */}
        <TabsContent value="production" className="space-y-6">
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <Shield className="h-5 w-5 text-destructive" />
                </div>
                Production Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={metric.name} className="text-center p-4 rounded-lg bg-muted/30">
                      <p className="text-sm text-muted-foreground mb-1">{metric.name}</p>
                      <p className="text-xl font-bold">{metric.value}</p>
                      <div className="flex justify-center mt-2">
                        <StatusBadge status={getStatusColor(metric.status)}>
                          {metric.status}
                        </StatusBadge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-destructive">Production Access</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Critical production environment. All changes require approval and are logged.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* QA Environment */}
        <TabsContent value="qa" className="space-y-6">
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Activity className="h-5 w-5 text-warning" />
                </div>
                QA Testing Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Test Scenarios</p>
                    <p className="text-2xl font-bold">245</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Data Sets</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Last Refresh</p>
                    <p className="text-2xl font-bold">2h</p>
                  </div>
                </div>
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-warning">QA Environment</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Testing environment with sanitized production data. Safe for experimentation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sandbox Environment */}
        <TabsContent value="sandbox" className="space-y-6">
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-success/10">
                  <Play className="h-5 w-5 text-success" />
                </div>
                Sandbox Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Active Users</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Experiments</p>
                    <p className="text-2xl font-bold">34</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Reset Schedule</p>
                    <p className="text-2xl font-bold">Daily</p>
                  </div>
                </div>
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Play className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-success">Sandbox Environment</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Development sandbox with sample data. Full access for experimentation and testing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ER Diagram */}
        <TabsContent value="er-diagram" className="space-y-6">
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                Entity Relationship Diagram
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Select value={selectedDatabase} onValueChange={setSelectedDatabase}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select database" />
                    </SelectTrigger>
                    <SelectContent>
                      {databases.map((db) => (
                        <SelectItem key={db.name} value={db.name}>
                          {db.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Diagram
                  </Button>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-dashed border-primary/20 rounded-lg p-12 text-center min-h-[500px] flex items-center justify-center">
                  <div className="space-y-4 max-w-md">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Interactive ER Diagram</h3>
                    <p className="text-muted-foreground">
                      Visual representation of database schema, table relationships, and constraints. 
                      Click on tables to explore relationships and view detailed schema information.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded border shadow-sm">
                        <div className="font-mono text-sm font-semibold mb-2">users</div>
                        <div className="text-xs space-y-1 text-muted-foreground">
                          <div>id (PK)</div>
                          <div>email</div>
                          <div>created_at</div>
                        </div>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded border shadow-sm">
                        <div className="font-mono text-sm font-semibold mb-2">orders</div>
                        <div className="text-xs space-y-1 text-muted-foreground">
                          <div>id (PK)</div>
                          <div>user_id (FK)</div>
                          <div>total</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Query Console */}
        <TabsContent value="query" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Query Editor */}
            <Card className="lg:col-span-2 hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Play className="h-5 w-5 text-primary" />
                  </div>
                  SQL Query Console
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Database</Label>
                    <Select value={selectedDatabase} onValueChange={setSelectedDatabase}>
                      <SelectTrigger className="focus-ring">
                        <SelectValue placeholder="Select database" />
                      </SelectTrigger>
                      <SelectContent>
                        {databases.map((db) => (
                          <SelectItem key={db.name} value={db.name}>
                            {db.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Table</Label>
                    <Select value={selectedTable} onValueChange={setSelectedTable}>
                      <SelectTrigger className="focus-ring">
                        <SelectValue placeholder="Select table" />
                      </SelectTrigger>
                      <SelectContent>
                        {tables.map((table) => (
                          <SelectItem key={table.name} value={table.name}>
                            {table.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>SQL Query</Label>
                  <Textarea
                    placeholder="Enter your SQL query here..."
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    className="min-h-[200px] font-mono text-sm focus-ring"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Button 
                    onClick={handleExecuteQuery}
                    disabled={!sqlQuery.trim() || !selectedDatabase}
                    className="flex items-center gap-2 hover-lift"
                  >
                    <Play className="h-4 w-4" />
                    Execute Query
                  </Button>
                  <Button variant="outline" className="hover-scale">
                    <Download className="h-4 w-4 mr-2" />
                    Export Results
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Queries */}
            <Card className="hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Clock className="h-5 w-5 text-success" />
                  </div>
                  Recent Queries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {queries.map((query, index) => (
                    <div 
                      key={query.id} 
                      className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover-scale animate-slide-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {query.id}
                        </Badge>
                        <StatusBadge status={getStatusColor(query.status)}>
                          {query.status}
                        </StatusBadge>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground mb-2 line-clamp-2">
                        {query.query}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{query.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={metric.name} className="hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-muted-foreground">{metric.name}</div>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-1 mt-2">
                    <StatusBadge status={getStatusColor(metric.status)}>
                      {metric.status}
                    </StatusBadge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle>Database Performance Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Performance Monitoring</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Real-time database performance metrics, slow query analysis, and optimization recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup & Restore */}
        <TabsContent value="backup" className="space-y-6">
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Backup & Restore Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Create Backup</Label>
                    <div className="mt-2 space-y-2">
                      <Select value={selectedDatabase} onValueChange={setSelectedDatabase}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select database to backup" />
                        </SelectTrigger>
                        <SelectContent>
                          {databases.map((db) => (
                            <SelectItem key={db.name} value={db.name}>
                              {db.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        onClick={handleBackup}
                        disabled={!selectedDatabase}
                        className="w-full hover-lift"
                      >
                        Create Backup
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Recent Backups</Label>
                    <div className="mt-2 space-y-2">
                      {[
                        { name: "production_backup_2024-01-15", size: "2.3GB", date: "2 hours ago" },
                        { name: "staging_backup_2024-01-14", size: "890MB", date: "1 day ago" },
                        { name: "production_backup_2024-01-13", size: "2.2GB", date: "2 days ago" },
                      ].map((backup) => (
                        <div key={backup.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <div>
                            <p className="text-sm font-medium">{backup.name}</p>
                            <p className="text-xs text-muted-foreground">{backup.size} • {backup.date}</p>
                          </div>
                          <Button size="sm" variant="outline" className="hover-scale">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Database Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">Security Configuration</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Manage database access controls, encryption settings, and security policies.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-success/10">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="font-medium text-success">Encryption</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Data at rest encrypted</p>
                  </div>

                  <div className="p-4 rounded-lg bg-success/10">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="font-medium text-success">SSL/TLS</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Connections secured</p>
                  </div>

                  <div className="p-4 rounded-lg bg-warning/10">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-warning" />
                      <span className="font-medium text-warning">Audit Logs</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Review required</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Manage Database Modal */}
      <Dialog open={isManageModalOpen} onOpenChange={setIsManageModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Database: {selectedDatabaseToManage}</DialogTitle>
            <DialogDescription>
              Configure database settings, connections, and monitoring for {selectedDatabaseToManage} environment.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Connection Pool Size</Label>
                <Input type="number" defaultValue="50" />
              </div>
              <div className="space-y-2">
                <Label>Query Timeout (seconds)</Label>
                <Input type="number" defaultValue="30" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Backup Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Log Level</Label>
                <Select defaultValue="info">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Maintenance Window</Label>
              <Input type="time" defaultValue="03:00" />
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Access Control</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Read-only access</span>
                  <Badge variant="outline">5 users</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Write access</span>
                  <Badge variant="outline">2 users</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Admin access</span>
                  <Badge variant="outline">1 user</Badge>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsManageModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({
                title: "Database Updated",
                description: `Configuration for ${selectedDatabaseToManage} has been saved`,
              });
              setIsManageModalOpen(false);
            }}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Database;