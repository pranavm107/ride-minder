import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import MapView from '@/components/MapView';
import DashboardCard from '@/components/DashboardCard';
import { cn } from '@/lib/utils';
import { 
  Bus, 
  Clock, 
  MapPin, 
  User, 
  Search, 
  Camera, 
  MessageSquare,
  FileText,
  DollarSign,
  Bell,
  ShieldAlert,
  Calendar,
  BarChart,
  Users,
  Settings,
  Filter,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'buses' | 'drivers' | 'students' | 'routes' | 'complaints' | 'payments' | 'reports'>('overview');
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
    { id: 3, type: 'sos', bus: '23', message: 'Emergency assistance requested', time: '8:55 AM', severity: 'high' },
  ];

  const drivers = [
    { id: 1, name: 'David Johnson', license: 'DL-98765', phone: '555-123-4567', rating: 4.8, status: 'active', trips: 156 },
    { id: 2, name: 'Maria Garcia', license: 'DL-87654', phone: '555-234-5678', rating: 4.7, status: 'active', trips: 203 },
    { id: 3, name: 'Robert Chen', license: 'DL-76543', phone: '555-345-6789', rating: 4.9, status: 'active', trips: 178 },
    { id: 4, name: 'Sarah Williams', license: 'DL-65432', phone: '555-456-7890', rating: 4.6, status: 'inactive', trips: 142 },
    { id: 5, name: 'James Taylor', license: 'DL-54321', phone: '555-567-8901', rating: 4.5, status: 'on leave', trips: 197 },
  ];

  const students = [
    { id: 1, name: 'Emma Thompson', studentId: 'ST-12345', bus: '42', pickupPoint: 'Oakwood Apartments', status: 'active', paymentStatus: 'paid' },
    { id: 2, name: 'Michael Brown', studentId: 'ST-23456', bus: '17', pickupPoint: 'Pine Street', status: 'active', paymentStatus: 'paid' },
    { id: 3, name: 'Sophia Martinez', studentId: 'ST-34567', bus: '23', pickupPoint: 'Riverside Dorms', status: 'active', paymentStatus: 'pending' },
    { id: 4, name: 'Daniel Wilson', studentId: 'ST-45678', bus: '42', pickupPoint: 'College Heights', status: 'inactive', paymentStatus: 'paid' },
    { id: 5, name: 'Olivia Johnson', studentId: 'ST-56789', bus: '17', pickupPoint: 'Westside Apartments', status: 'active', paymentStatus: 'overdue' },
  ];

  const routes = [
    { id: 1, name: 'North Campus Express', buses: ['42'], stops: 8, distance: '12.5 km', duration: '35 min', status: 'optimal' },
    { id: 2, name: 'South Campus Loop', buses: ['17'], stops: 6, distance: '8.3 km', duration: '25 min', status: 'optimal' },
    { id: 3, name: 'Downtown Express', buses: ['23'], stops: 10, distance: '15.7 km', duration: '45 min', status: 'needs optimization' },
    { id: 4, name: 'West Campus', buses: ['08'], stops: 7, distance: '9.8 km', duration: '30 min', status: 'inactive' },
    { id: 5, name: 'Medical Center', buses: ['15'], stops: 5, distance: '7.2 km', duration: '20 min', status: 'maintenance' },
  ];

  const complaints = [
    { id: 1, student: 'Emma Thompson', bus: '42', issue: 'AC not working', status: 'pending', priority: 'medium', date: '2023-10-15' },
    { id: 2, student: 'Michael Brown', bus: '17', issue: 'Bus consistently late', status: 'in progress', priority: 'high', date: '2023-10-14' },
    { id: 3, student: 'Sophia Martinez', bus: '23', issue: 'Rude driver behavior', status: 'resolved', priority: 'high', date: '2023-10-10' },
    { id: 4, student: 'Daniel Wilson', bus: '42', issue: 'Broken seat', status: 'pending', priority: 'low', date: '2023-10-13' },
    { id: 5, student: 'Olivia Johnson', bus: '17', issue: 'Missed pickup', status: 'resolved', priority: 'medium', date: '2023-10-09' },
  ];

  const payments = [
    { id: 1, student: 'Emma Thompson', amount: '$250', date: '2023-09-01', status: 'paid', method: 'Credit Card' },
    { id: 2, student: 'Michael Brown', amount: '$250', date: '2023-09-02', status: 'paid', method: 'Bank Transfer' },
    { id: 3, student: 'Sophia Martinez', amount: '$250', date: '', status: 'pending', method: '' },
    { id: 4, student: 'Daniel Wilson', amount: '$250', date: '2023-09-05', status: 'paid', method: 'Credit Card' },
    { id: 5, student: 'Olivia Johnson', amount: '$250', date: '', status: 'overdue', method: '' },
  ];

  const reports = [
    { id: 1, title: 'Monthly Ridership', type: 'ridership', period: 'October 2023', status: 'generated', date: '2023-11-01' },
    { id: 2, title: 'Fuel Consumption', type: 'fuel', period: 'Q3 2023', status: 'generated', date: '2023-10-15' },
    { id: 3, title: 'Delay Analysis', type: 'delays', period: 'September 2023', status: 'generated', date: '2023-10-05' },
    { id: 4, title: 'Route Efficiency', type: 'routes', period: 'Q3 2023', status: 'pending', date: '' },
    { id: 5, title: 'Maintenance Costs', type: 'maintenance', period: 'Q3 2023', status: 'generated', date: '2023-10-10' },
  ];

  // Sidebar navigation items
  const sidebarItems = [
    { title: 'Overview', icon: BarChart, action: () => setActiveTab('overview') },
    { title: 'Bus Fleet', icon: Bus, action: () => setActiveTab('buses') },
    { title: 'Drivers', icon: User, action: () => setActiveTab('drivers') },
    { title: 'Students', icon: Users, action: () => setActiveTab('students') },
    { title: 'Routes', icon: MapPin, action: () => setActiveTab('routes') },
    { title: 'Complaints', icon: MessageSquare, action: () => setActiveTab('complaints') },
    { title: 'Payments', icon: DollarSign, action: () => setActiveTab('payments') },
    { title: 'Reports', icon: FileText, action: () => setActiveTab('reports') },
    { title: 'Settings', icon: Settings, action: () => toast.info('Settings panel will be available soon') },
  ];

  const handleAlertAction = (alertId: number, action: string) => {
    if (action === 'resolve') {
      toast.success(`Alert #${alertId} has been resolved`);
    } else if (action === 'view') {
      toast.info(`Viewing details for alert #${alertId}`);
    } else if (action === 'respond') {
      toast.info(`Emergency response initiated for alert #${alertId}`);
    }
  };

  const handleDriverAction = (driverId: number, action: string) => {
    if (action === 'view') {
      toast.info(`Viewing driver profile #${driverId}`);
    } else if (action === 'contact') {
      toast.info(`Contacting driver #${driverId}`);
    } else if (action === 'edit') {
      toast.info(`Editing driver #${driverId}`);
    }
  };

  const handleStudentAction = (studentId: number, action: string) => {
    if (action === 'view') {
      toast.info(`Viewing student profile #${studentId}`);
    } else if (action === 'contact') {
      toast.info(`Contacting student #${studentId}`);
    } else if (action === 'edit') {
      toast.info(`Editing student #${studentId}`);
    }
  };

  const handleRouteAction = (routeId: number, action: string) => {
    if (action === 'view') {
      toast.info(`Viewing route details #${routeId}`);
    } else if (action === 'optimize') {
      toast.success(`Route #${routeId} optimization in progress`);
    } else if (action === 'edit') {
      toast.info(`Editing route #${routeId}`);
    }
  };

  const handleComplaintAction = (complaintId: number, action: string) => {
    if (action === 'view') {
      toast.info(`Viewing complaint details #${complaintId}`);
    } else if (action === 'resolve') {
      toast.success(`Complaint #${complaintId} marked as resolved`);
    } else if (action === 'assign') {
      toast.info(`Assigning complaint #${complaintId} to staff`);
    }
  };

  const handlePaymentAction = (paymentId: number, action: string) => {
    if (action === 'view') {
      toast.info(`Viewing payment details #${paymentId}`);
    } else if (action === 'send-reminder') {
      toast.success(`Payment reminder sent for ID #${paymentId}`);
    } else if (action === 'mark-paid') {
      toast.success(`Payment #${paymentId} marked as paid`);
    }
  };

  const handleReportAction = (reportId: number, action: string) => {
    if (action === 'view') {
      toast.info(`Viewing report #${reportId}`);
    } else if (action === 'download') {
      toast.success(`Downloading report #${reportId}`);
    } else if (action === 'generate') {
      toast.info(`Generating report #${reportId}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NavBar userType="admin" />
      
      <main className="pt-20 pb-12 px-4 md:px-8 flex-1">
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
          
          {/* Content Tabs */}
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList className="bg-white border border-gray-100 rounded-xl shadow-sm mb-2 p-1">
              <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
              <TabsTrigger value="buses" className="rounded-lg">Bus Fleet</TabsTrigger>
              <TabsTrigger value="drivers" className="rounded-lg">Drivers</TabsTrigger>
              <TabsTrigger value="students" className="rounded-lg">Students</TabsTrigger>
              <TabsTrigger value="routes" className="rounded-lg">Routes</TabsTrigger>
              <TabsTrigger value="complaints" className="rounded-lg">Complaints</TabsTrigger>
              <TabsTrigger value="payments" className="rounded-lg">Payments</TabsTrigger>
              <TabsTrigger value="reports" className="rounded-lg">Reports</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab Content */}
            <TabsContent value="overview" className="mt-0">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-8 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 className="font-medium text-gray-900">System Status</h3>
                  
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
                
                {selectedView === 'map' ? (
                  <div className="h-[500px]">
                    <MapView userType="admin" className="h-full" />
                  </div>
                ) : (
                  <div className="space-y-6 p-4">
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
                                       alert.type === 'maintenance' ? 'Maintenance' : 
                                       alert.type === 'sos' ? 'SOS Emergency' : 'Alert'}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {alert.time} · Bus #{alert.bus}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 mt-1">
                                    {alert.message}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  {alert.type === 'sos' && (
                                    <Button 
                                      variant="destructive" 
                                      size="sm" 
                                      className="text-xs"
                                      onClick={() => handleAlertAction(alert.id, 'respond')}
                                    >
                                      Respond
                                    </Button>
                                  )}
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-xs"
                                    onClick={() => handleAlertAction(alert.id, 'resolve')}
                                  >
                                    Resolve
                                  </Button>
                                </div>
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
                          { label: 'System Report', icon: <FileText size={16} /> },
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
                  
                  {/* Analytics Preview */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-semibold text-gray-900">Analytics Preview</h3>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setActiveTab('reports');
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
                </TabsContent>
                
                {/* Bus Fleet Tab Content */}
                <TabsContent value="buses" className="mt-0">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-semibold text-gray-900">Bus Fleet Management</h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.success("Adding new bus to fleet")}
                        >
                          <Bus className="h-4 w-4 mr-2" />
                          Add Bus
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="bg-brand-500 hover:bg-brand-600"
                          onClick={() => toast.success("Generating bus fleet report")}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Report
                        </Button>
                      </div>
                    </div>
                    
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
                                    onClick={() => toast.success(`Contacting driver of Bus #${bus.number}`)}
                                  >
                                    Contact
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8"
                                    onClick={() => toast.success(`Viewing details for Bus #${bus.number}`)}
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
                  </div>
                </TabsContent>
                
                {/* Drivers Tab Content */}
                <TabsContent value="drivers" className="mt-0">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-semibold text-gray-900">Driver Management</h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.success("Adding new driver")}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Add Driver
                        </Button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">License</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Phone</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rating</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total Trips</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {drivers.map((driver) => (
                            <tr key={driver.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{driver.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{driver.license}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{driver.phone}</td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex items-center">
                                  <span className="text-amber-500 mr-1">{driver.rating}</span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <svg key={i} className={`w-3 h-3 ${i < Math.floor(driver.rating) ? 'text-amber-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <span className={cn(
                                  "px-2 py-1 text-xs font-medium rounded-full",
                                  driver.status === 'active' && "bg-green-100 text-green-700",
                                  driver.status === 'inactive' && "bg-gray-100 text-gray-700",
                                  driver.status === 'on leave' && "bg-blue-100 text-blue-700",
                                )}>
                                  {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">{driver.trips}</td>
                              <td className="px-4 py-3 text-sm text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 text-brand-500"
                                    onClick={() => handleDriverAction(driver.id, 'contact')}
                                  >
                                    Contact
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8"
                                    onClick={() => handleDriverAction(driver.id, 'view')}
                                  >
                                    View
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Students Tab Content */}
                <TabsContent value="students" className="mt-0">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-semibold text-gray-900">Student Management</h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.success("Adding new student")}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Add Student
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.success("Importing student data")}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Import Data
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Input 
                          placeholder="Search students..." 
                          className="w-80"
                        />
                        <Button variant="ghost" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Bus #</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pickup Point</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Payment</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{student.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{student.studentId}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{student.bus}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{student.pickupPoint}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className={cn(
                                  "px-2 py-1 text-xs font-medium rounded-full",
                                  student.status === 'active' && "bg-green-100 text-green-700",
                                  student.status === 'inactive' && "bg-gray-100 text-gray-700",
                                )}>
                                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <span className={cn(
                                  "px-2 py-1 text-xs font-medium rounded-full",
                                  student.paymentStatus === 'paid' && "bg-green-100 text-green-700",
                                  student.paymentStatus === 'pending' && "bg-amber-100 text-amber-700",
                                  student.paymentStatus === 'overdue' && "bg-red-100 text-red-700",
                                )}>
                                  {student.paymentStatus.charAt(0).toUpperCase() + student.paymentStatus.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 text-brand-500"
                                    onClick={() => handleStudentAction(student.id, 'contact')}
                                  >
                                    Contact
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8"
                                    onClick={() => handleStudentAction(student.id, 'view')}
                                  >
                                    View
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Routes Tab Content */}
                <TabsContent value="routes" className="mt-0">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-semibold text-gray-900">Route Management</h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.success("Creating new route")}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Add Route
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="bg-brand-500 hover:bg-brand-600"
                          onClick={() => toast.success("Running route optimization")}
                        >
                          Optimize All Routes
                        </Button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Route Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Assigned Buses</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Stops</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Distance</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Duration</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {routes.map((route) => (
                            <tr key={route.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{route.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {route.buses.map(bus => (
                                  <Badge key={bus} variant="outline" className="mr-1">Bus #{bus}</Badge>
                                ))}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">{route.stops}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{route.distance}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{route.duration}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className={cn(
                                  "px-2 py-1 text-xs font-medium rounded-full",
                                  route.status === 'optimal' && "bg-green-100 text-green-700",
                                  route.status === 'needs optimization' && "bg-amber-100 text-amber-700",
                                  route.status === 'inactive' && "bg-gray-100 text-gray-700",
                                  route.status === 'maintenance' && "bg-red-100 text-red-700",
                                )}>
                                  {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-right">
                                <div className="flex justify-end gap-2">
                                  {route.status === 'needs optimization' && (
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="h-8 text-brand-500"
                                      onClick={() => handleRouteAction(route.id, 'optimize')}
                                    >
                                      Optimize
                                    </Button>
                                  )}
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8"
                                    onClick={() => handleRouteAction(route.id, 'view')}
                                  >
                                    View
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Complaints Tab Content */}
                <TabsContent value="complaints" className="mt-0">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-semibold text-gray-900">Complaint Management</h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.success("Assigning all pending tickets")}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Assign All
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="bg-brand-500 hover:bg-brand-600"
                          onClick={() => toast.success("Generating complaints report")}
                        >
                          Generate Report
                        </Button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Student</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Bus #</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Issue</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Priority</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {complaints.map((complaint) => (
                            <tr key={complaint.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{complaint.student}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{complaint.bus}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{complaint.issue}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className={cn(
                                  "px-2 py-1 text-xs font-medium rounded-full",
                                  complaint.status === 'resolved' && "bg-green-100 text-green-700",
                                  complaint.status === 'pending' && "bg-amber-100 text-amber-700",
                                  complaint.status === 'in progress' && "bg-blue-100 text-blue-700",
                                )}>
                                  {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <span className={cn(
                                  "px-2 py-1 text-xs font-medium rounded-full",
                                  complaint.priority === 'low' && "bg-gray-100 text-gray-700",
                                  complaint.priority === 'medium' && "bg-amber-100 text-amber-700",
                                  complaint.priority === 'high' && "bg-red-100 text-red-700",
                                )}>
                                  {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">{complaint.date}</td>
                              <td className="px-4 py-3 text-sm text-right">
                                <div className="flex justify-end gap-2">
                                  {complaint.status !== 'resolved' && (
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="h-8 text-green-600"
                                      onClick={() => handleComplaintAction(complaint.id, 'resolve')}
                                    >
                                      Resolve
                                    </Button>
                                  )}
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8"
                                    onClick={() => handleComplaintAction(complaint.id, 'view')}
                                  >
                                    View
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Payments Tab Content */}
                <TabsContent value="payments" className="mt-0">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-semibold text-gray-900">Payment Tracking</h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.success("Sending reminders to all overdue students")}
                        >
                          <Bell className="h-4 w-4 mr-2" />
                          Send Reminders
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="bg-brand-500 hover:bg-brand-600"
                          onClick={() => toast.success("Generating payment report")}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Report
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <DashboardCard
                        title="Total Collected"
                        value="$750"
                        trend={5}
                        trendLabel="vs. last month"
                        icon={<DollarSign size={18} />}
                        className="col-span-1"
                      />
                      <DashboardCard
                        title="Pending Payments"
                        value="$500"
                        icon={<Clock size={18} />}
                        className="col-span-1"
                      />
                      <DashboardCard
                        title="Payment Rate"
                        value="60%"
                        trend={-5}
                        trendLabel="needs attention"
                        icon={<BarChart size={18} />}
                        className="col-span-1"
                      />
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Student</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Payment Method</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {payments.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{payment.student}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{payment.amount}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{payment.date || '—'}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className={cn(
                                  "px-2 py-1 text-xs font-medium rounded-full",
                                  payment.status === 'paid' && "bg-green-100 text-green-700",
                                  payment.status === 'pending' && "bg-amber-100 text-amber-700",
                                  payment.status === 'overdue' && "bg-red-100 text-red-700",
                                )}>
                                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">{payment.method || '—'}</td>
                              <td className="px-4 py-3 text-sm text-right">
                                <div className="flex justify-end gap-2">
                                  {(payment.status === 'pending' || payment.status === 'overdue') && (
                                    <>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="h-8 text-green-600"
                                        onClick={() => handlePaymentAction(payment.id, 'mark-paid')}
                                      >
                                        Mark Paid
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-8 text-amber-600"
                                        onClick={() => handlePaymentAction(payment.id, 'send-reminder')}
                                      >
                                        Remind
                                      </Button>
                                    </>
                                  )}
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8"
                                    onClick={() => handlePaymentAction(payment.id, 'view')}
                                  >
                                    View
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Reports Tab Content */}
                <TabsContent value="reports" className="mt-0">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-semibold text-gray-900">Reports & Analytics</h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.success("Creating new custom report")}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Create Report
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-4">Ridership Trends</h4>
                        <div className="h-64 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-sm text-gray-600 mb-2">Monthly ridership visualization</div>
                            <div className="flex space-x-4 justify-center">
                              <div className="flex flex-col items-center">
                                <div className="h-40 w-10 bg-gradient-to-t from-brand-600 to-brand-300 rounded-t-md relative overflow-hidden">
                                  <div className="absolute bottom-0 w-full h-[60%] bg-brand-500"></div>
                                </div>
                                <span className="text-xs mt-2">Aug</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="h-40 w-10 bg-gradient-to-t from-brand-600 to-brand-300 rounded-t-md relative overflow-hidden">
                                  <div className="absolute bottom-0 w-full h-[70%] bg-brand-500"></div>
                                </div>
                                <span className="text-xs mt-2">Sep</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="h-40 w-10 bg-gradient-to-t from-brand-600 to-brand-300 rounded-t-md relative overflow-hidden">
                                  <div className="absolute bottom-0 w-full h-[85%] bg-brand-500"></div>
                                </div>
                                <span className="text-xs mt-2">Oct</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-4">Fuel Efficiency</h4>
                        <div className="h-64 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-sm text-gray-600 mb-2">Fuel usage by route</div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 bg-white rounded-lg shadow-sm">
                                <div className="text-xs text-gray-600 mb-1">North Campus</div>
                                <div className="font-medium">10.8 mpg</div>
                                <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                                  <div className="h-2 bg-green-500 rounded-full" style={{width: '85%'}}></div>
                                </div>
                              </div>
                              <div className="p-3 bg-white rounded-lg shadow-sm">
                                <div className="text-xs text-gray-600 mb-1">South Campus</div>
                                <div className="font-medium">11.2 mpg</div>
                                <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                                  <div className="h-2 bg-green-500 rounded-full" style={{width: '90%'}}></div>
                                </div>
                              </div>
                              <div className="p-3 bg-white rounded-lg shadow-sm">
                                <div className="text-xs text-gray-600 mb-1">Downtown</div>
                                <div className="font-medium">9.5 mpg</div>
                                <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                                  <div className="h-2 bg-amber-500 rounded-full" style={{width: '65%'}}></div>
                                </div>
                              </div>
                              <div className="p-3 bg-white rounded-lg shadow-sm">
                                <div className="text-xs text-gray-600 mb-1">West Campus</div>
                                <div className="font-medium">10.2 mpg</div>
                                <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                                  <div className="h-2 bg-green-500 rounded-full" style={{width: '80%'}}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-4">Available Reports</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Report Title</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Period</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Generated On</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {reports.map((report) => (
                            <tr key={report.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{report.title}</td>
                              <td className="px-4 py-3 text-sm text-gray-600 capitalize">{report.type}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{report.period}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className={cn(
                                  "px-2 py-1 text-xs font-medium rounded-full",
                                  report.status === 'generated' && "bg-green-100 text-green-700",
                                  report.status === 'pending' && "bg-amber-100 text-amber-700",
                                )}>
                                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">{report.date || '—'}</td>
                              <td className="px-4 py-3 text-sm text-right">
                                <div className="flex justify-end gap-2">
                                  {report.status === 'generated' ? (
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="h-8"
                                      onClick={() => handleReportAction(report.id, 'download')}
                                    >
                                      Download
                                    </Button>
                                  ) : (
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="h-8"
                                      onClick={() => handleReportAction(report.id, 'generate')}
                                    >
                                      Generate
                                    </Button>
                                  )}
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8"
                                    onClick={() => handleReportAction(report.id, 'view')}
                                  >
                                    View
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
