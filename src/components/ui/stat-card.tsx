import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: LucideIcon;
  variant?: 'default' | 'electric' | 'energy';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  variant = 'default',
  className = '',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'electric':
        return 'card-electric border-electric-blue/30';
      case 'energy':
        return 'card-energy border-energy-orange/30';
      default:
        return 'border-border/50';
    }
  };

  const getTrendColor = () => {
    if (!trend) return 'text-muted-foreground';
    return trend === 'up' ? 'text-charging-status' : 'text-destructive';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={className}
    >
      <Card className={`hover:shadow-md transition-all duration-300 ${getVariantClasses()}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className={`h-5 w-5 ${
            variant === 'electric' ? 'text-electric-blue' : 
            variant === 'energy' ? 'text-energy-orange' : 
            'text-muted-foreground'
          }`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          {change && (
            <p className={`text-xs ${getTrendColor()}`}>
              {change}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};