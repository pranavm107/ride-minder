
import React from 'react';
import { cn } from '@/lib/utils';
import { Bus, Calendar, Clock } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type TripHistoryProps = {
  className?: string;
};

const TripHistory = ({ className }: TripHistoryProps) => {
  // Sample trip history data
  const trips = [
    { 
      id: 1, 
      route: 'North Campus Express', 
      date: '2023-09-15', 
      startTime: '08:00 AM', 
      endTime: '10:30 AM',
      students: 28,
      stops: 6
    },
    { 
      id: 2, 
      route: 'Downtown Loop', 
      date: '2023-09-14', 
      startTime: '01:15 PM', 
      endTime: '03:45 PM',
      students: 32,
      stops: 8
    },
    { 
      id: 3, 
      route: 'South Campus Express', 
      date: '2023-09-13', 
      startTime: '08:00 AM', 
      endTime: '10:15 AM',
      students: 25,
      stops: 5
    },
    { 
      id: 4, 
      route: 'North Campus Express', 
      date: '2023-09-12', 
      startTime: '08:00 AM', 
      endTime: '10:30 AM',
      students: 30,
      stops: 6
    },
    { 
      id: 5, 
      route: 'Downtown Loop', 
      date: '2023-09-11', 
      startTime: '01:15 PM', 
      endTime: '03:30 PM',
      students: 29,
      stops: 8
    },
  ];

  return (
    <div className={cn('bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100', className)}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-brand-500" />
          Trip History
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          View your recent driving assignments and routes
        </p>
      </div>
      
      <div className="p-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell className="font-medium">{trip.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Bus size={16} className="text-brand-500" />
                      {trip.route}
                    </div>
                  </TableCell>
                  <TableCell>{trip.startTime}</TableCell>
                  <TableCell>{trip.endTime}</TableCell>
                  <TableCell>{trip.students}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-xs">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>
              Showing 5 most recent trips. View all trips in the Reports section.
            </TableCaption>
          </Table>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Total Trips:</span> 57
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripHistory;
