
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import MapView from '@/components/MapView';
import DashboardCard from '@/components/DashboardCard';
import { cn } from '@/lib/utils';
import { Bus, Clock, MapPin, User, MessageSquare, Search, Calendar, Bell, AlertTriangle, FileText, CreditCard, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [emergencyPressed, setEmergencyPressed] = useState(false);
  const [emergencyTimer, setEmergencyTimer] = useState<NodeJS.Timeout | null>(null);
  const [skipRide, setSkipRide] = useState(false);

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
    
    // This would trigger real emergency protocols in a production app
    setTimeout(() => setEmergencyPressed(false), 5000);
  };

  const handleSkipRide = () => {
    setSkipRide(!skipRide);
    if (!skipRide) {
      toast.success("Your PM ride has been skipped", {
        description: "Driver has been notified that you won't be riding this evening.",
      });
    } else {
      toast.success("Your PM ride has been restored", {
        description: "You're back on the pick-up list for this evening.",
      });
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

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
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
                    className="px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
                <Button 
                  variant="default" 
                  className="bg-brand-500 hover:bg-brand-600"
                  onClick={() => toast.success("Refreshed successfully")}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              title="Active Route"
              value="North Campus Express"
              icon={<Bus size={18} />}
              className="col-span-1"
            />
            <DashboardCard
              title="Next Bus Arrival"
              value="5 minutes"
              trend={-2}
              trendLabel="faster than usual"
              icon={<Clock size={18} />}
              className="col-span-1"
            />
            <DashboardCard
              title="Monthly Rides"
              value="32"
              trend={15}
              trendLabel="vs. last month"
              icon={<User size={18} />}
              className="col-span-1"
            />
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <div className="lg:col-span-2">
              <MapView userType="student" />
              
              {/* ETA Information */}
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
                        size="sm" 
                        className="text-xs"
                        onClick={() => toast.success("Notification set for 2 minutes before arrival")}
                      >
                        <Bell size={14} className="mr-1" />
                        Notify Me
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs text-brand-500"
                        onClick={() => toast.success("Message sent to driver")}
                      >
                        <MessageSquare size={14} className="mr-1" />
                        Message Driver
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ride Customization Section */}
              <div className="bg-white rounded-xl p-6 mt-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <SkipForward size={18} className="text-brand-500" />
                  Ride Customization
                </h3>

                <div className="space-y-6">
                  {/* Skip PM Ride Toggle */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">Skip Evening Ride Today</h4>
                      <p className="text-sm text-gray-600">Driver will be notified you won't be riding</p>
                    </div>
                    <div className="relative">
                      <button 
                        onClick={handleSkipRide}
                        className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          skipRide ? "bg-brand-500" : "bg-gray-200"
                        )}
                      >
                        <span 
                          className={cn(
                            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                            skipRide ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Route Change Request */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Request Drop Location Change</h4>
                    <div className="flex items-center gap-2">
                      <select className="flex-1 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent">
                        <option>Select new drop location...</option>
                        <option>Library</option>
                        <option>Student Center</option>
                        <option>Science Building</option>
                        <option>Main Gate</option>
                      </select>
                      <Button
                        size="sm"
                        onClick={handleCustomizeRide}
                      >
                        Submit
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Requires admin approval. Request at least 1 hour before ride.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rides Section */}
            <div className="col-span-1">
              <Tabs defaultValue="rides" className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="rides">My Rides</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="complaints">Feedback</TabsTrigger>
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
                
                <TabsContent value="complaints" className="p-4">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Submit a Complaint or Feedback</h4>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Type</label>
                      <select className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent">
                        <option>Select complaint type...</option>
                        <option>Bus Condition</option>
                        <option>Driver Behavior</option>
                        <option>Punctuality Issue</option>
                        <option>Overcrowding</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Description</label>
                      <textarea 
                        rows={3}
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder="Describe your issue in detail..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Attach Photo (Optional)</label>
                      <div className="border border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center">
                          <FileText size={24} className="text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Click to upload</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={handleSubmitComplaint}
                    >
                      Submit Complaint
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Emergency Button */}
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
                      : "bg-red-600 hover:bg-red-700"
                  )}
                  onTouchStart={handleEmergencyTouchStart}
                  onTouchEnd={handleEmergencyTouchEnd}
                  onMouseDown={handleEmergencyTouchStart}
                  onMouseUp={handleEmergencyTouchEnd}
                  onMouseLeave={handleEmergencyTouchEnd}
                >
                  {emergencyPressed ? "SOS ACTIVATED" : "Hold to Send SOS"}
                  
                  {/* Progress indicator for press-and-hold */}
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
    </div>
  );
};

export default StudentDashboard;
