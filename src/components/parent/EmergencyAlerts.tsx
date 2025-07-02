
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield, Eye, Phone, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const emergencyAlerts = [
  {
    id: 1,
    type: 'sos',
    severity: 'high',
    title: 'Emergency SOS Alert',
    message: 'SOS button pressed by student Alex Johnson',
    timestamp: '2024-01-15 08:15:32',
    status: 'resolved',
    location: 'Oak Street & 2nd Avenue',
    responseTime: '3 minutes'
  },
  {
    id: 2,
    type: 'stationary',
    severity: 'medium',
    title: 'Vehicle Stationary Alert',
    message: 'Bus has been stationary for 8 minutes',
    timestamp: '2024-01-14 15:42:18',
    status: 'resolved',
    location: 'Highway 101 Mile Marker 15',
    responseTime: '12 minutes'
  },
  {
    id: 3,
    type: 'driver-sos',
    severity: 'high',
    title: 'Driver Emergency Alert',
    message: 'Driver activated emergency protocol',
    timestamp: '2024-01-12 09:23:45',
    status: 'resolved',
    location: 'Campus Main Gate',
    responseTime: '2 minutes'
  }
];

const EmergencyAlerts = ({ onClose }: { onClose: () => void }) => {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);
  const [showLiveFeed, setShowLiveFeed] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sos': return <AlertTriangle size={16} className="text-red-600" />;
      case 'stationary': return <Clock size={16} className="text-amber-600" />;
      case 'driver-sos': return <Shield size={16} className="text-red-600" />;
      default: return <AlertTriangle size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Emergency Contacts */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-red-800 flex items-center gap-2 text-lg">
            <Phone size={18} />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-gray-900">Emergency Helpline</p>
                <p className="text-sm text-gray-600">24/7 Support</p>
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <Phone size={16} className="mr-1" />
                Call Now
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-gray-900">School Admin</p>
                <p className="text-sm text-gray-600">Office Hours</p>
              </div>
              <Button size="sm" variant="outline" className="border-red-200 text-red-600">
                <Phone size={16} className="mr-1" />
                Contact
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Safety Feed */}
      <Card className="border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-blue-800 flex items-center gap-2 text-lg">
            <Eye size={18} />
            Live Safety Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium text-blue-900">Bus Camera Feed</p>
              <p className="text-sm text-blue-700">View live feed from bus interior camera</p>
            </div>
            <Button 
              onClick={() => setShowLiveFeed(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Eye size={16} className="mr-2" />
              View Feed
            </Button>
          </div>
          
          {showLiveFeed && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-3">
                <div className="text-center text-white">
                  <Eye size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Live Feed Placeholder</p>
                  <p className="text-xs opacity-75">Camera feed would appear here</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">LIVE</span>
                </div>
                <Button size="sm" variant="outline" onClick={() => setShowLiveFeed(false)}>
                  Close Feed
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Alert History */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle size={18} />
            Emergency Alert History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emergencyAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    {getTypeIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 size={12} />
                          <span className="text-xs">Resolved</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span>📍 {alert.location}</span>
                      <span>🕒 {new Date(alert.timestamp).toLocaleString()}</span>
                      <span>⚡ Response: {alert.responseTime}</span>
                    </div>
                    
                    {selectedAlert === alert.id && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Alert Details</h5>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <strong>Status:</strong> 
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Resolved
                            </Badge>
                          </div>
                          <div><strong>Response Team:</strong> Campus Security & Local Emergency Services</div>
                          <div><strong>Action Taken:</strong> Immediate dispatch of emergency response team, student safety confirmed, incident documented.</div>
                          <div><strong>Follow-up:</strong> Safety protocols reviewed, additional training scheduled for driver.</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {emergencyAlerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Shield size={32} className="mx-auto mb-2 opacity-50" />
              <p>No emergency alerts to display</p>
              <p className="text-sm">This is a good thing! 🎉</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Safety Tips */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-800 flex items-center gap-2 text-lg">
            <Shield size={18} />
            Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-green-800">
            <p>• Teach your child how to use the emergency SOS button</p>
            <p>• Ensure your child knows your emergency contact number</p>
            <p>• Review safety protocols with your child regularly</p>
            <p>• Keep the emergency helpline number saved in your phone</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyAlerts;
