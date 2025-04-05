
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { History, CalendarDays, Bus, MapPin, User, Clock, Filter } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const substituteHistory = [
  { 
    id: 'SUB001', 
    date: '2023-10-14', 
    busNumber: '12',
    routeName: 'North Campus',
    driver: 'John Davis',
    reason: 'Sick Leave',
    status: 'completed',
    coinsEarned: 50,
    stops: 12,
    duration: '1h 45m'
  },
  { 
    id: 'SUB002', 
    date: '2023-10-05', 
    busNumber: '08',
    routeName: 'West Hills',
    driver: 'Sarah Wilson',
    reason: 'Personal Leave',
    status: 'completed',
    coinsEarned: 50,
    stops: 14,
    duration: '2h 10m'
  },
  { 
    id: 'SUB003', 
    date: '2023-09-28', 
    busNumber: '15',
    routeName: 'East Campus',
    driver: 'Robert Brown',
    reason: 'Emergency Leave',
    status: 'completed',
    coinsEarned: 50,
    stops: 10,
    duration: '1h 30m'
  },
  { 
    id: 'SUB004', 
    date: '2023-09-20', 
    busNumber: '04',
    routeName: 'Downtown Route',
    driver: 'Lisa Martinez',
    reason: 'Training',
    status: 'completed',
    coinsEarned: 50,
    stops: 15,
    duration: '2h 05m'
  },
];

const upcomingSubstitutions = [
  { 
    id: 'SUB005', 
    date: '2023-10-20', 
    busNumber: '09',
    routeName: 'South Hills',
    driver: 'James Wilson',
    reason: 'Vacation',
    status: 'scheduled',
    expectedCoins: 50,
    stops: 14,
    duration: '2h 00m'
  },
  { 
    id: 'SUB006', 
    date: '2023-10-25', 
    busNumber: '16',
    routeName: 'Central Campus',
    driver: 'Emily Johnson',
    reason: 'Medical Appointment',
    status: 'scheduled',
    expectedCoins: 50,
    stops: 12,
    duration: '1h 45m'
  },
];

const SubstituteHistoryPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'all' | 'upcoming' | 'past'>('all');
  
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
            <h1 className="text-2xl font-semibold text-gray-800">Substitute History</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/driver')}
              className="text-sm"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <History className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-medium">Total Substitutions</h3>
              </div>
              <p className="text-3xl font-bold text-blue-700">12</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Coins className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-medium">Total Coins Earned</h3>
              </div>
              <p className="text-3xl font-bold text-green-700">600</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Bus className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-medium">Upcoming Substitutions</h3>
              </div>
              <p className="text-3xl font-bold text-purple-700">2</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-brand" />
                <h2 className="text-lg font-medium">Substitution Records</h2>
              </div>
              
              <div className="flex items-center gap-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="space-y-4">
                {upcomingSubstitutions.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Upcoming Substitutions</h3>
                    {upcomingSubstitutions.map((sub) => (
                      <div key={sub.id} className="border rounded-lg p-4 mb-4 hover:bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 md:mb-0">
                            <div className="flex items-center gap-3">
                              <div className="bg-purple-100 p-3 rounded-full">
                                <Bus className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium">Bus #{sub.busNumber}</p>
                                <p className="text-sm text-gray-500">{sub.routeName}</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <CalendarDays className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{sub.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">For: {sub.driver}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200">
                              Scheduled
                            </Badge>
                            <Badge variant="outline" className="border-green-200 text-green-600">
                              <Coins className="h-3 w-3 mr-1" />
                              {sub.expectedCoins} coins
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>Duration: {sub.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>Stops: {sub.stops}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Reason: {sub.reason}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-4">Past Substitutions</h3>
                  {substituteHistory.map((sub) => (
                    <div key={sub.id} className="border rounded-lg p-4 mb-4 hover:bg-gray-50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 md:mb-0">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-3 rounded-full">
                              <Bus className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">Bus #{sub.busNumber}</p>
                              <p className="text-sm text-gray-500">{sub.routeName}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <CalendarDays className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{sub.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">For: {sub.driver}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                            Completed
                          </Badge>
                          <Badge variant="outline" className="border-green-200 text-green-600">
                            <Coins className="h-3 w-3 mr-1" />
                            +{sub.coinsEarned} coins
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>Duration: {sub.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>Stops: {sub.stops}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Reason: {sub.reason}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-0">
              {upcomingSubstitutions.length > 0 ? (
                upcomingSubstitutions.map((sub) => (
                  <div key={sub.id} className="border rounded-lg p-4 mb-4 hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 md:mb-0">
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-100 p-3 rounded-full">
                            <Bus className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium">Bus #{sub.busNumber}</p>
                            <p className="text-sm text-gray-500">{sub.routeName}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{sub.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">For: {sub.driver}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200">
                          Scheduled
                        </Badge>
                        <Badge variant="outline" className="border-green-200 text-green-600">
                          <Coins className="h-3 w-3 mr-1" />
                          {sub.expectedCoins} coins
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>Duration: {sub.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>Stops: {sub.stops}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Reason: {sub.reason}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No upcoming substitutions scheduled
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-0">
              {substituteHistory.map((sub) => (
                <div key={sub.id} className="border rounded-lg p-4 mb-4 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 md:mb-0">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Bus className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Bus #{sub.busNumber}</p>
                          <p className="text-sm text-gray-500">{sub.routeName}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{sub.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">For: {sub.driver}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                        Completed
                      </Badge>
                      <Badge variant="outline" className="border-green-200 text-green-600">
                        <Coins className="h-3 w-3 mr-1" />
                        +{sub.coinsEarned} coins
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Duration: {sub.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>Stops: {sub.stops}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Reason: {sub.reason}</span>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SubstituteHistoryPage;
