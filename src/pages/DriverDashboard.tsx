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
import { Clock, Calendar, Menu, MapPin, Bell, FileText, Home, MapIcon, BarChart3, Settings, AlertTriangle, CheckCircle2, MoreVertical, AlertCircle, Clock5 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

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
  
  // Scroll to map when trip starts
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
      
      {/* Start Trip Animation Overlay */}
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
      
      {/* End Trip Animation Overlay */}
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
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6">
          {/* Header Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Hello, Michael</h1>
                <p className="text-gray-500 mt-1">Thursday, October 12, 2023</p>
              </div>
              <div className="flex items-center gap-2">
                {currentTripStatus === 'inactive' ? (
                  <Button 
                    size="lg" 
                    className="hidden md:flex bg-green-600 hover:bg-green-700 text-white font-medium px-6"
                    onClick={handleStartTrip}
                  >
                    <MapIcon size={18} className="mr-2" /> Start Trip
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    variant="destructive"
                    className="hidden md:flex font-medium px-6"
                    onClick={handleEndTrip}
                  >
                    <Clock size={18} className="mr-2" /> End Trip
                  </Button>
                )}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="md:hidden">
                      <Menu />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                    <div className="px-1 py-6 space-y-6">
                      <div>
                        <h3 className="mb-4 px-4 text-lg font-medium">Menu</h3>
                        <div className="space-y-1">
                          <Button variant="ghost" className="w-full justify-start" asChild>
                            <a href="#"><Home className="mr-2 h-4 w-4" /> Dashboard</a>
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start"
                            onClick={() => setShowStopsPage(true)}
                          >
                            <MapPin className="mr-2 h-4 w-4" /> Route Stops
                          </Button>
                          <Button variant="ghost" className="w-full justify-start" asChild>
                            <a href="#"><BarChart3 className="mr-2 h-4 w-4" /> Reports</a>
                          </Button>
                          <Button variant="ghost" className="w-full justify-start" asChild>
                            <a href="#"><Settings className="mr-2 h-4 w-4" /> Settings</a>
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="mb-4 px-4 text-lg font-medium">Quick Actions</h3>
                        <div className="space-y-1">
                          <Button onClick={() => setShowLeaveDialog('regular')} variant="ghost" className="w-full justify-start">
                            <Calendar className="mr-2 h-4 w-4" /> Apply for Leave
                          </Button>
                          <Button onClick={() => setShowLeaveDialog('emergency')} variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                            <AlertTriangle className="mr-2 h-4 w-4" /> Emergency Leave
                          </Button>
                          <Button onClick={() => setShowComplaintDialog(true)} variant="ghost" className="w-full justify-start">
                            <AlertTriangle className="mr-2 h-4 w-4" /> Report Issue
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
          
          {/* Start Trip Call-to-Action (only when inactive) */}
          {currentTripStatus === 'inactive' && (
            <div className="bg-gradient-to-r from-brand-500 to-indigo-600 rounded-xl p-8 shadow-md text-white">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-2xl font-bold mb-2">Ready to Start Your Trip?</h2>
                  <p className="text-white/90 max-w-md">
                    Start your trip to begin navigation and track student attendance on Route #248.
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-brand-600 hover:bg-white/90 w-full md:w-auto px-8"
                  onClick={handleStartTrip}
                >
                  <MapIcon size={20} className="mr-2" /> Start Trip
                </Button>
              </div>
            </div>
          )}
          
          {/* Condensed Dashboard Cards (Only show when trip is inactive or user has scrolled past map) */}
          {!showFullMap && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <DashboardCard 
                title="Active Route"
                value="Route #248"
                description="South Campus"
                icon={<MapPin className="h-5 w-5 text-brand-500" />}
                actionText="View Route"
                actionLink="#"
              />
              
              <DashboardCard 
                title="Next Stop"
                value="Stop #14"
                description="Arriving in 5 mins"
                icon={<MapPin className="h-5 w-5 text-amber-500" />}
                actionText="See Details"
                actionLink="#"
                actionOnClick={() => setShowStopsPage(true)}
              />
              
              <DashboardCard 
                title="Quick Actions"
                value={currentTripStatus === 'inactive' ? 'Begin Trip' : 'End Trip'}
                description={currentTripStatus === 'inactive' ? 'Start your route' : 'Complete the trip'}
                icon={<Clock className="h-5 w-5 text-indigo-500" />}
                actionText={currentTripStatus === 'inactive' ? 'Start Trip' : 'End Trip'}
                actionOnClick={currentTripStatus === 'inactive' ? handleStartTrip : handleEndTrip}
                actionVariant={currentTripStatus === 'inactive' ? 'default' : 'destructive'}
              />
              
              <DashboardCard 
                title="Announcements"
                value="2 Unread"
                description="School closures"
                icon={<Bell className="h-5 w-5 text-red-500" />}
                actionText="View All"
                actionLink="#"
              />
            </div>
          )}
          
          {/* Live Route Tracking - Full Width when trip is active */}
          <div 
            ref={mapRef}
            className={cn(
              "bg-white rounded-xl p-4 shadow-sm border border-gray-100 overflow-hidden transition-all duration-500",
              showFullMap ? "lg:col-span-3" : "lg:col-span-2"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Live Route Tracking</h2>
              
              {currentTripStatus === 'active' && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                    Trip Active
                  </span>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-amber-600 border-amber-200 hover:bg-amber-50"
                    onClick={handleNotifyDelay}
                  >
                    <Clock5 size={16} className="mr-1" /> Delay 10 min
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleSendSOS}
                  >
                    <AlertCircle size={16} className="mr-1" /> SOS
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleEndTrip}
                  >
                    End Trip
                  </Button>
                  
                  <div className="relative">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button size="icon" variant="ghost">
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
                            <Button onClick={() => setShowComplaintDialog(true)} variant="outline" className="w-full justify-start">
                              <AlertTriangle className="mr-2 h-4 w-4" /> Report Issue
                            </Button>
                            <Button onClick={() => setShowLeaveDialog('regular')} variant="outline" className="w-full justify-start">
                              <Calendar className="mr-2 h-4 w-4" /> Apply for Leave
                            </Button>
                            <Button onClick={() => setShowLeaveDialog('emergency')} variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                              <AlertTriangle className="mr-2 h-4 w-4" /> Emergency Leave
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              )}
            </div>
            
            <div className={cn("relative", showFullMap ? "h-[500px]" : "h-[400px]")}>
              <MapView userType="driver" mode={currentTripStatus === 'active' ? "navigation" : "preview"} fullView={showFullMap} />
            </div>
          </div>
          
          {/* Statistics (Shown conditionally) */}
          {showFullMap ? (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium mb-4">Current Trip Statistics</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Total Distance</div>
                  <div className="text-xl font-semibold mt-1">24.8 miles</div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Scheduled Stops</div>
                  <div className="text-xl font-semibold mt-1">18 stops</div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Students on Board</div>
                  <div className="text-xl font-semibold mt-1">{currentTripStatus === 'active' ? '24' : '0'} students</div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Estimated Time to Next Stop</div>
                  <div className="text-xl font-semibold mt-1">5 minutes</div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  onClick={() => setShowStopsPage(true)} 
                  variant="outline" 
                  size="sm" 
                  className="mr-2"
                >
                  View Stops
                </Button>
                <Button onClick={() => setShowFullMap(false)} variant="outline" size="sm">
                  View Dashboard
                </Button>
              </div>
            </div>
          ) : (
            currentTripStatus === 'active' && (
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Trip In Progress</h2>
                  <Button onClick={() => setShowFullMap(true)} variant="outline" size="sm">
                    Full Map View
                  </Button>
                </div>
                <p className="text-gray-600">Your trip on Route #248 is currently active.</p>
              </div>
            )
          )}
          
          {/* Only show remaining content if not in full map view */}
          {!showFullMap && (
            <>
              {/* Statistics Card */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h2 className="text-lg font-medium mb-4">Today's Statistics</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">Total Distance</div>
                    <div className="text-xl font-semibold mt-1">24.8 miles</div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">Scheduled Stops</div>
                    <div className="text-xl font-semibold mt-1">18 stops</div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">Students on Board</div>
                    <div className="text-xl font-semibold mt-1">{currentTripStatus === 'active' ? '24' : '0'} students</div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">Estimated Time to Next Stop</div>
                    <div className="text-xl font-semibold mt-1">5 minutes</div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button onClick={() => setShowLeaveDialog('emergency')} variant="outline" className="flex-1 border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700">
                      <AlertTriangle size={16} className="mr-2" /> Emergency
                    </Button>
                    <Button onClick={() => setShowComplaintDialog(true)} variant="outline" className="flex-1">
                      <FileText size={16} className="mr-2" /> Report Issue
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Trip History */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h2 className="text-lg font-medium mb-4">Recent Trip History</h2>
                <TripHistory userType="driver" />
              </div>
              
              {/* Student Attendance */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Today's Student Attendance</h2>
                  <Button size="sm" variant="outline">Export Data</Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-md">
                    <thead>
                      <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
            </>
          )}
        </div>
      </main>
      
      {/* Leave Application Dialog */}
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

      {/* Complaint Dialog */}
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
