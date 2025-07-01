
export interface Bus {
  id: string;
  routeName: string;
  driverName: string;
  totalSeats: number;
  registeredStudents: string[];
  currentRide?: CurrentRide;
}

export interface CurrentRide {
  id: string;
  busId: string;
  date: string;
  time: string;
  type: 'morning' | 'evening';
  skippedStudents: string[];
  tempBookings: TempBooking[];
  availableSeats: number;
}

export interface TempBooking {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  requestTime: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  registeredBusId?: string;
  hasActiveBooking?: boolean;
}
