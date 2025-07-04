import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Send, 
  Star, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Filter,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ComplaintsFeedbackProps {
  studentData: any;
}

const ComplaintsFeedback = ({ studentData }: ComplaintsFeedbackProps) => {
  const [newComplaint, setNewComplaint] = useState({
    category: '',
    priority: 'Medium',
    subject: '',
    description: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Mock complaints data
  const complaints = [
    {
      id: 'C001',
      date: '2025-01-05',
      category: 'Driver Behavior',
      subject: 'Driver was using phone while driving',
      description: 'I noticed the driver was talking on phone without hands-free during the journey on 3rd Jan.',
      priority: 'High',
      status: 'Resolved',
      response: 'Thank you for bringing this to our attention. We have spoken with the driver and provided additional training on safety protocols.',
      respondedBy: 'Safety Manager',
      respondedAt: '2025-01-06 10:30 AM',
      rating: null
    },
    {
      id: 'C002',
      date: '2024-12-20',
      category: 'Timing Issues',
      subject: 'Cab consistently arriving late',
      description: 'For the past week, the cab has been arriving 10-15 minutes late at our pickup point.',
      priority: 'Medium',
      status: 'In Progress',
      response: 'We are reviewing the route timings and will adjust the schedule accordingly. Thank you for your patience.',
      respondedBy: 'Route Manager',
      respondedAt: '2024-12-21 2:15 PM',
      rating: null
    },
    {
      id: 'C003',
      date: '2024-12-10',
      category: 'Safety Concerns',
      subject: 'AC not working properly',
      description: 'The air conditioning in the cab is not working well, making the journey uncomfortable for children.',
      priority: 'Medium',
      status: 'Resolved',
      response: 'AC has been repaired and tested. The issue has been resolved.',
      respondedBy: 'Maintenance Team',
      respondedAt: '2024-12-12 11:00 AM',
      rating: 4
    }
  ];

  const handleSubmitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComplaint.category || !newComplaint.subject || !newComplaint.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Complaint Submitted Successfully",
        description: "Your complaint has been forwarded to the admin team. You will receive a response within 24 hours.",
      });
      
      // Reset form
      setNewComplaint({
        category: '',
        priority: 'Medium',
        subject: '',
        description: '',
        rating: 5
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your complaint. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Resolved</Badge>;
      case 'In Progress':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">In Progress</Badge>;
      case 'Open':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Open</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">High Priority</Badge>;
      case 'Medium':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Medium Priority</Badge>;
      case 'Low':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Low Priority</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Complaints</p>
                <p className="text-2xl font-bold text-blue-800">{complaints.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Resolved</p>
                <p className="text-2xl font-bold text-green-800">
                  {complaints.filter(c => c.status === 'Resolved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">In Progress</p>
                <p className="text-2xl font-bold text-orange-800">
                  {complaints.filter(c => c.status === 'In Progress').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Avg Response</p>
                <p className="text-2xl font-bold text-purple-800">18h</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="submit" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="submit">Submit Complaint</TabsTrigger>
            <TabsTrigger value="history">My Complaints</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <TabsContent value="submit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Submit New Complaint or Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitComplaint} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={newComplaint.category} onValueChange={(value) => 
                      setNewComplaint(prev => ({ ...prev, category: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select complaint category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Driver Behavior">Driver Behavior</SelectItem>
                        <SelectItem value="Safety Concerns">Safety Concerns</SelectItem>
                        <SelectItem value="Timing Issues">Timing Issues</SelectItem>
                        <SelectItem value="Vehicle Condition">Vehicle Condition</SelectItem>
                        <SelectItem value="Route Issues">Route Issues</SelectItem>
                        <SelectItem value="General Feedback">General Feedback</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Priority Level</Label>
                    <RadioGroup 
                      value={newComplaint.priority} 
                      onValueChange={(value) => 
                        setNewComplaint(prev => ({ ...prev, priority: value }))
                      }
                      className="flex items-center gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Low" id="low" />
                        <Label htmlFor="low" className="text-sm">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Medium" id="medium" />
                        <Label htmlFor="medium" className="text-sm">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="High" id="high" />
                        <Label htmlFor="high" className="text-sm">High</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={newComplaint.subject}
                    onChange={(e) => setNewComplaint(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Brief description of the issue"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Please provide detailed information about your complaint or feedback..."
                    rows={5}
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-muted-foreground">
                    Include date, time, and any specific details that would help us address your concern.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Overall Service Rating (Optional)</Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewComplaint(prev => ({ ...prev, rating: star }))}
                        className={`p-1 rounded transition-colors ${
                          star <= newComplaint.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        disabled={isSubmitting}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {newComplaint.rating}/5 stars
                    </span>
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Your complaint will be forwarded to the admin team and you will receive a response within 24 hours.
                    For urgent safety concerns, please call our emergency helpline: +91 98765 43210
                  </AlertDescription>
                </Alert>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Complaint
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Complaint History for {studentData.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{complaint.subject}</h4>
                          {getPriorityBadge(complaint.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground">{complaint.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>ID: {complaint.id}</span>
                          <span>Category: {complaint.category}</span>
                          <span>Date: {complaint.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(complaint.status)}
                      </div>
                    </div>

                    {complaint.response && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">Response from {complaint.respondedBy}</span>
                          <span className="text-xs text-muted-foreground">{complaint.respondedAt}</span>
                        </div>
                        <p className="text-sm">{complaint.response}</p>
                        
                        {complaint.rating && (
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">Your Rating:</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${
                                    i < complaint.rating! 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplaintsFeedback;