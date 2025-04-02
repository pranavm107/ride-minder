import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import MapView from '@/components/MapView';
import DashboardCard from '@/components/DashboardCard';
import TripHistory from '@/components/TripHistory';
import LeaveApplication from '@/components/LeaveApplication';
import ComplaintBox from '@/components/ComplaintBox';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Clock, Calendar, Menu, MapPin, Bell, FileText, Home, MapIcon, BarChart3, Settings, AlertTriangle } from 'lucide-react';

const studentAttendance = [
  { id: '2023001', name: 'Alice Johnson', grade: '10th', stop: 'Main Street', morningStatus: 'Present', afternoonStatus: 'Present' },
  { id: '2023002', name: 'Bob Williams', grade: '9th', stop: 'Park Avenue', morningStatus: 'Present', afternoonStatus: 'Absent' },
  { id: '2023003', name: 'Charlie Brown', grade: '11th', stop: 'Oak Street', morningStatus: 'Absent', afternoonStatus: 'Present' },
  { id: '2023004', name: 'Diana Miller', grade: '12th', stop: 'Maple Drive', morningStatus: 'Present', afternoonStatus: 'Present' },
  { id: '2023005', name: 'Ethan Davis', grade: '10th', stop: 'Pine Lane', morningStatus: 'Absent', afternoonStatus: 'Absent' },
];

const DriverDashboard = () => {
  const [currentTripStatus, setCurrentTripStatus] = useState<'inactive' | 'active'>('inactive');
  const handleStartTrip = () => {
    setCurrentTripStatus('active');
    toast({
      title: "Trip Started!",
      description: "You've started your trip on Route #248.",
    });
  };
  const handleEndTrip = () => {
    setCurrentTripStatus('inactive');
    toast({
      title: "Trip Ended!",
      description: "You've completed your trip on Route #248. Great job!",
    });
  };
  const [showLeaveDialog, setShowLeaveDialog] = useState<'regular' | 'emergency' | null>(null);
  const [showComplaintDialog, setShowComplaintDialog] = useState<boolean>(false);
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <NavBar userType="driver" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6">
          {/* Welcome Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Hello, Michael</h1>
                <p className="text-gray-500 mt-1">Thursday, October 12, 2023</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="hidden md:flex"
                  onClick={() => setShowLeaveDialog('regular')}
                >
                  <Calendar size={16} className="mr-1" /> Apply for Leave
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="hidden md:flex"
                  onClick={() => setShowComplaintDialog(true)}
                >
                  <AlertTriangle size={16} className="mr-1" /> Report Issue
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="icon" variant="ghost" className="md:hidden">
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
                          <Button variant="ghost" className="w-full justify-start" asChild>
                            <a href="#"><MapIcon className="mr-2 h-4 w-4" /> Routes</a>
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
          
          {/* Quick Actions */}
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
          
          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map View */}
            <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm border border-gray-100 overflow-hidden h-[400px] relative">
              <h2 className="text-lg font-medium mb-4">Live Route Tracking</h2>
              <MapView height="340px" userType="driver" />
            </div>
            
            {/* Stats and Info */}
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
