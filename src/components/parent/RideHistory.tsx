
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle2, XCircle, Clock, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

const rideHistoryData = [
  {
    date: '2024-01-15',
    morning: { status: 'completed', time: '7:45 AM', route: 'Main St → Campus' },
    evening: { status: 'completed', time: '3:30 PM', route: 'Campus → Main St' }
  },
  {
    date: '2024-01-14',
    morning: { status: 'completed', time: '7:48 AM', route: 'Main St → Campus' },
    evening: { status: 'skipped', time: '—', route: 'Campus → Main St' }
  },
  {
    date: '2024-01-13',
    morning: { status: 'missed', time: '—', route: 'Main St → Campus' },
    evening: { status: 'completed', time: '3:35 PM', route: 'Campus → Main St' }
  },
  {
    date: '2024-01-12',
    morning: { status: 'completed', time: '7:42 AM', route: 'Main St → Campus' },
    evening: { status: 'completed', time: '3:28 PM', route: 'Campus → Main St' }
  },
  {
    date: '2024-01-11',
    morning: { status: 'completed', time: '7:50 AM', route: 'Main St → Campus' },
    evening: { status: 'completed', time: '3:32 PM', route: 'Campus → Main St' }
  },
  {
    date: '2024-01-10',
    morning: { status: 'completed', time: '7:46 AM', route: 'Main St → Campus' },
    evening: { status: 'completed', time: '3:30 PM', route: 'Campus → Main St' }
  },
  {
    date: '2024-01-09',
    morning: { status: 'completed', time: '7:44 AM', route: 'Main St → Campus' },
    evening: { status: 'completed', time: '3:29 PM', route: 'Campus → Main St' }
  }
];

const RideHistory = ({ onClose }: { onClose: () => void }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7days' | '30days'>('7days');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={16} className="text-green-600" />;
      case 'missed': return <XCircle size={16} className="text-red-600" />;
      case 'skipped': return <Clock size={16} className="text-amber-600" />;
      default: return <Clock size={16} className="text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "text-xs font-medium px-2 py-1 rounded-full";
    switch (status) {
      case 'completed': return `${baseClasses} bg-green-100 text-green-700`;
      case 'missed': return `${baseClasses} bg-red-100 text-red-700`;
      case 'skipped': return `${baseClasses} bg-amber-100 text-amber-700`;
      default: return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  const getStatistics = () => {
    const totalRides = rideHistoryData.length * 2; // morning + evening
    const completedRides = rideHistoryData.reduce((acc, day) => {
      return acc + (day.morning.status === 'completed' ? 1 : 0) + (day.evening.status === 'completed' ? 1 : 0);
    }, 0);
    const missedRides = rideHistoryData.reduce((acc, day) => {
      return acc + (day.morning.status === 'missed' ? 1 : 0) + (day.evening.status === 'missed' ? 1 : 0);
    }, 0);
    const skippedRides = rideHistoryData.reduce((acc, day) => {
      return acc + (day.morning.status === 'skipped' ? 1 : 0) + (day.evening.status === 'skipped' ? 1 : 0);
    }, 0);

    return { totalRides, completedRides, missedRides, skippedRides };
  };

  const stats = getStatistics();
  const attendanceRate = Math.round((stats.completedRides / stats.totalRides) * 100);

  return (
    <div className="space-y-6 p-6">
      {/* Header with Statistics */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{attendanceRate}%</div>
            <div className="text-xs text-gray-600">Attendance Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{stats.completedRides}</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{stats.missedRides}</div>
            <div className="text-xs text-gray-600">Missed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-600">{stats.skippedRides}</div>
            <div className="text-xs text-gray-600">Skipped</div>
          </div>
        </div>
      </div>

      {/* Period Selector and Export */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={selectedPeriod === '7days' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('7days')}
          >
            Last 7 Days
          </Button>
          <Button
            variant={selectedPeriod === '30days' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('30days')}
          >
            Last 30 Days
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Download size={16} className="mr-2" />
          Export
        </Button>
      </div>

      {/* Ride History Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 flex items-center gap-2">
            <Calendar size={16} />
            Daily Ride History
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {rideHistoryData.map((day, index) => (
            <div key={day.date} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-32">
                  <div className="font-medium text-gray-900">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {index === 0 ? 'Today' : index === 1 ? 'Yesterday' : ''}
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Morning Ride */}
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(day.morning.status)}
                      <span className="font-medium text-sm">Morning</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{day.morning.route}</div>
                      <div className="text-xs text-gray-600">{day.morning.time}</div>
                    </div>
                    <Badge className={getStatusBadge(day.morning.status)}>
                      {day.morning.status}
                    </Badge>
                  </div>
                  
                  {/* Evening Ride */}
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(day.evening.status)}
                      <span className="font-medium text-sm">Evening</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{day.evening.route}</div>
                      <div className="text-xs text-gray-600">{day.evening.time}</div>
                    </div>
                    <Badge className={getStatusBadge(day.evening.status)}>
                      {day.evening.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Status Legend</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600" />
            <span><strong>Completed:</strong> Student boarded and completed the ride</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle size={16} className="text-red-600" />
            <span><strong>Missed:</strong> Student was absent from the pickup point</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-amber-600" />
            <span><strong>Skipped:</strong> Student chose not to take the bus</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideHistory;
