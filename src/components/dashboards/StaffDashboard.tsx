import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Play,
  Square,
  DollarSign
} from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  // Mock data
  const stats = [
    {
      title: 'Active Sessions',
      value: '12',
      change: '+3 since last hour',
      trend: 'up' as const,
      icon: Zap,
      variant: 'electric' as const
    },
    {
      title: 'Today Revenue',
      value: '$1,245',
      change: '+15% from yesterday',
      trend: 'up' as const,
      icon: DollarSign,
      variant: 'energy' as const
    },
    {
      title: 'Queue',
      value: '4',
      change: '2 waiting',
      trend: 'up' as const,
      icon: Clock,
      variant: 'default' as const
    },
    {
      title: 'Issues',
      value: '2',
      change: '1 resolved today',
      trend: 'down' as const,
      icon: AlertTriangle,
      variant: 'default' as const
    },
  ];

  const activeSessions = [
    { id: '001', vehicle: 'Tesla Model S', user: 'John Doe', startTime: '14:30', progress: 65, station: 'Station A1' },
    { id: '002', vehicle: 'BMW iX', user: 'Jane Smith', startTime: '15:15', progress: 30, station: 'Station A2' },
    { id: '003', vehicle: 'Audi e-tron', user: 'Mike Johnson', startTime: '15:45', progress: 90, station: 'Station B1' },
  ];

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

      {/* Active Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-electric-blue" />
              <span>Active Charging Sessions</span>
            </CardTitle>
            <CardDescription>Monitor and manage current charging sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-electric-blue to-electric-green rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-foreground">{session.vehicle}</p>
                        <Badge variant="outline" className="text-xs">{session.station}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{session.user} • Started {session.startTime}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-gradient-to-r from-electric-blue to-electric-green rounded-full transition-all duration-500"
                            style={{ width: `${session.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{session.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                    <Button size="sm" variant="outline">
                      <Square className="w-4 h-4 mr-1" />
                      Stop
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
              <CardDescription>Handle on-site payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full btn-electric">
                <DollarSign className="w-4 h-4 mr-2" />
                Record Cash Payment
              </Button>
              <Button variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Assist Customer
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Station Status</CardTitle>
              <CardDescription>Monitor equipment health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Operational Stations</span>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-charging-status" />
                  <span className="font-semibold">8/10</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Maintenance Required</span>
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="w-4 h-4 text-warning-amber" />
                  <span className="font-semibold">2</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};