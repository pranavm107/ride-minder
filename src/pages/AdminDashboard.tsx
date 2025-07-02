
import React, { useState } from 'react';
import { Users, Bus, MapPin, AlertTriangle, TrendingUp, Calendar, Settings, BarChart3 } from 'lucide-react';
import NavBar from '@/components/NavBar';
import DashboardCard from '@/components/DashboardCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const stats = [
    {
      title: 'Total Students',
      value: '2,847',
      change: '+12%',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Buses',
      value: '24',
      change: '+2',
      icon: <Bus className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Routes',
      value: '18',
      change: '0',
      icon: <MapPin className="h-6 w-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Alerts',
      value: '3',
      change: '-2',
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'bg-red-500'
    }
  ];

  const recentActivities = [
    { time: '2 min ago', activity: 'Bus #12 arrived at Campus Gate', type: 'arrival' },
    { time: '5 min ago', activity: 'Route 3 delayed by 8 minutes', type: 'delay' },
    { time: '12 min ago', activity: 'New student registered: John Doe', type: 'registration' },
    { time: '18 min ago', activity: 'Bus #7 maintenance completed', type: 'maintenance' },
    { time: '25 min ago', activity: 'Emergency alert resolved on Route 5', type: 'emergency' }
  ];

  const upcomingMaintenance = [
    { bus: 'Bus #15', date: 'Tomorrow', type: 'Routine Service', priority: 'medium' },
    { bus: 'Bus #3', date: 'Dec 28', type: 'Brake Inspection', priority: 'high' },
    { bus: 'Bus #21', date: 'Dec 30', type: 'Tire Replacement', priority: 'medium' },
    { bus: 'Bus #8', date: 'Jan 2', type: 'Engine Check', priority: 'low' }
  ];

  const routePerformance = [
    { route: 'Route 1', onTime: 92, efficiency: 88, satisfaction: 4.5 },
    { route: 'Route 2', onTime: 87, efficiency: 91, satisfaction: 4.2 },
    { route: 'Route 3', onTime: 95, efficiency: 85, satisfaction: 4.7 },
    { route: 'Route 4', onTime: 89, efficiency: 93, satisfaction: 4.3 },
    { route: 'Route 5', onTime: 91, efficiency: 87, satisfaction: 4.4 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar userType="admin" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your campus transportation system</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'buses', label: 'Fleet Management', icon: Bus },
                { id: 'routes', label: 'Routes', icon: MapPin },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeSection === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {activeSection === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <DashboardCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  icon={stat.icon}
                  color={stat.color}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activities */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Recent Activities
                    </CardTitle>
                    <CardDescription>Latest system events and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === 'arrival' ? 'bg-green-500' :
                            activity.type === 'delay' ? 'bg-yellow-500' :
                            activity.type === 'emergency' ? 'bg-red-500' :
                            'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{activity.activity}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Maintenance */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Maintenance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingMaintenance.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                          <div>
                            <p className="font-medium text-sm">{item.bus}</p>
                            <p className="text-xs text-gray-500">{item.type}</p>
                            <p className="text-xs text-gray-400">{item.date}</p>
                          </div>
                          <Badge variant={
                            item.priority === 'high' ? 'destructive' :
                            item.priority === 'medium' ? 'default' : 'secondary'
                          }>
                            {item.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Route Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Route Performance</CardTitle>
                <CardDescription>Performance metrics for all active routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routePerformance.map((route, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg border">
                      <div>
                        <h4 className="font-medium">{route.route}</h4>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">On-Time Performance</p>
                        <div className="flex items-center gap-2">
                          <Progress value={route.onTime} className="flex-1" />
                          <span className="text-sm font-medium">{route.onTime}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Efficiency</p>
                        <div className="flex items-center gap-2">
                          <Progress value={route.efficiency} className="flex-1" />
                          <span className="text-sm font-medium">{route.efficiency}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Satisfaction</p>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{route.satisfaction}</span>
                          <span className="text-xs text-gray-400">/5.0</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'buses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Fleet Management</h2>
              <Button>Add New Bus</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }, (_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Bus #{i + 1}</CardTitle>
                    <Badge variant={i % 3 === 0 ? 'default' : i % 3 === 1 ? 'secondary' : 'destructive'}>
                      {i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Maintenance' : 'Offline'}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Route:</span>
                        <span>Route {(i % 5) + 1}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Driver:</span>
                        <span>Driver {i + 1}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Capacity:</span>
                        <span>45 seats</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Last Service:</span>
                        <span>Dec {15 + (i % 10)}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Track
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'routes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Route Management</h2>
              <Button>Create New Route</Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 4 }, (_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Route {i + 1}
                      <Badge variant={i % 2 === 0 ? 'default' : 'secondary'}>
                        {i % 2 === 0 ? 'Active' : 'Inactive'}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Campus to Residential Area {i + 1}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Stops:</span>
                        <span>{8 + (i * 2)} stops</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Distance:</span>
                        <span>{12 + (i * 3)} km</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Avg. Journey Time:</span>
                        <span>{35 + (i * 5)} min</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Assigned Buses:</span>
                        <span>{2 + (i % 2)} buses</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Daily Passengers:</span>
                        <span>{150 + (i * 50)} students</span>
                      </div>
                      
                      <div className="pt-3 border-t">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Edit Route
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            View Map
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'settings' && (
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
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
