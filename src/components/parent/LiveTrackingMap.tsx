import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import MapView from '@/components/MapView';
import { getLocationById } from '@/data/locations';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Car, 
  AlertTriangle, 
  RefreshCw,
  Route,
  Users,
  Phone
} from 'lucide-react';

interface LiveTrackingMapProps {
  studentData: any;
}

const LiveTrackingMap = ({ studentData }: LiveTrackingMapProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Get actual locations from data
  const pickupLocation = getLocationById(studentData.pickupLocation?.toLowerCase().replace(/\s+/g, '-')) || 
                        { id: 'gandhipuram', areaName: 'Gandhipuram', type: 'pickup' as const, lat: 11.0176, lng: 76.9558, distanceFromCollege: 12, estimatedTime: 25 };
  const dropLocation = getLocationById(studentData.dropLocation?.toLowerCase().replace(/\s+/g, '-')) || 
                      { id: 'pollachi', areaName: 'Pollachi', type: 'drop' as const, lat: 10.6586, lng: 77.0047, distanceFromCollege: 45, estimatedTime: 90 };

  // Real-time tracking data using actual coordinates
  const trackingData = {
    cabLocation: {
      lat: 11.0100, // Current bus location between pickup points
      lng: 76.9600,
      address: `Near ${pickupLocation.areaName}, Coimbatore`
    },
    studentLocation: {
      lat: pickupLocation.lat,
      lng: pickupLocation.lng,
      isInCab: true
    },
    eta: {
      toCollege: `${Math.floor(Math.random() * 10) + 8} mins`,
      toHome: `${Math.floor(Math.random() * 15) + 12} mins`
    },
    cabStatus: "On Route",
    delay: null,
    nextStop: dropLocation.areaName
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const handleCallDriver = () => {
    window.open('tel:+919876543210');
  };

  return (
    <div className="space-y-6">
      {/* Live Status Alert */}
      <Alert className="border-green-200 bg-green-50">
        <Car className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-700">
          <strong>{studentData.name}</strong> is currently in Cab {studentData.cabNumber} and on route to college.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Live Location Tracking
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Real GPS Map */}
            <div className="relative w-full h-80">
              <MapView 
                userType="parent"
                mode="preview"
                isActive={true}
                currentBusLocation={trackingData.cabLocation}
                assignedRoute={{
                  pickup: pickupLocation,
                  drop: dropLocation
                }}
                height="320px"
              />
            </div>
            
            {/* Route Info */}
            <div className="mt-4 flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Route className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Route Progress</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">Next Stop:</span>
                <Badge variant="secondary">{trackingData.nextStop}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Panel */}
        <div className="space-y-4">
          {/* ETA Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4" />
                Estimated Arrival
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">To College:</span>
                <Badge variant="outline" className="font-mono">
                  {trackingData.eta.toCollege}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">To Home:</span>
                <Badge variant="outline" className="font-mono">
                  {trackingData.eta.toHome}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Cab Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Car className="h-4 w-4" />
                Cab Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  {trackingData.cabStatus}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cab Number:</span>
                <Badge variant="outline">{studentData.cabNumber}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Student Status:</span>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  {trackingData.studentLocation.isInCab ? 'In Cab' : 'Not Boarded'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleCallDriver}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Driver
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                View Route Students
              </Button>
            </CardContent>
          </Card>

          {/* Last Updated */}
          <div className="text-center text-xs text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* AI Prediction Alert */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-700">
          <strong>AI Prediction:</strong> Based on current traffic, the cab might be 3-5 minutes late today.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default LiveTrackingMap;