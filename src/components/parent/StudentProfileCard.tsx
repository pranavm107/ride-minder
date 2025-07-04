import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  MapPin, 
  Car, 
  Phone, 
  Mail, 
  Calendar,
  Edit,
  QrCode,
  Clock,
  Navigation
} from 'lucide-react';
import { Location } from '@/types/locations';
import { PICKUP_LOCATIONS, DROP_LOCATIONS } from '@/data/locations';

interface StudentProfileCardProps {
  studentData: {
    name: string;
    registerNumber: string;
    cabNumber: string;
    profilePhoto: string;
    pickupLocation: string;
    dropLocation: string;
    parentName: string;
    phoneNumber: string;
  };
}

const StudentProfileCard = ({ studentData }: StudentProfileCardProps) => {
  // Find the actual location objects based on names
  const pickupLocation = PICKUP_LOCATIONS.find(loc => 
    loc.areaName.toLowerCase() === studentData.pickupLocation.toLowerCase()
  ) || PICKUP_LOCATIONS[0]; // fallback to first location
  
  const dropLocation = DROP_LOCATIONS.find(loc => 
    loc.areaName.toLowerCase() === studentData.dropLocation.toLowerCase()
  ) || DROP_LOCATIONS[0]; // fallback to first location

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Student Profile */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full"></div>
        <CardHeader className="relative">
          <div className="flex items-start justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Student Profile
            </CardTitle>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarImage src={studentData.profilePhoto} alt={studentData.name} />
              <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                {studentData.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-foreground">{studentData.name}</h3>
              <p className="text-muted-foreground">Reg: {studentData.registerNumber}</p>
              <Badge variant="secondary" className="text-xs">
                Active Student
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Car className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Assigned Cab:</span>
              </div>
              <Badge variant="outline" className="font-mono">
                {studentData.cabNumber}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Academic Year:</span>
              </div>
              <Badge variant="outline">2024-25</Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Pickup Location</p>
                <p className="text-sm text-muted-foreground">{pickupLocation.areaName}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    {pickupLocation.distanceFromCollege}km from college
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    ~{pickupLocation.estimatedTime} min
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Drop Location</p>
                <p className="text-sm text-muted-foreground">{dropLocation.areaName}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    {dropLocation.distanceFromCollege}km from college
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    ~{dropLocation.estimatedTime} min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parent/Emergency Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="space-y-1">
                <p className="text-sm font-medium text-green-800">Primary Contact</p>
                <p className="text-sm text-green-700">{studentData.parentName}</p>
                <p className="text-xs text-green-600">{studentData.phoneNumber}</p>
              </div>
              <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
                <Phone className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-800">Emergency Contact</p>
                <p className="text-sm text-blue-700">Priya Sharma (Mother)</p>
                <p className="text-xs text-blue-600">+91 98765 43211</p>
              </div>
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <h4 className="font-medium text-sm">Student ID & QR Code</h4>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Digital Student ID</p>
                <p className="text-xs text-muted-foreground">For cab boarding verification</p>
              </div>
              <Button variant="outline" size="sm">
                <QrCode className="h-4 w-4 mr-2" />
                View QR
              </Button>
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <h4 className="font-medium text-sm">Transportation Details</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Morning Pickup:</p>
                <p className="font-medium">8:15 AM</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Evening Drop:</p>
                <p className="font-medium">5:30 PM</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Route Number:</p>
                <p className="font-medium">#248</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Seat Number:</p>
                <p className="font-medium">15</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfileCard;