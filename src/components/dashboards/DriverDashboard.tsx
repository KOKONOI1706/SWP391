import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Battery, 
  MapPin, 
  Clock, 
  DollarSign, 
  Car, 
  Zap,
  Calendar,
  CreditCard,
  Leaf,
  Navigation,
  Timer,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DriverDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Hero Card - Vehicle Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-electric-blue/10 via-electric-green/5 to-background border-2 border-electric-blue/20">
          <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 to-electric-green/5"></div>
          <CardContent className="relative p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Car Visual */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-electric-blue to-electric-green rounded-3xl flex items-center justify-center shadow-lg">
                  <Car className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                </div>
              </div>
              
              {/* Battery & Info */}
              <div className="flex-1 text-center lg:text-left space-y-4">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Tesla Model 3</h2>
                  <p className="text-lg text-muted-foreground">Ready to charge</p>
                </div>
                
                {/* Battery Display */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-foreground">Battery Level</span>
                    <div className="flex items-center space-x-2">
                      <Battery className="w-8 h-8 text-electric-blue" />
                      <span className="text-4xl font-bold text-electric-blue">78%</span>
                    </div>
                  </div>
                  <Progress value={78} className="h-4 bg-muted" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>234 miles remaining</span>
                    <span>~3.5 hours to full</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: DollarSign,
            label: 'This Month',
            value: '$124.50',
            subtext: 'Charging costs',
            color: 'text-energy-orange',
            bg: 'bg-energy-orange/10'
          },
          {
            icon: Zap,
            label: 'Sessions',
            value: '18',
            subtext: 'This month',
            color: 'text-electric-blue',
            bg: 'bg-electric-blue/10'
          },
          {
            icon: Leaf,
            label: 'CO₂ Saved',
            value: '245kg',
            subtext: 'This month',
            color: 'text-charging-status',
            bg: 'bg-charging-status/10'
          },
          {
            icon: Timer,
            label: 'Avg Time',
            value: '45min',
            subtext: 'Per session',
            color: 'text-electric-green',
            bg: 'bg-electric-green/10'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm font-medium text-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.subtext}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Button 
          size="lg"
          className="h-24 text-lg font-semibold bg-gradient-to-r from-electric-blue to-electric-green hover:shadow-electric transition-all duration-300" 
          onClick={() => navigate('/map')}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Navigation className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-xl font-bold">Find Stations</p>
              <p className="text-sm opacity-90">Near you</p>
            </div>
          </div>
        </Button>

        <Button 
          size="lg"
          variant="outline"
          className="h-24 text-lg font-semibold border-2 border-electric-blue/30 hover:bg-electric-blue/5 transition-all duration-300" 
          onClick={() => navigate('/reservations')}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-electric-blue/10 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-electric-blue" />
            </div>
            <div className="text-left">
              <p className="text-xl font-bold text-foreground">Book Now</p>
              <p className="text-sm text-muted-foreground">Reserve a slot</p>
            </div>
          </div>
        </Button>
      </motion.div>

      {/* Recent Charging */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Charging</CardTitle>
            <CardDescription>Your latest charging sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  station: 'Tesla Supercharger', 
                  location: 'Downtown Plaza',
                  date: '2 hours ago', 
                  cost: '$12.45', 
                  energy: '35 kWh',
                  status: 'Completed'
                },
                { 
                  station: 'ChargePoint', 
                  location: 'Shopping Mall',
                  date: 'Yesterday', 
                  cost: '$8.20', 
                  energy: '22 kWh',
                  status: 'Completed'
                },
                { 
                  station: 'Electrify America', 
                  location: 'Highway Rest Stop',
                  date: '3 days ago', 
                  cost: '$15.80', 
                  energy: '42 kWh',
                  status: 'Completed'
                },
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-electric-blue to-electric-green rounded-xl flex items-center justify-center">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-bold text-foreground">{session.station}</p>
                        <Badge variant="outline" className="text-xs bg-charging-status/10 text-charging-status border-charging-status/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {session.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">{session.location}</p>
                      <p className="text-xs text-muted-foreground">{session.date} • {session.energy}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-foreground">{session.cost}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-6 h-12 text-base font-semibold"
              onClick={() => navigate('/reports')}
            >
              View All Sessions
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Access */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="grid grid-cols-2 gap-4"
      >
        <Button 
          variant="outline"
          className="h-16 justify-start space-x-3"
          onClick={() => navigate('/payments')}
        >
          <CreditCard className="w-5 h-5 text-electric-blue" />
          <span className="font-semibold">Payment Methods</span>
        </Button>
        
        <Button 
          variant="outline"
          className="h-16 justify-start space-x-3"
          onClick={() => navigate('/charging')}
        >
          <Clock className="w-5 h-5 text-electric-green" />
          <span className="font-semibold">Charging History</span>
        </Button>
      </motion.div>
    </div>
  );
};