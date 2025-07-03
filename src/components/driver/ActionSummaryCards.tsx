import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Bell, Navigation } from 'lucide-react';

interface ActionSummaryCardsProps {
  currentTripStatus: 'inactive' | 'active';
  onStartTrip: () => void;
  onEndTrip: () => void;
  onViewStops: () => void;
}

const ActionSummaryCards = ({ 
  currentTripStatus, 
  onStartTrip, 
  onEndTrip, 
  onViewStops 
}: ActionSummaryCardsProps) => {
  const cards = [
    {
      title: 'Active Route',
      value: 'Route #248',
      subtitle: 'South Campus',
      icon: <MapPin className="h-5 w-5 text-primary" />,
      action: (
        <Button variant="outline" size="sm" onClick={onViewStops}>
          View Route
        </Button>
      )
    },
    {
      title: 'Next Stop',
      value: 'Stop #14',
      subtitle: 'Arriving in 5 mins',
      icon: <Navigation className="h-5 w-5 text-amber-500" />,
      action: (
        <Button variant="outline" size="sm" onClick={onViewStops}>
          See Details
        </Button>
      )
    },
    {
      title: 'Quick Action',
      value: currentTripStatus === 'inactive' ? 'Begin Trip' : 'End Trip',
      subtitle: currentTripStatus === 'inactive' ? 'Start your route' : 'Complete the trip',
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      action: (
        <Button 
          variant={currentTripStatus === 'inactive' ? 'default' : 'destructive'} 
          size="sm"
          onClick={currentTripStatus === 'inactive' ? onStartTrip : onEndTrip}
        >
          {currentTripStatus === 'inactive' ? 'Start Trip' : 'End Trip'}
        </Button>
      )
    },
    {
      title: 'Announcements',
      value: '2 Unread',
      subtitle: 'School closures',
      icon: <Bell className="h-5 w-5 text-red-500" />,
      action: (
        <Button variant="outline" size="sm">
          View All
        </Button>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-muted rounded-lg">
                {card.icon}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
              <p className="text-lg font-semibold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.subtitle}</p>
              <div className="pt-2">
                {card.action}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ActionSummaryCards;