import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, AlertCircle } from 'lucide-react';

interface GuestStudent {
  id: string;
  name: string;
  registerNumber: string;
  pickupPoint: string;
  timeBooked: string;
  rideType: 'morning' | 'evening';
  seatNumber: number;
}

interface SeatMapProps {
  totalSeats: number;
  assignedSeats: number[];
  guestSeats: number[];
}

const SeatMap = ({ totalSeats, assignedSeats, guestSeats }: SeatMapProps) => {
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);
  
  const getSeatStatus = (seatNumber: number) => {
    if (assignedSeats.includes(seatNumber)) return 'assigned';
    if (guestSeats.includes(seatNumber)) return 'guest';
    return 'empty';
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-green-100 text-green-700 border-green-300';
      case 'guest': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
          <span>Assigned Student</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
          <span>Guest Student</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted border border-border"></div>
          <span>Empty Seat</span>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 max-w-xs">
        {seats.map((seatNumber) => {
          const status = getSeatStatus(seatNumber);
          return (
            <div
              key={seatNumber}
              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-colors ${getSeatColor(status)}`}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface GuestStudentsSectionProps {
  currentTripStatus: 'inactive' | 'active';
}

const GuestStudentsSection = ({ currentTripStatus }: GuestStudentsSectionProps) => {
  const guestStudents: GuestStudent[] = [
    {
      id: 'G001',
      name: 'Rahul Kumar',
      registerNumber: '21CS1034',
      pickupPoint: 'Main Gate',
      timeBooked: '08:30 AM',
      rideType: 'morning',
      seatNumber: 15
    },
    {
      id: 'G002',
      name: 'Priya Sharma',
      registerNumber: '21EC1045',
      pickupPoint: 'Library Stop',
      timeBooked: '08:45 AM',
      rideType: 'morning',
      seatNumber: 18
    },
    {
      id: 'G003',
      name: 'Amit Patel',
      registerNumber: '21ME1056',
      pickupPoint: 'Canteen Area',
      timeBooked: '04:15 PM',
      rideType: 'evening',
      seatNumber: 22
    }
  ];

  const assignedSeats = [1, 3, 5, 7, 9, 11, 13, 16, 19, 21, 23, 25, 27, 29]; // Mock assigned student seats
  const guestSeats = guestStudents.map(student => student.seatNumber);
  const totalSeats = 30;

  const todayGuestStudents = guestStudents.filter(student => 
    (currentTripStatus === 'active') || 
    (currentTripStatus === 'inactive' && student.rideType === 'morning')
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Guest Students List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users size={20} />
              Guest Students Today
            </CardTitle>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              {todayGuestStudents.length} Guest{todayGuestStudents.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {todayGuestStudents.length > 0 ? (
            <div className="space-y-4">
              {todayGuestStudents.map((student) => (
                <div key={student.id} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">Reg: {student.registerNumber}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        {student.pickupPoint}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        Seat {student.seatNumber}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{student.timeBooked}</p>
                      <Badge 
                        variant={student.rideType === 'morning' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        {student.rideType === 'morning' ? 'Morning' : 'Evening'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              
              {currentTripStatus === 'active' && (
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <AlertCircle size={16} className="mr-2" />
                    Alert if Student Missing
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p>No guest students booked for today</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cab Seat Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cab Seat Map - Route #248</CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{assignedSeats.length} Assigned</span>
            <span>{guestSeats.length} Guest</span>
            <span>{totalSeats - assignedSeats.length - guestSeats.length} Available</span>
          </div>
        </CardHeader>
        <CardContent>
          <SeatMap 
            totalSeats={totalSeats}
            assignedSeats={assignedSeats}
            guestSeats={guestSeats}
          />
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Seat Utilization</span>
              <span className="text-muted-foreground">
                {Math.round(((assignedSeats.length + guestSeats.length) / totalSeats) * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${((assignedSeats.length + guestSeats.length) / totalSeats) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestStudentsSection;