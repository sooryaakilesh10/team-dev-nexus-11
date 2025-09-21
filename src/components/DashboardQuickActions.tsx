import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Server, GitPullRequest, Activity } from "lucide-react";

const DashboardQuickActions = () => {
  const actions = [
    { icon: Zap, label: "Trigger Build", variant: "outline" as const },
    { icon: Server, label: "Restart Service", variant: "outline" as const },
    { icon: GitPullRequest, label: "Review PRs", variant: "outline" as const },
    { icon: Activity, label: "View Logs", variant: "outline" as const }
  ];

  return (
    <Card className="hover-lift animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Button 
              key={action.label}
              className="h-20 flex flex-col gap-2 hover-lift animate-scale-in" 
              variant={action.variant}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <action.icon className="h-6 w-6" />
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardQuickActions;