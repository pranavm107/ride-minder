import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone,
  FileText,
  Calendar,
  Filter,
  Download
} from 'lucide-react';

interface SOSHistoryProps {
  studentData: any;
}

const SOSHistory = ({ studentData }: SOSHistoryProps) => {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  // Mock SOS data
  const sosAlerts = [
    {
      id: 'SOS001',
      date: '2025-01-05',
      time: '2:45 PM',
      location: 'Ring Road, Near Rajouri Garden',
      coordinates: { lat: 28.6414, lng: 77.1206 },
      type: 'Manual SOS',
      status: 'Resolved',
      priority: 'High',
      description: 'Student pressed SOS button due to feeling unwell during journey',
      resolution: 'Driver contacted parents and school. Medical attention provided at school.',
      responseTime: '3 minutes',
      resolvedBy: 'Admin Team',
      resolvedAt: '2:48 PM'
    },
    {
      id: 'SOS002',
      date: '2024-12-15',
      time: '8:30 AM',
      location: 'Main Road, Pitampura',
      coordinates: { lat: 28.6942, lng: 77.1314 },
      type: 'Route Deviation Alert',
      status: 'Resolved',
      priority: 'Medium',
      description: 'Cab deviated from assigned route due to road blockage',
      resolution: 'Driver took alternate route with admin approval. Parents notified.',
      responseTime: '2 minutes',
      resolvedBy: 'Route Manager',
      resolvedAt: '8:32 AM'
    },
    {
      id: 'SOS003',
      date: '2024-11-28',
      time: '5:15 PM',
      location: 'University Area, DTU',
      coordinates: { lat: 28.7501, lng: 77.1177 },
      type: 'Emergency Contact',
      status: 'Resolved',
      priority: 'High',
      description: 'Student missed the cab and requested emergency pickup',
      resolution: 'Alternative transport arranged. Student reached home safely.',
      responseTime: '5 minutes',
      resolvedBy: 'Emergency Response Team',
      resolvedAt: '5:20 PM'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Resolved</Badge>;
      case 'Active':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Active</Badge>;
      case 'In Progress':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">In Progress</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">High Priority</Badge>;
      case 'Medium':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Medium Priority</Badge>;
      case 'Low':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Low Priority</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Manual SOS':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'Route Deviation Alert':
        return <MapPin className="h-5 w-5 text-orange-600" />;
      case 'Emergency Contact':
        return <Phone className="h-5 w-5 text-blue-600" />;
      default:
        return <Shield className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* SOS Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total SOS Events</p>
                <p className="text-2xl font-bold text-green-800">{sosAlerts.length}</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Resolved</p>
                <p className="text-2xl font-bold text-blue-800">{sosAlerts.filter(a => a.status === 'Resolved').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Avg Response Time</p>
                <p className="text-2xl font-bold text-orange-800">3.3 min</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">This Month</p>
                <p className="text-2xl font-bold text-purple-800">0</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Status Alert */}
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-700">
          <strong>Good News!</strong> No SOS alerts have been triggered this month. Your child's journeys have been safe and secure.
        </AlertDescription>
      </Alert>

      {/* SOS History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            SOS Alert History for {studentData.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {sosAlerts.length > 0 ? (
            <div className="space-y-4">
              {sosAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedAlert(alert)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(alert.type)}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{alert.type}</h4>
                          {getPriorityBadge(alert.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {alert.date} at {alert.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Resolved in {alert.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(alert.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-700 mb-2">No SOS Alerts</h3>
              <p className="text-muted-foreground">
                Great news! No emergency alerts have been triggered for {studentData.name}.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SOS Alert Detail Modal/Card */}
      {selectedAlert && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Alert Details - {selectedAlert.id}
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedAlert(null)}
            >
              Close
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Alert Type</p>
                  <p className="font-medium">{selectedAlert.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                  <p className="font-medium">{selectedAlert.date} at {selectedAlert.time}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedAlert.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                  <p className="font-medium text-green-600">{selectedAlert.responseTime}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  {getStatusBadge(selectedAlert.status)}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Priority</p>
                  {getPriorityBadge(selectedAlert.priority)}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved By</p>
                  <p className="font-medium">{selectedAlert.resolvedBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved At</p>
                  <p className="font-medium">{selectedAlert.resolvedAt}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p className="text-sm bg-card p-3 rounded-lg border">{selectedAlert.description}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Resolution</p>
              <p className="text-sm bg-green-50 p-3 rounded-lg border border-green-200 text-green-700">
                {selectedAlert.resolution}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emergency Contact Information */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Phone className="h-5 w-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-red-800">School Emergency</p>
                <p className="text-sm text-red-600">+91 11 2345 6789</p>
              </div>
              <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-red-800">Transport Helpline</p>
                <p className="text-sm text-red-600">+91 98765 43210</p>
              </div>
              <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOSHistory;