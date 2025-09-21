import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Activity, Clock } from "lucide-react";
import { dashboardApi } from "@/services/api";

const DashboardDeployments = () => {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        const response = await dashboardApi.getRecentDeployments();
        setDeployments(response.data);
      } catch (error) {
        console.error('Failed to fetch deployments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeployments();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
      case "running":
        return "success";
      case "warning":
        return "warning";
      case "error":
      case "failed":
        return "error";
      case "pending":
        return "pending";
      default:
        return "info";
    }
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-48"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-16 bg-muted rounded"></div>
                    <div className="space-y-1">
                      <div className="h-4 w-24 bg-muted rounded"></div>
                      <div className="h-3 w-16 bg-muted rounded"></div>
                    </div>
                  </div>
                  <div className="h-4 w-20 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover-lift animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          Recent Deployments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {deployments.map((deployment: any, index: number) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 hover-scale animate-slide-in-right"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <StatusBadge status={getStatusColor(deployment.status)}>
                  {deployment.status}
                </StatusBadge>
                <div>
                  <p className="font-medium">{deployment.service}</p>
                  <p className="text-sm text-muted-foreground">{deployment.version}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {deployment.time}
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-6 hover-lift">
          View All Deployments
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardDeployments;