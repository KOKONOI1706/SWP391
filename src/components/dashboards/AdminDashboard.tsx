import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  MapPin, 
  Users, 
  Zap, 
  DollarSign, 
  TrendingUp,
  Activity,
  Battery,
  Clock
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  // Mock data
  const stats = [
    {
      title: 'Active Stations',
      value: '247',
      change: '+12 this month',
      trend: 'up' as const,
      icon: MapPin,
      variant: 'electric' as const
    },
    {
      title: 'Total Users',
      value: '8,542',
      change: '+324 this week',
      trend: 'up' as const,
      icon: Users,
      variant: 'default' as const
    },
    {
      title: 'Revenue',
      value: '$124,580',
      change: '+18% from last month',
      trend: 'up' as const,
      icon: DollarSign,
      variant: 'energy' as const
    },
    {
      title: 'Sessions Today',
      value: '1,247',
      change: '+8% from yesterday',
      trend: 'up' as const,
      icon: Zap,
      variant: 'electric' as const
    },
  ];

  // Chart data
  const revenueData = [
    { month: 'Jan', revenue: 85000, sessions: 1200 },
    { month: 'Feb', revenue: 92000, sessions: 1350 },
    { month: 'Mar', revenue: 78000, sessions: 1100 },
    { month: 'Apr', revenue: 105000, sessions: 1450 },
    { month: 'May', revenue: 118000, sessions: 1600 },
    { month: 'Jun', revenue: 124580, sessions: 1750 },
  ];

  const regionData = [
    { name: 'North', value: 35, color: 'hsl(var(--electric-blue))' },
    { name: 'South', value: 25, color: 'hsl(var(--electric-green))' },
    { name: 'East', value: 20, color: 'hsl(var(--energy-orange))' },
    { name: 'West', value: 20, color: 'hsl(var(--charging-status))' },
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--electric-blue))",
    },
    sessions: {
      label: "Sessions",
      color: "hsl(var(--electric-green))",
    },
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-electric-blue" />
                <span>Revenue & Sessions</span>
              </CardTitle>
              <CardDescription>Monthly performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Regional Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-electric-green" />
                <span>Regional Distribution</span>
              </CardTitle>
              <CardDescription>Station usage by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>Real-time system status and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-electric-blue/5 to-electric-green/5">
                <Battery className="w-8 h-8 text-electric-blue" />
                <div>
                  <p className="font-semibold text-foreground">Average Battery</p>
                  <p className="text-2xl font-bold text-electric-blue">67%</p>
                  <p className="text-xs text-muted-foreground">Across all sessions</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-energy-orange/5 to-electric-blue/5">
                <Clock className="w-8 h-8 text-energy-orange" />
                <div>
                  <p className="font-semibold text-foreground">Avg. Session</p>
                  <p className="text-2xl font-bold text-energy-orange">45min</p>
                  <p className="text-xs text-muted-foreground">Duration today</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-charging-status/5 to-electric-green/5">
                <Zap className="w-8 h-8 text-charging-status" />
                <div>
                  <p className="font-semibold text-foreground">Peak Hours</p>
                  <p className="text-2xl font-bold text-charging-status">6-8 PM</p>
                  <p className="text-xs text-muted-foreground">Highest usage</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};