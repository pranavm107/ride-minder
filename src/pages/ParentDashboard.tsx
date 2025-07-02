
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Bell, 
  MessageSquare, 
  User, 
  Phone, 
  Settings, 
  LogOut, 
  HelpCircle,
  Navigation,
  Calendar,
  CheckCircle2,
  XCircle,
  Eye,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import NavBar from '@/components/NavBar';
import MapView from '@/components/MapView';
import ParentProfile from '@/components/parent/ParentProfile';
import ComplaintSubmission from '@/components/parent/ComplaintSubmission';
import RideHistory from '@/components/parent/RideHistory';
import EmergencyAlerts from '@/components/parent/EmergencyAlerts';

// Mock data - in real app, this would come from Supabase
const childInfo = {
  name: "Alex Johnson",
  class: "Grade 10-A",
  registerNo: "ST2024-1157",
  route: "Route #248 - South Campus",
  stopName: "Main Street Library"
};

const currentBusStatus = {
  isActive: true,
  currentSpeed: 35,
  eta: "8 mins",
  lastUpdate: "Just now",
  driverName: "Michael Rodriguez",
  busNumber: "CDB-248",
  nextStop: "Science Center",
  isDelayed: false,
  delayTime: 0
};

const recentNotifications = [
  { id: 1, type: 'arrival', message: 'Alex boarded the bus at Main Street Library', time: '7:45 AM', isRead: false },
  { id: 2, type: 'departure', message: 'Bus departed from South Campus', time: '3:30 PM', isRead: true },
  { id: 3, type: 'delay', message: 'Bus running 5 minutes late due to traffic', time: '8:15 AM', isRead: false },
];

const ParentDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showComplaint, setShowComplaint] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEmergencyAlerts, setShowEmergencyAlerts] = useState(false);
  const [notifications, setNotifications] = useState(recentNotifications);
  const [unreadCount, setUnreadCount] = useState(2);
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newNotification = {
          id: Date.now(),
          type: 'update',
          message: 'Bus location updated - currently at Oak Street',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
        setUnreadCount(prev => prev + 1);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate('/');
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <NavBar userType="student" />
      
      <main className="container mx-auto px-4 py-6 pt-20">
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                Good Morning, Parent! 👋
              </h1>
              <p className="text-gray-600">{getCurrentDate()}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Tracking {childInfo.name}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowProfile(true)}
                className="border-purple-200 hover:bg-purple-50"
              >
                <User size={16} className="mr-1" />
                Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-red-200 hover:bg-red-50 text-red-600"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Child Info Card */}
        <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
              <User className="h-5 w-5" />
              Child Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Student Name</p>
                <p className="font-semibold text-gray-900">{childInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Class & Register No.</p>
                <p className="font-semibold text-gray-900">{childInfo.class}</p>
                <p className="text-xs text-gray-500">{childInfo.registerNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Assigned Route</p>
                <p className="font-semibold text-gray-900">{childInfo.route}</p>
                <p className="text-xs text-gray-500">Stop: {childInfo.stopName}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Bus Tracking */}
        <Card className="mb-6 border-green-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Live Bus Tracking
              </CardTitle>
              <div className="flex items-center gap-2">
                {currentBusStatus.isDelayed && (
                  <Badge variant="destructive" className="animate-pulse">
                    <AlertTriangle size={12} className="mr-1" />
                    Delayed {currentBusStatus.delayTime}min
                  </Badge>
                )}
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                  Live
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{currentBusStatus.currentSpeed}</div>
                <div className="text-xs text-gray-600">km/h</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{currentBusStatus.eta}</div>
                <div className="text-xs text-gray-600">ETA</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-bold text-green-600">{currentBusStatus.busNumber}</div>
                <div className="text-xs text-gray-600">Bus Number</div>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <div className="text-sm font-bold text-amber-600">{currentBusStatus.nextStop}</div>
                <div className="text-xs text-gray-600">Next Stop</div>
              </div>
            </div>
            
            <div className="h-[300px] rounded-lg overflow-hidden">
              <MapView userType="parent" mode="preview" height="100%" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Button
            onClick={() => setShowHistory(true)}
            className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex flex-col items-center justify-center gap-2"
          >
            <Calendar size={24} />
            <span className="text-sm">Ride History</span>
          </Button>
          
          <Button
            onClick={() => setShowComplaint(true)}
            className="h-20 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 flex flex-col items-center justify-center gap-2"
          >
            <MessageSquare size={24} />
            <span className="text-sm">Submit Complaint</span>
          </Button>
          
          <Button
            onClick={() => setShowEmergencyAlerts(true)}
            className="h-20 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex flex-col items-center justify-center gap-2"
          >
            <Shield size={24} />
            <span className="text-sm">Emergency Alerts</span>
          </Button>
          
          <Button
            onClick={() => navigate('/customer-support')}
            className="h-20 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 flex flex-col items-center justify-center gap-2"
          >
            <HelpCircle size={24} />
            <span className="text-sm">Help & Support</span>
          </Button>
        </div>

        {/* Recent Notifications */}
        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-orange-800 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </CardTitle>
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg transition-colors",
                    notification.isRead ? "bg-gray-50" : "bg-blue-50 border border-blue-200"
                  )}
                >
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                    notification.type === 'arrival' ? "bg-green-100 text-green-600" :
                    notification.type === 'departure' ? "bg-blue-100 text-blue-600" :
                    notification.type === 'delay' ? "bg-amber-100 text-amber-600" :
                    "bg-purple-100 text-purple-600"
                  )}>
                    {notification.type === 'arrival' && <CheckCircle2 size={16} />}
                    {notification.type === 'departure' && <Navigation size={16} />}
                    {notification.type === 'delay' && <AlertTriangle size={16} />}
                    {notification.type === 'update' && <MapPin size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      "text-sm",
                      notification.isRead ? "text-gray-600" : "text-gray-900 font-medium"
                    )}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Parent Profile</DialogTitle>
            <DialogDescription>
              Manage your profile and child information
            </DialogDescription>
          </DialogHeader>
          <ParentProfile onClose={() => setShowProfile(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showComplaint} onOpenChange={setShowComplaint}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Submit Complaint</DialogTitle>
            <DialogDescription>
              Report any issues or suggestions regarding bus services
            </DialogDescription>
          </DialogHeader>
          <ComplaintSubmission onClose={() => setShowComplaint(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Ride History</DialogTitle>
            <DialogDescription>
              View your child's ride history for the past 7 days
            </DialogDescription>
          </DialogHeader>
          <RideHistory onClose={() => setShowHistory(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showEmergencyAlerts} onOpenChange={setShowEmergencyAlerts}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Emergency Alerts</DialogTitle>
            <DialogDescription>
              View emergency notifications and safety alerts
            </DialogDescription>
          </DialogHeader>
          <EmergencyAlerts onClose={() => setShowEmergencyAlerts(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParentDashboard;
