import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, User, MapPin, Bus, FileText, Camera } from 'lucide-react';

const AddDriverForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    assignedRoute: '',
    assignedBus: '',
    password: ''
  });
  const [files, setFiles] = useState({
    profilePhoto: null as File | null,
    proofDocument: null as File | null
  });

  // Mock data for dropdowns
  const routes = [
    { id: 'route1', name: 'Pollachi - Campus' },
    { id: 'route2', name: 'Gandhipuram - Campus' },
    { id: 'route3', name: 'Ukkadam - Campus' }
  ];

  const buses = [
    { id: 'bus1', number: 'TN38A1234', available: true },
    { id: 'bus2', number: 'TN38B5678', available: true },
    { id: 'bus3', number: 'TN38C9012', available: false }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  const generateDriverId = () => {
    return 'DRV' + Date.now().toString().slice(-6);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Full name is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      toast.error('Valid email is required');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Phone number is required');
      return false;
    }
    if (!formData.licenseNumber.trim()) {
      toast.error('License number is required');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const uploadFile = async (file: File, path: string) => {
    // Mock file upload - in real implementation, use Firebase Storage
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://storage.firebase.com/${path}/${file.name}`);
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const driverId = generateDriverId();
      
      // Upload files if present
      let profilePhotoUrl = '';
      let proofDocumentUrl = '';
      
      if (files.profilePhoto) {
        profilePhotoUrl = await uploadFile(files.profilePhoto, `drivers_photos/${driverId}`) as string;
      }
      
      if (files.proofDocument) {
        proofDocumentUrl = await uploadFile(files.proofDocument, `drivers_proofs/${driverId}`) as string;
      }
      
      // Mock save to Firestore
      const driverData = {
        id: driverId,
        ...formData,
        profilePhotoUrl,
        proofDocumentUrl,
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      
      console.log('Saving driver data:', driverData);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        licenseNumber: '',
        assignedRoute: '',
        assignedBus: '',
        password: ''
      });
      setFiles({
        profilePhoto: null,
        proofDocument: null
      });
      
      toast.success('✅ Driver added successfully with route & documents');
      
    } catch (error) {
      toast.error('Failed to add driver. Please try again.');
      console.error('Error adding driver:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Add New Driver
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter driver's full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="driver@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number *</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  placeholder="DL-1234567890"
                  required
                />
              </div>
            </div>

            {/* Assignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Assign Route</Label>
                <Select value={formData.assignedRoute} onValueChange={(value) => handleInputChange('assignedRoute', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map(route => (
                      <SelectItem key={route.id} value={route.id}>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {route.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Assign Bus</Label>
                <Select value={formData.assignedBus} onValueChange={(value) => handleInputChange('assignedBus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bus" />
                  </SelectTrigger>
                  <SelectContent>
                    {buses.map(bus => (
                      <SelectItem key={bus.id} value={bus.id} disabled={!bus.available}>
                        <div className="flex items-center gap-2">
                          <Bus className="h-4 w-4" />
                          {bus.number} {!bus.available && '(Assigned)'}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Create Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Minimum 6 characters"
                required
              />
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange('profilePhoto', e.target.files?.[0] || null)}
                    className="hidden"
                    id="profilePhoto"
                  />
                  <label htmlFor="profilePhoto" className="cursor-pointer">
                    <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {files.profilePhoto ? files.profilePhoto.name : 'Click to upload photo'}
                    </p>
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Proof Document (Aadhaar/License)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange('proofDocument', e.target.files?.[0] || null)}
                    className="hidden"
                    id="proofDocument"
                  />
                  <label htmlFor="proofDocument" className="cursor-pointer">
                    <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {files.proofDocument ? files.proofDocument.name : 'Click to upload document'}
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
                {loading ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Adding Driver...
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4 mr-2" />
                    Add Driver
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

export default AddDriverForm;