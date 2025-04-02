
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Bus, MapPin, Navigation, Clock, MapIcon } from 'lucide-react';

type MapViewProps = {
  className?: string;
  isActive?: boolean;
  userType: 'student' | 'driver' | 'admin';
  mode?: 'preview' | 'navigation';
};

const MapView = ({ className, isActive = true, userType, mode = 'preview' }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [buses, setBuses] = useState<{id: number, x: number, y: number, route: string, eta: number}[]>([
    { id: 1, x: 25, y: 40, route: 'North Campus', eta: 5 },
    { id: 2, x: 60, y: 60, route: 'South Campus', eta: 12 },
    { id: 3, x: 75, y: 30, route: 'Downtown Express', eta: 8 },
  ]);
  
  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simulate bus movement
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

  const renderNavigationMode = () => (
    <div className="relative h-[350px] w-full bg-brand-50 overflow-hidden">
      {/* Realistic navigation UI */}
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/static/-77.03,38.91,12,0/600x400?access_token=pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2xsbzYyZmQ1MDgwYzNlbXh5czFneWM3cyJ9.R02Sh2qtDb9bF6MTGtQ-jw')] bg-cover bg-center">
        
        {/* Navigation Instructions */}
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
        
        {/* Direction Arrow */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-16 w-16 bg-white/80 rounded-full shadow-lg flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 7L12 2L17 7H14V14H10V7H7Z" fill="#2563EB" />
              <path d="M19 19H5V21H19V19Z" fill="#2563EB" />
            </svg>
          </div>
        </div>
        
        {/* Current location */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
          <div className="h-6 w-6 bg-brand-500 rounded-full animate-pulse"></div>
          <div className="h-12 w-12 bg-brand-500/30 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
        </div>
        
        {/* Next stop info */}
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
      </div>
    </div>
  );

  return (
    <div className={cn(
      'rounded-2xl overflow-hidden relative bg-white border border-gray-100 shadow-lg',
      className
    )}>
      {/* Map Header */}
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
      
      {/* Map Area */}
      {mode === 'navigation' ? (
        renderNavigationMode()
      ) : (
        <div 
          ref={mapRef} 
          className="relative h-[350px] w-full bg-brand-50 overflow-hidden"
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
              {/* Map grid lines for visual effect */}
              <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={`col-${i}`} className="border-r border-gray-200/20 h-full"></div>
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={`row-${i}`} className="border-b border-gray-200/20 w-full"></div>
                ))}
              </div>
              
              {/* Campus Buildings */}
              <div className="absolute left-[20%] top-[30%] h-16 w-24 bg-gray-200 rounded-md flex items-center justify-center shadow-sm">
                <span className="text-xs font-medium text-gray-700">Library</span>
              </div>
              <div className="absolute right-[30%] top-[20%] h-16 w-32 bg-gray-200 rounded-md flex items-center justify-center shadow-sm">
                <span className="text-xs font-medium text-gray-700">Science Center</span>
              </div>
              <div className="absolute left-[70%] bottom-[20%] h-16 w-28 bg-gray-200 rounded-md flex items-center justify-center shadow-sm">
                <span className="text-xs font-medium text-gray-700">Student Center</span>
              </div>
              
              {/* Routes */}
              <svg className="absolute inset-0 h-full w-full">
                <path 
                  d="M100,100 C150,150 200,150 250,100 S350,50 400,100" 
                  stroke="#D0E6FF" 
                  strokeWidth="5" 
                  fill="none"
                  strokeDasharray="5,5"
                />
                <path 
                  d="M50,200 C100,250 200,250 300,200" 
                  stroke="#D0E6FF" 
                  strokeWidth="5" 
                  fill="none"
                  strokeDasharray="5,5"
                />
              </svg>
              
              {/* Bus icons */}
              {buses.map((bus) => (
                <div
                  key={bus.id}
                  className="absolute transition-all duration-1000 ease-in-out transform hover:scale-110"
                  style={{ left: `${bus.x}%`, top: `${bus.y}%` }}
                >
                  <div className="h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-brand-500 cursor-pointer relative -translate-x-1/2 -translate-y-1/2">
                    <Bus size={16} className="text-brand-500" />
                    
                    {/* Route tooltip on hover */}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-36 p-2 bg-white rounded-lg shadow-lg text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                      <div className="font-medium text-gray-900 mb-1">{bus.route}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Bus #{bus.id}</span>
                        <span className="flex items-center text-brand-500 gap-1">
                          <Clock size={10} />
                          {bus.eta} min
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* User location (for student view) */}
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
            </>
          )}
        </div>
      )}
      
      {/* Map Controls */}
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
