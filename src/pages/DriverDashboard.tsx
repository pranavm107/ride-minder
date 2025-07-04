import React, { useState, useRef, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import TripHistory from '@/components/TripHistory';
import LeaveApplication from '@/components/LeaveApplication';
import ComplaintBox from '@/components/ComplaintBox';
import StopsPage from '@/components/StopsPage';
import DriverGreeting from '@/components/driver/DriverGreeting';
import ActionSummaryCards from '@/components/driver/ActionSummaryCards';
import TripBanner from '@/components/driver/TripBanner';
import LiveRouteTracking from '@/components/driver/LiveRouteTracking';
import TripStatistics from '@/components/driver/TripStatistics';
import GuestStudentsSection from '@/components/driver/GuestStudentsSection';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle2, MoreVertical, Calendar, AlertTriangle, MapPin, FileText } from 'lucide-react';
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

const DriverDashboard = () => {
  const [currentTripStatus, setCurrentTripStatus] = useState<'inactive' | 'active'>('inactive');
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

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar userType="driver" />
      
      {showStartAnimation && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl p-10 shadow-lg max-w-md w-full flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
              <div className="w-16 h-16 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bus className="h-8 w-8 text-green-500 animate-[bounce_2s_ease-in-out_infinite]" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                  <div className="h-full bg-green-500 animate-[progress_2s_linear_forwards]"></div>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Your trip is starting</h2>
            <p className="text-gray-600 text-center mb-4">Preparing your route and navigation...</p>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-brand h-full animate-[progress_3s_linear_forwards]"></div>
            </div>
          </div>
        </div>
      )}
      
      {showEndAnimation && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl p-10 shadow-lg max-w-md w-full flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
              <CheckCircle2 className="h-12 w-12 text-blue-500 animate-[check-bounce_2s_ease-in-out]" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Trip completed!</h2>
            <p className="text-gray-600 text-center mb-4">All destinations reached successfully</p>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full animate-[progress_2s_linear_forwards]"></div>
            </div>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Greeting Section */}
        <div className="flex items-center justify-between">
          <DriverGreeting 
            driverName="Michael" 
            currentDate="Thursday, October 12, 2023" 
          />
          <DriverMenuBar />
        </div>
          
        {/* Trip Banner */}
        <TripBanner 
          currentTripStatus={currentTripStatus}
          onStartTrip={handleStartTrip}
        />

        {/* Action Summary Cards */}
        {!showFullMap && (
          <ActionSummaryCards 
            currentTripStatus={currentTripStatus}
            onStartTrip={handleStartTrip}
            onEndTrip={handleEndTrip}
            onViewStops={() => setShowStopsPage(true)}
          />
        )}
          
        {/* Live Route Tracking */}
        <div ref={mapRef}>
          <LiveRouteTracking 
            currentTripStatus={currentTripStatus}
            showFullMap={showFullMap}
            onToggleFullMap={() => setShowFullMap(!showFullMap)}
            onNotifyDelay={handleNotifyDelay}
            onSendSOS={handleSendSOS}
            onEndTrip={handleEndTrip}
          />
        </div>
          
        {/* Trip Statistics */}
        <TripStatistics 
          currentTripStatus={currentTripStatus}
          showFullMap={showFullMap}
        />

        {/* Guest Students Section */}
        {!showFullMap && (
          <GuestStudentsSection currentTripStatus={currentTripStatus} />
        )}

        {/* Trip In Progress Card */}
        {!showFullMap && currentTripStatus === 'active' && (
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Trip In Progress</h2>
              <Button onClick={() => setShowFullMap(true)} variant="outline" size="sm">
                Full Map View
              </Button>
            </div>
            <p className="text-muted-foreground">Your trip on Route #248 is currently active.</p>
          </div>
        )}

        {/* Additional Actions and Trip History */}
        {!showFullMap && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
              <div className="flex space-x-3">
                <Button 
                  onClick={() => setShowLeaveDialog('emergency')} 
                  variant="outline" 
                  className="flex-1 border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                >
                  <AlertTriangle size={16} className="mr-2" /> Emergency
                </Button>
                <Button 
                  onClick={() => setShowComplaintDialog(true)} 
                  variant="outline" 
                  className="flex-1"
                >
                  <FileText size={16} className="mr-2" /> Report Issue
                </Button>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <h2 className="text-lg font-medium mb-4">Recent Trip History</h2>
              <TripHistory userType="driver" />
            </div>
          </div>
        )}

        {/* Student Attendance Table */}
        {!showFullMap && (
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Today's Student Attendance</h2>
              <Button size="sm" variant="outline">Export Data</Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-card rounded-md">
                <thead>
                  <tr className="bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-3">Student ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Grade</th>
                    <th className="px-4 py-3">Stop</th>
                    <th className="px-4 py-3">Morning Status</th>
                    <th className="px-4 py-3">Afternoon Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {studentAttendance.map((student) => (
                    <tr key={student.id} className="border-t">
                      <td className="px-4 py-3">{student.id}</td>
                      <td className="px-4 py-3">{student.name}</td>
                      <td className="px-4 py-3">{student.grade}</td>
                      <td className="px-4 py-3">{student.stop}</td>
                      <td className="px-4 py-3">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          student.morningStatus === 'Present' 
                            ? 'bg-green-100 text-green-700' 
                            : student.morningStatus === 'Absent' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {student.morningStatus}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          student.afternoonStatus === 'Present' 
                            ? 'bg-green-100 text-green-700' 
                            : student.afternoonStatus === 'Absent' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {student.afternoonStatus}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Options Sheet for Mobile */}
        {currentTripStatus === 'active' && (
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                className="fixed bottom-4 right-4 md:hidden" 
                size="icon"
                variant="default"
              >
                <MoreVertical size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="py-4">
                <h3 className="text-lg font-medium mb-4">Options</h3>
                <div className="space-y-4">
                  <Button 
                    onClick={() => setShowStopsPage(true)}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <MapPin className="mr-2 h-4 w-4" /> View Stops
                  </Button>
                  <Button 
                    onClick={() => setShowComplaintDialog(true)} 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" /> Report Issue
                  </Button>
                  <Button 
                    onClick={() => setShowLeaveDialog('regular')} 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Calendar className="mr-2 h-4 w-4" /> Apply for Leave
                  </Button>
                  <Button 
                    onClick={() => setShowLeaveDialog('emergency')} 
                    variant="outline" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" /> Emergency Leave
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </main>
      
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
            onClose={() => {
              setShowLeaveDialog(null);
            }}
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
            onSuccess={() => {
              setShowComplaintDialog(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriverDashboard;
