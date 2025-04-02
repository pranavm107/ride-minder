import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import MapView from '@/components/MapView';
import { cn } from '@/lib/utils';
import { Bus, Clock, MapPin, User, MessageSquare, Search, Calendar, Bell, AlertTriangle, FileText, CreditCard, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import ComplaintBox from '@/components/ComplaintBox';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [emergencyPressed, setEmergencyPressed] = useState(false);
  const [emergencyTimer, setEmergencyTimer] = useState<NodeJS.Timeout | null>(null);
  const [skipMorningRide, setSkipMorningRide] = useState(true);
  const [skipEveningRide, setSkipEveningRide] = useState(true);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [currentView, setCurrentView] = useState<'dashboard' | 'stops' | 'complaints'>('dashboard');
  const [showComplaintDialog, setShowComplaintDialog] = useState(false);
  
  const isMobile = useIsMobile();

  const specialOffers = [
    {
      id: 1,
      title: "Student Meal Deal",
      description: "Get 20% off on all meals at the Campus Café with your student ID",
      discount: "20% OFF",
      validUntil: "Valid until May 31",
      bgColor: "bg-gradient-to-r from-orange-100 to-amber-50",
      textColor: "text-orange-700",
      accentColor: "bg-orange-500"
    },
    {
      id: 2,
      title: "Breakfast Special",
      description: "Buy any breakfast item and get a free coffee before 10am",
      discount: "FREE COFFEE",
      validUntil: "Valid every weekday",
      bgColor: "bg-gradient-to-r from-blue-100 to-cyan-50",
      textColor: "text-blue-700",
      accentColor: "bg-blue-500"
    },
    {
      id: 3,
      title: "Late Night Study Offer",
      description: "50% off on all snacks and drinks at the Library Café after 8pm",
      discount: "50% OFF",
      validUntil: "During exam weeks",
      bgColor: "bg-gradient-to-r from-purple-100 to-violet-50",
      textColor: "text-purple-700",
      accentColor: "bg-purple-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % specialOffers.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [specialOffers.length]);

  const upcomingRides = [
    { 
      id: 1, 
      routeName: 'North Campus Express', 
      busId: '42', 
      from: 'Student Center', 
      to: 'Engineering Building', 
      departure: '8:30 AM', 
      eta: '5 min',
      status: 'on-time',
      driverName: 'John Smith'
    },
    { 
      id: 2, 
      routeName: 'Downtown Loop', 
      busId: '17', 
      from: 'Engineering Building', 
      to: 'Library', 
      departure: '2:15 PM', 
      eta: '3 hrs',
      status: 'scheduled',
      driverName: 'Maria Rodriguez'
    },
  ];
  
  const rideHistory = [
    { 
      id: 101, 
      routeName: 'South Campus', 
      busId: '23', 
      from: 'Gym', 
      to: 'Student Housing', 
      departure: 'Yesterday, 5:30 PM', 
      status: 'completed',
      driverName: 'Mike Johnson'
    },
    { 
      id: 102, 
      routeName: 'Express Line', 
      busId: '07', 
      from: 'Student Center', 
      to: 'Arts Building', 
      departure: 'Oct 12, 10:15 AM', 
      status: 'completed',
      driverName: 'Sarah Williams'
    },
  ];

  const notifications = [
    {
      id: 1,
      message: 'Bus #42 is 2 minutes behind schedule due to traffic.',
      time: '2 mins ago',
      type: 'delay'
    },
    {
      id: 2,
      message: 'Route changed: Afternoon pickup moved to Gate B.',
      time: '1 hour ago',
      type: 'route'
    },
    {
      id: 3,
      message: 'Bus fee due in 3 days! Complete payment to avoid service interruption.',
      time: '6 hours ago',
      type: 'payment'
    }
  ];

  const handleEmergencyTouchStart = () => {
    const timer = setTimeout(() => {
      setEmergencyPressed(true);
      triggerEmergency();
    }, 3000);
    setEmergencyTimer(timer);
  };

  const handleEmergencyTouchEnd = () => {
    if (emergencyTimer) {
      clearTimeout(emergencyTimer);
      setEmergencyTimer(null);
    }
  };

  const triggerEmergency = () => {
    toast.error("Emergency alert sent to campus security and administrators", {
      description: "Help is on the way. Your location has been shared.",
      duration: 10000,
    });
    
    setTimeout(() => setEmergencyPressed(false), 5000);
  };

  const handleSkipRide = (type: 'morning' | 'evening') => {
    if (type === 'morning') {
      setSkipMorningRide(!skipMorningRide);
      if (!skipMorningRide) {
        toast.success("Your AM ride has been skipped", {
          description: "Driver has been notified that you won't be riding this morning.",
        });
      } else {
        toast.success("Your AM ride has been restored", {
          description: "You're back on the pick-up list for this morning.",
        });
      }
    } else {
      setSkipEveningRide(!skipEveningRide);
      if (!skipEveningRide) {
        toast.success("Your PM ride has been skipped", {
          description: "Driver has been notified that you won't be riding this evening.",
        });
      } else {
        toast.success("Your PM ride has been restored", {
          description: "You're back on the pick-up list for this evening.",
        });
      }
    }
  };

  const handleSubmitComplaint = () => {
    toast.success("Complaint submitted successfully", {
      description: "A staff member will review your submission within 24 hours.",
    });
  };

  const handleCustomizeRide = () => {
    toast.success("Ride customization request sent", {
      description: "Your request will be reviewed by an administrator shortly.",
    });
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-1">
                  <path d="m12 19-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
                Back to Dashboard
              </Button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-2xl font-semibold mb-6">View Bus Stops</h2>
              <MapView userType="student" fullView={true} />
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Upcoming Stops</h3>
              
              <div className="space-y-4">
                {[
                  { name: 'Student Center', time: '08:15 AM', status: 'completed' },
                  { name: 'Library', time: '08:30 AM', status: 'current', eta: '2 min' },
                  { name: 'Engineering Building', time: '08:45 AM', status: 'upcoming' },
                  { name: 'Science Building', time: '09:00 AM', status: 'upcoming' },
                  { name: 'Main Gate', time: '09:15 AM', status: 'upcoming' }
                ].map((stop, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "p-4 border rounded-lg flex items-center justify-between",
                      stop.status === 'completed' && "border-gray-200 bg-gray-50",
                      stop.status === 'current' && "border-brand-200 bg-brand-50",
                      stop.status === 'upcoming' && "border-blue-100 bg-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center",
                        stop.status === 'completed' && "bg-gray-200 text-gray-600",
                        stop.status === 'current' && "bg-brand-100 text-brand-600",
                        stop.status === 'upcoming' && "bg-blue-100 text-blue-600"
                      )}>
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">{stop.name}</h4>
                        <p className="text-sm text-gray-600">{stop.time}</p>
                      </div>
                    </div>
                    <div>
                      {stop.status === 'completed' && (
                        <span className="px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-700">
                          Completed
                        </span>
                      )}
                      {stop.status === 'current' && (
                        <span className="px-3 py-1 rounded-full text-xs bg-brand-100 text-brand-700 flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
                          Arriving in {stop.eta}
                        </span>
                      )}
                      {stop.status === 'upcoming' && (
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (currentView === 'complaints') {
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-1">
                  <path d="m12 19-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
                Back to Dashboard
              </Button>
            </div>
            
            <ComplaintBox 
              userType="student" 
              onSuccess={() => setCurrentView('dashboard')} 
            />
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
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back, Alex!</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-3">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search routes..." 
                    className={cn(
                      "px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all",
                      isMobile && "mobile-input"
                    )}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
                <Button 
                  variant="default" 
                  className={cn(
                    "bg-brand-500 hover:bg-brand-600", 
                    isMobile && "mobile-action-button"
                  )}
                  onClick={() => toast.success("Refreshed successfully")}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-8 overflow-hidden rounded-xl">
            <Card className="border border-gray-100 shadow-sm overflow-hidden">
              <div className="relative h-[200px] overflow-hidden">
                {specialOffers.map((offer, index) => (
                  <div 
                    key={offer.id}
                    className={cn(
                      "absolute inset-0 w-full h-full transition-all duration-500 ease-in-out",
                      offer.bgColor,
                      index === currentOfferIndex ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                    )}
                  >
                    <CardContent className="p-6 h-full">
                      <div className="flex h-full">
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className={cn("font-bold text-xl mb-1", offer.textColor)}>
                              {offer.title}
                            </h3>
                            <p className="text-gray-700 mb-4">{offer.description}</p>
                          </div>
                          <div className="text-gray-500 text-sm">{offer.validUntil}</div>
                        </div>
                        
                        <div className="w-1/3 flex items-center justify-center">
                          <div className={cn("p-4 rounded-full", offer.accentColor)}>
                            <span className="text-white font-bold text-lg whitespace-nowrap">
                              {offer.discount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                ))}
                
                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                  <div className="flex gap-1.5">
                    {specialOffers.map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => setCurrentOfferIndex(index)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          index === currentOfferIndex ? "bg-brand-500 w-4" : "bg-gray-300"
                        )}
                        aria-label={`View offer ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <SkipForward size={18} className="text-brand-500" />
              Ride Customization
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={cn(
                  "p-4 rounded-lg border flex justify-between items-center",
                  skipMorningRide ? "bg-brand-50/30 border-brand-100" : "bg-gray-50 border-gray-200"
                )}>
                  <div>
                    <h4 className="font-medium text-gray-900">Morning Ride</h4>
                    <p className="text-sm text-gray-600">Today's pickup at 7:30 AM</p>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => handleSkipRide('morning')}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        skipMorningRide ? "bg-brand-500" : "bg-gray-200"
                      )}
                    >
                      <span 
                        className={cn(
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                          skipMorningRide ? "translate-x-5" : "translate-x-0"
                        )}
                      />
                    </button>
                  </div>
                </div>

                <div className={cn(
                  "p-4 rounded-lg border flex justify-between items-center",
                  skipEveningRide ? "bg-brand-50/30 border-brand-100" : "bg-gray-50 border-gray-200"
                )}>
                  <div>
                    <h4 className="font-medium text-gray-900">Evening Ride</h4>
                    <p className="text-sm text-gray-600">Today's pickup at 3:45 PM</p>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => handleSkipRide('evening')}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        skipEveningRide ? "bg-brand-500" : "bg-gray-200"
                      )}
                    >
                      <span 
                        className={cn(
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                          skipEveningRide ? "translate-x-5" : "translate-x-0"
                        )}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Request Drop Location Change</h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select className={cn(
                    "flex-1 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
                    isMobile && "mobile-input"
                  )}>
                    <option>Select new drop location...</option>
                    <option>Library</option>
                    <option>Student Center</option>
                    <option>Science Building</option>
                    <option>Main Gate</option>
                  </select>
                  <Button
                    size={isMobile ? "lg" : "sm"}
                    className={isMobile ? "w-full py-3" : ""}
                    onClick={handleCustomizeRide}
                  >
                    Submit Request
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Requires admin approval. Request at least 1 hour before ride.</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Live Bus Tracking</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentView('stops')}
                  className="text-sm"
                >
                  <MapPin size={14} className="mr-1.5" />
                  Show All Stops
                </Button>
              </div>
              
              <MapView userType="student" />
              
              <div className="bg-white rounded-xl p-6 mt-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-brand-500" />
                  Live ETA Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-500">
                      <Bus size={20} />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">Bus #42 - North Campus</h4>
                        <span className="text-sm font-medium text-green-600">On Time</span>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin size={12} />
                        Currently at: Student Center (Stop #3)
                      </div>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-medium text-brand-600">
                          Arriving in: <span className="font-bold">5 minutes</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-medium text-brand-600">80%</span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-brand-100">
                        <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-500 w-4/5 animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size={isMobile ? "default" : "sm"} 
                        className={cn("text-xs", isMobile && "py-3 flex-1")}
                        onClick={() => toast.success("Notification set for 2 minutes before arrival")}
                      >
                        <Bell size={14} className="mr-1" />
                        Notify Me
                      </Button>
                      <Button 
                        variant="ghost" 
                        size={isMobile ? "default" : "sm"} 
                        className={cn("text-xs text-brand-500", isMobile && "py-3 flex-1")}
                        onClick={() => toast.success("Message sent to driver")}
                      >
                        <MessageSquare size={14} className="mr-1" />
                        Message Driver
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-1">
              <Tabs defaultValue="rides" className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="rides">My Rides</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>
                
                <TabsContent value="rides" className="p-4">
                  <div className="flex border-b border-gray-100 mb-3">
                    <button
                      className={cn(
                        "flex-1 py-2 text-sm font-medium transition-colors",
                        activeTab === 'upcoming' 
                          ? "text-brand-600 border-b-2 border-brand-500" 
                          : "text-gray-600 hover:text-brand-600"
                      )}
                      onClick={() => setActiveTab('upcoming')}
                    >
                      Upcoming Rides
                    </button>
                    <button
                      className={cn(
                        "flex-1 py-2 text-sm font-medium transition-colors",
                        activeTab === 'history' 
                          ? "text-brand-600 border-b-2 border-brand-500" 
                          : "text-gray-600 hover:text-brand-600"
                      )}
                      onClick={() => setActiveTab('history')}
                    >
                      Ride History
                    </button>
                  </div>
                  
                  {activeTab === 'upcoming' ? (
                    <div className="space-y-3">
                      {upcomingRides.map((ride) => (
                        <div 
                          key={ride.id} 
                          className="p-4 rounded-lg border border-gray-100 hover:border-brand-200 hover:bg-brand-50/30 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900">{ride.routeName}</h4>
                            <span 
                              className={cn(
                                "text-xs font-medium px-2 py-1 rounded-full",
                                ride.status === 'on-time' && "bg-green-100 text-green-700",
                                ride.status === 'scheduled' && "bg-blue-100 text-blue-700"
                              )}
                            >
                              {ride.status === 'on-time' ? 'On Time' : 'Scheduled'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            Bus #{ride.busId} · {ride.departure} · Driver: {ride.driverName}
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="bg-brand-100 text-brand-600 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                              <MapPin size={12} />
                            </div>
                            <span>{ride.from} → {ride.to}</span>
                          </div>
                          {ride.status === 'on-time' && (
                            <div className="mt-3 text-xs font-medium text-brand-600">
                              Arriving in: {ride.eta}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full mt-4">
                        Plan New Ride
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {rideHistory.map((ride) => (
                        <div 
                          key={ride.id} 
                          className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900">{ride.routeName}</h4>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                              Completed
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            Bus #{ride.busId} · {ride.departure} · Driver: {ride.driverName}
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="bg-gray-100 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                              <MapPin size={12} />
                            </div>
                            <span>{ride.from} → {ride.to}</span>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full mt-2">
                        <Calendar size={14} className="mr-1" />
                        Export Trip History
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="notifications" className="p-4">
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "mt-1 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0",
                            notification.type === 'delay' && "bg-orange-100 text-orange-600",
                            notification.type === 'route' && "bg-blue-100 text-blue-600",
                            notification.type === 'payment' && "bg-red-100 text-red-600"
                          )}>
                            {notification.type === 'delay' && <Clock size={16} />}
                            {notification.type === 'route' && <MapPin size={16} />}
                            {notification.type === 'payment' && <CreditCard size={16} />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="text-center mt-4">
                      <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                        Clear All Notifications
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="feedback" className="p-4">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Submit Feedback or Complaint</h4>
                    <p className="text-sm text-gray-600">
                      Report any issues with your bus service or provide feedback to help us improve.
                    </p>
                    <div className="space-y-4">
                      <Button 
                        className="w-full"
                        onClick={() => setCurrentView('complaints')}
                      >
                        <AlertTriangle size={16} className="mr-2" />
                        Submit New Complaint
                      </Button>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Previous Complaints</h5>
                        <div className="space-y-2">
                          <div className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="flex justify-between items-start">
                              <h6 className="font-medium text-gray-900">Bus Delay Issue</h6>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Pending</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 mb-2">Bus arrived 20 minutes late on Monday morning...</p>
                            <p className="text-xs text-gray-500">Submitted on: 10/12/2023</p>
                          </div>
                          <div className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="flex justify-between items-start">
                              <h6 className="font-medium text-gray-900">AC Not Working</h6>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Resolved</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 mb-2">The air conditioning in bus #42 was not working...</p>
                            <p className="text-xs text-gray-500">Submitted on: 09/28/2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 p-6 rounded-xl border border-red-100 bg-red-50">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                    <AlertTriangle size={18} />
                  </div>
                  <h3 className="font-semibold text-gray-900">Emergency SOS</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Press and hold the button for 3 seconds to send an emergency alert to campus security and administrators.
                </p>
                <button 
                  className={cn(
                    "w-full py-3 px-4 rounded-lg font-medium text-white transition-all relative overflow-hidden",
                    emergencyPressed 
                      ? "bg-red-700 animate-pulse" 
                      : "bg-red-600 hover:bg-red-700",
                    isMobile && "emergency-button py-5"
                  )}
                  onTouchStart={handleEmergencyTouchStart}
                  onTouchEnd={handleEmergencyTouchEnd}
                  onMouseDown={handleEmergencyTouchStart}
                  onMouseUp={handleEmergencyTouchEnd}
                  onMouseLeave={handleEmergencyTouchEnd}
                >
                  {emergencyPressed ? "SOS ACTIVATED" : "Hold to Send SOS"}
                  
                  {emergencyTimer && !emergencyPressed && (
                    <div className="absolute bottom-0 left-0 h-1 bg-white animate-[progress_3s_linear_forwards]"></div>
                  )}
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  This will share your current location with emergency responders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={showComplaintDialog} onOpenChange={setShowComplaintDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Submit a Complaint</DialogTitle>
            <DialogDescription>
              Report any issues with your bus service or provide feedback to help us improve.
            </DialogDescription>
          </DialogHeader>
          
          <ComplaintBox 
            userType="student"
            onSuccess={() => setShowComplaintDialog(false)}
          />
          
          <DialogFooter className="pt-2">
            <Button variant="outline" onClick={() => setShowComplaintDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentDashboard;
