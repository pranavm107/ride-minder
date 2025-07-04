import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  Navigation, 
  Clock, 
  Users,
  Search
} from 'lucide-react';
import { Location } from '@/types/locations';
import { PICKUP_LOCATIONS, DROP_LOCATIONS } from '@/data/locations';
import { useToast } from '@/hooks/use-toast';

const LocationManagement = () => {
  const [pickupLocations, setPickupLocations] = useState<Location[]>(PICKUP_LOCATIONS);
  const [dropLocations, setDropLocations] = useState<Location[]>(DROP_LOCATIONS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    areaName: '',
    type: 'pickup',
    lat: 0,
    lng: 0,
    distanceFromCollege: 0,
    estimatedTime: 0
  });

  const mockStudentAssignments = {
    'gandhipuram': ['Arjun Sharma', 'Priya Kumar', 'Rahul Singh'],
    'ukkadam': ['Sneha Patel', 'Rohan Das'],
    'townhall': ['Kavya Reddy', 'Vikram Joshi', 'Ananya Nair'],
    'pollachi': ['Arjun Sharma', 'Priya Kumar'],
    'eachanari': ['Sneha Patel', 'Rohan Das', 'Kavya Reddy']
  };

  const filteredPickupLocations = pickupLocations.filter(location =>
    location.areaName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDropLocations = dropLocations.filter(location =>
    location.areaName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddLocation = () => {
    if (!newLocation.areaName || !newLocation.lat || !newLocation.lng) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const location: Location = {
      id: newLocation.areaName!.toLowerCase().replace(/\s+/g, '-'),
      areaName: newLocation.areaName!,
      type: newLocation.type!,
      lat: newLocation.lat!,
      lng: newLocation.lng!,
      distanceFromCollege: newLocation.distanceFromCollege || 0,
      estimatedTime: newLocation.estimatedTime || 0
    };

    if (location.type === 'pickup') {
      setPickupLocations([...pickupLocations, location]);
    } else {
      setDropLocations([...dropLocations, location]);
    }

    toast({
      title: "Location Added",
      description: `${location.areaName} has been added as a ${location.type} location.`
    });

    setNewLocation({
      areaName: '',
      type: 'pickup',
      lat: 0,
      lng: 0,
      distanceFromCollege: 0,
      estimatedTime: 0
    });
    setIsAddDialogOpen(false);
  };

  const handleEditLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsEditDialogOpen(true);
  };

  const handleDeleteLocation = (locationId: string, type: 'pickup' | 'drop') => {
    if (type === 'pickup') {
      setPickupLocations(pickupLocations.filter(loc => loc.id !== locationId));
    } else {
      setDropLocations(dropLocations.filter(loc => loc.id !== locationId));
    }

    toast({
      title: "Location Deleted",
      description: "The location has been removed successfully."
    });
  };

  const LocationCard = ({ location, type }: { location: Location; type: 'pickup' | 'drop' }) => {
    const studentCount = mockStudentAssignments[location.id as keyof typeof mockStudentAssignments]?.length || 0;
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className={`h-4 w-4 ${type === 'pickup' ? 'text-green-600' : 'text-blue-600'}`} />
              <h3 className="font-semibold">{location.areaName}</h3>
              <Badge variant={type === 'pickup' ? 'default' : 'secondary'} className="text-xs">
                {type}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditLocation(location)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteLocation(location.id, type)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Navigation className="h-3 w-3" />
                Distance:
              </span>
              <span>{location.distanceFromCollege}km</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Est. Time:
              </span>
              <span>{location.estimatedTime} min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                Students:
              </span>
              <Badge variant="outline" className="text-xs">
                {studentCount} assigned
              </Badge>
            </div>
          </div>

          <div className="mt-3 text-xs text-muted-foreground">
            Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Location Management</h1>
            <p className="text-muted-foreground">Manage pickup and drop locations for the bus system</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Location</DialogTitle>
                <DialogDescription>
                  Add a new pickup or drop location to the system
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="areaName">Area Name</Label>
                  <Input
                    id="areaName"
                    value={newLocation.areaName}
                    onChange={(e) => setNewLocation({...newLocation, areaName: e.target.value})}
                    placeholder="e.g., Gandhipuram"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Location Type</Label>
                  <Select
                    value={newLocation.type}
                    onValueChange={(value: 'pickup' | 'drop') => setNewLocation({...newLocation, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pickup">Pickup Location</SelectItem>
                      <SelectItem value="drop">Drop Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lat">Latitude</Label>
                    <Input
                      id="lat"
                      type="number"
                      step="0.0001"
                      value={newLocation.lat}
                      onChange={(e) => setNewLocation({...newLocation, lat: parseFloat(e.target.value)})}
                      placeholder="11.0176"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lng">Longitude</Label>
                    <Input
                      id="lng"
                      type="number"
                      step="0.0001"
                      value={newLocation.lng}
                      onChange={(e) => setNewLocation({...newLocation, lng: parseFloat(e.target.value)})}
                      placeholder="76.9558"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance from College (km)</Label>
                    <Input
                      id="distance"
                      type="number"
                      value={newLocation.distanceFromCollege}
                      onChange={(e) => setNewLocation({...newLocation, distanceFromCollege: parseInt(e.target.value)})}
                      placeholder="12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Estimated Time (min)</Label>
                    <Input
                      id="time"
                      type="number"
                      value={newLocation.estimatedTime}
                      onChange={(e) => setNewLocation({...newLocation, estimatedTime: parseInt(e.target.value)})}
                      placeholder="25"
                    />
                  </div>
                </div>

                <Button onClick={handleAddLocation} className="w-full">
                  Add Location
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Locations Tabs */}
        <Tabs defaultValue="pickup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="pickup" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              Pickup Locations ({filteredPickupLocations.length})
            </TabsTrigger>
            <TabsTrigger value="drop" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              Drop Locations ({filteredDropLocations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pickup">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPickupLocations.map((location) => (
                <LocationCard key={location.id} location={location} type="pickup" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drop">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDropLocations.map((location) => (
                <LocationCard key={location.id} location={location} type="drop" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LocationManagement;