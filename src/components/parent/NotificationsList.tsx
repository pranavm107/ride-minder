import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  MapPin,
  Car,
  Settings,
  Volume2,
  Mail,
  Smartphone,
  Check,
  X
} from 'lucide-react';

const NotificationsList = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    cabArrival: true,
    attendanceUpdates: true,
    sosAlerts: true,
    delays: true,
    routeChanges: false,
    reminders: true
  });

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'arrival',
      title: 'Cab Arrived at Pickup Point',
      message: 'Cab CB-248 has arrived at Rajouri Garden Metro. Your child should board now.',
      time: '2 minutes ago',
      status: 'unread',
      priority: 'high',
      icon: MapPin,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'attendance',
      title: 'Student Marked Present',
      message: 'Arjun Sharma has been marked present for today\'s morning trip.',
      time: '15 minutes ago',
      status: 'read',
      priority: 'normal',
      icon: CheckCircle,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'delay',
      title: 'Cab Running Late',
      message: 'Due to heavy traffic on Ring Road, Cab CB-248 is running 8 minutes behind schedule.',
      time: '1 hour ago',
      status: 'read',
      priority: 'medium',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      id: 4,
      type: 'sos',
      title: 'SOS Alert Resolved',
      message: 'SOS alert triggered at 2:45 PM has been resolved. Student is safe.',
      time: '2 hours ago',
      status: 'read',
      priority: 'high',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Pickup Reminder',
      message: 'Your child\'s cab will arrive at the pickup point in 5 minutes.',
      time: '3 hours ago',
      status: 'read',
      priority: 'normal',
      icon: Bell,
      color: 'text-purple-600'
    }
  ];

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const markAllAsRead = () => {
    // Handle mark all as read
  };

  const toggleNotificationSetting = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const getNotificationIcon = (notification: any) => {
    const IconComponent = notification.icon;
    return <IconComponent className={`h-5 w-5 ${notification.color}`} />;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">High</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Medium</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Unread Notifications</p>
                <p className="text-2xl font-bold text-blue-800">{unreadCount}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Today's Updates</p>
                <p className="text-2xl font-bold text-green-800">5</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Active Alerts</p>
                <p className="text-2xl font-bold text-orange-800">1</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                      notification.status === 'unread' ? 'bg-primary/5 border-primary/20' : 'bg-card'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification)}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(notification.priority)}
                          {notification.status === 'unread' && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>

                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.filter(n => n.status === 'unread').map((notification) => (
                  <div 
                    key={notification.id} 
                    className="flex items-start gap-4 p-4 rounded-lg border bg-primary/5 border-primary/20"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification)}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(notification.priority)}
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>

                    <Button variant="ghost" size="sm">
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Cab Arrival Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when the cab arrives at pickup/drop points</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.cabArrival}
                    onCheckedChange={() => toggleNotificationSetting('cabArrival')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Attendance Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive updates when your child is marked present/absent</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.attendanceUpdates}
                    onCheckedChange={() => toggleNotificationSetting('attendanceUpdates')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">SOS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Immediate alerts for emergency situations</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.sosAlerts}
                    onCheckedChange={() => toggleNotificationSetting('sosAlerts')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Delay Notifications</Label>
                    <p className="text-sm text-muted-foreground">Alerts when the cab is running late</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.delays}
                    onCheckedChange={() => toggleNotificationSetting('delays')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Route Changes</Label>
                    <p className="text-sm text-muted-foreground">Notifications about route modifications</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.routeChanges}
                    onCheckedChange={() => toggleNotificationSetting('routeChanges')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Pickup Reminders</Label>
                    <p className="text-sm text-muted-foreground">Reminders 5 minutes before cab arrival</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.reminders}
                    onCheckedChange={() => toggleNotificationSetting('reminders')}
                  />
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <h4 className="font-medium">Delivery Methods</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Push Notifications</p>
                      <p className="text-xs text-muted-foreground">Mobile app alerts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Email Alerts</p>
                      <p className="text-xs text-muted-foreground">Email notifications</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsList;