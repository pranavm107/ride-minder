
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Settings, AlertTriangle } from 'lucide-react';

const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure system-wide preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">System Name</label>
              <input 
                type="text" 
                defaultValue="RideMinder Campus Transit"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Language</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Zone</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>UTC-5 (Eastern)</option>
                <option>UTC-6 (Central)</option>
                <option>UTC-7 (Mountain)</option>
                <option>UTC-8 (Pacific)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage system notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Alerts</p>
                <p className="text-sm text-gray-500">Send email notifications for critical events</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-500">Send SMS for emergency alerts</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">Mobile app push notifications</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Configure security and access controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <input 
                type="number" 
                defaultValue="30"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Require 2FA for admin access</p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Login Attempt Limits</p>
                <p className="text-sm text-gray-500">Lock accounts after failed attempts</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Backup and data retention settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Backup Frequency</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Data Retention (days)</label>
              <input 
                type="number" 
                defaultValue="365"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <Button className="w-full">Create Backup Now</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Maintenance</CardTitle>
          <CardDescription>Maintenance and system health tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <BarChart3 className="h-6 w-6 mb-2" />
              System Health
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Settings className="h-6 w-6 mb-2" />
              Clear Cache
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <AlertTriangle className="h-6 w-6 mb-2" />
              Error Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
