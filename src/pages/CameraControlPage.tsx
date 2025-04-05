
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import NavBar from '@/components/NavBar';
import { Camera, Video, AlertTriangle, Bell, Search, Bus, User } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const BusCamera = ({ id, name, status, isEmergency = false, onView }: {
  id: string;
  name: string;
  status: 'online' | 'offline';
  isEmergency?: boolean;
  onView: () => void;
}) => (
  <Card className={`overflow-hidden ${isEmergency ? 'border-red-500 shadow-lg shadow-red-200' : ''}`}>
    <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
      {status === 'online' ? (
        <div className="w-full h-full relative">
          <img 
            src={`https://source.unsplash.com/random/800x450?bus-interior&sig=${id}`} 
            alt={`Bus ${name} camera feed`}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Badge variant={isEmergency ? "destructive" : "outline"} className="bg-black/50 backdrop-blur-sm">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-gray-500'} animate-pulse`}></div>
                LIVE
              </div>
            </Badge>
            {isEmergency && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="w-3 h-3 mr-1" /> SOS
              </Badge>
            )}
          </div>
          <div className="absolute bottom-2 left-2 text-xs text-white font-mono bg-black/50 px-2 py-1 rounded">
            Bus {name} • {new Date().toLocaleTimeString()}
          </div>
        </div>
      ) : (
        <div className="text-gray-400 flex flex-col items-center gap-2">
          <Camera className="w-10 h-10" />
          <p>Camera Offline</p>
        </div>
      )}
    </div>
    <CardContent className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Bus {name}</h3>
          <p className="text-sm text-gray-500">
            {status === 'online' ? 'Connected' : 'Disconnected'}
          </p>
        </div>
        <Button size="sm" variant={isEmergency ? "destructive" : "default"} onClick={onView}>
          <Camera className="w-4 h-4 mr-2" /> View {isEmergency && "SOS"}
        </Button>
      </div>
    </CardContent>
  </Card>
);

