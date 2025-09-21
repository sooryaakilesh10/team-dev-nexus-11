import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Users, Clock, Target } from "lucide-react";
import { dashboardApi } from "@/services/api";

const DashboardTeamMetrics = () => {
  const [teamMetrics, setTeamMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMetrics = async () => {
      try {
        const response = await dashboardApi.getTeamMetrics();
        setTeamMetrics(response.data);
      } catch (error) {
        console.error('Failed to fetch team metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMetrics();
  }, []);

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-40"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-32 bg-muted rounded"></div>
                  <div className="h-6 w-16 bg-muted rounded"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-4 w-24 bg-muted rounded"></div>
                  <div className="h-4 w-28 bg-muted rounded"></div>
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
          <div className="p-2 rounded-lg bg-accent/10">
            <Users className="h-5 w-5 text-accent" />
          </div>
          Team Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMetrics.map((team: any, index: number) => (
            <div 
              key={index} 
              className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover-scale space-y-3 animate-slide-in-right"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-lg">{team.team}</h4>
                <StatusBadge status="info">{team.prs} PRs</StatusBadge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Avg: <span className="font-medium text-primary">{team.avgTime}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span>Coverage: <span className="font-medium text-success">{team.coverage}</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-6 hover-lift">
          Detailed Analytics
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardTeamMetrics;