
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const existingComplaints = [
  {
    id: 1,
    category: 'Driver Behavior',
    subject: 'Rash driving on Highway 101',
    status: 'pending',
    date: '2024-01-15',
    description: 'Driver was speeding and taking sharp turns...'
  },
  {
    id: 2,
    category: 'Bus Facilities',
    subject: 'Air conditioning not working',
    status: 'resolved',
    date: '2024-01-10',
    description: 'AC has been repaired and is working properly now.'
  },
  {
    id: 3,
    category: 'Safety Concerns',
    subject: 'Broken window latch',
    status: 'in-progress',
    date: '2024-01-12',
    description: 'Window safety latch needs immediate attention...'
  }
];

const ComplaintSubmission = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    priority: 'medium'
  });
  const [activeTab, setActiveTab] = useState<'new' | 'existing'>('new');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been submitted successfully. You'll receive updates via SMS/Email.",
    });
    setFormData({ category: '', subject: '', description: '', priority: 'medium' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={12} />;
      case 'in-progress': return <AlertCircle size={12} />;
      case 'resolved': return <CheckCircle2 size={12} />;
      default: return <Clock size={12} />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('new')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'new'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          New Complaint
        </button>
        <button
          onClick={() => setActiveTab('existing')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'existing'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          My Complaints
        </button>
      </div>

      {activeTab === 'new' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Complaint Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driver-behavior">Driver Behavior</SelectItem>
                  <SelectItem value="bus-facilities">Bus Facilities</SelectItem>
                  <SelectItem value="safety-concerns">Safety Concerns</SelectItem>
                  <SelectItem value="punctuality">Punctuality Issues</SelectItem>
                  <SelectItem value="cleanliness">Cleanliness</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority Level</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Brief description of the issue"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Please provide detailed information about your complaint..."
              rows={4}
              required
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Important Note</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Your complaint will be reviewed within 24 hours. For urgent safety issues, 
                  please also call our emergency helpline: <strong>+1 (555) 911-HELP</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <Send size={16} className="mr-2" />
              Submit Complaint
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Your Complaints</h3>
            <p className="text-sm text-gray-600">{existingComplaints.length} total complaints</p>
          </div>

          <div className="space-y-3">
            {existingComplaints.map((complaint) => (
              <div key={complaint.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">{complaint.subject}</h4>
                      <Badge className={getStatusColor(complaint.status)}>
                        {getStatusIcon(complaint.status)}
                        <span className="ml-1 capitalize">{complaint.status.replace('-', ' ')}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Category: {complaint.category}</span>
                      <span>Date: {new Date(complaint.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintSubmission;
