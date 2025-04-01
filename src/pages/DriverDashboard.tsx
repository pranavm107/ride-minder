import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import MapView from '@/components/MapView';
import DashboardCard from '@/components/DashboardCard';
import { cn } from '@/lib/utils';
import { Bus, Clock, MapPin, User, MessageSquare, Search, Camera, Phone, Bell, Settings, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useIsMobile, useDeviceInfo } from '@/hooks/use-mobile';
import StopsPage from '@/components/StopsPage';

const DriverDashboard = () => {
  const [status, setStatus] = useState<'offline' | 'online' | 'on-route'>('online');
  const [currentTab, setCurrentTab] = useState<'passengers' | 'route' | 'communication'>('passengers');
  const [showNavigation, setShowNavigation] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'stops' | 'messages'>('dashboard');
  
  const { isMobile } = useDeviceInfo();

  const students = [
    { id: 1, name: 'Emma Wilson', stop: 'Student Center', status: 'boarded', imageUrl: '' },
    { id: 2, name: 'Michael Chen', stop: 'Library', status: 'waiting', imageUrl: '' },
    { id: 3, name: 'Sarah Johnson', stop: 'Engineering Building', status: 'waiting', imageUrl: '' },
    { id: 4, name: 'Diego Rodrigez', stop: 'Gym', status: 'canceled', imageUrl: '' },
    { id: 5, name: 'Aisha Patel', stop: 'Science Center', status: 'waiting', imageUrl: '' },
  ];
  
  const stops = [
    { id: 1, name: 'Student Center', time: '8:30 AM', status: 'completed', studentsCount: 5 },
    { id: 2, name: 'Library', time: '8:45 AM', status: 'current', studentsCount: 3 },
    { id: 3, name: 'Engineering Building', time: '9:00 AM', status: 'upcoming', studentsCount: 8 },
    { id: 4, name: 'Gym', time: '9:10 AM', status: 'upcoming', studentsCount: 2 },
    { id: 5, name: 'Science Center', time: '9:25 AM', status: 'upcoming', studentsCount: 6 },
  ];
  
  const maintenanceIssues = [
    { id: 1, type: 'Low Fuel', status: 'pending', reportedAt: 'Yesterday, 5:30 PM' },
    { id: 2, type: 'Brake Check', status: 'scheduled', date: 'Tomorrow, 9:00 AM' },
  ];
  
  const emergencyToggle = () => {
    toast.error("Emergency alert sent to campus security. Help is on the way.");
  };
  
  const delayRoute = () => {
    toast.info("All passengers have been notified of the 10-minute delay.");
  };

  const startRoute = () => {
    setStatus('on-route');
    setShowNavigation(true);
    toast.success("Route started successfully. Navigation activated.");
  };

  if (currentView === 'stops') {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <main className="pt-20 pb-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <Button 
                variant="ghost" 
                size={isMobile ? "lg" : "default"}
                className="gap-2"
                onClick={() => setCurrentView('dashboard')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                Back to Dashboard
              </Button>
            </div>
            
            <StopsPage />
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Driver Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back, David!</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-3">
                <span className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1",
                  status === 'offline' && 'bg-gray-100 text-gray-700',
                  status === 'online' && 'bg-blue-100 text-blue-700',
                  status === 'on-route' && 'bg-green-100 text-green-700'
                )}>
                  <span className={cn(
                    "h-2 w-2 rounded-full",
                    status === 'offline' && 'bg-gray-500',
                    status === 'online' && 'bg-blue-500',
                    status === 'on-route' && 'bg-green-500'
                  )}></span>
                  {status === 'offline' ? 'Offline' : status === 'online' ? 'Online' : 'On Route'}
                </span>
                
                <Button 
                  variant={status === 'offline' ? 'default' : 'outline'} 
                  className={cn(
                    status === 'offline' ? 'bg-brand-500 hover:bg-brand-600' : '',
                    isMobile && 'mobile-action-button'
                  )}
                  onClick={() => {
                    const newStatus = status === 'offline' ? 'online' : 'offline';
                    setStatus(newStatus);
                    toast.success(`You are now ${newStatus}`);
                    if (newStatus === 'offline') {
                      setShowNavigation(false);
                    }
                  }}
                >
                  {status === 'offline' ? 'Go Online' : 'Go Offline'}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard
              title="Current Route"
              value="North Campus Express"
              icon={<Bus size={18} />}
              className="col-span-1"
            />
            <DashboardCard
              title="Passengers"
              value="23/30"
              icon={<User size={18} />}
              className="col-span-1"
            />
            <DashboardCard
              title="Next Stop"
              value="Library (3 min)"
              icon={<MapPin size={18} />}
              className="col-span-1"
            />
            <DashboardCard
              title="Route Progress"
              value="2/5 Stops"
              trend={40}
              trendLabel="complete"
              icon={<Clock size={18} />}
              className="col-span-1"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Bus size={18} className="text-brand-500" />
                    Route Navigation
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <Button 
                      variant="outline" 
                      size={isMobile ? "lg" : "sm"}
                      onClick={delayRoute}
                      className={cn(isMobile && "w-full mobile-action-button")}
                    >
                      Delay 10 min
                    </Button>
                    <Button 
                      variant="default" 
                      size={isMobile ? "lg" : "sm"}
                      className={cn(
                        "bg-brand-500 hover:bg-brand-600",
                        isMobile && "w-full mobile-action-button"
                      )}
                      onClick={startRoute}
                      disabled={status === 'on-route'}
                    >
                      {status === 'on-route' ? 'In Progress' : 'Start Route'}
                    </Button>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size={isMobile ? "lg" : "default"}
                  className={cn("w-full justify-center gap-2 mt-4", isMobile && "py-6")}
                  onClick={() => setCurrentView('stops')}
                >
                  <MapPin size={isMobile ? 20 : 16} />
                  Show All Stops
                </Button>
              </div>
              
              {showNavigation && (
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Real-Time Navigation</h3>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast.info("Voice navigation activated")}
                        className={cn("flex items-center gap-1", isMobile && "py-2.5")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                          <line x1="12" y1="19" x2="12" y2="23"></line>
                          <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                        Voice
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast.info("Showing traffic information")}
                        className={isMobile ? "py-2.5" : ""}
                      >
                        Traffic
                      </Button>
                    </div>
                  </div>
                  
                  <MapView userType="driver" />
                  
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center">
                        <MapPin size={16} className="text-brand-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Next: Library</p>
                        <p className="text-xs text-gray-500">3 min (0.8 miles)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline"
                        size={isMobile ? "default" : "sm"}
                        onClick={delayRoute}
                        className={cn("text-xs flex items-center gap-1", isMobile && "flex-1")}
                      >
                        <AlertTriangle size={14} />
                        Report Delay
                      </Button>
                      <Button
                        variant="default"
                        size={isMobile ? "default" : "sm"}
                        className={cn(
                          "bg-brand-500 hover:bg-brand-600 text-xs",
                          isMobile && "flex-1"
                        )}
                        onClick={() => toast.success("Turn-by-turn directions started")}
                      >
                        Start Navigation
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="col-span-1">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100">
                  <button
                    className={cn(
                      "flex-1 py-4 text-sm font-medium transition-colors",
                      currentTab === 'passengers' 
                        ? "text-brand-600 border-b-2 border-brand-500" 
                        : "text-gray-600 hover:text-brand-600"
                    )}
                    onClick={() => setCurrentTab('passengers')}
                  >
                    Passengers
                  </button>
                  <button
                    className={cn(
                      "flex-1 py-4 text-sm font-medium transition-colors",
                      currentTab === 'route' 
                        ? "text-brand-600 border-b-2 border-brand-500" 
                        : "text-gray-600 hover:text-brand-600"
                    )}
                    onClick={() => setCurrentTab('route')}
                  >
                    Vehicle
                  </button>
                  <button
                    className={cn(
                      "flex-1 py-4 text-sm font-medium transition-colors",
                      currentTab === 'communication' 
                        ? "text-brand-600 border-b-2 border-brand-500" 
                        : "text-gray-600 hover:text-brand-600"
                    )}
                    onClick={() => setCurrentTab('communication')}
                  >
                    Messages
                  </button>
                </div>
                
                {currentTab === 'passengers' && (
                  <div className="p-4">
                    <div className="relative mb-4">
                      <input 
                        type="text" 
                        placeholder="Search passengers..." 
                        className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition-all"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                    
                    <div className="space-y-2 max-h-[350px] overflow-y-auto">
                      {students.map((student) => (
                        <div 
                          key={student.id} 
                          className={cn(
                            "p-3 rounded-lg border transition-colors",
                            student.status === 'boarded' && "border-green-100 bg-green-50",
                            student.status === 'waiting' && "border-gray-100 bg-white",
                            student.status === 'canceled' && "border-gray-100 bg-gray-50"
                          )}
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                              {student.name.charAt(0)}
                            </div>
                            <div className="ml-3 flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-gray-900">{student.name}</h4>
                                <span 
                                  className={cn(
                                    "text-xs px-2 py-0.5 rounded-full",
                                    student.status === 'boarded' && "bg-green-100 text-green-700",
                                    student.status === 'waiting' && "bg-blue-100 text-blue-700",
                                    student.status === 'canceled' && "bg-gray-100 text-gray-700 line-through"
                                  )}
                                >
                                  {student.status === 'boarded' ? 'Boarded' : 
                                   student.status === 'waiting' ? 'Waiting' : 'Canceled'}
                                </span>
                              </div>
                              <div className="text-xs text-gray-600">
                                Stop: {student.stop}
                              </div>
                            </div>
                          </div>
                          
                          {student.status === 'waiting' && (
                            <div className="flex gap-2 mt-2 pl-12">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs flex-1"
                                onClick={() => {
                                  toast.success(`${student.name} marked as boarded`);
                                }}
                              >
                                Mark as Boarded
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs text-brand-500"
                                onClick={() => {
                                  toast.success(`Message sent to ${student.name}`);
                                }}
                              >
                                <MessageSquare size={12} className="mr-1" />
                                Message
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {currentTab === 'route' && (
                  <div className="p-4">
                    <div className="mb-4 p-3 rounded-lg border border-gray-100 bg-gray-50">
                      <h4 className="font-medium text-gray-900 mb-2">Vehicle Status</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bus Number:</span>
                          <span className="font-medium text-gray-900">42</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fuel Level:</span>
                          <span className="font-medium text-gray-900">78%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Battery:</span>
                          <span className="font-medium text-green-600">Good</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Maintenance:</span>
                          <span className="font-medium text-gray-900">3 days ago</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 rounded-lg border border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-2">Maintenance Log</h4>
                      
                      <div className="space-y-2 mb-3">
                        {maintenanceIssues.map(issue => (
                          <div key={issue.id} className="p-2 rounded border border-gray-100 bg-gray-50">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{issue.type}</span>
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                issue.status === 'pending' ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                              )}>
                                {issue.status === 'pending' ? 'Pending' : 'Scheduled'}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {issue.status === 'pending' ? issue.reportedAt : issue.date}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          toast.info("Maintenance report submitted successfully");
                        }}
                      >
                        <Camera size={14} className="mr-1" />
                        Report New Issue
                      </Button>
                    </div>
                    
                    <div className="p-3 rounded-lg border border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-2">Weather Conditions</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                          </svg>
                          <div className="ml-2">
                            <div className="font-medium text-gray-900">Sunny</div>
                            <div className="text-sm text-gray-600">72°F</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>Wind: 5 mph</div>
                          <div>Visibility: Good</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentTab === 'communication' && (
                  <div className="p-4">
                    <div className="flex justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Recent Messages</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs text-brand-500"
                        onClick={() => {
                          toast.success("New announcement sent to all passengers");
                        }}
                      >
                        Send Announcement
                      </Button>
                    </div>
                    
                    <div className="space-y-3 max-h-[350px] overflow-y-auto">
                      <div className="p-3 rounded-lg border border-gray-100">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-gray-900">Emma Wilson</span>
                          <span className="text-xs text-gray-500">8:32 AM</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Will the bus stop at the engineering building today?
                        </p>
                        <div className="flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs text-brand-500 h-7"
                            onClick={() => {
                              toast.success("Reply sent to Emma Wilson");
                            }}
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border border-blue-100 bg-blue-50">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-gray-900">System Notification</span>
                          <span className="text-xs text-gray-500">8:15 AM</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Route NCE-4207 has been activated. 23 passengers are currently scheduled.
                        </p>
                      </div>
                      
                      <div className="p-3 rounded-lg border border-gray-100">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-gray-900">Michael Chen</span>
                          <span className="text-xs text-gray-500">7:58 AM</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          I might be 2 minutes late to the stop. Can you wait for me?
                        </p>
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs h-7"
                            onClick={() => {
                              toast.success("Confirmed waiting for Michael Chen");
                            }}
                          >
                            Confirm
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs text-brand-500 h-7"
                            onClick={() => {
                              toast.success("Reply sent to Michael Chen");
                            }}
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Driver Performance</h4>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Punctuality</span>
                    <span className="text-sm font-medium text-gray-900">4.9/5.0</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Student Rating</span>
                    <span className="text-sm font-medium text-gray-900">4.8/5.0</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-red-100 bg-red-50 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Emergency Alert</h3>
                    <Button 
                      variant="default" 
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={emergencyToggle}
                    >
                      Send SOS
                    </Button>
                  </div>
                  
                  <div className="p-4 rounded-xl border border-amber-100 bg-amber-50 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                        <Phone size={20} />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Support Line</h3>
                    <Button 
                      variant="default" 
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                      onClick={() => {
                        toast.success("Connecting to dispatch support...");
                      }}
                    >
                      Call Dispatch
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;
