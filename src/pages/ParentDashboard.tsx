import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Clock, 
  User, 
  Calendar, 
  Bell, 
  Shield, 
  MessageSquare, 
  CreditCard,
  Phone,
  AlertTriangle,
  LogOut,
  Navigation,
  Car,
  UserCheck,
  UserX,
  CheckCircle,
  XCircle,
  Settings
} from 'lucide-react';
import LiveTrackingMap from '@/components/parent/LiveTrackingMap';
import StudentProfileCard from '@/components/parent/StudentProfileCard';
import AttendanceSummary from '@/components/parent/AttendanceSummary';
import NotificationsList from '@/components/parent/NotificationsList';
import SOSHistory from '@/components/parent/SOSHistory';
import CabDetails from '@/components/parent/CabDetails';
import ComplaintsFeedback from '@/components/parent/ComplaintsFeedback';
import PaymentBilling from '@/components/parent/PaymentBilling';
import { useToast } from '@/hooks/use-toast';

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  // Mock data for demonstration
  const studentData = {
    name: 'Arjun Sharma',
    registerNumber: '21CS1045',
    cabNumber: 'CB-248',
    profilePhoto: '/placeholder.svg',
    pickupLocation: 'Gandhipuram',
    dropLocation: 'Pollachi',
    parentName: 'Rajesh Sharma',
    phoneNumber: '+91 98765 43210'
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your parent account.",
    });
    // Handle logout logic here
  };

  const handleSwitchChild = () => {
    toast({
      title: "Switch Child",
      description: "Feature to switch between multiple children coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Parent Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome, {studentData.parentName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSwitchChild}
                className="hidden sm:flex"
              >
                <Settings className="h-4 w-4 mr-2" />
                Switch Child
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Today's Status</p>
                  <p className="text-lg font-semibold text-green-800">Present</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Cab Status</p>
                  <p className="text-lg font-semibold text-blue-800">On Time</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">ETA Home</p>
                  <p className="text-lg font-semibold text-purple-800">15 mins</p>
                </div>
                <Navigation className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">This Month</p>
                  <p className="text-lg font-semibold text-orange-800">95% Present</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Tracking</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Attendance</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="sos" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">SOS</span>
            </TabsTrigger>
            <TabsTrigger value="cab" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              <span className="hidden sm:inline">Cab</span>
            </TabsTrigger>
            <TabsTrigger value="complaints" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <LiveTrackingMap studentData={studentData} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <StudentProfileCard studentData={studentData} />
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <AttendanceSummary studentData={studentData} />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationsList />
          </TabsContent>

          <TabsContent value="sos" className="space-y-6">
            <SOSHistory studentData={studentData} />
          </TabsContent>

          <TabsContent value="cab" className="space-y-6">
            <CabDetails studentData={studentData} />
          </TabsContent>

          <TabsContent value="complaints" className="space-y-6">
            <ComplaintsFeedback studentData={studentData} />
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <PaymentBilling studentData={studentData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParentDashboard;