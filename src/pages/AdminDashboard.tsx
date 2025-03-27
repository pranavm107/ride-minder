
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import MapView from '@/components/MapView';
import DashboardCard from '@/components/DashboardCard';
import { cn } from '@/lib/utils';
import { Bus, Clock, MapPin, User, Search, Camera, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'buses' | 'drivers' | 'routes'>('overview');
  const [selectedView, setSelectedView] = useState<'data' | 'map'>('map');
  
  const busFleet = [
    { id: 1, number: '42', driver: 'David Johnson', route: 'North Campus Express', status: 'active', capacity: '23/30', lastUpdate: '2 min ago' },
    { id: 2, number: '17', driver: 'Maria Garcia', route: 'South Campus Loop', status: 'active', capacity: '18/30', lastUpdate: '5 min ago' },
    { id: 3, number: '23', driver: 'Robert Chen', route: 'Downtown Express', status: 'active', capacity: '12/30', lastUpdate: '1 min ago' },
    { id: 4, number: '08', driver: 'Sarah Williams', route: 'West Campus', status: 'inactive', capacity: '0/30', lastUpdate: '1 hr ago' },
    { id: 5, number: '15', driver: 'James Taylor', route: 'Medical Center', status: 'maintenance', capacity: '0/30', lastUpdate: '5 hrs ago' },
  ];
  
  const activeAlerts = [
    { id: 1, type: 'delay', bus: '42', message: 'Traffic delay on North Campus route', time: '8:45 AM', severity: 'medium' },
    { id: 2, type: 'maintenance', bus: '15', message: 'Scheduled maintenance', time: '8:30 AM', severity: 'low' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">System Overview and Management</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-3">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
                <Button 
                  variant="default" 
                  className="bg-brand-500 hover:bg-brand-600"
                  onClick={() => toast.success("Data refreshed successfully")}
                >
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard
              title="Active Buses"
              value="3/5"
              trend={20}
              trendLabel="more than yesterday"
              icon={<Bus size={18} />}
              className="col-span-1"
            />
            <DashboardCard
              title="Active Routes"
              value="4"
              icon={<MapPin size={18} />}
              className="col-span-1"
            />
            <DashboardCard
              title="Total Passengers"
              value="342"
              trend={15}
              trendLabel="vs. last week"
              icon={<User size={18} />}
              className="col-span-1"
            />
            <DashboardCard
              title="On-Time Performance"
              value="94%"
              trend={2}
              trendLabel="improvement"
              icon={<Clock size={18} />}
              className="col-span-1"
            />
          </div>
          
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="flex border-b border-gray-100">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'buses', label: 'Bus Fleet' },
                { id: 'drivers', label: 'Drivers' },
                { id: 'routes', label: 'Routes' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={cn(
                    "flex-1 py-4 text-sm font-medium transition-colors",
                    activeTab === tab.id 
                      ? "text-brand-600 border-b-2 border-brand-500" 
                      : "text-gray-600 hover:text-brand-600"
                  )}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* View Selector */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-900">
                {activeTab === 'overview' && 'System Status'}
                {activeTab === 'buses' && 'Bus Fleet Management'}
                {activeTab === 'drivers' && 'Driver Management'}
                {activeTab === 'routes' && 'Route Management'}
              </h3>
              
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                    selectedView === 'map' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                  )}
                  onClick={() => setSelectedView('map')}
                >
                  Map View
                </button>
                <button
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                    selectedView === 'data' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                  )}
                  onClick={() => setSelectedView('data')}
                >
                  Data View
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="p-4">
              {selectedView === 'map' ? (
                <div className="h-[500px]">
                  <MapView userType="admin" className="h-full" />
                </div>
              ) : (
                <div>
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="p-4 rounded-lg border border-gray-100">
                        <h4 className="font-medium text-gray-900 mb-3">System Health</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {[
                            { label: 'Server Status', value: 'Online', status: 'good' },
                            { label: 'Database', value: 'Operational', status: 'good' },
                            { label: 'GPS Tracking', value: 'Active', status: 'good' },
                            { label: 'Communication', value: 'Active', status: 'good' },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                              <span className="text-sm text-gray-600">{item.label}</span>
                              <span className={cn(
                                "flex items-center text-sm font-medium",
                                item.status === 'good' && "text-green-600",
                                item.status === 'warning' && "text-amber-600",
                                item.status === 'error' && "text-red-600",
                              )}>
                                <span className={cn(
                                  "h-2 w-2 rounded-full mr-2",
                                  item.status === 'good' && "bg-green-500",
                                  item.status === 'warning' && "bg-amber-500",
                                  item.status === 'error' && "bg-red-500",
                                )}></span>
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border border-gray-100">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-gray-900">Active Alerts</h4>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast.success("All alerts acknowledged")}
                          >
                            Acknowledge All
                          </Button>
                        </div>
                        
                        {activeAlerts.length > 0 ? (
                          <div className="space-y-3">
                            {activeAlerts.map((alert) => (
                              <div 
                                key={alert.id} 
                                className={cn(
                                  "p-3 rounded-lg border",
                                  alert.severity === 'high' && "border-red-100 bg-red-50",
                                  alert.severity === 'medium' && "border-amber-100 bg-amber-50",
                                  alert.severity === 'low' && "border-blue-100 bg-blue-50",
                                )}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className={cn(
                                        "text-sm font-medium",
                                        alert.severity === 'high' && "text-red-700",
                                        alert.severity === 'medium' && "text-amber-700",
                                        alert.severity === 'low' && "text-blue-700",
                                      )}>
                                        {alert.type === 'delay' ? 'Traffic Delay' : 
                                         alert.type === 'maintenance' ? 'Maintenance' : 'Alert'}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {alert.time} · Bus #{alert.bus}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700 mt-1">
                                      {alert.message}
                                    </p>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-xs"
                                    onClick={() => {
                                      toast.success(`Alert #${alert.id} acknowledged`);
                                    }}
                                  >
                                    Resolve
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <div className="h-12 w-12 bg-green-100 rounded-full mx-auto flex items-center justify-center text-green-600 mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">All Clear</h4>
                            <p className="text-sm text-gray-600">
                              No active alerts at the moment
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 rounded-lg border border-gray-100">
                        <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { label: 'Add Bus', icon: <Bus size={16} /> },
                            { label: 'Add Driver', icon: <User size={16} /> },
                            { label: 'Broadcast Message', icon: <MessageSquare size={16} /> },
                            { label: 'System Report', icon: <Camera size={16} /> },
                          ].map((action, i) => (
                            <Button 
                              key={i} 
                              variant="outline" 
                              className="flex flex-col h-auto py-4 gap-2"
                              onClick={() => {
                                toast.success(`${action.label} action initiated`);
                              }}
                            >
                              <div className="h-8 w-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-500">
                                {action.icon}
                              </div>
                              <span className="text-xs font-medium">{action.label}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'buses' && (
                    <div>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Bus #</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Driver</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Route</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Capacity</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Last Update</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {busFleet.map((bus) => (
                              <tr key={bus.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{bus.number}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{bus.driver}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{bus.route}</td>
                                <td className="px-4 py-3 text-sm">
                                  <span className={cn(
                                    "px-2 py-1 text-xs font-medium rounded-full",
                                    bus.status === 'active' && "bg-green-100 text-green-700",
                                    bus.status === 'inactive' && "bg-gray-100 text-gray-700",
                                    bus.status === 'maintenance' && "bg-amber-100 text-amber-700",
                                  )}>
                                    {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">{bus.capacity}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{bus.lastUpdate}</td>
                                <td className="px-4 py-3 text-sm text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 text-brand-500"
                                      onClick={() => {
                                        toast.success(`Contacting driver of Bus #${bus.number}`);
                                      }}
                                    >
                                      Contact
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8"
                                      onClick={() => {
                                        toast.success(`Viewing details for Bus #${bus.number}`);
                                      }}
                                    >
                                      Details
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Showing 5 of 5 buses
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast.success("Adding new bus to fleet");
                            }}
                          >
                            Add Bus
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm"
                            className="bg-brand-500 hover:bg-brand-600"
                            onClick={() => {
                              toast.success("Generating bus fleet report");
                            }}
                          >
                            Generate Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'drivers' && (
                    <div className="text-center py-12">
                      <div className="h-16 w-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center text-gray-500 mb-4">
                        <User size={24} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Driver Management</h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-6">
                        This module allows you to manage drivers, view schedules, and assign routes.
                      </p>
                      <Button 
                        variant="default" 
                        className="bg-brand-500 hover:bg-brand-600"
                        onClick={() => {
                          toast.success("Opening driver management module");
                        }}
                      >
                        Access Module
                      </Button>
                    </div>
                  )}
                  
                  {activeTab === 'routes' && (
                    <div className="text-center py-12">
                      <div className="h-16 w-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center text-gray-500 mb-4">
                        <MapPin size={24} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Route Management</h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-6">
                        This module allows you to create and edit routes, optimize paths, and set schedules.
                      </p>
                      <Button 
                        variant="default" 
                        className="bg-brand-500 hover:bg-brand-600"
                        onClick={() => {
                          toast.success("Opening route management module");
                        }}
                      >
                        Access Module
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Analytics Preview */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900">Analytics Preview</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  toast.success("Opening full analytics dashboard");
                }}
              >
                View Full Analytics
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <h4 className="font-medium text-gray-900 mb-4">Weekly Ridership</h4>
                <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">Analytics visualization</div>
                    <div className="flex space-x-1 justify-center">
                      <div className="w-2 h-10 bg-brand-200 rounded-t-md"></div>
                      <div className="w-2 h-16 bg-brand-300 rounded-t-md"></div>
                      <div className="w-2 h-24 bg-brand-400 rounded-t-md"></div>
                      <div className="w-2 h-20 bg-brand-500 rounded-t-md"></div>
                      <div className="w-2 h-28 bg-brand-600 rounded-t-md"></div>
                      <div className="w-2 h-32 bg-brand-500 rounded-t-md"></div>
                      <div className="w-2 h-24 bg-brand-400 rounded-t-md"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Key Insights</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Peak Hours', value: '7:30 - 9:00 AM' },
                    { label: 'Busiest Route', value: 'North Campus Express' },
                    { label: 'Average Trip Time', value: '18 minutes' },
                    { label: 'Fuel Efficiency', value: '10.4 mpg', trend: '+5%' },
                  ].map((insight, i) => (
                    <div key={i} className="p-3 border border-gray-100 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{insight.label}</div>
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-gray-900">{insight.value}</div>
                        {insight.trend && (
                          <div className="text-xs font-medium text-green-600">
                            {insight.trend}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
