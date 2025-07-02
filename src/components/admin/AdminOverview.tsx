
import React from 'react';
import { Users, Bus, MapPin, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const AdminOverview = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '2,847',
      trend: 12,
      trendLabel: 'from last month',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Buses',
      value: '24',
      trend: 8,
      trendLabel: 'new buses added',
      icon: <Bus className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Routes',
      value: '18',
      trend: 0,
      trendLabel: 'no change',
      icon: <MapPin className="h-6 w-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Alerts',
      value: '3',
      trend: -40,
      trendLabel: 'resolved this week',
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
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            trendLabel={stat.trendLabel}
            icon={stat.icon}
            className={stat.color}
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
  );
};

export default AdminOverview;
