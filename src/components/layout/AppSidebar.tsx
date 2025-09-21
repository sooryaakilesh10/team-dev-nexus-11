import { NavLink } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Cloud,
  Code,
  Database,
  GitPullRequest,
  Home,
  Settings,
  Terminal,
  TestTube,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    description: "Overview and key metrics",
  },
  {
    title: "Developer Operations",
    url: "/devops",
    icon: Terminal,
    description: "Builds, logs, deployments",
  },
  {
    title: "Pull Requests",
    url: "/pull-requests",
    icon: GitPullRequest,
    description: "PR management and analytics",
  },
  {
    title: "Infrastructure",
    url: "/infrastructure",
    icon: Cloud,
    description: "Monitoring and scaling",
  },
  {
    title: "QA Testing",
    url: "/qa-testing",
    icon: TestTube,
    description: "Test automation and results",
  },
  {
    title: "Database",
    url: "/database",
    icon: Database,
    description: "Database management",
  },
];

const utilityItems = [
  {
    title: "Alerts",
    url: "/alerts",
    icon: AlertTriangle,
    description: "System alerts and notifications",
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    description: "Platform usage analytics",
  },
  {
    title: "API Docs",
    url: "/api-docs",
    icon: Code,
    description: "API specification and docs",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "Platform configuration",
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-200 hover-lift ${
      isActive
        ? "bg-primary text-primary-foreground font-medium shadow-lg scale-[1.02]"
        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:scale-[1.01]"
    }`;

  return (
    <Sidebar
      className="border-r border-sidebar-border/50 backdrop-blur-sm transition-all duration-300"
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar/95 backdrop-blur-sm">
        {/* Main Navigation */}
        <SidebarGroup className="py-2">
          <SidebarGroupLabel className="text-sidebar-foreground font-semibold tracking-wide animate-fade-in mb-3 px-3">
            IDP Platform
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1">
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="px-2">
                  <SidebarMenuButton 
                    asChild 
                    tooltip={isCollapsed ? item.title : undefined}
                    className="hover-scale animate-slide-in-right h-auto min-h-[3rem] px-3 py-2 rounded-lg"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <NavLink to={item.url} end className={getNavClassName}>
                      <item.icon className="h-5 w-5 shrink-0 mb-auto mt-1" />
                      {!isCollapsed && (
                        <div className="flex flex-col gap-1 ml-3 flex-1">
                          <span className="text-sm font-medium leading-tight">{item.title}</span>
                          <span className="text-xs text-muted-foreground leading-tight">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Utilities Section */}
        <SidebarGroup className="py-2 mt-4">
          <SidebarGroupLabel className="text-sidebar-foreground font-semibold tracking-wide mb-3 px-3">
            <Activity className="mr-2 h-4 w-4" />
            {!isCollapsed && "Utilities"}
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1">
            <SidebarMenu className="space-y-1">
              {utilityItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="px-2">
                  <SidebarMenuButton 
                    asChild 
                    tooltip={isCollapsed ? item.title : undefined}
                    className="hover-scale animate-slide-in-right h-auto min-h-[3rem] px-3 py-2 rounded-lg"
                    style={{ animationDelay: `${index * 0.05 + 0.3}s` }}
                  >
                    <NavLink to={item.url} className={getNavClassName}>
                      <item.icon className="h-5 w-5 shrink-0 mb-auto mt-1" />
                      {!isCollapsed && (
                        <div className="flex flex-col gap-1 ml-3 flex-1">
                          <span className="text-sm font-medium leading-tight">{item.title}</span>
                          <span className="text-xs text-muted-foreground leading-tight">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}