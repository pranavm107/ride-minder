import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MapPin, Plus, X, Clock, Navigation } from 'lucide-react';

const AddRouteForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    routeName: '',
    routeId: '',
    startPoint: '',
    endPoint: '',
    estimatedDistance: '',
    estimatedTime: ''
  });
  const [waypoints, setWaypoints] = useState<string[]>([]);
  const [newWaypoint, setNewWaypoint] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateRouteId = () => {
    return 'RT' + Date.now().toString().slice(-6);
  };

  const addWaypoint = () => {
    if (newWaypoint.trim() && !waypoints.includes(newWaypoint.trim())) {
      setWaypoints(prev => [...prev, newWaypoint.trim()]);
      setNewWaypoint('');
    } else if (waypoints.includes(newWaypoint.trim())) {
      toast.error('Waypoint already exists');
    }
  };

  const removeWaypoint = (index: number) => {
    setWaypoints(prev => prev.filter((_, i) => i !== index));
  };

  const handleWaypointKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addWaypoint();
    }
  };

  const validateForm = () => {
    if (!formData.routeName.trim()) {
      toast.error('Route name is required');
      return false;
    }
    if (!formData.startPoint.trim()) {
      toast.error('Start point is required');
      return false;
    }
    if (!formData.endPoint.trim()) {
      toast.error('End point is required');
      return false;
    }
    if (!formData.estimatedDistance || parseFloat(formData.estimatedDistance) <= 0) {
      toast.error('Valid estimated distance is required');
      return false;
    }
    if (!formData.estimatedTime || parseInt(formData.estimatedTime) <= 0) {
      toast.error('Valid estimated time is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const routeId = formData.routeId || generateRouteId();
      
      // Mock save to Firestore
      const routeData = {
        id: routeId,
        ...formData,
        waypoints,
        createdAt: new Date().toISOString(),
        status: 'active',
        assignedBuses: [],
        assignedDrivers: []
      };
      
      console.log('Saving route data:', routeData);
      
      // Reset form
      setFormData({
        routeName: '',
        routeId: '',
        startPoint: '',
        endPoint: '',
        estimatedDistance: '',
        estimatedTime: ''
      });
      setWaypoints([]);
      setNewWaypoint('');
      
      toast.success('✅ Route created successfully and available for assignment');
      
    } catch (error) {
      toast.error('Failed to create route. Please try again.');
      console.error('Error creating route:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Add New Route
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="routeName">Route Name *</Label>
                <Input
                  id="routeName"
                  value={formData.routeName}
                  onChange={(e) => handleInputChange('routeName', e.target.value)}
                  placeholder="Pollachi - Campus"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="routeId">Route ID</Label>
                <Input
                  id="routeId"
                  value={formData.routeId}
                  onChange={(e) => handleInputChange('routeId', e.target.value)}
                  placeholder="Auto-generated if empty"
                />
                <p className="text-sm text-gray-500">Leave empty for auto-generation</p>
              </div>
            </div>

            {/* Start and End Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startPoint">Start Point *</Label>
                <Input
                  id="startPoint"
                  value={formData.startPoint}
                  onChange={(e) => handleInputChange('startPoint', e.target.value)}
                  placeholder="Pollachi"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endPoint">End Point *</Label>
                <Input
                  id="endPoint"
                  value={formData.endPoint}
                  onChange={(e) => handleInputChange('endPoint', e.target.value)}
                  placeholder="Rathinam Campus"
                  required
                />
              </div>
            </div>

            {/* Waypoints */}
            <div className="space-y-4">
              <Label>Waypoints</Label>
              
              {/* Add new waypoint */}
              <div className="flex gap-2">
                <Input
                  value={newWaypoint}
                  onChange={(e) => setNewWaypoint(e.target.value)}
                  onKeyPress={handleWaypointKeyPress}
                  placeholder="Enter waypoint (e.g., Gandhipuram)"
                  className="flex-1"
                />
                <Button type="button" onClick={addWaypoint} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Display waypoints */}
              {waypoints.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Route Path:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-green-50">
                      <MapPin className="h-3 w-3 mr-1" />
                      {formData.startPoint || 'Start'}
                    </Badge>
                    {waypoints.map((waypoint, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-50">
                        {waypoint}
                        <button
                          type="button"
                          onClick={() => removeWaypoint(index)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <Badge variant="outline" className="bg-red-50">
                      <Navigation className="h-3 w-3 mr-1" />
                      {formData.endPoint || 'End'}
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            {/* Distance and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedDistance">Estimated Distance (km) *</Label>
                <Input
                  id="estimatedDistance"
                  type="number"
                  step="0.1"
                  value={formData.estimatedDistance}
                  onChange={(e) => handleInputChange('estimatedDistance', e.target.value)}
                  placeholder="15.5"
                  min="0.1"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="estimatedTime">Estimated Time (minutes) *</Label>
                <Input
                  id="estimatedTime"
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                  placeholder="45"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Route Summary */}
            {(formData.startPoint || formData.endPoint || waypoints.length > 0) && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Route Summary
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Full Route:</strong> {formData.startPoint} → {waypoints.join(' → ')} → {formData.endPoint}</p>
                  <p><strong>Total Stops:</strong> {2 + waypoints.length} stops</p>
                  {formData.estimatedDistance && <p><strong>Distance:</strong> {formData.estimatedDistance} km</p>}
                  {formData.estimatedTime && <p><strong>Duration:</strong> {formData.estimatedTime} minutes</p>}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700">
                {loading ? (
                  <>
                    <Navigation className="h-4 w-4 mr-2 animate-spin" />
                    Creating Route...
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4 mr-2" />
                    Create Route
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddRouteForm;