
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const RouteManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Route Management</h2>
        <Button>Create New Route</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Route {i + 1}
                <Badge variant={i % 2 === 0 ? 'default' : 'secondary'}>
                  {i % 2 === 0 ? 'Active' : 'Inactive'}
                </Badge>
              </CardTitle>
              <CardDescription>
                Campus to Residential Area {i + 1}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Stops:</span>
                  <span>{8 + (i * 2)} stops</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Distance:</span>
                  <span>{12 + (i * 3)} km</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Avg. Journey Time:</span>
                  <span>{35 + (i * 5)} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Assigned Buses:</span>
                  <span>{2 + (i % 2)} buses</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Daily Passengers:</span>
                  <span>{150 + (i * 50)} students</span>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit Route
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      View Map
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RouteManagement;
