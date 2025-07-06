import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, Bus, User, FileText, Camera } from 'lucide-react';

const AddBusForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    busNumber: '',
    busModel: '',
    seatingCapacity: '',
    assignedDriver: '',
    cameraStreamUrl: ''
  });
  const [files, setFiles] = useState({
    rcBook: null as File | null,
    insuranceDocument: null as File | null
  });

  // Mock data for drivers dropdown
  const availableDrivers = [
    { id: 'drv1', name: 'David Johnson', licenseNumber: 'DL-98765' },
    { id: 'drv2', name: 'Maria Garcia', licenseNumber: 'DL-87654' },
    { id: 'drv3', name: 'Robert Chen', licenseNumber: 'DL-76543' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  const generateBusId = () => {
    return 'BUS' + Date.now().toString().slice(-6);
  };

  const validateForm = () => {
    if (!formData.busNumber.trim()) {
      toast.error('Bus number is required');
      return false;
    }
    if (!formData.busModel.trim()) {
      toast.error('Bus model is required');
      return false;
    }
    if (!formData.seatingCapacity || parseInt(formData.seatingCapacity) <= 0) {
      toast.error('Valid seating capacity is required');
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
      const busId = generateBusId();
      const busNumber = formData.busNumber.replace(/\s+/g, '');
      
      // Upload files if present
      let rcBookUrl = '';
      let insuranceDocumentUrl = '';
      
      if (files.rcBook) {
        rcBookUrl = await uploadFile(files.rcBook, `bus_docs/rc-${busNumber}`) as string;
      }
      
      if (files.insuranceDocument) {
        insuranceDocumentUrl = await uploadFile(files.insuranceDocument, `bus_docs/insurance-${busNumber}`) as string;
      }
      
      // Mock save to Firestore
      const busData = {
        id: busId,
        ...formData,
        rcBookUrl,
        insuranceDocumentUrl,
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      
      console.log('Saving bus data:', busData);
      
      // Reset form
      setFormData({
        busNumber: '',
        busModel: '',
        seatingCapacity: '',
        assignedDriver: '',
        cameraStreamUrl: ''
      });
      setFiles({
        rcBook: null,
        insuranceDocument: null
      });
      
      toast.success('✅ Bus added successfully with driver & documents uploaded');
      
    } catch (error) {
      toast.error('Failed to add bus. Please try again.');
      console.error('Error adding bus:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bus className="h-5 w-5" />
            Add New Bus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="busNumber">Bus Number *</Label>
                <Input
                  id="busNumber"
                  value={formData.busNumber}
                  onChange={(e) => handleInputChange('busNumber', e.target.value)}
                  placeholder="TN38A1234"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="busModel">Bus Model *</Label>
                <Input
                  id="busModel"
                  value={formData.busModel}
                  onChange={(e) => handleInputChange('busModel', e.target.value)}
                  placeholder="Tata LP 909"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seatingCapacity">Seating Capacity *</Label>
                <Input
                  id="seatingCapacity"
                  type="number"
                  value={formData.seatingCapacity}
                  onChange={(e) => handleInputChange('seatingCapacity', e.target.value)}
                  placeholder="30"
                  min="1"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Assign Driver</Label>
                <Select value={formData.assignedDriver} onValueChange={(value) => handleInputChange('assignedDriver', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDrivers.map(driver => (
                      <SelectItem key={driver.id} value={driver.id}>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {driver.name} ({driver.licenseNumber})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Camera Stream URL (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="cameraStreamUrl">Camera Stream URL (Optional)</Label>
              <Input
                id="cameraStreamUrl"
                value={formData.cameraStreamUrl}
                onChange={(e) => handleInputChange('cameraStreamUrl', e.target.value)}
                placeholder="https://camera-stream-url.com/bus123"
              />
              <p className="text-sm text-gray-500">Live camera feed URL for real-time monitoring</p>
            </div>

            {/* Document Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>RC Book *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange('rcBook', e.target.files?.[0] || null)}
                    className="hidden"
                    id="rcBook"
                  />
                  <label htmlFor="rcBook" className="cursor-pointer">
                    <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {files.rcBook ? files.rcBook.name : 'Click to upload RC Book'}
                    </p>
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Insurance Document *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange('insuranceDocument', e.target.files?.[0] || null)}
                    className="hidden"
                    id="insuranceDocument"
                  />
                  <label htmlFor="insuranceDocument" className="cursor-pointer">
                    <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {files.insuranceDocument ? files.insuranceDocument.name : 'Click to upload Insurance'}
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Camera Preview Section */}
            {formData.cameraStreamUrl && (
              <div className="space-y-2">
                <Label>Camera Preview</Label>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Camera className="h-4 w-4" />
                    Camera stream will be available at: {formData.cameraStreamUrl}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Adding Bus...
                  </>
                ) : (
                  <>
                    <Bus className="h-4 w-4 mr-2" />
                    Add Bus
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

export default AddBusForm;