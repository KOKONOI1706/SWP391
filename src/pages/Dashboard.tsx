import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { DriverDashboard } from '@/components/dashboards/DriverDashboard';
import { StaffDashboard } from '@/components/dashboards/StaffDashboard';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case 'driver':
        return <DriverDashboard />;
      case 'staff':
        return <StaffDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user.name}! Here's your {user.role} overview.
          </p>
        </div>
      </div>
      
      {renderDashboard()}
    </motion.div>
  );
};

export default Dashboard;