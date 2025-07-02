
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bus, MapPin, Clock, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PageTransition from '@/components/PageTransition';
import AvailableCabsList from '@/components/guest/AvailableCabsList';
import BookingConfirmation from '@/components/guest/BookingConfirmation';

interface CabData {
  id: string;
  routeName: string;
  driverName: string;
  availableSeats: number;
  totalSeats: number;
  currentLocation: string;
  nextStop: string;
  estimatedArrival: string;
  rideType: 'morning' | 'evening';
}

interface BookingData {
  id: string;
  cabId: string;
  seatNumber: number;
  cabDetails: CabData;
  bookingTime: string;
  status: 'confirmed';
}

const GuestDashboard = () => {
  const [availableCabs, setAvailableCabs] = useState<CabData[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<BookingData | null>(null);
  const { toast } = useToast();

  // Mock data for available cabs
  const mockCabs: CabData[] = [
    {
      id: 'cab-1',
      routeName: 'Route A - Main Campus to Downtown',
      driverName: 'John Smith',
      availableSeats: 8,
      totalSeats: 45,
      currentLocation: 'Main Gate',
      nextStop: 'Library Stop',
      estimatedArrival: '10 mins',
      rideType: 'morning'
    },
    {
      id: 'cab-2',
      routeName: 'Route B - North Campus to City Center',
      driverName: 'Sarah Johnson',
      availableSeats: 12,
      totalSeats: 40,
      currentLocation: 'North Gate',
      nextStop: 'Hostel Block C',
      estimatedArrival: '15 mins',
      rideType: 'morning'
    },
    {
      id: 'cab-3',
      routeName: 'Route C - South Campus Express',
      driverName: 'Mike Wilson',
      availableSeats: 5,
      totalSeats: 35,
      currentLocation: 'South Gate',
      nextStop: 'Academic Block',
      estimatedArrival: '8 mins',
      rideType: 'evening'
    }
  ];

  useEffect(() => {
    // Simulate loading available cabs from Firebase
    const loadAvailableCabs = () => {
      setTimeout(() => {
        const cabsWithSeats = mockCabs.filter(cab => cab.availableSeats > 0);
        setAvailableCabs(cabsWithSeats);
        setLoading(false);
        
        if (cabsWithSeats.length === 0) {
          toast({
            title: "No Available Cabs",
            description: "Currently no cabs have available seats. Please check back later.",
            variant: "destructive"
          });
        }
      }, 1000);
    };

    loadAvailableCabs();
  }, [toast]);

  const handleBookSeat = async (cabId: string) => {
    const selectedCab = availableCabs.find(cab => cab.id === cabId);
    if (!selectedCab) return;

    setLoading(true);
    
    try {
      // Simulate booking API call
      setTimeout(() => {
        const newBooking: BookingData = {
          id: `booking-${Date.now()}`,
          cabId: cabId,
          seatNumber: selectedCab.totalSeats - selectedCab.availableSeats + 1,
          cabDetails: selectedCab,
          bookingTime: new Date().toISOString(),
          status: 'confirmed'
        };

        setBooking(newBooking);
        
        // Update available seats
        setAvailableCabs(prev => 
          prev.map(cab => 
            cab.id === cabId 
              ? { ...cab, availableSeats: cab.availableSeats - 1 }
              : cab
          ).filter(cab => cab.availableSeats > 0)
        );

        toast({
          title: "Seat Booked Successfully!",
          description: `Your seat has been confirmed in ${selectedCab.routeName}`,
        });
        
        setLoading(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Unable to book seat. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  if (booking) {
    return <BookingConfirmation booking={booking} onNewBooking={() => setBooking(null)} />;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Guest Dashboard</h1>
                <p className="text-gray-600">Book available cab seats</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Guest User
            </Badge>
          </div>

          {/* Available Cabs Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bus className="h-5 w-5 text-green-600" />
                <span>Available Cabs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading available cabs...</p>
                </div>
              ) : availableCabs.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 mx-auto text-orange-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Available Seats</h3>
                  <p className="text-gray-600">
                    All cabs are currently full. Please check back later or contact the transport office.
                  </p>
                </div>
              ) : (
                <AvailableCabsList 
                  cabs={availableCabs} 
                  onBookSeat={handleBookSeat}
                  loading={loading}
                />
              )}
            </CardContent>
          </Card>

          {/* Info Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Booking Rules</h4>
                  <ul className="space-y-1">
                    <li>• One seat per booking</li>
                    <li>• Real-time availability</li>
                    <li>• Instant confirmation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Payment</h4>
                  <ul className="space-y-1">
                    <li>• Pay on boarding</li>
                    <li>• Cash or UPI accepted</li>
                    <li>• Standard fare applies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Support</h4>
                  <ul className="space-y-1">
                    <li>• Transport Office: 1234</li>
                    <li>• Emergency: 9999</li>
                    <li>• Online Help Available</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default GuestDashboard;