const CameraControlPage: React.FC = () => {
  const { toast } = useToast();
  const [activeCamera, setActiveCamera] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [recordingEnabled, setRecordingEnabled] = useState<Record<string, boolean>>({
    'B001': true,
    'B002': true,
    'B003': false,
    'B004': true,
    'B005': false,
    'B006': true,
  });

  // Mock SOS alerts
  const [sosAlerts, setSosAlerts] = useState([
    { id: 'SOS001', busId: 'B003', timestamp: new Date(), resolved: false, type: 'student' },
  ]);

  const busCameras = [
    { id: 'B001', name: '001', status: 'online' as const, driver: 'John Smith' },
    { id: 'B002', name: '002', status: 'online' as const, driver: 'Sarah Johnson' },
    { id: 'B003', name: '003', status: 'online' as const, driver: 'Mike Davis' },
    { id: 'B004', name: '004', status: 'offline' as const, driver: 'Emily Wilson' },
    { id: 'B005', name: '005', status: 'online' as const, driver: 'David Brown' },
    { id: 'B006', name: '006', status: 'online' as const, driver: 'Lisa Thompson' },
  ];

  const handleViewCamera = (busId: string) => {
    setActiveCamera(busId);
    
    // Check if it's an SOS camera
    const isEmergency = sosAlerts.some(alert => alert.busId === busId && !alert.resolved);
    
    if (isEmergency) {
      toast({
        variant: "destructive",
        title: "Emergency Alert",
        description: "Connected to emergency camera feed. Authorities have been notified.",
      });
    } else {
      toast({
        title: "Camera Connected",
        description: `Now viewing live feed from Bus ${busId.replace('B', '')}`,
      });
    }
  };

  const handleResolveSOS = (alertId: string) => {
    setSosAlerts(alerts => 
      alerts.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      )
    );
    
    toast({
      title: "SOS Alert Resolved",
      description: "The emergency has been marked as resolved.",
    });
  };

  const handleToggleRecording = (busId: string) => {
    setRecordingEnabled(prev => ({
      ...prev,
      [busId]: !prev[busId]
    }));
    
    toast({
      title: recordingEnabled[busId] ? "Recording Disabled" : "Recording Enabled",
      description: `Automatic recording has been ${recordingEnabled[busId] ? 'disabled' : 'enabled'} for Bus ${busId.replace('B', '')}`,
    });
  };

  const filteredCameras = busCameras
    .filter(camera => {
      if (filter === 'online') return camera.status === 'online';
      if (filter === 'offline') return camera.status === 'offline';
      if (filter === 'emergency') {
        return sosAlerts.some(alert => alert.busId === camera.id && !alert.resolved);
      }
      return true;
    })
    .filter(camera => 
      camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camera.driver.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <NavBar userType="admin" />
        
        <main className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Live Camera Monitoring</h1>
              <p className="text-gray-500">Monitor and control all bus cameras from a central dashboard</p>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0">
              <div className="relative mr-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search buses or drivers..."
                  className="pl-8 w-[200px] md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button
                variant="outline"
                className={sosAlerts.some(a => !a.resolved) ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100" : ""}
                onClick={() => setFilter('emergency')}
              >
                <AlertTriangle className={`h-4 w-4 mr-2 ${sosAlerts.some(a => !a.resolved) ? "text-red-600" : ""}`} />
                {sosAlerts.filter(a => !a.resolved).length > 0 ? `${sosAlerts.filter(a => !a.resolved).length} Active SOS` : "No Alerts"}
              </Button>
            </div>
          </div>
          
          {sosAlerts.some(alert => !alert.resolved) && (
            <div className="mb-6">
              <Card className="border-red-500 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                      <div>
                        <h3 className="font-semibold text-red-800">Emergency SOS Alert</h3>
                        <p className="text-red-700 text-sm">
                          {sosAlerts.filter(a => !a.resolved).length} active emergency alert(s) from {
                            sosAlerts.filter(a => !a.resolved).map(a => `Bus ${a.busId.replace('B', '')}`).join(', ')
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex mt-3 md:mt-0">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mr-2 border-red-300 text-red-700 hover:bg-red-200"
                        onClick={() => {
                          const unresolvedAlert = sosAlerts.find(a => !a.resolved);
                          if (unresolvedAlert) {
                            handleViewCamera(unresolvedAlert.busId);
                          }
                        }}
                      >
                        <Camera className="h-4 w-4 mr-1" /> View Camera
                      </Button>
                      
                      <Button 
                        size="sm" 
                        onClick={() => {
                          const unresolvedAlert = sosAlerts.find(a => !a.resolved);
                          if (unresolvedAlert) {
                            handleResolveSOS(unresolvedAlert.id);
                          }
                        }}
                      >
                        Resolve Alert
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <Tabs defaultValue="grid" className="mb-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="active">Active Camera</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline" 
                  size="sm" 
                  className={filter === 'all' ? 'bg-gray-100' : ''} 
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant="outline" 
                  size="sm" 
                  className={filter === 'online' ? 'bg-gray-100' : ''} 
                  onClick={() => setFilter('online')}
                >
                  Online
                </Button>
                <Button
                  variant="outline" 
                  size="sm" 
                  className={filter === 'offline' ? 'bg-gray-100' : ''} 
                  onClick={() => setFilter('offline')}
                >
                  Offline
                </Button>
              </div>
            </div>
            
            <TabsContent value="grid" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCameras.map((camera) => (
                  <BusCamera 
                    key={camera.id}
                    id={camera.id}
                    name={camera.name}
                    status={camera.status}
                    isEmergency={sosAlerts.some(alert => alert.busId === camera.id && !alert.resolved)}
                    onView={() => handleViewCamera(camera.id)}
                  />
                ))}
                
                {filteredCameras.length === 0 && (
                  <div className="col-span-3 py-12 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <Camera className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No cameras found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search terms</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="active" className="mt-4">
              {activeCamera ? (
                <div className="space-y-4">
                  <Card className="overflow-hidden">
                    <div className="relative aspect-video bg-gray-900">
                      {busCameras.find(c => c.id === activeCamera)?.status === 'online' ? (
                        <div className="w-full h-full relative">
                          <img 
                            src={`https://source.unsplash.com/random/1200x800?bus-interior&sig=${activeCamera}`} 
                            alt={`Bus camera feed`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4 flex flex-col gap-2">
                            <Badge className="bg-black/50 backdrop-blur-sm">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                LIVE
                              </div>
                            </Badge>
                            {sosAlerts.some(alert => alert.busId === activeCamera && !alert.resolved) && (
                              <Badge variant="destructive" className="animate-pulse">
                                <AlertTriangle className="w-3 h-3 mr-1" /> SOS ACTIVE
                              </Badge>
                            )}
                          </div>
                          <div className="absolute bottom-4 left-4 font-mono bg-black/50 px-2 py-1 rounded">
                            Bus {busCameras.find(c => c.id === activeCamera)?.name} • {new Date().toLocaleTimeString()}
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-gray-400 flex flex-col items-center gap-2">
                            <Camera className="w-16 h-16" />
                            <p className="text-xl">Camera Offline</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h2 className="text-xl font-semibold mb-1">
                            Bus {busCameras.find(c => c.id === activeCamera)?.name} Camera Feed
                          </h2>
                          <p className="text-gray-500 mb-4">
                            Driver: {busCameras.find(c => c.id === activeCamera)?.driver}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-6 mt-4 md:mt-0">
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="recording" 
                              checked={recordingEnabled[activeCamera] || false}
                              onCheckedChange={() => handleToggleRecording(activeCamera)}
                            />
                            <label htmlFor="recording" className="text-sm font-medium">
                              {recordingEnabled[activeCamera] ? "Recording Enabled" : "Recording Disabled"}
                            </label>
                          </div>
                          
                          <Button variant="outline" className="gap-2">
                            <Video className="h-4 w-4" />
                            Download Footage
                          </Button>
                        </div>
                      </div>
                      
                      {sosAlerts.some(alert => alert.busId === activeCamera && !alert.resolved) && (
                        <div className="mt-6 p-4 border border-red-300 bg-red-50 rounded-md">
                          <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                            <div className="flex-1">
                              <h3 className="font-semibold text-red-800">Emergency Alert Details</h3>
                              <p className="text-red-700 text-sm mb-4">
                                SOS alert triggered by {
                                  sosAlerts.find(alert => alert.busId === activeCamera && !alert.resolved)?.type === 'student' 
                                    ? 'a student' 
                                    : 'the driver'
                                } at {
                                  sosAlerts.find(alert => alert.busId === activeCamera && !alert.resolved)?.timestamp.toLocaleTimeString()
                                }
                              </p>
                              <div className="flex space-x-3">
                                <Button 
                                  size="sm" 
                                  variant="destructive" 
                                  onClick={() => {
                                    const alertToResolve = sosAlerts.find(alert => alert.busId === activeCamera && !alert.resolved);
                                    if (alertToResolve) {
                                      handleResolveSOS(alertToResolve.id);
                                    }
                                  }}
                                >
                                  Resolve Emergency
                                </Button>
                                <Button size="sm" variant="outline">Contact Authorities</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Route Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Current route:</span>
                            <span className="font-medium">Route #42</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Next stop:</span>
                            <span className="font-medium">Westlake Station</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">ETA:</span>
                            <span className="font-medium">5 minutes</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Students on board:</span>
                            <span className="font-medium">17</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Vehicle Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Speed:</span>
                            <span className="font-medium">28 mph</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Fuel level:</span>
                            <span className="font-medium">72%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Engine status:</span>
                            <span className="font-medium text-green-600">Normal</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Last maintenance:</span>
                            <span className="font-medium">2 weeks ago</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Camera Controls</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" className="h-auto py-2">Front View</Button>
                            <Button variant="outline" size="sm" className="h-auto py-2">Rear View</Button>
                            <Button variant="outline" size="sm" className="h-auto py-2">Driver View</Button>
                            <Button variant="outline" size="sm" className="h-auto py-2">Door View</Button>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Brightness</span>
                              <span className="text-sm font-medium">65%</span>
                            </div>
                            <input type="range" className="w-full" defaultValue={65} />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Contrast</span>
                              <span className="text-sm font-medium">50%</span>
                            </div>
                            <input type="range" className="w-full" defaultValue={50} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="text-center py-24">
                  <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">No camera selected</h3>
                  <p className="text-gray-500 mb-4">Select a camera from the grid view to see its live feed</p>
                  <Button onClick={() => setFilter('all')}>View All Cameras</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="map" className="mt-4">
              <Card>
                <CardContent className="p-0 h-[600px] relative">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <Bus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium">Bus Location Map</h3>
                      <p className="text-gray-500 mb-4">View the real-time location of all buses</p>
                      <p className="text-xs text-gray-400">Map view would be implemented here with bus locations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </PageTransition>
  );
};

export default CameraControlPage;
