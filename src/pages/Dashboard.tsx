import DashboardStats from "@/components/DashboardStats";
import DashboardDeployments from "@/components/DashboardDeployments";
import DashboardTeamMetrics from "@/components/DashboardTeamMetrics";
import DashboardQuickActions from "@/components/DashboardQuickActions";

const Dashboard = () => {

  return (
    <div className="p-6 space-y-8 animate-slide-in">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardStats />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardDeployments />
          <DashboardTeamMetrics />
        </div>

        <DashboardQuickActions />
      </div>
    </div>
  );
};

export default Dashboard;