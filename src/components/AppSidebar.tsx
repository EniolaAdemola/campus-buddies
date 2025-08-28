import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Info, 
  MessageCircle, 
  HelpCircle, 
  LayoutDashboard,
  Settings,
  BookOpen,
  LogOut,
  LogIn,
  UserPlus
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
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import ProfileModal from "./ProfileModal";

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "API Config", url: "/api-config", icon: Settings },
  { title: "About", url: "/about", icon: Info },
  { title: "Contact", url: "/contact", icon: MessageCircle },
  { title: "Support", url: "/support", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [user, setUser] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const isCollapsed = state === "collapsed";

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const isActive = (path: string) => currentPath === path;

  const getNavClass = (path: string) => {
    const baseClass = "w-full justify-start transition-colors";
    return isActive(path) 
      ? `${baseClass} bg-primary text-primary-foreground font-medium` 
      : `${baseClass} hover:bg-muted`;
  };

  return (
    <>
      <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
        <SidebarHeader className="border-b border-border p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary flex-shrink-0" />
            {!isCollapsed && (
              <span className="text-lg font-bold text-primary">LisioBuddy</span>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="p-4">
          <SidebarGroup>
            <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={getNavClass(item.url)}
                        title={isCollapsed ? item.title : undefined}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-border p-4">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Avatar 
                  className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all flex-shrink-0"
                  onClick={() => setShowProfileModal(true)}
                >
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                    {getInitials(user.user_metadata?.full_name || user.email)}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.user_metadata?.full_name || user.email}
                    </p>
                  </div>
                )}
              </div>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="w-full justify-start"
                title={isCollapsed ? "Logout" : undefined}
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span className="ml-2">Logout</span>}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                asChild
                className="w-full justify-start"
                title={isCollapsed ? "Login" : undefined}
              >
                <NavLink to="/login">
                  <LogIn className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span className="ml-2">Login</span>}
                </NavLink>
              </Button>
              <Button 
                variant="default" 
                asChild
                className="w-full justify-start"
                title={isCollapsed ? "Sign Up" : undefined}
              >
                <NavLink to="/signup">
                  <UserPlus className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span className="ml-2">Sign Up</span>}
                </NavLink>
              </Button>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
      
      <ProfileModal open={showProfileModal} onOpenChange={setShowProfileModal} />
    </>
  );
}