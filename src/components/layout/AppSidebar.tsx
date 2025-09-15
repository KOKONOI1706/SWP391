import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Map, 
  Calendar, 
  Zap, 
  CreditCard, 
  BarChart3,
  Users,
  MapPin,
  Package,
  AlertTriangle,
  Settings,
  Car,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  // Driver routes
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard, roles: ['driver', 'staff', 'admin'] },
  { title: 'Trips', url: '/trips', icon: Calendar, roles: ['driver'] },
  { title: 'Map', url: '/map', icon: Map, roles: ['driver'] },
  { title: 'Reservations', url: '/reservations', icon: Calendar, roles: ['driver'] },
  { title: 'Charging', url: '/charging', icon: Zap, roles: ['driver'] },
  { title: 'Payments', url: '/payments', icon: CreditCard, roles: ['driver'] },
  { title: 'Reports', url: '/reports', icon: BarChart3, roles: ['driver', 'admin'] },
  
  // Staff routes
  { title: 'Sessions', url: '/sessions', icon: Zap, roles: ['staff'] },
  { title: 'Payment Management', url: '/payment-management', icon: CreditCard, roles: ['staff'] },
  { title: 'Issues', url: '/issues', icon: AlertTriangle, roles: ['staff'] },
  
  // Admin routes
  { title: 'Stations', url: '/stations', icon: MapPin, roles: ['admin'] },
  { title: 'Users', url: '/users', icon: Users, roles: ['admin'] },
  { title: 'Subscriptions', url: '/subscriptions', icon: Package, roles: ['admin'] },
  { title: 'Settings', url: '/settings', icon: Settings, roles: ['admin'] },
];

const roleIcons = {
  driver: Car,
  staff: Users,
  admin: Shield,
};

export const AppSidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  if (!user) return null;

  const userNavItems = navItems.filter(item => item.roles.includes(user.role));
  const RoleIcon = roleIcons[user.role];

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-border/50 p-4">
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-electric-blue to-electric-green rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-foreground">EV Charge</h2>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <RoleIcon className="w-3 h-3" />
                <span className="capitalize">{user.role}</span>
              </div>
            </div>
          )}
        </motion.div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {userNavItems.map((item, index) => {
                const isActive = location.pathname === item.url;
                return (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => navigate(item.url)}
                        className={`w-full transition-all duration-200 ${
                          isActive 
                            ? 'bg-gradient-to-r from-electric-blue/10 to-electric-green/10 text-electric-blue border-l-2 border-electric-blue' 
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-electric-blue' : 'text-muted-foreground'}`} />
                        {!collapsed && (
                          <span className={`ml-3 ${isActive ? 'font-medium text-electric-blue' : 'text-foreground'}`}>
                            {item.title}
                          </span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};