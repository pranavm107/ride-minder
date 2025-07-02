
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Bus, MapPin, Clock, User, CreditCard, ArrowLeft } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

interface BookingData {
  id: string;
  cabId: string;
  seatNumber: number;
  cabDetails: {
    routeName: string;
    driverName: string;
    currentLocation: string;
    nextStop: string;
    estimatedArrival: string;
    rideType: 'morning' | 'evening';
  };
  bookingTime: string;
  status: 'confirmed';
}

interface BookingConfirmationProps {
  booking: BookingData;
  onNewBooking: () => void;
}

const BookingConfirmation = ({ booking, onNewBooking }: BookingConfirmationProps) => {
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleString();
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Booking Confirmed!</CardTitle>
              <p className="text-gray-600">Your seat has been successfully booked</p>
              <Badge className="bg-green-500 text-white mt-2">
                Booking ID: {booking.id}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Seat Details */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Bus className="h-5 w-5 text-green-600" />
                  Seat Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Seat Number:</span>
                    <p className="font-medium">#{booking.seatNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Route:</span>
                    <p className="font-medium">{booking.cabDetails.routeName}</p>
                  </div>
                </div>
              </div>

              {/* Cab Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Cab Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <span className="text-gray-600 text-sm">Driver</span>
                      <p className="font-medium">{booking.cabDetails.driverName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <span className="text-gray-600 text-sm">Current Location</span>
                      <p className="font-medium">{booking.cabDetails.currentLocation}</p>
                      <p className="text-sm text-gray-500">Next: {booking.cabDetails.nextStop}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <span className="text-gray-600 text-sm">Estimated Arrival</span>
                      <p className="font-medium">{booking.cabDetails.estimatedArrival}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Payment Information
                </h3>
                <div className="text-sm">
                  <p className="text-gray-600 mb-2">Fare: <span className="font-medium text-gray-900">₹25</span></p>
                  <p className="text-gray-600">Payment: <span className="font-medium text-orange-600">Pay on boarding</span></p>
                  <p className="text-xs text-gray-500 mt-2">Cash or UPI accepted</p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="border-t pt-4">
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Booked on: {formatTime(booking.bookingTime)}</p>
                  <p>Ride Type: <Badge variant="secondary">{booking.cabDetails.rideType}</Badge></p>
                  <p>Status: <Badge className="bg-green-500 text-white">Confirmed</Badge></p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  onClick={onNewBooking}
                  variant="outline" 
                  className="flex-1"
                >
                  Book Another Seat
                </Button>
                <Link to="/available-rides" className="flex-1">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Track Your Cab
                  </Button>
                </Link>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 p-4 rounded-lg text-sm">
                <h4 className="font-medium text-yellow-800 mb-2">Important Notes:</h4>
                <ul className="text-yellow-700 space-y-1">
                  <li>• Please be at the pickup point 5 minutes before arrival</li>
                  <li>• Show this confirmation to the driver</li>
                  <li>• Contact transport office for any changes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default BookingConfirmation;
