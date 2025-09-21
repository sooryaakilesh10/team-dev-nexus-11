import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GitPullRequest,
  Clock,
  MessageSquare,
  User,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Eye,
  Users,
  BarChart3,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const PullRequests = () => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");

  const pullRequests = [
    {
      id: "PR-001",
      title: "Add user authentication middleware",
      author: "john.doe",
      repo: "api-gateway",
      status: "open",
      sla: "2 days",
      comments: 8,
      changes: { added: 145, deleted: 32 },
      reviewers: ["jane.smith", "mike.wilson"],
      createdAt: "2 hours ago",
      priority: "high",
    },
    {
      id: "PR-002",
      title: "Fix database connection pooling",
      author: "jane.smith",
      repo: "user-service",
      status: "review",
      sla: "1 day",
      comments: 12,
      changes: { added: 89, deleted: 156 },
      reviewers: ["john.doe"],
      createdAt: "5 hours ago",
      priority: "critical",
    },
    {
      id: "PR-003",
      title: "Update notification templates",
      author: "mike.wilson",
      repo: "notification-service",
      status: "approved",
      sla: "4 hours",
      comments: 3,
      changes: { added: 67, deleted: 23 },
      reviewers: ["sarah.connor", "john.doe"],
      createdAt: "1 day ago",
      priority: "medium",
    },
    {
      id: "PR-004",
      title: "Refactor payment processing logic",
      author: "sarah.connor",
      repo: "payment-service",
      status: "merged",
      sla: "completed",
      comments: 15,
      changes: { added: 234, deleted: 189 },
      reviewers: ["jane.smith", "mike.wilson"],
      createdAt: "2 days ago",
      priority: "high",
    },
  ];

  const teamMetrics = [
    {
      team: "Backend Team",
      activePRs: 6,
      avgReviewTime: "1.8 days",
      mergedThisWeek: 12,
      codeQuality: 94,
    },
    {
      team: "Frontend Team",
      activePRs: 4,
      avgReviewTime: "1.2 days",
      mergedThisWeek: 8,
      codeQuality: 91,
    },
    {
      team: "DevOps Team",
      activePRs: 2,
      avgReviewTime: "0.8 days",
      mergedThisWeek: 5,
      codeQuality: 97,
    },
  ];

  const reviewerStats = [
    { name: "john.doe", reviews: 18, avgTime: "4.2 hours", resolved: 16 },
    { name: "jane.smith", reviews: 22, avgTime: "3.8 hours", resolved: 20 },
    { name: "mike.wilson", reviews: 15, avgTime: "5.1 hours", resolved: 13 },
    { name: "sarah.connor", reviews: 19, avgTime: "3.2 hours", resolved: 18 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-primary bg-primary/10 border-primary/20";
      case "review":
        return "text-warning bg-warning/10 border-warning/20";
      case "approved":
        return "text-success bg-success/10 border-success/20";
      case "merged":
        return "text-muted-foreground bg-muted border-muted";
      default:
        return "text-muted-foreground bg-muted border-muted";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  return (
    <div className="p-6 space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pull Request Management</h1>
          <p className="text-muted-foreground">
            Track PRs, review metrics, and team performance
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <GitPullRequest className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active PRs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reviewers">Reviewers</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>

        {/* Active PRs Tab */}
        <TabsContent value="active" className="space-y-6">
          {/* Filters */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Team</Label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="All teams" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="backend">Backend Team</SelectItem>
                      <SelectItem value="frontend">Frontend Team</SelectItem>
                      <SelectItem value="devops">DevOps Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Repository</Label>
                  <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                    <SelectTrigger>
                      <SelectValue placeholder="All repositories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api-gateway">api-gateway</SelectItem>
                      <SelectItem value="user-service">user-service</SelectItem>
                      <SelectItem value="notification-service">notification-service</SelectItem>
                      <SelectItem value="payment-service">payment-service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Search</Label>
                  <Input placeholder="Search PRs..." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PR List */}
          <div className="space-y-4">
            {pullRequests.map((pr) => (
              <Card key={pr.id} className="card-shadow transition-smooth hover:glow-primary">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className={getStatusColor(pr.status)}>
                          {pr.status}
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(pr.priority)}>
                          {pr.priority}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{pr.id}</span>
                      </div>

                      <h3 className="text-lg font-semibold mb-2">{pr.title}</h3>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{pr.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          <span>{pr.repo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>SLA: {pr.sla}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>{pr.comments} comments</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <span className="text-success">+{pr.changes.added}</span>
                            <span className="mx-1">/</span>
                            <span className="text-destructive">-{pr.changes.deleted}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Reviewers:</span>
                            <div className="flex -space-x-2">
                              {pr.reviewers.map((reviewer, index) => (
                                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                                  <AvatarImage src={`/placeholder-avatar-${index}.png`} />
                                  <AvatarFallback className="text-xs">
                                    {reviewer.split('.').map(n => n[0]).join('').toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          {pr.status === "approved" && (
                            <Button size="sm">
                              Merge
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Performance Chart */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Team Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={teamMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="team" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="activePRs" fill="hsl(var(--primary))" name="Active PRs" />
                      <Bar dataKey="mergedThisWeek" fill="hsl(var(--success))" name="Merged This Week" />
                      <Bar dataKey="codeQuality" fill="hsl(var(--accent))" name="Code Quality %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {teamMetrics.map((team, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{team.team}</h4>
                        <Badge variant="outline">{team.activePRs} active</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Avg Review Time</p>
                          <p className="font-medium">{team.avgReviewTime}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Merged/Week</p>
                          <p className="font-medium">{team.mergedThisWeek}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Code Quality</p>
                          <p className="font-medium text-success">{team.codeQuality}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* PR Status Distribution Pie Chart */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  PR Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Open", value: 35, fill: "hsl(var(--primary))" },
                          { name: "In Review", value: 25, fill: "hsl(var(--warning))" },
                          { name: "Approved", value: 20, fill: "hsl(var(--success))" },
                          { name: "Merged", value: 20, fill: "hsl(var(--muted))" },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total PRs This Week</span>
                      <span className="text-2xl font-bold">25</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">+15% from last week</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Average Merge Time</span>
                      <span className="text-2xl font-bold">1.4d</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">-8% improvement</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Comment Resolution</span>
                      <span className="text-2xl font-bold">94%</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <AlertCircle className="h-4 w-4 text-warning" />
                      <span className="text-sm text-warning">Same as last week</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reviewers Tab */}
        <TabsContent value="reviewers" className="space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Reviewer Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviewerStats.map((reviewer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder-avatar-${index}.png`} />
                        <AvatarFallback>
                          {reviewer.name.split('.').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{reviewer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {reviewer.reviews} reviews • {reviewer.resolved} resolved
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{reviewer.avgTime}</p>
                      <p className="text-sm text-muted-foreground">avg response</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">Team Permissions</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Configure team access, review requirements, and merge permissions for different repositories.
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Configure Team Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PullRequests;