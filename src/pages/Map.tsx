import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Search } from 'lucide-react';

interface StationMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  region: 'North' | 'South' | 'East' | 'West';
  status: 'online' | 'maintenance' | 'offline';
}

const mockMarkers: StationMarker[] = [
  { id: 'ST-001', name: 'Central Plaza', lat: 10.776, lng: 106.700, region: 'North', status: 'online' },
  { id: 'ST-002', name: 'Riverside Hub', lat: 10.790, lng: 106.720, region: 'South', status: 'maintenance' },
  { id: 'ST-003', name: 'Airport FastCharge', lat: 10.815, lng: 106.660, region: 'East', status: 'online' },
  { id: 'ST-004', name: 'Tech Park', lat: 10.850, lng: 106.630, region: 'West', status: 'offline' },
];

const MapPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<string>('all');
  const [status, setStatus] = useState<string>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return mockMarkers.filter((m) => {
      const matchQuery = `${m.name}`.toLowerCase().includes(query.toLowerCase());
      const matchRegion = region === 'all' || m.region === region;
      const matchStatus = status === 'all' || m.status === status;
      return matchQuery && matchRegion && matchStatus;
    });
  }, [query, region, status]);

  const selected = filtered.find((m) => m.id === selectedId) || filtered[0] || mockMarkers[0];

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${selected.lng - 0.03}%2C${selected.lat - 0.02}%2C${selected.lng + 0.03}%2C${selected.lat + 0.02}&layer=mapnik&marker=${selected.lat}%2C${selected.lng}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Map</h1>
          <p className="text-muted-foreground mt-1">Explore charging stations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5 text-electric-blue" />Stations</CardTitle>
            <CardDescription>Search and filter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search station" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
            </div>
            <div className="grid grid-cols-2 gap-3">
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

            <div className="space-y-2 max-h-[360px] overflow-auto pr-1">
              {filtered.map((m) => (
                <button key={m.id} onClick={() => setSelectedId(m.id)} className={`w-full text-left p-3 rounded-md border hover:bg-muted/50 transition ${selected?.id === m.id ? 'border-electric-blue bg-electric-blue/5' : ''}`}>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.region} • {m.status}</div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="text-sm text-muted-foreground">No stations found</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Navigation className="w-5 h-5 text-electric-green" />Map Preview</CardTitle>
            <CardDescription>OpenStreetMap embedded view</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[16/9] w-full overflow-hidden rounded-md border">
              <iframe title="map" src={mapSrc} className="w-full h-full" />
            </div>
            <div className="mt-3 text-sm text-muted-foreground">Selected: <span className="text-foreground font-medium">{selected?.name}</span></div>
            <div className="mt-4">
              <Button variant="secondary" className="mr-2" disabled>Start navigation</Button>
              <Button disabled>Reserve spot</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapPage;


