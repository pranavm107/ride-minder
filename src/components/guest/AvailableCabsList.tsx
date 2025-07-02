
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bus, MapPin, Clock, Users, User } from 'lucide-react';

interface CabData {
  id: string;
  routeName: string;
  driverName: string;
  availableSeats: number;
  totalSeats: number;
  currentLocation: string;
  nextStop: string;
  estimatedArrival: string;
  rideType: 'morning' | 'evening';
}

interface AvailableCabsListProps {
  cabs: CabData[];
  onBookSeat: (cabId: string) => void;
  loading: boolean;
}

const AvailableCabsList = ({ cabs, onBookSeat, loading }: AvailableCabsListProps) => {
  const getRideTypeBadge = (rideType: string) => {
    return rideType === 'morning' 
      ? <Badge className="bg-blue-100 text-blue-800">Morning</Badge>
      : <Badge className="bg-orange-100 text-orange-800">Evening</Badge>;
  };

  const getAvailabilityBadge = (availableSeats: number) => {
    if (availableSeats > 10) {
      return <Badge className="bg-green-100 text-green-800">High Availability</Badge>;
    } else if (availableSeats > 5) {
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Availability</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Low Availability</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {cabs.map((cab) => (
        <Card key={cab.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Bus className="h-5 w-5 text-brand-500" />
                      {cab.routeName}
                    </h3>
                    <p className="text-muted-foreground flex items-center gap-1 mt-1">
                      <User className="h-4 w-4" />
                      Driver: {cab.driverName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {getRideTypeBadge(cab.rideType)}
                    {getAvailabilityBadge(cab.availableSeats)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium text-brand-500">{cab.availableSeats}</span>
                      <span className="text-muted-foreground"> / {cab.totalSeats} seats</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-foreground">{cab.currentLocation}</span>
                      <div className="text-muted-foreground">→ {cab.nextStop}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-foreground">ETA: {cab.estimatedArrival}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Button
                  onClick={() => onBookSeat(cab.id)}
                  disabled={loading || cab.availableSeats === 0}
                >
                  {loading ? "Booking..." : "Book Seat"}
                </Button>
                <span className="text-xs text-muted-foreground">
                  ₹25 per ride
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AvailableCabsList;
