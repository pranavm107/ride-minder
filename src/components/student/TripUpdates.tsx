
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface TripUpdate {
  id: number;
  time: string;
  location: string;
  status: 'completed' | 'current' | 'upcoming' | 'delayed';
  message: string;
}

const TripUpdates = () => {
  const updates: TripUpdate[] = [
    {
      id: 1,
      time: '07:30 AM',
      location: 'Departure Terminal',
      status: 'completed',
      message: 'Bus departed on time'
    },
    {
      id: 2,
      time: '07:45 AM',
      location: 'Main Street Library',
      status: 'completed',
      message: 'Student pickup completed'
    },
    {
      id: 3,
      time: '08:15 AM',
      location: 'Oak Street Junction',
      status: 'current',
      message: 'Currently at this location'
    },
    {
      id: 4,
      time: '08:30 AM',
      location: 'Science Center',
      status: 'upcoming',
      message: 'Next stop'
    },
    {
      id: 5,
      time: '08:45 AM',
      location: 'Campus Main Gate',
      status: 'upcoming',
      message: 'Final destination'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'current':
        return <MapPin className="h-4 w-4 text-blue-600" />;
      case 'delayed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'current':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Current</Badge>;
      case 'delayed':
        return <Badge variant="destructive">Delayed</Badge>;
      default:
        return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Trip Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {updates.map((update, index) => (
            <div key={update.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                  {getStatusIcon(update.status)}
                </div>
                {index < updates.length - 1 && (
                  <div className="w-px h-8 bg-gray-200 mt-2"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{update.location}</p>
                  {getStatusBadge(update.status)}
                </div>
                <p className="text-xs text-gray-500 mb-1">{update.time}</p>
                <p className="text-sm text-gray-600">{update.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripUpdates;
