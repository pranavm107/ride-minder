
import { useState, useEffect } from 'react';
import { Bus, CurrentRide, TempBooking } from '@/types/rides';

// Mock data for demonstration - replace with actual API calls
const mockBuses: Bus[] = [
  {
    id: 'bus-1',
    routeName: 'Route A - Main Campus to Downtown',
    driverName: 'John Smith',
    totalSeats: 60,
    registeredStudents: Array.from({ length: 45 }, (_, i) => `student-${i + 1}`),
    currentRide: {
      id: 'ride-1',
      busId: 'bus-1',
      date: new Date().toISOString().split('T')[0],
      time: '08:00',
      type: 'morning',
      skippedStudents: ['student-5', 'student-12', 'student-23', 'student-31'],
      tempBookings: [],
      availableSeats: 4
    }
  },
  {
    id: 'bus-2',
    routeName: 'Route B - North Campus to City Center',
    driverName: 'Sarah Johnson',
    totalSeats: 45,
    registeredStudents: Array.from({ length: 42 }, (_, i) => `student-${i + 46}`),
    currentRide: {
      id: 'ride-2',
      busId: 'bus-2',
      date: new Date().toISOString().split('T')[0],
      time: '08:15',
      type: 'morning',
      skippedStudents: ['student-47', 'student-52'],
      tempBookings: [],
      availableSeats: 2
    }
  }
];

export const useAvailableRides = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchRides = async () => {
      try {
        setLoading(true);
        // In real implementation, this would be an API call
        setTimeout(() => {
          setBuses(mockBuses);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch available rides');
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const requestSeat = async (busId: string, studentInfo: { name: string; email: string }) => {
    try {
      const newBooking: TempBooking = {
        id: `booking-${Date.now()}`,
        studentId: `temp-${Date.now()}`,
        studentName: studentInfo.name,
        studentEmail: studentInfo.email,
        requestTime: new Date().toISOString(),
        status: 'pending'
      };

      setBuses(prevBuses => 
        prevBuses.map(bus => {
          if (bus.id === busId && bus.currentRide) {
            return {
              ...bus,
              currentRide: {
                ...bus.currentRide,
                tempBookings: [...bus.currentRide.tempBookings, newBooking],
                availableSeats: bus.currentRide.availableSeats - 1
              }
            };
          }
          return bus;
        })
      );

      return { success: true, bookingId: newBooking.id };
    } catch (err) {
      return { success: false, error: 'Failed to request seat' };
    }
  };

  const availableBuses = buses.filter(bus => 
    bus.currentRide && bus.currentRide.availableSeats > 0
  );

  return {
    buses: availableBuses,
    loading,
    error,
    requestSeat
  };
};
