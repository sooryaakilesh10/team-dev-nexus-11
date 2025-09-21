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
  TestTube,
  Play,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  Target,
  FileText,
  Bug,
  Plus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import CreateTestModal from "@/components/CreateTestModal";

const QATesting = () => {
  const { toast } = useToast();
  const [selectedSuite, setSelectedSuite] = useState("");
  const [selectedEnvironment, setSelectedEnvironment] = useState("");
  const [createTestModalOpen, setCreateTestModalOpen] = useState(false);

  const testSuites = [
    { name: "API Integration Tests", status: "running", tests: 45, passed: 42, failed: 2, pending: 1 },
    { name: "UI End-to-End Tests", status: "passed", tests: 32, passed: 32, failed: 0, pending: 0 },
    { name: "Performance Tests", status: "failed", tests: 15, passed: 12, failed: 3, pending: 0 },
    { name: "Security Tests", status: "pending", tests: 28, passed: 0, failed: 0, pending: 28 },
    { name: "Load Tests", status: "passed", tests: 8, passed: 8, failed: 0, pending: 0 },
  ];

  const testResults = [
    { id: "TR-001", suite: "API Integration", name: "User Authentication", status: "passed", duration: "2.3s", coverage: "95%" },
    { id: "TR-002", suite: "UI E2E", name: "Login Flow", status: "passed", duration: "4.1s", coverage: "88%" },
    { id: "TR-003", suite: "Performance", name: "Database Query", status: "failed", duration: "15.2s", coverage: "76%" },
    { id: "TR-004", suite: "API Integration", name: "Payment Processing", status: "failed", duration: "8.7s", coverage: "92%" },
    { id: "TR-005", suite: "Load", name: "Concurrent Users", status: "passed", duration: "45.1s", coverage: "85%" },
  ];

  const coverageData = [
    { name: "Covered", value: 87, fill: "hsl(var(--success))" },
    { name: "Uncovered", value: 13, fill: "hsl(var(--muted))" },
  ];

  const testTrends = [
    { name: "Mon", passed: 145, failed: 12, total: 157 },
    { name: "Tue", passed: 152, failed: 8, total: 160 },
    { name: "Wed", passed: 148, failed: 15, total: 163 },
    { name: "Thu", passed: 156, failed: 6, total: 162 },
    { name: "Fri", passed: 159, failed: 9, total: 168 },
  ];

  const environments = ["development", "staging", "production"];

  const handleRunTests = (suite: string) => {
    toast({
      title: "Tests Started",
      description: `Running ${suite} test suite...`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "success";
      case "failed":
        return "error";
      case "running":
        return "pending";
      case "pending":
        return "info";
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
              <TestTube className="h-6 w-6 text-primary" />
            </div>
            QA Testing & Automation
          </h1>
          <p className="text-muted-foreground text-lg">
            Automated testing, results tracking, and quality metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setCreateTestModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Create Test
          </Button>
          <Button className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Run All Tests
          </Button>
        </div>
      </div>

      <Tabs defaultValue="suites" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="suites">Test Suites</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="coverage">Coverage</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        {/* Test Suites */}
        <TabsContent value="suites" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Test Controls */}
            <Card className="hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Play className="h-5 w-5 text-primary" />
                  </div>
                  Run Tests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Test Suite</Label>
                  <Select value={selectedSuite} onValueChange={setSelectedSuite}>
                    <SelectTrigger className="focus-ring">
                      <SelectValue placeholder="Select test suite" />
                    </SelectTrigger>
                    <SelectContent>
                      {testSuites.map((suite) => (
                        <SelectItem key={suite.name} value={suite.name}>
                          {suite.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Environment</Label>
                  <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                    <SelectTrigger className="focus-ring">
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

                <Button 
                  onClick={() => handleRunTests(selectedSuite)}
                  disabled={!selectedSuite || !selectedEnvironment}
                  className="w-full flex items-center gap-2 hover-lift"
                >
                  <Play className="h-4 w-4" />
                  Run Selected Suite
                </Button>
              </CardContent>
            </Card>

            {/* Test Overview */}
            <Card className="lg:col-span-2 hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Target className="h-5 w-5 text-success" />
                  </div>
                  Test Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-success/10">
                    <div className="text-2xl font-bold text-success">128</div>
                    <div className="text-sm text-muted-foreground">Passed</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-destructive/10">
                    <div className="text-2xl font-bold text-destructive">10</div>
                    <div className="text-sm text-muted-foreground">Failed</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-warning/10">
                    <div className="text-2xl font-bold text-warning">29</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <div className="text-2xl font-bold text-primary">93%</div>
                    <div className="text-sm text-muted-foreground">Pass Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Suites List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {testSuites.map((suite, index) => (
              <Card key={suite.name} className="hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{suite.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <StatusBadge status={getStatusColor(suite.status)}>
                          {suite.status}
                        </StatusBadge>
                        <span className="text-sm text-muted-foreground">
                          {suite.tests} tests
                        </span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRunTests(suite.name)}
                      className="hover-scale"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="font-medium text-success">{suite.passed}</span>
                      </div>
                      <div className="text-muted-foreground">Passed</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <XCircle className="h-4 w-4 text-destructive" />
                        <span className="font-medium text-destructive">{suite.failed}</span>
                      </div>
                      <div className="text-muted-foreground">Failed</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-warning" />
                        <span className="font-medium text-warning">{suite.pending}</span>
                      </div>
                      <div className="text-muted-foreground">Pending</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Test Results */}
        <TabsContent value="results" className="space-y-6">
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-accent/10">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                Recent Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <div 
                    key={result.id} 
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover-scale animate-slide-in-right"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <StatusBadge status={getStatusColor(result.status)}>
                        {result.status}
                      </StatusBadge>
                      <div>
                        <p className="font-medium">{result.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {result.suite} • {result.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{result.duration}</p>
                        <p className="text-muted-foreground">Duration</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-primary">{result.coverage}</p>
                        <p className="text-muted-foreground">Coverage</p>
                      </div>
                      <Button size="sm" variant="outline" className="hover-scale">
                        <Bug className="h-4 w-4 mr-2" />
                        Debug
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coverage Analytics */}
        <TabsContent value="coverage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coverage Chart */}
            <Card className="hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle>Code Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={coverageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {coverageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-4">
                  <div className="text-3xl font-bold text-success">87%</div>
                  <div className="text-sm text-muted-foreground">Total Coverage</div>
                </div>
              </CardContent>
            </Card>

            {/* Test Trends */}
            <Card className="hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Test Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={testTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="passed" fill="hsl(var(--success))" name="Passed" />
                      <Bar dataKey="failed" fill="hsl(var(--destructive))" name="Failed" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Automation */}
        <TabsContent value="automation" className="space-y-6">
          <Card className="hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Test Automation Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">Automated Testing Pipeline</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Configure automated test execution on code commits, scheduled runs, and deployment triggers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Trigger on Commits</Label>
                      <div className="mt-2 space-y-2">
                        {["API Tests", "UI Tests", "Integration Tests"].map((test) => (
                          <div key={test} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                            <span className="text-sm">{test}</span>
                            <Badge variant="outline" className="text-success bg-success/10">
                              Enabled
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Scheduled Runs</Label>
                      <div className="mt-2 space-y-2">
                        {[
                          { name: "Nightly Full Suite", schedule: "00:00 UTC" },
                          { name: "Performance Tests", schedule: "06:00 UTC" },
                          { name: "Security Scans", schedule: "12:00 UTC" },
                        ].map((job) => (
                          <div key={job.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                            <div>
                              <p className="text-sm font-medium">{job.name}</p>
                              <p className="text-xs text-muted-foreground">{job.schedule}</p>
                            </div>
                            <Badge variant="outline">Active</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateTestModal
        open={createTestModalOpen}
        onOpenChange={setCreateTestModalOpen}
      />
    </div>
  );
};

export default QATesting;