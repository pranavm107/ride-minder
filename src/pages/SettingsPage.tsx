
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Bell, Lock, User, Moon, Volume2, Map, Shield } from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar userType="driver" />
      <main className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Settings Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    <User className="mr-2 h-4 w-4" /> Account
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    <Bell className="mr-2 h-4 w-4" /> Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    <Lock className="mr-2 h-4 w-4" /> Privacy & Security
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    <Map className="mr-2 h-4 w-4" /> Map & Navigation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    <Moon className="mr-2 h-4 w-4" /> Appearance
                  </Button>
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    <Volume2 className="mr-2 h-4 w-4" /> Sound & Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Full Name" defaultValue="Michael Johnson" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Email" defaultValue="michael.j@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Phone Number" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                  
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications on your device</p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch id="email-notifications" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="route-alerts">Route Alerts</Label>
                      <p className="text-sm text-gray-500">Get notified about route changes and updates</p>
                    </div>
                    <Switch id="route-alerts" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Map & Navigation</CardTitle>
                <CardDescription>Customize map appearance and navigation preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="voice-navigation">Voice Navigation</Label>
                      <p className="text-sm text-gray-500">Enable voice instructions during navigation</p>
                    </div>
                    <Switch id="voice-navigation" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="satellite-view">Default to Satellite View</Label>
                      <p className="text-sm text-gray-500">Use satellite imagery instead of standard map</p>
                    </div>
                    <Switch id="satellite-view" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="traffic-info">Show Traffic Information</Label>
                      <p className="text-sm text-gray-500">Display real-time traffic data on map</p>
                    </div>
                    <Switch id="traffic-info" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your account security and data sharing preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="location-tracking">Location Tracking</Label>
                      <p className="text-sm text-gray-500">Allow the app to track your location</p>
                    </div>
                    <Switch id="location-tracking" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-sharing">Data Sharing</Label>
                      <p className="text-sm text-gray-500">Share anonymous usage data to improve the service</p>
                    </div>
                    <Switch id="data-sharing" />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Button variant="outline" className="w-full">
                      <Lock className="mr-2 h-4 w-4" /> Change Password
                    </Button>
                  </div>
                  
                  <div>
                    <Button variant="outline" className="w-full">
                      <Shield className="mr-2 h-4 w-4" /> Two-Factor Authentication
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
