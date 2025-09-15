import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, Zap, Wifi, ShieldCheck, Search } from 'lucide-react';

type StationStatus = 'online' | 'offline' | 'maintenance';

interface Station {
  id: string;
  name: string;
  address: string;
  region: string;
  connectors: number;
  powerKw: number;
  status: StationStatus;
  amenities: string[];
}

const mockStations: Station[] = [
  { id: 'ST-001', name: 'Central Plaza', address: '12 Main St, District 1', region: 'North', connectors: 8, powerKw: 150, status: 'online', amenities: ['Parking', 'Cafe', 'Wifi'] },
  { id: 'ST-002', name: 'Riverside Hub', address: '88 River Rd, District 2', region: 'South', connectors: 6, powerKw: 120, status: 'maintenance', amenities: ['Parking', 'Restroom'] },
  { id: 'ST-003', name: 'Airport FastCharge', address: '1 Sky Ave', region: 'East', connectors: 12, powerKw: 250, status: 'online', amenities: ['Parking', 'Wifi', '24/7'] },
  { id: 'ST-004', name: 'Tech Park', address: '45 Innovation Dr', region: 'West', connectors: 4, powerKw: 60, status: 'offline', amenities: ['Parking'] },
  { id: 'ST-005', name: 'Harbor Point', address: '9 Ocean Blvd', region: 'South', connectors: 10, powerKw: 180, status: 'online', amenities: ['Wifi', 'Cafe'] },
];

const statusColor: Record<StationStatus, string> = {
  online: 'bg-electric-green/15 text-electric-green',
  offline: 'bg-destructive/10 text-destructive',
  maintenance: 'bg-energy-orange/15 text-energy-orange',
};

const Stations: React.FC = () => {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<string>('all');
  const [status, setStatus] = useState<string>('all');

  const filtered = useMemo(() => {
    return mockStations.filter((s) => {
      const matchQuery = `${s.name} ${s.address}`.toLowerCase().includes(query.toLowerCase());
      const matchRegion = region === 'all' || s.region === region;
      const matchStatus = status === 'all' || s.status === status;
      return matchQuery && matchRegion && matchStatus;
    });
  }, [query, region, status]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stations</h1>
          <p className="text-muted-foreground mt-1">Manage charging stations and status</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-electric-blue" />
            <span>Stations Directory</span>
          </CardTitle>
          <CardDescription>Search and filter stations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search name or address" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
            </div>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All regions</SelectItem>
                <SelectItem value="North">North</SelectItem>
                <SelectItem value="South">South</SelectItem>
                <SelectItem value="East">East</SelectItem>
                <SelectItem value="West">West</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Station</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead className="text-right">Connectors</TableHead>
                  <TableHead className="text-right">Power</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amenities</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s, i) => (
                  <motion.tr key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: i * 0.03 }} className="border-b last:border-0">
                    <TableCell className="font-medium flex items-center gap-2">
                      <Zap className="w-4 h-4 text-electric-green" />
                      {s.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{s.address}</TableCell>
                    <TableCell>{s.region}</TableCell>
                    <TableCell className="text-right">{s.connectors}</TableCell>
                    <TableCell className="text-right">{s.powerKw} kW</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-md text-xs ${statusColor[s.status]}`}>{s.status}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {s.amenities.includes('Wifi') && <Badge variant="secondary" className="gap-1"><Wifi className="w-3 h-3" />Wifi</Badge>}
                        {s.amenities.includes('Parking') && <Badge variant="secondary">Parking</Badge>}
                        {s.amenities.includes('Cafe') && <Badge variant="secondary">Cafe</Badge>}
                        {s.amenities.includes('24/7') && <Badge variant="secondary">24/7</Badge>}
                        {s.amenities.includes('Restroom') && <Badge variant="secondary">Restroom</Badge>}
                      </div>
                    </TableCell>
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

export default Stations;


