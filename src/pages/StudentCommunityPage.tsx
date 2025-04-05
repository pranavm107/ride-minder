
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import NavBar from '@/components/NavBar';
import { Send, MessageSquare, Bell, Users, Pin, Image, Smile, PlusCircle, AlertTriangle, Megaphone } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    role: 'student' | 'driver' | 'admin';
  };
  timestamp: Date;
  isAnnouncement?: boolean;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  sender: {
    name: string;
    role: 'driver' | 'admin';
  };
  timestamp: Date;
  isPinned: boolean;
  isAlert?: boolean;
}

const StudentCommunityPage: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock current user
  const currentUser = {
    id: 'USR001',
    name: 'Alex Johnson',
    avatar: '',
    role: 'student' as const,
  };
  
  // Mock messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'MSG001',
      content: 'Good morning everyone! Hope you all have a great day at school.',
      sender: {
        id: 'DRV001',
        name: 'Mr. Smith',
        avatar: '',
        role: 'driver',
      },
      timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
    },
    {
      id: 'MSG002',
      content: 'Thanks, Mr. Smith! Is everyone ready for the math test today?',
      sender: {
        id: 'USR002',
        name: 'Emma Wilson',
        avatar: '',
        role: 'student',
      },
      timestamp: new Date(new Date().setHours(new Date().getHours() - 1, new Date().getMinutes() - 45)),
    },
    {
      id: 'MSG003',
      content: "I studied all night, but I'm still nervous about it!",
      sender: {
        id: 'USR003',
        name: 'Jacob Taylor',
        avatar: '',
        role: 'student',
      },
      timestamp: new Date(new Date().setHours(new Date().getHours() - 1, new Date().getMinutes() - 40)),
    },
    {
      id: 'MSG004',
      content: "You'll do great, Jacob! We can review some problems together on the way if you want.",
      sender: {
        id: 'USR004',
        name: 'Sophia Martinez',
        avatar: '',
        role: 'student',
      },
      timestamp: new Date(new Date().setHours(new Date().getHours() - 1, new Date().getMinutes() - 30)),
    },
    {
      id: 'MSG005',
      content: "Hey everyone, don't forget we have basketball practice after school today!",
      sender: {
        id: 'USR005',
        name: 'Daniel Brown',
        avatar: '',
        role: 'student',
      },
      timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 20)),
    },
    {
      id: 'MSG006',
      content: "We'll be arriving at the school in approximately 10 minutes. Please make sure you have all your belongings ready.",
      sender: {
        id: 'DRV001',
        name: 'Mr. Smith',
        avatar: '',
        role: 'driver',
      },
      timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 10)),
      isAnnouncement: true,
    },
  ]);
  
  // Mock announcements
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 'ANN001',
      title: 'Schedule Change Tomorrow',
      content: 'Due to road construction, the bus will be arriving 15 minutes earlier than usual tomorrow morning. Please be ready at 7:15 AM instead of 7:30 AM.',
      sender: {
        name: 'Mr. Smith',
        role: 'driver',
      },
      timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
      isPinned: true,
    },
    {
      id: 'ANN002',
      title: 'New Bus Rules',
      content: "Please remember to keep the aisle clear of backpacks and to remain seated while the bus is in motion. These rules are for everyone's safety.",
      sender: {
        name: 'Transportation Office',
        role: 'admin',
      },
      timestamp: new Date(new Date().setDate(new Date().getDate() - 3)),
      isPinned: false,
    },
    {
      id: 'ANN003',
      title: 'Bus Maintenance Day',
      content: "This Friday, Bus #42 will be unavailable due to scheduled maintenance. A substitute bus will be provided, but please note it might look different from what you're used to.",
      sender: {
        name: 'Transportation Office',
        role: 'admin',
      },
      timestamp: new Date(new Date().setDate(new Date().getDate() - 5)),
      isPinned: false,
    },
    {
      id: 'ANN004',
      title: 'Weather Alert: Heavy Snow Expected',
      content: "Due to forecast of heavy snow, there might be delays tomorrow morning. We'll send updates if there are any changes to the schedule. Please dress warmly and be careful when boarding.",
      sender: {
        name: 'Transportation Office',
        role: 'admin',
      },
      timestamp: new Date(new Date().setHours(new Date().getHours() - 4)),
      isPinned: true,
      isAlert: true,
    },
  ]);
  
  // Mock bus mates
  const busMates = [
    { id: 'USR002', name: 'Emma Wilson', avatar: '', status: 'active' },
    { id: 'USR003', name: 'Jacob Taylor', avatar: '', status: 'active' },
    { id: 'USR004', name: 'Sophia Martinez', avatar: '', status: 'active' },
    { id: 'USR005', name: 'Daniel Brown', avatar: '', status: 'active' },
    { id: 'USR006', name: 'Olivia Johnson', avatar: '', status: 'inactive' },
    { id: 'USR007', name: 'William Davis', avatar: '', status: 'inactive' },
    { id: 'USR008', name: 'Ava Garcia', avatar: '', status: 'active' },
    { id: 'USR009', name: 'James Wilson', avatar: '', status: 'inactive' },
    { id: 'DRV001', name: 'Mr. Smith', avatar: '', status: 'active', role: 'driver' },
  ];
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };
  
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      });
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    const newMsg: Message = {
      id: `MSG${Math.floor(Math.random() * 1000)}`,
      content: newMessage,
      sender: currentUser,
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage('');
  };
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <NavBar userType="student" />
        
        <main className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Bus Community</h1>
            <p className="text-gray-500">Connect with your fellow passengers and stay updated on bus announcements</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="col-span-3">
              <Card className="h-[700px] flex flex-col">
                <CardHeader className="px-6 py-4 border-b">
                  <Tabs defaultValue="general" onValueChange={setActiveTab}>
                    <div className="flex justify-between items-center">
                      <TabsList>
                        <TabsTrigger value="general" className="gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>General Chat</span>
                        </TabsTrigger>
                        <TabsTrigger value="announcements" className="gap-2">
                          <Megaphone className="h-4 w-4" />
                          <span>Announcements</span>
                          {announcements.filter(a => a.isAlert).length > 0 && (
                            <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                              {announcements.filter(a => a.isAlert).length}
                            </Badge>
                          )}
                        </TabsTrigger>
                      </TabsList>
                      
                      <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Tabs>
                </CardHeader>
                
                <TabsContent value="general" className="flex-1 flex flex-col px-0 m-0 overflow-hidden">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message, index) => {
                        // Check if we need to show date separator
                        const showDateSeparator =
                          index === 0 ||
                          formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
                        
                        return (
                          <React.Fragment key={message.id}>
                            {showDateSeparator && (
                              <div className="flex items-center my-6">
                                <div className="flex-grow h-px bg-gray-200"></div>
                                <span className="px-3 text-xs text-gray-500 font-medium">
                                  {formatDate(message.timestamp)}
                                </span>
                                <div className="flex-grow h-px bg-gray-200"></div>
                              </div>
                            )}
                            
                            <div className={`flex ${message.sender.id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                              <div className={`flex max-w-[70%] ${message.sender.id === currentUser.id ? 'flex-row-reverse' : ''}`}>
                                {message.sender.id !== currentUser.id && (
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarFallback className={
                                      message.sender.role === 'driver' 
                                        ? 'bg-blue-100 text-blue-600' 
                                        : message.sender.role === 'admin' 
                                          ? 'bg-purple-100 text-purple-600' 
                                          : 'bg-gray-100'
                                    }>
                                      {getInitials(message.sender.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                                
                                <div className={`${message.sender.id === currentUser.id ? 'mr-2' : 'ml-2'}`}>
                                  {message.sender.id !== currentUser.id && (
                                    <div className="flex items-center mb-1">
                                      <span className="text-sm font-medium mr-2">{message.sender.name}</span>
                                      {message.sender.role === 'driver' && (
                                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-100">
                                          Driver
                                        </Badge>
                                      )}
                                      {message.sender.role === 'admin' && (
                                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-600 border-purple-100">
                                          Admin
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                  
                                  <div className={`rounded-lg p-3 inline-block relative ${
                                    message.isAnnouncement 
                                      ? 'bg-amber-50 border border-amber-200 text-amber-800' 
                                      : message.sender.id === currentUser.id 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {message.isAnnouncement && (
                                      <Megaphone className="h-4 w-4 inline-block mr-1 text-amber-500" />
                                    )}
                                    <span>{message.content}</span>
                                    <span className={`text-xs block mt-1 ${
                                      message.sender.id === currentUser.id 
                                        ? 'text-blue-200' 
                                        : message.isAnnouncement
                                          ? 'text-amber-500'
                                          : 'text-gray-500'
                                    }`}>
                                      {formatTime(message.timestamp)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  <CardFooter className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="w-full flex space-x-2">
                      <div className="flex items-center">
                        <Button variant="ghost" size="icon" type="button" className="h-8 w-8">
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" type="button" className="h-8 w-8">
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      
                      <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="announcements" className="flex-1 overflow-hidden m-0 p-0">
                  <ScrollArea className="h-full p-4">
                    {announcements.filter(a => a.isPinned).length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <Pin className="h-4 w-4 mr-2 text-amber-500" />
                          <h3 className="font-medium text-sm">Pinned Announcements</h3>
                        </div>
                        
                        <div className="space-y-3">
                          {announcements
                            .filter(a => a.isPinned)
                            .map((announcement) => (
                              <Card key={announcement.id} className={`border ${announcement.isAlert ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'}`}>
                                <CardContent className="p-4">
                                  <div className="flex items-start">
                                    {announcement.isAlert ? (
                                      <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 text-red-500" />
                                    ) : (
                                      <Megaphone className="h-5 w-5 mr-3 mt-0.5 text-amber-500" />
                                    )}
                                    
                                    <div>
                                      <div className="flex items-center mb-1">
                                        <h4 className={`font-semibold text-sm ${announcement.isAlert ? 'text-red-700' : 'text-amber-700'}`}>
                                          {announcement.title}
                                        </h4>
                                        {announcement.isAlert && (
                                          <Badge variant="destructive" className="ml-2 text-xs">Alert</Badge>
                                        )}
                                      </div>
                                      
                                      <p className={`text-sm ${announcement.isAlert ? 'text-red-600' : 'text-amber-600'}`}>
                                        {announcement.content}
                                      </p>
                                      
                                      <div className="flex items-center mt-2 text-xs text-gray-500">
                                        <span>From: {announcement.sender.name}</span>
                                        <span className="mx-2">•</span>
                                        <span>{formatDate(announcement.timestamp)} at {formatTime(announcement.timestamp)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <h3 className="font-medium text-sm mb-2">All Announcements</h3>
                      
                      {announcements
                        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                        .map((announcement) => (
                          <Card key={announcement.id} className={`${
                            announcement.isAlert 
                              ? 'border-red-200 bg-red-50' 
                              : announcement.isPinned 
                                ? 'border-amber-200 bg-amber-50' 
                                : ''
                          }`}>
                            <CardContent className="p-4">
                              <div className="flex items-start">
                                {announcement.isAlert ? (
                                  <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 text-red-500" />
                                ) : (
                                  <Megaphone className="h-5 w-5 mr-3 mt-0.5 text-amber-500" />
                                )}
                                
                                <div>
                                  <div className="flex items-center mb-1">
                                    <h4 className={`font-semibold text-sm ${
                                      announcement.isAlert 
                                        ? 'text-red-700' 
                                        : announcement.isPinned 
                                          ? 'text-amber-700' 
                                          : 'text-gray-800'
                                    }`}>
                                      {announcement.title}
                                    </h4>
                                    {announcement.isAlert && (
                                      <Badge variant="destructive" className="ml-2 text-xs">Alert</Badge>
                                    )}
                                    {announcement.isPinned && !announcement.isAlert && (
                                      <Badge variant="outline" className="ml-2 text-xs bg-amber-100 border-amber-200 text-amber-700">Pinned</Badge>
                                    )}
                                  </div>
                                  
                                  <p className={`text-sm ${
                                    announcement.isAlert 
                                      ? 'text-red-600' 
                                      : announcement.isPinned 
                                        ? 'text-amber-600' 
                                        : 'text-gray-600'
                                  }`}>
                                    {announcement.content}
                                  </p>
                                  
                                  <div className="flex items-center mt-2 text-xs text-gray-500">
                                    <span>From: {announcement.sender.name}</span>
                                    <span className="mx-2">•</span>
                                    <span>{formatDate(announcement.timestamp)} at {formatTime(announcement.timestamp)}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Card>
            </div>
            
            <div className="hidden lg:block">
              <Card className="h-[700px]">
                <CardHeader className="px-4 py-3 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-md font-semibold">Bus Mates</CardTitle>
                    <Badge>{busMates.filter(u => u.status === 'active').length} Online</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <ScrollArea className="h-[625px]">
                    <div className="py-2">
                      {busMates.filter(user => user.role === 'driver').length > 0 && (
                        <>
                          <div className="px-4 py-2">
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</h3>
                          </div>
                          
                          {busMates
                            .filter(user => user.role === 'driver')
                            .map((user) => (
                              <div key={user.id} className="px-4 py-2 hover:bg-gray-50">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-3">
                                    <AvatarFallback className="bg-blue-100 text-blue-600">{getInitials(user.name)}</AvatarFallback>
                                  </Avatar>
                                  
                                  <div>
                                    <div className="flex items-center">
                                      <span className="font-medium text-sm">{user.name}</span>
                                      <Badge variant="outline" className="ml-2 text-xs bg-blue-50 text-blue-600 border-blue-100">
                                        Driver
                                      </Badge>
                                    </div>
                                    
                                    <div className="flex items-center mt-1">
                                      <div className={`h-2 w-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                      <span className="text-xs text-gray-500 ml-1">
                                        {user.status === 'active' ? 'Online' : 'Offline'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          
                          <Separator className="my-2" />
                        </>
                      )}
                      
                      <div className="px-4 py-2">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Students</h3>
                      </div>
                      
                      {busMates
                        .filter(user => !user.role || user.role === 'student')
                        .sort((a, b) => {
                          // Sort active users first
                          if (a.status === 'active' && b.status !== 'active') return -1;
                          if (a.status !== 'active' && b.status === 'active') return 1;
                          
                          // Then sort by name
                          return a.name.localeCompare(b.name);
                        })
                        .map((user) => (
                          <div key={user.id} className={`px-4 py-2 hover:bg-gray-50 ${user.id === currentUser.id ? 'bg-blue-50' : ''}`}>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                              </Avatar>
                              
                              <div>
                                <div className="flex items-center">
                                  <span className={`font-medium text-sm ${user.id === currentUser.id ? 'text-blue-600' : ''}`}>
                                    {user.name}
                                    {user.id === currentUser.id && ' (You)'}
                                  </span>
                                </div>
                                
                                <div className="flex items-center mt-1">
                                  <div className={`h-2 w-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                  <span className="text-xs text-gray-500 ml-1">
                                    {user.status === 'active' ? 'Online' : 'Offline'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default StudentCommunityPage;
