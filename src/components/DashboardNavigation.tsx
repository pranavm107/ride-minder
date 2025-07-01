import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Users, MapPin, FileText, Settings, Bell, Car } from 'lucide-react';

interface NavigationLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}

const NavigationLink = ({ to, icon, label, description }: NavigationLinkProps) => (
  <Link to={to} className="block">
    <Card className="hover:shadow-md transition-shadow h-full">
      <CardContent className="p-4 flex items-start space-x-3">
        <div className="mt-1 rounded-full p-2 bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{label}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  </Link>
);

interface DashboardNavigationProps {
  userType: 'student' | 'driver' | 'admin';
}

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({ userType }) => {
  // Define navigation items based on user type
  const getNavigationItems = () => {
    switch (userType) {
      case 'admin':
        return [
          {
            to: '/camera-control',
            icon: <Camera className="h-5 w-5" />,
            label: 'Camera Control',
            description: 'Monitor and control all bus cameras'
          },
          {
            to: '/driver-documents',
            icon: <FileText className="h-5 w-5" />,
            label: 'Driver Documents',
            description: 'View and manage driver documentation'
          },
          {
            to: '/route-stops',
            icon: <MapPin className="h-5 w-5" />,
            label: 'Route Management',
            description: 'Manage bus routes and stops'
          },
          {
            to: '/reports',
            icon: <FileText className="h-5 w-5" />,
            label: 'Reports',
            description: 'View system analytics and reports'
          }
        ];
      
      case 'student':
        return [
          {
            to: '/available-rides',
            icon: <Car className="h-5 w-5" />,
            label: 'Available Rides',
            description: 'Book empty seats in available buses'
          },
          {
            to: '/community',
            icon: <Users className="h-5 w-5" />,
            label: 'Community',
            description: 'Connect with your bus mates'
          },
          {
            to: '/route-stops',
            icon: <MapPin className="h-5 w-5" />,
            label: 'My Route',
            description: 'View your bus route and stops'
          },
          {
            to: '/settings',
            icon: <Settings className="h-5 w-5" />,
            label: 'Settings',
            description: 'Manage your account settings'
          }
        ];
      
      case 'driver':
        return [
          {
            to: '/attendance',
            icon: <Users className="h-5 w-5" />,
            label: 'Student Attendance',
            description: 'Mark and view student attendance'
          },
          {
            to: '/trip-history',
            icon: <FileText className="h-5 w-5" />,
            label: 'Trip History',
            description: 'View your past trips'
          },
          {
            to: '/customer-support',
            icon: <Bell className="h-5 w-5" />,
            label: 'Support',
            description: 'Contact customer support'
          }
        ];
      
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="mt-6">
      <h2 className="font-semibold text-lg mb-3">Quick Navigation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {navigationItems.map((item, index) => (
          <NavigationLink
            key={index}
            to={item.to}
            icon={item.icon}
            label={item.label}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardNavigation;
