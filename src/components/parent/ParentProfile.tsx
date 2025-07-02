
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Phone, Mail, Lock, Edit2, Save, X } from 'lucide-react';

const ParentProfile = ({ onClose }: { onClose: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    parentName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    childName: 'Alex Johnson',
    childClass: 'Grade 10-A',
    childRegister: 'ST2024-1157',
    emergencyContact: '+1 (555) 987-6543'
  });
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Parent Profile</h3>
            <p className="text-sm text-gray-600">Manage your account information</p>
          </div>
        </div>
        <Button
          variant={isEditing ? "outline" : "default"}
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <X size={16} className="mr-1" /> : <Edit2 size={16} className="mr-1" />}
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Parent Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User size={16} />
              Parent Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="parentName">Full Name</Label>
              <Input
                id="parentName"
                value={formData.parentName}
                onChange={(e) => handleInputChange('parentName', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
          </CardContent>
        </Card>

        {/* Child Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User size={16} />
              Child Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="childName">Child's Name</Label>
              <Input
                id="childName"
                value={formData.childName}
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">Contact admin to update child information</p>
            </div>
            <div>
              <Label htmlFor="childClass">Class</Label>
              <Input
                id="childClass"
                value={formData.childClass}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="childRegister">Register Number</Label>
              <Input
                id="childRegister"
                value={formData.childRegister}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="pt-4">
              <Button variant="outline" size="sm" className="w-full">
                <Lock size={16} className="mr-2" />
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {isEditing && (
        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} className="flex-1">
            <Save size={16} className="mr-2" />
            Save Changes
          </Button>
          <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default ParentProfile;
