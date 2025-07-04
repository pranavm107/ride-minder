import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, AlertTriangle, Clock } from 'lucide-react';
import LocationSelector from '../LocationSelector';
import { Location } from '@/types/locations';
import { useToast } from '@/hooks/use-toast';

interface LocationChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPickup: Location;
  currentDrop: Location;
  assignedCabRoute: string[];
}

const LocationChangeDialog = ({ 
  open, 
  onOpenChange, 
  currentPickup, 
  currentDrop,
  assignedCabRoute 
}: LocationChangeDialogProps) => {
  const [selectedPickup, setSelectedPickup] = useState<Location>(currentPickup);
  const [selectedDrop, setSelectedDrop] = useState<Location>(currentDrop);
  const [isTemporary, setIsTemporary] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  const isPickupInRoute = assignedCabRoute.includes(selectedPickup.areaName);
  const isDropInRoute = assignedCabRoute.includes(selectedDrop.areaName);
  const hasChanges = selectedPickup.id !== currentPickup.id || selectedDrop.id !== currentDrop.id;

  const handleSubmit = () => {
    if (!isPickupInRoute || !isDropInRoute) {
      toast({
        title: "Route Conflict",
        description: "Selected locations are not on your assigned cab's route. Please contact admin.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Location Change Requested",
      description: `Your ${isTemporary ? 'temporary' : 'permanent'} location change has been submitted for approval.`
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Change Pickup/Drop Location</DialogTitle>
          <DialogDescription>
            Request a temporary or permanent change to your transportation locations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Locations */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Current Locations</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Pickup</p>
                <p className="font-medium">{currentPickup.areaName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Drop</p>
                <p className="font-medium">{currentDrop.areaName}</p>
              </div>
            </div>
          </div>

          {/* Change Type */}
          <div className="space-y-3">
            <h4 className="font-medium">Change Type</h4>
            <div className="flex gap-3">
              <Button
                variant={isTemporary ? "default" : "outline"}
                size="sm"
                onClick={() => setIsTemporary(true)}
                className="flex-1"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Temporary (1 day)
              </Button>
              <Button
                variant={!isTemporary ? "default" : "outline"}
                size="sm"
                onClick={() => setIsTemporary(false)}
                className="flex-1"
              >
                Permanent Change
              </Button>
            </div>
          </div>

          {/* Date Selection for Temporary Changes */}
          {isTemporary && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          )}

          {/* Location Selectors */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">New Pickup Location</label>
              <LocationSelector
                type="pickup"
                value={selectedPickup}
                onSelect={setSelectedPickup}
                placeholder="Select pickup location"
              />
              {!isPickupInRoute && hasChanges && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    This location is not on your assigned cab's route
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">New Drop Location</label>
              <LocationSelector
                type="drop"
                value={selectedDrop}
                onSelect={setSelectedDrop}
                placeholder="Select drop location"
              />
              {!isDropInRoute && hasChanges && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    This location is not on your assigned cab's route
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          {/* Route Information */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-2">Your Cab's Route</h5>
            <div className="flex flex-wrap gap-1">
              {assignedCabRoute.map((location, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-blue-100 text-blue-700 border-blue-200"
                >
                  {location}
                </Badge>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!hasChanges}
              className="flex-1"
            >
              Submit Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationChangeDialog;