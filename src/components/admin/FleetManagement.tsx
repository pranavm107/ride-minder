
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FleetManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Fleet Management</h2>
        <Button>Add New Bus</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Bus #{i + 1}</CardTitle>
              <Badge variant={i % 3 === 0 ? 'default' : i % 3 === 1 ? 'secondary' : 'destructive'}>
                {i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Maintenance' : 'Offline'}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Route:</span>
                  <span>Route {(i % 5) + 1}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Driver:</span>
                  <span>Driver {i + 1}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Capacity:</span>
                  <span>45 seats</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Service:</span>
                  <span>Dec {15 + (i % 10)}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Track
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FleetManagement;
