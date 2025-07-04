import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Car, 
  User, 
  Phone, 
  Star, 
  Clock, 
  MapPin, 
  Users,
  Shield,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface CabDetailsProps {
  studentData: any;
}

const CabDetails = ({ studentData }: CabDetailsProps) => {
  // Mock cab and driver data
  const cabDetails = {
    cabNumber: 'CB-248',
    model: 'Tata Winger 17-Seater',
    registrationNumber: 'DL-8C-AB-1234',
    capacity: 17,
    currentOccupancy: 15,
    insuranceValid: true,
    fitnessValid: true,
    pollutionValid: true,
    lastService: '2024-12-15',
    nextService: '2025-03-15'
  };

  const driverDetails = {
    name: 'Rajesh Kumar',
    photo: '/placeholder.svg',
    licenseNumber: 'DL-123456789012',
    phoneNumber: '+91 98765 43210',
    experience: '8 years',
    rating: 4.8,
    totalTrips: 2450,
    emergencyContact: '+91 98765 43211',
    verified: true,
    languages: ['Hindi', 'English', 'Punjabi']
  };

  const routeDetails = {
    routeNumber: '#248',
    totalStops: 12,
    estimatedDuration: '45 minutes',
    morningStart: '7:30 AM',
    eveningStart: '5:00 PM',
    studentSeatNumber: 15
  };

  const safetyFeatures = [
    'GPS Tracking',
    'CCTV Camera',
    'First Aid Kit',
    'Fire Extinguisher',
    'Speed Governor',
    'Emergency Exit',
    'Panic Button',
    'Child Safety Locks'
  ];

  return (
    <div className="space-y-6">
      {/* Quick Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Driver Rating</p>
                <p className="text-2xl font-bold text-green-800">{driverDetails.rating}</p>
              </div>
              <Star className="h-8 w-8 text-green-600 fill-current" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Cab Occupancy</p>
                <p className="text-2xl font-bold text-blue-800">{cabDetails.currentOccupancy}/{cabDetails.capacity}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Experience</p>
                <p className="text-2xl font-bold text-purple-800">{driverDetails.experience}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Total Trips</p>
                <p className="text-2xl font-bold text-orange-800">{driverDetails.totalTrips.toLocaleString()}</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Driver Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Driver Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-4 border-primary/20">
                <AvatarImage src={driverDetails.photo} alt={driverDetails.name} />
                <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                  {driverDetails.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{driverDetails.name}</h3>
                  {driverDetails.verified && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">Professional Driver</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(driverDetails.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({driverDetails.rating}/5)
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">License Number</p>
                  <p className="font-mono text-sm">{driverDetails.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Experience</p>
                  <p className="font-medium">{driverDetails.experience}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Languages</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {driverDetails.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm">{driverDetails.phoneNumber}</p>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Emergency Contact</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm">{driverDetails.emergencyContact}</p>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Trips</p>
                  <p className="font-medium">{driverDetails.totalTrips.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="h-16 w-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold">{cabDetails.cabNumber}</h3>
              <p className="text-muted-foreground">{cabDetails.model}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{cabDetails.capacity}</p>
                <p className="text-sm text-muted-foreground">Total Seats</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{cabDetails.currentOccupancy}</p>
                <p className="text-sm text-muted-foreground">Occupied</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Registration Number</p>
                <p className="font-mono font-medium">{cabDetails.registrationNumber}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Your Seat</p>
                  <Badge variant="outline" className="font-mono">
                    Seat #{routeDetails.studentSeatNumber}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Route</p>
                  <Badge variant="outline">
                    {routeDetails.routeNumber}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Service</p>
                  <p className="text-sm">{cabDetails.lastService}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Next Service</p>
                  <p className="text-sm text-orange-600">{cabDetails.nextService}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Route Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Route Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Route Number</p>
              <p className="text-lg font-bold">{routeDetails.routeNumber}</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Total Stops</p>
              <p className="text-lg font-bold">{routeDetails.totalStops}</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Morning Pickup</p>
              <p className="text-lg font-bold">{routeDetails.morningStart}</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Evening Drop</p>
              <p className="text-lg font-bold">{routeDetails.eveningStart}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Features & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Safety Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {safetyFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-700">Insurance</span>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Valid</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-700">Fitness Certificate</span>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Valid</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-700">Pollution Certificate</span>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Valid</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CabDetails;