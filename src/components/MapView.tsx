import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Bus, MapPin, Navigation, Clock, MapIcon, Layers, Maximize2, ZoomIn, ZoomOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

type MapViewProps = {
  className?: string;
  isActive?: boolean;
  userType: 'student' | 'driver' | 'admin';
  mode?: 'preview' | 'navigation';
  fullView?: boolean;
  height?: string;
};

const MapView = ({ className, isActive = true, userType, mode = 'preview', fullView = false, height }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const [buses, setBuses] = useState<{id: number, x: number, y: number, route: string, eta: number, status: string}[]>([
    { id: 1, x: 25, y: 40, route: 'North Campus', eta: 5, status: 'on-time' },
    { id: 2, x: 60, y: 60, route: 'South Campus', eta: 12, status: 'delayed' },
    { id: 3, x: 75, y: 30, route: 'Downtown Express', eta: 8, status: 'on-time' },
  ]);
  
  const [stops, setStops] = useState([
    { id: 1, name: 'Library', x: 25, y: 45, status: 'completed', nextArrival: '08:30 AM', students: 5 },
    { id: 2, name: 'Science Center', x: 60, y: 30, status: 'upcoming', nextArrival: '08:45 AM', students: 8 },
    { id: 3, name: 'Student Center', x: 75, y: 60, status: 'current', nextArrival: '09:00 AM', students: 12 },
    { id: 4, name: 'Engineering Building', x: 35, y: 65, status: 'upcoming', nextArrival: '09:15 AM', students: 7 },
    { id: 5, name: 'Main Gate', x: 15, y: 25, status: 'upcoming', nextArrival: '09:30 AM', students: 3 },
  ]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setBuses(buses => buses.map(bus => ({
        ...bus,
        x: bus.x + (Math.random() * 2 - 1) * 2,
        y: bus.y + (Math.random() * 2 - 1) * 2,
        eta: Math.max(0, bus.eta - (Math.random() > 0.7 ? 1 : 0))
      })));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isActive]);

  const mapBackground = mapType === 'standard' 
    ? "bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/-77.03,38.91,12,0/800x600?access_token=pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2xsbzYyZmQ1MDgwYzNlbXh5czFneWM3cyJ9.R02Sh2qtDb9bF6MTGtQ-jw')]" 
    : "bg-[url('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/-77.03,38.91,12,0/800x600?access_token=pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2xsbzYyZmQ1MDgwYzNlbXh5czFneWM3cyJ9.R02Sh2qtDb9bF6MTGtQ-jw')]";

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
                <div className="text-sm font-semibold">Next: Library</div>
                <div className="text-xs text-gray-500">3 min (0.8 miles)</div>
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
                {buses.map((bus) => (
                  <div
                    key={bus.id}
                    className="absolute transition-all duration-1000 ease-in-out transform hover:scale-110"
                    style={{ left: `${bus.x}%`, top: `${bus.y}%` }}
                  >
                    <div className="h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-brand-500 cursor-pointer relative -translate-x-1/2 -translate-y-1/2 group">
                      <Bus size={16} className="text-brand-500" />
                      
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-36 p-2 bg-white rounded-lg shadow-lg text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                        <div className="font-medium text-gray-900 mb-1">{bus.route}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Bus #{bus.id}</span>
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
                ))}
                
                {stops.map((stop) => (
                  <div
                    key={stop.id}
                    className="absolute transition-all duration-300 ease-in-out"
                    style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                  >
                    <div className={cn(
                      "h-12 w-12 rounded-full flex items-center justify-center relative -translate-x-1/2 -translate-y-1/2 group",
                      stop.status === 'completed' ? "bg-gray-100" :
                      stop.status === 'current' ? "bg-brand-100 animate-pulse" : 
                      "bg-blue-100"
                    )}>
                      <div className={cn(
                        "h-8 w-8 rounded-full border-2 flex items-center justify-center",
                        stop.status === 'completed' ? "border-gray-400 text-gray-500" :
                        stop.status === 'current' ? "border-brand-500 text-brand-500" : 
                        "border-blue-400 text-blue-500"
                      )}>
                        <span className="text-xs font-bold">{stop.id}</span>
                      </div>
                      
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 p-2 bg-white rounded-lg shadow-lg text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10">
                        <div className="font-medium text-gray-900 mb-1">{stop.name}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Next: {stop.nextArrival}</span>
                          <span className="flex items-center gap-1 text-blue-500">
                            <User size={10} />
                            {stop.students}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-md bg-white shadow-sm",
                        stop.status === 'completed' ? "text-gray-500" :
                        stop.status === 'current' ? "text-brand-500 font-bold" : 
                        "text-blue-500"
                      )}>
                        {stop.name}
                      </span>
                    </div>
                  </div>
                ))}
                
                {userType === 'student' && (
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
