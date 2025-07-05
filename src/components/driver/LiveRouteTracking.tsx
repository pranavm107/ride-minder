import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MapView from '@/components/MapView';
import { getLocationById, PICKUP_LOCATIONS, DROP_LOCATIONS } from '@/data/locations';
import { Clock, AlertCircle, Maximize } from 'lucide-react';

interface LiveRouteTrackingProps {
  currentTripStatus: 'inactive' | 'active';
  showFullMap: boolean;
  onToggleFullMap: () => void;
  onNotifyDelay: () => void;
  onSendSOS: () => void;
  onEndTrip: () => void;
  assignedRoute?: { pickup: string; drop: string; };
}

const LiveRouteTracking = ({ 
  currentTripStatus, 
  showFullMap, 
  onToggleFullMap,
  onNotifyDelay,
  onSendSOS,
  onEndTrip,
  assignedRoute
}: LiveRouteTrackingProps) => {
  // Get real locations for driver's assigned route
  const pickupLocation = assignedRoute?.pickup ? 
    (getLocationById(assignedRoute.pickup.toLowerCase().replace(/\s+/g, '-')) || PICKUP_LOCATIONS[0]) : 
    PICKUP_LOCATIONS[0];
  const dropLocation = assignedRoute?.drop ? 
    (getLocationById(assignedRoute.drop.toLowerCase().replace(/\s+/g, '-')) || DROP_LOCATIONS[0]) : 
    DROP_LOCATIONS[0];

  // Simulated current bus location
  const currentBusLocation = {
    lat: 11.0100,
    lng: 76.9600
  };
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg">Live Route Tracking</CardTitle>
            {currentTripStatus === 'active' && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                Trip Active
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {currentTripStatus === 'active' && (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-amber-600 border-amber-200 hover:bg-amber-50"
                  onClick={onNotifyDelay}
                >
                  <Clock size={16} className="mr-1" />
                  Delay 10 min
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={onSendSOS}
                >
                  <AlertCircle size={16} className="mr-1" />
                  SOS
                </Button>
                
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={onEndTrip}
                >
                  End Trip
                </Button>
              </>
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={onToggleFullMap}
            >
              <Maximize size={16} className="mr-1" />
              {showFullMap ? 'Minimize' : 'Full View'}
            </Button>
          </div>
        </div>
        
        {currentTripStatus === 'active' && (
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        <div className={`relative ${showFullMap ? 'h-[500px]' : 'h-[400px]'}`}>
          <MapView 
            userType="driver" 
            mode={currentTripStatus === 'active' ? "navigation" : "preview"} 
            fullView={showFullMap} 
            isActive={currentTripStatus === 'active'}
            currentBusLocation={currentBusLocation}
            assignedRoute={{
              pickup: pickupLocation,
              drop: dropLocation
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveRouteTracking;