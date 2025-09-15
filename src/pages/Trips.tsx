import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Car, BatteryCharging, Search } from 'lucide-react';
import { motion } from 'framer-motion';

type TripStatus = 'completed' | 'charging' | 'cancelled';

interface Trip {
  id: string;
  date: string;
  station: string;
  energyKwh: number;
  cost: number;
  durationMin: number;
  status: TripStatus;
}

const mockTrips: Trip[] = [
  { id: 'T-1001', date: '2025-09-01 18:20', station: 'Central Plaza', energyKwh: 24.5, cost: 8.6, durationMin: 42, status: 'completed' },
  { id: 'T-1002', date: '2025-09-02 08:10', station: 'Airport FastCharge', energyKwh: 36.0, cost: 12.4, durationMin: 38, status: 'completed' },
  { id: 'T-1003', date: '2025-09-03 12:05', station: 'Tech Park', energyKwh: 0, cost: 0, durationMin: 0, status: 'cancelled' },
  { id: 'T-1004', date: '2025-09-04 19:30', station: 'Harbor Point', energyKwh: 18.2, cost: 6.1, durationMin: 30, status: 'completed' },
  { id: 'T-1005', date: '2025-09-05 09:50', station: 'Riverside Hub', energyKwh: 12.8, cost: 4.3, durationMin: 21, status: 'charging' },
];

const statusBadge: Record<TripStatus, string> = {
  completed: 'bg-electric-green/15 text-electric-green',
  charging: 'bg-charging-status/15 text-charging-status',
  cancelled: 'bg-destructive/10 text-destructive',
};

const Trips: React.FC = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>('all');

  const filtered = useMemo(() => {
    return mockTrips.filter((t) => {
      const matchQuery = `${t.id} ${t.station}`.toLowerCase().includes(query.toLowerCase());
      const matchStatus = status === 'all' || t.status === status;
      return matchQuery && matchStatus;
    });
  }, [query, status]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trips</h1>
          <p className="text-muted-foreground mt-1">Recent charging sessions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Car className="w-5 h-5 text-electric-blue" />Trip History</CardTitle>
          <CardDescription>Search and filter your trips</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by ID or station" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="charging">Charging</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trip</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Station</TableHead>
                  <TableHead className="text-right">Energy</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t, i) => (
                  <motion.tr key={t.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: i * 0.03 }} className="border-b last:border-0">
                    <TableCell className="font-medium flex items-center gap-2"><BatteryCharging className="w-4 h-4 text-electric-green" />{t.id}</TableCell>
                    <TableCell className="text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4" />{t.date}</TableCell>
                    <TableCell className="flex items-center gap-2"><MapPin className="w-4 h-4" />{t.station}</TableCell>
                    <TableCell className="text-right">{t.energyKwh} kWh</TableCell>
                    <TableCell className="text-right">${t.cost.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{t.durationMin} min</TableCell>
                    <TableCell><span className={`px-2 py-1 rounded-md text-xs ${statusBadge[t.status]}`}>{t.status}</span></TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Trips;


