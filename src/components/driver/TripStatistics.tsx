import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TripStatisticsProps {
  currentTripStatus: 'inactive' | 'active';
  showFullMap: boolean;
}

const TripStatistics = ({ currentTripStatus, showFullMap }: TripStatisticsProps) => {
  const stats = [
    {
      label: 'Total Distance',
      value: '24.8 miles'
    },
    {
      label: 'Scheduled Stops',
      value: '18 stops'
    },
    {
      label: 'Students on Board',
      value: `${currentTripStatus === 'active' ? '24' : '0'} students`
    },
    {
      label: 'Estimated Time to Next Stop',
      value: '5 minutes'
    }
  ];

  if (!showFullMap && currentTripStatus === 'inactive') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Today's Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              <div className="text-xl font-semibold mt-1">{stat.value}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (showFullMap) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Trip Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                <div className="text-xl font-semibold mt-1">{stat.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default TripStatistics;