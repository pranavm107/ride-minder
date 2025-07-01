
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Users, Clock, Bus as BusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAvailableRides } from '@/hooks/useAvailableRides';
import PageTransition from '@/components/PageTransition';
import SeatRequestDialog from '@/components/rides/SeatRequestDialog';

const AvailableRidesPage = () => {
  const { buses, loading, error, requestSeat } = useAvailableRides();
  const { toast } = useToast();
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRequestSeat = async (busId: string, studentInfo: { name: string; email: string }) => {
    const result = await requestSeat(busId, studentInfo);
    
    if (result.success) {
      toast({
        title: "Seat Request Submitted",
        description: "Your request has been sent to the driver. You'll be notified once approved.",
      });
      setDialogOpen(false);
      setSelectedBusId(null);
    } else {
      toast({
        title: "Request Failed",
        description: result.error || "Failed to submit seat request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openRequestDialog = (busId: string) => {
    setSelectedBusId(busId);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <Link to="/student">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading available rides...</p>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <Link to="/student">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link to="/student">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Available Rides</h1>
                <p className="text-gray-600">Book an empty seat in available buses</p>
              </div>
            </div>
          </div>

          {/* Available Buses */}
          {buses.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BusIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Available Rides</h3>
                <p className="text-gray-600">
                  There are currently no buses with empty seats available.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {buses.map((bus) => (
                <Card key={bus.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <BusIcon className="h-5 w-5 text-blue-600" />
                        <span>{bus.routeName}</span>
                      </CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {bus.currentRide?.availableSeats} seats available
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Driver: {bus.driverName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {bus.currentRide?.time} - {bus.currentRide?.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {bus.totalSeats - bus.registeredStudents.length + (bus.currentRide?.skippedStudents.length || 0)} total available
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Capacity:</span> {bus.totalSeats} seats
                        <span className="mx-2">•</span>
                        <span className="font-medium">Registered:</span> {bus.registeredStudents.length}
                        <span className="mx-2">•</span>
                        <span className="font-medium">Skipped today:</span> {bus.currentRide?.skippedStudents.length || 0}
                      </div>
                      
                      <Button 
                        onClick={() => openRequestDialog(bus.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={!bus.currentRide || bus.currentRide.availableSeats <= 0}
                      >
                        Request Seat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Seat Request Dialog */}
        <SeatRequestDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={(studentInfo: { name: string; email: string }) => {
            if (selectedBusId) {
              handleRequestSeat(selectedBusId, studentInfo);
            }
          }}
          busRoute={buses.find(b => b.id === selectedBusId)?.routeName || ''}
        />
      </div>
    </PageTransition>
  );
};

export default AvailableRidesPage;
