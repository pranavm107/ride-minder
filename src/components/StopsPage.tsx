
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, User, CheckCircle, X, AlertTriangle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useDeviceInfo } from '@/hooks/use-mobile';
import { Stop, Student, useRouteStops } from '@/hooks/use-route-stops';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StopsPage = () => {
  const { isMobile, isTouch } = useDeviceInfo();
  const navigate = useNavigate();
  const { 
    stops, 
    updateStudentStatus, 
    markStopAsCompleted, 
    currentStop 
  } = useRouteStops();

  const handleMarkSkipped = (stopId: number, studentId: number) => {
    updateStudentStatus(stopId, studentId, 'skipped');
    toast.info("Student marked as skipped");
  };
  
  const handleMarkBoarded = (stopId: number, studentId: number) => {
    updateStudentStatus(stopId, studentId, 'boarded');
    toast.success("Student marked as boarded");
  };

  const handleCompleteStop = (stopId: number) => {
    markStopAsCompleted(stopId);
    toast.success("Stop completed, proceeding to next stop");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const StudentStatusBadge = ({ status }: { status: Student['status'] }) => (
    <span className={cn(
      "text-xs px-2 py-0.5 rounded-full",
      status === 'boarded' && "bg-green-100 text-green-700",
      status === 'waiting' && "bg-blue-100 text-blue-700",
      status === 'canceled' && "bg-gray-100 text-gray-700 line-through",
      status === 'skipped' && "bg-amber-100 text-amber-700",
    )}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  if (isMobile) {
    return (
      <div className="space-y-4 p-4">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="mr-2"
            onClick={handleGoBack}
          >
            <ArrowLeft size={20} />
          </Button>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin size={20} className="text-brand-500" />
            Route Stops
          </h2>
        </div>
        
        {currentStop && (
          <Card className="border-brand-100 bg-brand-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Current Stop: {currentStop.name}</span>
                <Clock size={16} className="text-brand-500" />
              </CardTitle>
              <p className="text-sm text-gray-600">{currentStop.time}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mt-2">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <User size={14} /> Passengers ({currentStop.students.length})
                </h3>
                
                {currentStop.students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <StudentStatusBadge status={student.status} />
                    </div>
                    
                    {student.status === 'waiting' && (
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 px-2 text-xs"
                          onClick={() => handleMarkSkipped(currentStop.id, student.id)}
                        >
                          <X size={14} className="mr-1" /> Skip
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="h-8 px-2 text-xs bg-green-600 hover:bg-green-700"
                          onClick={() => handleMarkBoarded(currentStop.id, student.id)}
                        >
                          <CheckCircle size={14} className="mr-1" /> Board
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                
                <Button 
                  variant="default" 
                  className="w-full mt-4 bg-brand-500 hover:bg-brand-600"
                  onClick={() => handleCompleteStop(currentStop.id)}
                >
                  Complete Stop & Proceed
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <h3 className="text-md font-medium mt-4 mb-2">Upcoming Stops</h3>
        <div className="space-y-3">
          {stops.filter(stop => stop.status === 'upcoming').map((stop) => (
            <Card key={stop.id}>
              <CardHeader className="py-3 px-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{stop.name}</CardTitle>
                  <span className="text-sm text-gray-500">{stop.time}</span>
                </div>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <User size={14} className="mr-1" /> 
                    {stop.studentsCount} passengers
                  </div>
                  
                  <div className="text-sm">
                    {stop.students.some(s => s.status === 'skipped') && (
                      <span className="flex items-center text-amber-600">
                        <AlertTriangle size={14} className="mr-1" /> 
                        {stop.students.filter(s => s.status === 'skipped').length} skipped
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <h3 className="text-md font-medium mt-4 mb-2">Completed Stops</h3>
        <div className="space-y-2">
          {stops.filter(stop => stop.status === 'completed').map((stop) => (
            <div key={stop.id} className="p-2 border border-gray-100 rounded-lg bg-gray-50 flex justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span className="font-medium">{stop.name}</span>
              </div>
              <span className="text-sm text-gray-500">{stop.time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleGoBack}
          >
            <ArrowLeft size={20} />
          </Button>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin size={24} className="text-brand-500" />
            Route Stops
          </h2>
        </div>
      </div>
      
      {currentStop && (
        <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Current Stop: {currentStop.name}</h3>
              <p className="text-gray-600">{currentStop.time}</p>
            </div>
            
            <Button 
              variant="default" 
              className="bg-brand-500 hover:bg-brand-600"
              onClick={() => handleCompleteStop(currentStop.id)}
            >
              Complete Stop & Proceed
            </Button>
          </div>
          
          <div className="mt-4">
            <h4 className="text-lg font-medium mb-4">Passengers</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStop.students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      <StudentStatusBadge status={student.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      {student.status === 'waiting' && (
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMarkSkipped(currentStop.id, student.id)}
                          >
                            Mark as Skipped
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleMarkBoarded(currentStop.id, student.id)}
                          >
                            Mark as Boarded
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Upcoming Stops</h3>
          <div className="space-y-4">
            {stops.filter(stop => stop.status === 'upcoming').map((stop) => (
              <Card key={stop.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{stop.name}</CardTitle>
                    <span className="text-gray-500">{stop.time}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <User size={18} />
                      <span>{stop.studentsCount} passengers</span>
                    </div>
                    
                    <div>
                      {stop.students.some(s => s.status === 'skipped') && (
                        <div className="flex items-center text-amber-600 gap-1">
                          <AlertTriangle size={16} /> 
                          {stop.students.filter(s => s.status === 'skipped').length} students skipped
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Completed Stops</h3>
          <div className="space-y-2">
            {stops.filter(stop => stop.status === 'completed').map((stop) => (
              <div key={stop.id} className="flex justify-between border border-gray-100 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" />
                  <span className="font-medium">{stop.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">{stop.time}</span>
                  <span className="text-green-600 text-sm font-medium">{stop.students.filter(s => s.status === 'boarded').length} boarded</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopsPage;
