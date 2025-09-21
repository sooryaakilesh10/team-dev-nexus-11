import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  GitPullRequest,
  Server,
  TrendingUp,
  Zap,
  Sparkles,
} from "lucide-react";
import { dashboardApi } from "@/services/api";

const DashboardStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardApi.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getIcon = (iconName: string) => {
    const icons = {
      Server,
      GitPullRequest,
      AlertTriangle,
      Zap,
    };
    return icons[iconName as keyof typeof icons] || Activity;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-10 w-10 bg-muted rounded-lg"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 mb-2"></div>
              <div className="h-4 bg-muted rounded w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Dashboard Header */}
      <div className="dashboard-gradient p-8 rounded-xl border border-border hover-lift animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Platform Overview</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Monitor your development platform at a glance
            </p>
          </div>
          <div className="flex items-center gap-3 animate-slide-in-right">
            <div className="flex items-center gap-2 text-success bg-success/10 px-4 py-2 rounded-lg border border-success/20">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat: any, index: number) => {
          const IconComponent = getIcon(stat.icon);
          return (
            <Card 
              key={stat.title} 
              className="hover-lift transition-all duration-300 hover:border-primary/20 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${
                  stat.status === 'success' ? 'bg-success/10' :
                  stat.status === 'warning' ? 'bg-warning/10' :
                  stat.status === 'error' ? 'bg-destructive/10' : 'bg-primary/10'
                }`}>
                  <IconComponent className={`h-5 w-5 ${
                    stat.status === 'success' ? 'text-success' :
                    stat.status === 'warning' ? 'text-warning' :
                    stat.status === 'error' ? 'text-destructive' : 'text-primary'
                  }`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                    {stat.change}
                  </span>
                  <span className="ml-1 text-muted-foreground">from yesterday</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default DashboardStats;