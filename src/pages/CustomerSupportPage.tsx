
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  ChevronRight, 
  Search,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  User
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: "How do I report a bus maintenance issue?",
    answer: "To report a bus maintenance issue, go to the Reports section in your menu, select 'Report Issue', and choose 'Maintenance' from the dropdown menu. Provide all relevant details and submit the form."
  },
  {
    question: "What should I do if a student is not at their designated stop?",
    answer: "If a student is not at their designated stop, wait for approximately 1 minute. Mark the student as 'missed' in the attendance system. Notify the school administration through the app by using the 'Student Absence' reporting option."
  },
  {
    question: "How do I submit my timesheet?",
    answer: "To submit your timesheet, navigate to the Reports section, click on 'Timesheets', select the time period, verify the automatically tracked hours, make any necessary adjustments, and click 'Submit for Approval'."
  },
  {
    question: "What is the process for requesting time off?",
    answer: "To request time off, go to the menu and select 'Apply for Leave'. Choose the type of leave (regular or emergency), select the dates, provide a reason, and submit your request. You'll receive notification once it's approved or rejected."
  },
  {
    question: "How do I view my driver rewards and points?",
    answer: "To view your driver rewards and points, go to the 'Driver Rewards' section in the menu. There you will see your current points balance, rewards history, and available rewards you can redeem."
  },
  {
    question: "What do I do in case of an emergency on the bus?",
    answer: "In case of an emergency, first ensure the safety of all passengers. Use the SOS button on the active trip screen to immediately alert emergency services and school administration. Follow the emergency protocols as outlined in your driver training."
  }
];

const supportTickets = [
  {
    id: "TICK-1001",
    subject: "Bus AC not working properly",
    date: "2023-10-10",
    status: "open",
    lastUpdate: "1 day ago"
  },
  {
    id: "TICK-982",
    subject: "Route timing adjustment request",
    date: "2023-10-05",
    status: "in-progress",
    lastUpdate: "3 days ago"
  },
  {
    id: "TICK-950",
    subject: "Student behavior report",
    date: "2023-09-28",
    status: "closed",
    lastUpdate: "1 week ago"
  }
];

const CustomerSupportPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketCategory, setTicketCategory] = useState('technical');
  
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Support ticket submitted",
      description: "We've received your request and will respond soon.",
    });
    
    setTicketSubject('');
    setTicketDescription('');
  };
  
  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background shapes */}
      <div className="dashboard-bg-shape"></div>
      <div className="dashboard-bg-shape"></div>
      <div className="dashboard-bg-shape"></div>
      <div className="dashboard-bg-shape"></div>
      
      <NavBar userType="driver" />
      
      <main className="container mx-auto px-4 pt-16 pb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Customer Support</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/driver')}
              className="text-sm"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="faq" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="tickets">My Tickets</TabsTrigger>
                <TabsTrigger value="new-ticket">New Ticket</TabsTrigger>
              </TabsList>
              
              <TabsContent value="faq" className="mt-0">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      placeholder="Search frequently asked questions..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.length > 0 ? (
                      filteredFAQs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))
                    ) : (
                      <div className="text-center py-10 text-gray-500">
                        No FAQs matching your search query
                      </div>
                    )}
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="tickets" className="mt-0">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium">Support Ticket History</h2>
                    <Button 
                      variant="outline" 
                      onClick={() => document.querySelector('[data-value="new-ticket"]')?.click()}
                    >
                      New Ticket
                    </Button>
                  </div>
                  
                  {supportTickets.length > 0 ? (
                    <div className="space-y-4">
                      {supportTickets.map((ticket) => (
                        <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="mb-2 md:mb-0">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">{ticket.subject}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <span>ID: {ticket.id}</span>
                                <span>•</span>
                                <span>Created: {ticket.date}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Badge
                                className={
                                  ticket.status === 'open' 
                                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' 
                                    : ticket.status === 'in-progress' 
                                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' 
                                    : 'bg-green-100 text-green-700 hover:bg-green-100'
                                }
                              >
                                {ticket.status === 'open' && <Clock className="mr-1 h-3 w-3" />}
                                {ticket.status === 'in-progress' && <AlertTriangle className="mr-1 h-3 w-3" />}
                                {ticket.status === 'closed' && <CheckCircle className="mr-1 h-3 w-3" />}
                                {ticket.status === 'open' ? 'Open' : 
                                  ticket.status === 'in-progress' ? 'In Progress' : 'Closed'}
                              </Badge>
                              
                              <Button variant="ghost" size="sm">
                                <ChevronRight className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      You haven't submitted any support tickets yet
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="new-ticket" className="mt-0">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-medium mb-6">Submit a Support Ticket</h2>
                  
                  <form onSubmit={handleSubmitTicket} className="space-y-4">
                    <div>
                      <Label htmlFor="category">Ticket Category</Label>
                      <select 
                        id="category"
                        value={ticketCategory}
                        onChange={(e) => setTicketCategory(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="technical">Technical Issue</option>
                        <option value="route">Route/Schedule Issue</option>
                        <option value="student">Student-Related</option>
                        <option value="maintenance">Bus Maintenance</option>
                        <option value="billing">Billing/Payment</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <textarea 
                        id="description"
                        placeholder="Please provide as much detail as possible..."
                        value={ticketDescription}
                        onChange={(e) => setTicketDescription(e.target.value)}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="file">Attachments (Optional)</Label>
                      <Input id="file" type="file" className="mt-1" />
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" className="w-full sm:w-auto">
                        Submit Ticket
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-lg font-medium mb-4">Contact Support</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone Support</h3>
                    <p className="text-sm text-gray-500 mb-1">Available 8AM-5PM, Mon-Fri</p>
                    <p className="text-brand font-medium">1-800-555-0123</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-sm text-gray-500 mb-1">Response within 24 hours</p>
                    <p className="text-brand font-medium">support@schoolbus.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-sm text-gray-500 mb-1">Available 9AM-4PM, Mon-Fri</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1 text-brand"
                    >
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium mb-4">Your Support Agent</h2>
              
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Sarah Connor</h3>
                  <p className="text-sm text-gray-500">Driver Support Specialist</p>
                  <div className="flex items-center gap-1 mt-1">
                    <User className="h-3 w-3 text-brand" />
                    <span className="text-xs text-brand">Your dedicated agent</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Need help?</p>
                    <p className="text-blue-600 mb-2">Sarah is assigned to help with all your support needs.</p>
                    <Button size="sm" variant="outline" className="bg-white">
                      Message Sarah
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerSupportPage;
