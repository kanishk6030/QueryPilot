import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MessageSquare,
  Database,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { fetchCurrentUser, getDisplayName, getInitials, type CurrentUserClaims } from "@/lib/me";
import { toast } from "sonner";

const nav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Connections", url: "/connections", icon: Database },
  { title: "History", url: "/history", icon: History },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { logout } = useAuth();
  const [user, setUser] = useState<CurrentUserClaims | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let ignore = false;

    fetchCurrentUser()
      .then((nextUser) => {
        if (!ignore) {
          setUser(nextUser);
        }
      })
      .catch(() => {
        if (!ignore) {
          setUser(null);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);

    const { error } = await logout();

    if (error) {
      toast.error(error.message);
      setLoggingOut(false);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight">Copilot</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              AI Database
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-primary/15 text-primary text-xs">{getInitials(user)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 flex-col group-data-[collapsible=icon]:hidden">
            <span className="max-w-36 truncate text-xs font-medium">{getDisplayName(user)}</span>
            <span className="max-w-36 truncate text-[10px] text-muted-foreground">{user?.email ?? "Authenticated"}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 group-data-[collapsible=icon]:hidden"
            disabled={loggingOut}
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
