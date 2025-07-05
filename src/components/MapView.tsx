import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Bus, MapPin, Navigation, Clock, MapIcon, Layers, Maximize2, ZoomIn, ZoomOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Location } from '@/types/locations';
import { PICKUP_LOCATIONS, DROP_LOCATIONS } from '@/data/locations';

type MapViewProps = {
  className?: string;
  isActive?: boolean;
  userType: 'student' | 'driver' | 'admin' | 'parent';
  mode?: 'preview' | 'navigation';
  fullView?: boolean;
  height?: string;
  currentBusLocation?: { lat: number; lng: number; };
  assignedRoute?: { pickup: Location; drop: Location; };
};

const MapView = ({ 
  className, 
  isActive = true, 
  userType, 
  mode = 'preview', 
  fullView = false, 
  height,
  currentBusLocation,
  assignedRoute
}: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  
  // Convert lat/lng to screen coordinates (simplified conversion for demo)
  const latLngToScreen = (lat: number, lng: number) => {
    // Coimbatore bounds approximation: lat 10.6-11.4, lng 76.7-77.3
    const latRange = [10.6, 11.4];
    const lngRange = [76.7, 77.3];
    
    const x = ((lng - lngRange[0]) / (lngRange[1] - lngRange[0])) * 100;
    const y = 100 - ((lat - latRange[0]) / (latRange[1] - latRange[0])) * 100; // Invert Y axis
    
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  // Real-time bus locations (simulated)
  const [busLocations, setBusLocations] = useState([
    { 
      id: 1, 
      lat: 11.0176, 
      lng: 76.9558, 
      route: 'Gandhipuram Route', 
      eta: 5, 
      status: 'on-time',
      cabNumber: 'CB-248'
    },
    { 
      id: 2, 
      lat: 10.9983, 
      lng: 76.9674, 
      route: 'Ukkadam Route', 
      eta: 12, 
      status: 'delayed',
      cabNumber: 'CB-156'
    },
    { 
      id: 3, 
      lat: 11.0023, 
      lng: 77.0277, 
      route: 'Singanallur Route', 
      eta: 8, 
      status: 'on-time',
      cabNumber: 'CB-089'
    }
  ]);

  // Convert pickup/drop locations to screen positions
  const pickupStops = PICKUP_LOCATIONS.map((location, index) => ({
    ...location,
    ...latLngToScreen(location.lat, location.lng),
    status: index === 0 ? 'current' : index < 2 ? 'completed' : 'upcoming',
    nextArrival: new Date(Date.now() + (index + 1) * 15 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    students: Math.floor(Math.random() * 10) + 3
  }));

  const dropStops = DROP_LOCATIONS.map((location, index) => ({
    ...location,
    ...latLngToScreen(location.lat, location.lng),
    status: 'upcoming',
    nextArrival: new Date(Date.now() + (index + 5) * 20 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    students: Math.floor(Math.random() * 8) + 2
  }));
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setBusLocations(buses => buses.map(bus => ({
        ...bus,
        lat: bus.lat + (Math.random() * 2 - 1) * 0.005, // Small GPS movement
        lng: bus.lng + (Math.random() * 2 - 1) * 0.005,
        eta: Math.max(0, bus.eta - (Math.random() > 0.7 ? 1 : 0))
      })));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isActive]);

  // Use Coimbatore coordinates for map center (11.0168, 76.9558)
  const mapBackground = mapType === 'standard' 
    ? "bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/76.9558,11.0168,11,0/800x600?access_token=pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2xsbzYyZmQ1MDgwYzNlbXh5czFneWM3cyJ9.R02Sh2qtDb9bF6MTGtQ-jw')]" 
    : "bg-[url('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/76.9558,11.0168,11,0/800x600?access_token=pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2xsbzYyZmQ1MDgwYzNlbXh5czFneWM3cyJ9.R02Sh2qtDb9bF6MTGtQ-jw')]";

  const renderNavigationMode = () => (
    <div className={cn(
      "relative w-full overflow-hidden",
      height ? `h-[${height}]` : (fullView ? "h-[500px]" : "h-[350px]")
    )}>
      <div className={cn(
        "absolute inset-0 bg-cover bg-center",
        mapBackground
      )}>
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg flex items-center gap-2 w-5/6">
          <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center text-white">
            <Navigation size={18} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Next direction</p>
            <p className="font-medium">Turn right onto University Ave</p>
          </div>
          <div className="text-xl font-bold text-brand-500">0.2mi</div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bus size={20} className="text-brand-500" />
              </div>
              <div>
                <div className="text-sm font-semibold">Next: {assignedRoute?.pickup?.areaName || 'Gandhipuram'}</div>
                <div className="text-xs text-gray-500">3 min ({assignedRoute?.pickup?.distanceFromCollege || 12}km)</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm font-medium">ETA</div>
              <div className="text-lg font-bold text-brand-500">8:32 AM</div>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="icon" className="bg-white shadow-md w-8 h-8">
              <ZoomIn size={16} />
            </Button>
            <Button variant="outline" size="icon" className="bg-white shadow-md w-8 h-8">
              <ZoomOut size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white shadow-md w-8 h-8"
              onClick={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
            >
              <Layers size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn(
      'rounded-2xl overflow-hidden relative bg-white border border-gray-100 shadow-lg',
      className
    )}>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-500">
            <MapPin size={18} />
          </div>
          <h3 className="font-medium text-gray-900">
            {userType === 'student' && 'Your Bus Tracker'}
            {userType === 'driver' && (mode === 'navigation' ? 'Turn-by-Turn Navigation' : 'Route Navigation')}
            {userType === 'admin' && 'Fleet Overview'}
            {userType === 'parent' && 'Live Tracking Map'}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            Live
          </span>
          <div className="text-xs text-gray-500">Last updated: Just now</div>
        </div>
      </div>
      
      {mode === 'navigation' ? (
        renderNavigationMode()
      ) : (
        <div 
          ref={mapRef} 
          className={cn(
            "relative w-full bg-brand-50 overflow-hidden",
            height ? `h-[${height}]` : (fullView ? "h-[500px]" : "h-[350px]")
          )}
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 border-4 border-gray-200 border-t-brand-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm text-gray-600">Loading map data...</p>
              </div>
            </div>
          ) : (
            <>
              <div className={cn(
                "absolute inset-0 bg-cover bg-center",
                mapBackground
              )}>
                {busLocations.map((bus) => {
                  const screenPos = latLngToScreen(bus.lat, bus.lng);
                  return (
                    <div
                      key={bus.id}
                      className="absolute transition-all duration-1000 ease-in-out transform hover:scale-110"
                      style={{ left: `${screenPos.x}%`, top: `${screenPos.y}%` }}
                    >
                      <div className="h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-brand-500 cursor-pointer relative -translate-x-1/2 -translate-y-1/2 group">
                        <Bus size={16} className="text-brand-500" />
                        
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-36 p-2 bg-white rounded-lg shadow-lg text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                          <div className="font-medium text-gray-900 mb-1">{bus.route}</div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">{bus.cabNumber}</span>
                            <span className={cn(
                              "flex items-center gap-1",
                              bus.status === 'on-time' ? "text-green-500" : "text-amber-500"
                            )}>
                              <Clock size={10} />
                              {bus.eta} min
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Pickup Points (Green markers) */}
                {(userType === 'admin' || userType === 'driver' || userType === 'parent') && pickupStops.map((stop) => (
                  <div
                    key={`pickup-${stop.id}`}
                    className="absolute transition-all duration-300 ease-in-out"
                    style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                  >
                    <div className={cn(
                      "h-12 w-12 rounded-full flex items-center justify-center relative -translate-x-1/2 -translate-y-1/2 group",
                      stop.status === 'completed' ? "bg-green-200" :
                      stop.status === 'current' ? "bg-green-100 animate-pulse" : 
                      "bg-green-50"
                    )}>
                      <div className={cn(
                        "h-8 w-8 rounded-full border-2 flex items-center justify-center",
                        "border-green-500 text-green-600"
                      )}>
                        <MapPin size={12} />
                      </div>
                      
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 p-2 bg-white rounded-lg shadow-lg text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10">
                        <div className="font-medium text-gray-900 mb-1">{stop.areaName}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Pickup: {stop.nextArrival}</span>
                          <span className="flex items-center gap-1 text-green-500">
                            <User size={10} />
                            {stop.students}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {stop.distanceFromCollege}km • {stop.estimatedTime}min
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-green-100 text-green-700 shadow-sm">
                        📍 {stop.areaName}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Drop Points (Red markers) */}
                {(userType === 'admin' || userType === 'driver' || userType === 'parent') && dropStops.map((stop) => (
                  <div
                    key={`drop-${stop.id}`}
                    className="absolute transition-all duration-300 ease-in-out"
                    style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                  >
                    <div className="h-12 w-12 rounded-full flex items-center justify-center relative -translate-x-1/2 -translate-y-1/2 group bg-red-50">
                      <div className="h-8 w-8 rounded-full border-2 border-red-500 text-red-600 flex items-center justify-center">
                        <MapPin size={12} />
                      </div>
                      
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 p-2 bg-white rounded-lg shadow-lg text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10">
                        <div className="font-medium text-gray-900 mb-1">{stop.areaName}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Drop: {stop.nextArrival}</span>
                          <span className="flex items-center gap-1 text-red-500">
                            <User size={10} />
                            {stop.students}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {stop.distanceFromCollege}km • {stop.estimatedTime}min
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-red-100 text-red-700 shadow-sm">
                        🏠 {stop.areaName}
                      </span>
                    </div>
                  </div>
                ))}
                
                {userType === 'student' && assignedRoute && (
                  <>
                    {/* Student's current location */}
                    <div 
                      className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="h-6 w-6 bg-brand-500 rounded-full flex items-center justify-center shadow-md animate-pulse">
                        <div className="h-3 w-3 bg-white rounded-full"></div>
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                        You are here
                      </div>
                    </div>
                    
                    {/* Student's assigned pickup point */}
                    {(() => {
                      const pickupPos = latLngToScreen(assignedRoute.pickup.lat, assignedRoute.pickup.lng);
                      return (
                        <div 
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${pickupPos.x}%`, top: `${pickupPos.y}%` }}
                        >
                          <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center shadow-md animate-pulse">
                            <MapPin size={14} className="text-white" />
                          </div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full shadow-sm">
                            Pickup: {assignedRoute.pickup.areaName}
                          </div>
                        </div>
                      );
                    })()}
                    
                    {/* Student's assigned drop point */}
                    {(() => {
                      const dropPos = latLngToScreen(assignedRoute.drop.lat, assignedRoute.drop.lng);
                      return (
                        <div 
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${dropPos.x}%`, top: `${dropPos.y}%` }}
                        >
                          <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                            <MapPin size={14} className="text-white" />
                          </div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium px-2 py-1 bg-red-100 text-red-700 rounded-full shadow-sm">
                            Drop: {assignedRoute.drop.areaName}
                          </div>
                        </div>
                      );
                    })()}
                  </>
                )}
              </div>
              
              <div className="absolute top-4 right-4">
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="icon" className="bg-white shadow-md w-8 h-8">
                    <ZoomIn size={16} />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-white shadow-md w-8 h-8">
                    <ZoomOut size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white shadow-md w-8 h-8"
                    onClick={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
                  >
                    <Layers size={16} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      <div className="p-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <button className="p-2 rounded-lg bg-brand-50 text-brand-600 text-sm font-medium hover:bg-brand-100 transition-colors flex items-center justify-center gap-1">
            <Navigation size={16} />
            {userType === 'admin' ? 'View All Routes' : 'Navigate'}
          </button>
          <button className="p-2 rounded-lg bg-gray-50 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-1">
            <MapPin size={16} />
            Show Stops
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapView;
