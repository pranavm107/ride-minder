import React, { useState, useRef, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import MapView from '@/components/MapView';
import DashboardCard from '@/components/DashboardCard';
import TripHistory from '@/components/TripHistory';
import LeaveApplication from '@/components/LeaveApplication';
import ComplaintBox from '@/components/ComplaintBox';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import StopsPage from '@/components/StopsPage';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Clock, Calendar, MapPin, Bell, FileText, Home, MapIcon, BarChart3, Settings, AlertTriangle, CheckCircle2, MoreVertical, AlertCircle, Clock5, Play, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import Bus from '@/components/ui/Bus';
import DriverMenuBar from '@/components/DriverMenuBar';
import { useIsMobile } from '@/hooks/use-mobile';

const studentAttendance = [
  { id: '2023001', name: 'Alice Johnson', grade: '10th', stop: 'Main Street', morningStatus: 'Present', afternoonStatus: 'Present' },
  { id: '2023002', name: 'Bob Williams', grade: '9th', stop: 'Park Avenue', morningStatus: 'Present', afternoonStatus: 'Absent' },
  { id: '2023003', name: 'Charlie Brown', grade: '11th', stop: 'Oak Street', morningStatus: 'Absent', afternoonStatus: 'Present' },
  { id: '2023004', name: 'Diana Miller', grade: '12th', stop: 'Maple Drive', morningStatus: 'Present', afternoonStatus: 'Present' },
  { id: '2023005', name: 'Ethan Davis', grade: '10th', stop: 'Pine Lane', morningStatus: 'Absent', afternoonStatus: 'Absent' },
];

type TripStatus = 'inactive' | 'active';

const DriverDashboard = () => {
  const [currentTripStatus, setCurrentTripStatus] = useState<TripStatus>('inactive');
  const [showLeaveDialog, setShowLeaveDialog] = useState<'regular' | 'emergency' | null>(null);
  const [showComplaintDialog, setShowComplaintDialog] = useState<boolean>(false);
  const [showStartAnimation, setShowStartAnimation] = useState<boolean>(false);
  const [showEndAnimation, setShowEndAnimation] = useState<boolean>(false);
  const [showFullMap, setShowFullMap] = useState<boolean>(false);
  const [showStopsPage, setShowStopsPage] = useState<boolean>(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (showFullMap && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showFullMap]);

  const handleStartTrip = () => {
    setShowStartAnimation(true);
    
    setTimeout(() => {
      setCurrentTripStatus('active');
      setShowFullMap(true);
      setShowStartAnimation(false);
      uiToast({
        title: "Trip Started!",
        description: "You've started your trip on Route #248.",
      });
    }, 3000);
  };
  
  const handleEndTrip = () => {
    setShowEndAnimation(true);
    
    setTimeout(() => {
      setCurrentTripStatus('inactive');
      setShowFullMap(false);
      setShowEndAnimation(false);
      uiToast({
        title: "Trip Ended!",
        description: "You've completed your trip on Route #248. Great job!",
      });
    }, 3000);
  };
  
  const handleSendSOS = () => {
    toast.error("SOS Alert Sent!", {
      description: "Emergency services and admin have been notified.",
      duration: 5000,
    });
  };
  
  const handleNotifyDelay = () => {
    toast.info("Delay Notification Sent", {
      description: "Students have been notified about the 10-minute delay.",
      duration: 3000,
    });
  };

  if (showStopsPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar userType="driver" />
        <div className="pt-16">
          <StopsPage />
          <div className="fixed bottom-4 right-4">
            <Button 
              variant="outline" 
              className="bg-white shadow-md"
              onClick={() => setShowStopsPage(false)}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isActiveTrip = currentTripStatus === 'active';
  const isInactiveTrip = currentTripStatus === 'inactive';

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar userType="driver" />
      
      {/* Start Trip Animation */}
      {showStartAnimation && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl p-8 md:p-10 shadow-2xl max-w-md w-full mx-4 flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-pulse"></div>
              <Play className="h-8 w-8 md:h-10 md:w-10 text-green-600 animate-bounce" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-center mb-2">Starting Your Trip</h2>
            <p className="text-gray-600 text-center mb-6">Preparing navigation and route tracking...</p>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full animate-[progress_3s_linear_forwards]"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* End Trip Animation */}
      {showEndAnimation && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl p-8 md:p-10 shadow-2xl max-w-md w-full mx-4 flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-pulse"></div>
              <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-blue-500" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-center mb-2">Trip Completed!</h2>
            <p className="text-gray-600 text-center mb-6">All destinations reached successfully</p>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full animate-[progress_2s_linear_forwards]"></div>
            </div>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-6 md:py-8 pt-20 md:pt-24">
        {/* Greeting Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Hello, Michael</h1>
              <p className="text-gray-600 mt-1">{getCurrentDate()}</p>
            </div>
            <DriverMenuBar />
          </div>
        </div>

        {/* Action Summary Cards */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Overview</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex-shrink-0 min-w-[280px]">
              <DashboardCard 
                title="Active Route"
                value="Route #248"
                description="South Campus Route"
                icon={<Bus className="h-5 w-5 text-blue-600" />}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              />
            </div>
            
            <div className="flex-shrink-0 min-w-[280px]">
              <DashboardCard 
                title="Next Stop"
                value="Stop #14"
                description="Arriving in 5 minutes"
                icon={<MapPin className="h-5 w-5 text-amber-600" />}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                actionText="View Details"
                actionOnClick={() => setShowStopsPage(true)}
              />
            </div>
            
            <div className="flex-shrink-0 min-w-[280px]">
              <DashboardCard 
                title="Quick Action"
                value={isInactiveTrip ? 'Begin Trip' : 'End Trip'}
                description={isInactiveTrip ? 'Start your route' : 'Complete the trip'}
                icon={isInactiveTrip ? 
                  <Play className="h-5 w-5 text-green-600" /> : 
                  <Square className="h-5 w-5 text-red-600" />
                }
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                actionText={isInactiveTrip ? 'Start Trip' : 'End Trip'}
                actionOnClick={isInactiveTrip ? handleStartTrip : handleEndTrip}
                actionVariant={isInactiveTrip ? 'default' : 'destructive'}
              />
            </div>
            
            <div className="flex-shrink-0 min-w-[280px]">
              <DashboardCard 
                title="Announcements"
                value="2 Unread"
                description="School updates & notices"
                icon={<Bell className="h-5 w-5 text-purple-600" />}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                actionText="View All"
                actionLink="#"
              />
            </div>
          </div>
        </div>

        {/* Trip Banner */}
        {isInactiveTrip && (
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-xl p-6 md:p-8 shadow-lg text-white mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Start Your Trip?</h2>
                  <p className="text-blue-100 text-lg max-w-2xl">
                    Begin your journey on Route #248 to South Campus. Navigate safely and track student attendance along the way.
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0"
                  onClick={handleStartTrip}
                >
                  <Play size={20} className="mr-2" /> 
                  Start Trip
                </Button>
              </div>
              {isActiveTrip && (
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={handleNotifyDelay}
                  >
                    <Clock5 size={16} className="mr-1" /> Notify Delay
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-red-500/20 border-red-300/30 text-red-100 hover:bg-red-500/30"
                    onClick={handleSendSOS}
                  >
                    <AlertCircle size={16} className="mr-1" /> Emergency SOS
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Live Route Tracking Map */}
        <div 
          ref={mapRef}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Live Route Tracking</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-green-700">Live</span>
                  </div>
                  <span>Last updated: Just now</span>
                </div>
              </div>
              
              {isActiveTrip && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Trip Active
                  </span>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleEndTrip}
                  >
                    <Square size={16} className="mr-1" /> End Trip
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6">
            <div className="h-[400px] md:h-[500px]">
              <MapView 
                userType="driver" 
                mode={isActiveTrip ? "navigation" : "preview"} 
                fullView={showFullMap}
                height="100%"
              />
            </div>
          </div>
          
          {isActiveTrip && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24.8</div>
                  <div className="text-sm text-gray-600">Miles Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">18</div>
                  <div className="text-sm text-gray-600">Stops</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-600">Min to Next</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Sections */}
        {!showFullMap && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trip History */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Trip History</h2>
              <TripHistory userType="driver" />
            </div>
            
            {/* Student Attendance */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Today's Attendance</h2>
                <Button size="sm" variant="outline">Export</Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Student</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Stop</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentAttendance.slice(0, 5).map((student) => (
                      <tr key={student.id} className="border-b border-gray-100">
                        <td className="py-3 px-2">
                          <div>
                            <div className="font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.grade}</div>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-600">{student.stop}</td>
                        <td className="py-3 px-2">
                          <span className={cn(
                            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                            student.morningStatus === 'Present' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          )}>
                            {student.morningStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Dialogs */}
      <Dialog open={showLeaveDialog !== null} onOpenChange={(open) => !open && setShowLeaveDialog(null)}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Leave Application</DialogTitle>
            <DialogDescription>
              Fill out the form below to submit your leave request
            </DialogDescription>
          </DialogHeader>
          <LeaveApplication 
            leaveType={showLeaveDialog === 'regular' ? 'regular' : 'emergency'} 
            onClose={() => setShowLeaveDialog(null)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showComplaintDialog} onOpenChange={(open) => !open && setShowComplaintDialog(false)}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Report an Issue</DialogTitle>
            <DialogDescription>
              Submit your complaint or feedback regarding any issues you've encountered
            </DialogDescription>
          </DialogHeader>
          <ComplaintBox 
            userType="driver"
            onSuccess={() => setShowComplaintDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriverDashboard;
