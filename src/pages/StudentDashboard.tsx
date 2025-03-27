
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import MapView from '@/components/MapView';
import DashboardCard from '@/components/DashboardCard';
import { cn } from '@/lib/utils';
import { Bus, Clock, MapPin, User, MessageSquare, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');

  const upcomingRides = [
    { 
      id: 1, 
      routeName: 'North Campus Express', 
      busId: '42', 
      from: 'Student Center', 
      to: 'Engineering Building', 
      departure: '8:30 AM', 
      eta: '5 min',
      status: 'on-time'
    },
    { 
      id: 2, 
      routeName: 'Downtown Loop', 
      busId: '17', 
      from: 'Engineering Building', 
      to: 'Library', 
      departure: '2:15 PM', 
      eta: '3 hrs',
      status: 'scheduled'
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
      status: 'completed'
    },
    { 
      id: 102, 
      routeName: 'Express Line', 
      busId: '07', 
      from: 'Student Center', 
      to: 'Arts Building', 
      departure: 'Oct 12, 10:15 AM', 
      status: 'completed'
    },
  ];

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
                        Notify Me
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs text-brand-500"
                        onClick={() => toast.success("Message sent to driver")}
                      >
                        <MessageSquare size={12} className="mr-1" />
                        Message Driver
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rides Section */}
            <div className="col-span-1">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100">
                  <button
                    className={cn(
                      "flex-1 py-4 text-sm font-medium transition-colors",
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
                      "flex-1 py-4 text-sm font-medium transition-colors",
                      activeTab === 'history' 
                        ? "text-brand-600 border-b-2 border-brand-500" 
                        : "text-gray-600 hover:text-brand-600"
                    )}
                    onClick={() => setActiveTab('history')}
                  >
                    Ride History
                  </button>
                </div>
                
                <div className="p-4">
                  {activeTab === 'upcoming' ? (
                    <>
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
                              Bus #{ride.busId} · {ride.departure}
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
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4">
                        Plan New Ride
                      </Button>
                    </>
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
                            Bus #{ride.busId} · {ride.departure}
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="bg-gray-100 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                              <MapPin size={12} />
                            </div>
                            <span>{ride.from} → {ride.to}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Emergency Information */}
              <div className="mt-6 p-4 rounded-xl border border-red-100 bg-red-50">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Emergency Services</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Need immediate assistance? Use the emergency button to alert campus security.
                </p>
                <Button 
                  variant="default" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => {
                    toast.error("Emergency alert sent to campus security");
                  }}
                >
                  Send Emergency Alert
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
