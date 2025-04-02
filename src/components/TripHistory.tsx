import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bus, Calendar, Clock, FileDown, Filter, ChevronDown, MapPin } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

type TripHistoryProps = {
  className?: string;
  userType?: 'student' | 'driver' | 'admin';
};

const TripHistory = ({ className, userType = 'driver' }: TripHistoryProps) => {
  const [filterMonth, setFilterMonth] = useState<string>("all");
  const [filterRoute, setFilterRoute] = useState<string>("all");
  const [expandedTripId, setExpandedTripId] = useState<number | null>(null);
  
  // Sample trip history data
  const trips = [
    { 
      id: 1, 
      route: 'North Campus Express', 
      date: '2023-09-15', 
      startTime: '08:00 AM', 
      endTime: '10:30 AM',
      students: 28,
      stops: 6,
      completed: true,
      driver: 'John Smith',
      startLocation: 'Main Terminal',
      endLocation: 'Science Building',
      stopDetails: [
        { name: 'Main Terminal', time: '08:00 AM', studentsBoarded: 10, studentsDropped: 0 },
        { name: 'Library', time: '08:15 AM', studentsBoarded: 5, studentsDropped: 2 },
        { name: 'Student Center', time: '08:30 AM', studentsBoarded: 8, studentsDropped: 3 },
        { name: 'Engineering Building', time: '08:45 AM', studentsBoarded: 3, studentsDropped: 5 },
        { name: 'Gym', time: '09:00 AM', studentsBoarded: 2, studentsDropped: 8 },
        { name: 'Science Building', time: '09:15 AM', studentsBoarded: 0, studentsDropped: 10 },
      ]
    },
    { 
      id: 2, 
      route: 'Downtown Loop', 
      date: '2023-09-14', 
      startTime: '01:15 PM', 
      endTime: '03:45 PM',
      students: 32,
      stops: 8,
      completed: true,
      driver: 'Maria Rodriguez',
      startLocation: 'Downtown Station',
      endLocation: 'Main Campus',
      stopDetails: [
        { name: 'Downtown Station', time: '01:15 PM', studentsBoarded: 12, studentsDropped: 0 },
        { name: 'City Hall', time: '01:30 PM', studentsBoarded: 5, studentsDropped: 3 },
        { name: 'Art Museum', time: '01:45 PM', studentsBoarded: 6, studentsDropped: 4 },
        { name: 'Central Park', time: '02:00 PM', studentsBoarded: 8, studentsDropped: 6 },
        { name: 'Main Campus', time: '02:15 PM', studentsBoarded: 1, studentsDropped: 19 },
      ]
    },
    { 
      id: 3, 
      route: 'South Campus Express', 
      date: '2023-09-13', 
      startTime: '08:00 AM', 
      endTime: '10:15 AM',
      students: 25,
      stops: 5,
      completed: true,
      driver: 'David Johnson',
      startLocation: 'South Terminal',
      endLocation: 'Business School',
      stopDetails: [
        { name: 'South Terminal', time: '08:00 AM', studentsBoarded: 9, studentsDropped: 0 },
        { name: 'Dorm Area', time: '08:15 AM', studentsBoarded: 7, studentsDropped: 2 },
        { name: 'Sports Complex', time: '08:30 AM', studentsBoarded: 5, studentsDropped: 4 },
        { name: 'Cafeteria', time: '08:45 AM', studentsBoarded: 4, studentsDropped: 6 },
        { name: 'Business School', time: '09:00 AM', studentsBoarded: 0, studentsDropped: 13 },
      ]
    },
    { 
      id: 4, 
      route: 'North Campus Express', 
      date: '2023-09-12', 
      startTime: '08:00 AM', 
      endTime: '10:30 AM',
      students: 30,
      stops: 6,
      completed: true,
      driver: 'John Smith',
      startLocation: 'Main Terminal',
      endLocation: 'Science Building',
      stopDetails: [
        { name: 'Main Terminal', time: '08:00 AM', studentsBoarded: 12, studentsDropped: 0 },
        { name: 'Library', time: '08:15 AM', studentsBoarded: 6, studentsDropped: 3 },
        { name: 'Student Center', time: '08:30 AM', studentsBoarded: 7, studentsDropped: 4 },
        { name: 'Engineering Building', time: '08:45 AM', studentsBoarded: 5, studentsDropped: 6 },
        { name: 'Gym', time: '09:00 AM', studentsBoarded: 0, studentsDropped: 17 },
      ]
    },
    { 
      id: 5, 
      route: 'Downtown Loop', 
      date: '2023-09-11', 
      startTime: '01:15 PM', 
      endTime: '03:30 PM',
      students: 29,
      stops: 8,
      completed: true,
      driver: 'Maria Rodriguez',
      startLocation: 'Downtown Station',
      endLocation: 'Main Campus',
      stopDetails: [
        { name: 'Downtown Station', time: '01:15 PM', studentsBoarded: 11, studentsDropped: 0 },
        { name: 'City Hall', time: '01:30 PM', studentsBoarded: 6, studentsDropped: 2 },
        { name: 'Art Museum', time: '01:45 PM', studentsBoarded: 5, studentsDropped: 5 },
        { name: 'Central Park', time: '02:00 PM', studentsBoarded: 7, studentsDropped: 8 },
        { name: 'Main Campus', time: '02:15 PM', studentsBoarded: 0, studentsDropped: 14 },
      ]
    },
  ];

  const routes = [...new Set(trips.map(trip => trip.route))];

  const handleViewDetails = (tripId: number) => {
    if (expandedTripId === tripId) {
      setExpandedTripId(null);
    } else {
      setExpandedTripId(tripId);
    }
  };

  const handleDownloadReport = () => {
    toast.success("Trip report downloaded successfully");
  };

  const handleExportCSV = () => {
    toast.success("Data exported to CSV format");
  };

  const filteredTrips = trips.filter(trip => {
    if (filterMonth !== "all") {
      const tripMonth = new Date(trip.date).getMonth() + 1;
      if (tripMonth !== parseInt(filterMonth)) return false;
    }
    
    if (filterRoute !== "all" && trip.route !== filterRoute) {
      return false;
    }
    
    return true;
  });

  return (
    <div className={cn('bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100', className)}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-brand-500" />
          Trip History
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          View your recent driving assignments and routes with detailed information
        </p>
      </div>
      
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 block mb-1">Filter by Month</label>
            <Select 
              value={filterMonth} 
              onValueChange={(value) => setFilterMonth(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 block mb-1">Filter by Route</label>
            <Select 
              value={filterRoute} 
              onValueChange={(value) => setFilterRoute(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Routes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Routes</SelectItem>
                {routes.map((route) => (
                  <SelectItem key={route} value={route}>
                    {route}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip) => (
                  <React.Fragment key={trip.id}>
                    <TableRow>
                      <TableCell className="font-medium">{trip.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Bus size={16} className="text-brand-500" />
                          {trip.route}
                        </div>
                      </TableCell>
                      <TableCell>{trip.startTime}</TableCell>
                      <TableCell>{trip.endTime}</TableCell>
                      <TableCell>
                        {(() => {
                          // Calculate trip duration
                          const startTime = new Date(`2023-01-01 ${trip.startTime}`);
                          const endTime = new Date(`2023-01-01 ${trip.endTime}`);
                          const durationMs = endTime.getTime() - startTime.getTime();
                          const hours = Math.floor(durationMs / (1000 * 60 * 60));
                          const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
                          return `${hours}h ${minutes}m`;
                        })()}
                      </TableCell>
                      <TableCell>{trip.students}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center gap-1"
                          onClick={() => handleViewDetails(trip.id)}
                        >
                          {expandedTripId === trip.id ? (
                            <>Hide Details</>
                          ) : (
                            <>View Details<ChevronDown size={14} /></>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                    
                    {/* Expanded trip details */}
                    {expandedTripId === trip.id && (
                      <TableRow>
                        <TableCell colSpan={7} className="bg-gray-50 p-0">
                          <div className="p-4">
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-900 mb-2">Trip Details</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div className="p-3 bg-white rounded-lg border border-gray-100">
                                  <span className="text-gray-500">Driver:</span>
                                  <span className="font-medium text-gray-900 ml-1">{trip.driver}</span>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-gray-100">
                                  <span className="text-gray-500">Start Location:</span>
                                  <span className="font-medium text-gray-900 ml-1">{trip.startLocation}</span>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-gray-100">
                                  <span className="text-gray-500">End Location:</span>
                                  <span className="font-medium text-gray-900 ml-1">{trip.endLocation}</span>
                                </div>
                              </div>
                            </div>
                            
                            <h4 className="font-medium text-gray-900 mb-2">Stop Details</h4>
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Stop Name</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Students Boarded</TableHead>
                                    <TableHead>Students Dropped</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {trip.stopDetails.map((stop, index) => (
                                    <TableRow key={index}>
                                      <TableCell>
                                        <div className="flex items-center gap-1">
                                          <MapPin size={14} className="text-gray-500" />
                                          {stop.name}
                                        </div>
                                      </TableCell>
                                      <TableCell>{stop.time}</TableCell>
                                      <TableCell>
                                        <span className="text-green-600">+{stop.studentsBoarded}</span>
                                      </TableCell>
                                      <TableCell>
                                        <span className="text-blue-600">-{stop.studentsDropped}</span>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                            
                            <div className="flex justify-end mt-4">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs flex items-center gap-1"
                                onClick={handleDownloadReport}
                              >
                                <FileDown size={14} />
                                Download Trip Report
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    No trips found matching the selected filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableCaption>
              Showing {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'}. 
              {filteredTrips.length !== trips.length && (
                <span> Filtered from {trips.length} total trips.</span>
              )}
            </TableCaption>
          </Table>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Total Trips:</span> {trips.length}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs flex items-center gap-1"
              onClick={handleExportCSV}
            >
              <FileDown size={14} />
              Export to CSV
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="text-xs bg-brand-500 hover:bg-brand-600"
              onClick={handleDownloadReport}
            >
              Download Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripHistory;
