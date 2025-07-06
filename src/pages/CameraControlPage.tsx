
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { cn } from '@/lib/utils';
import { 
  ArrowLeft, 
  Camera, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  Clock, 
  Eye, 
  EyeOff,
  Shield,
  Circle,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

type CameraStatus = 'locked' | 'sos' | 'idle' | 'manual_unlock';

interface CabCamera {
  id: string;
  cabNumber: string;
  driver: string;
  route: string;
  location: {
    lat: number;
    lng: number;
  };
  cameraURL: string;
  lastMoved: number;
  sos: boolean;
  status: CameraStatus;
  manualUnlockExpiry?: number;
}

const CameraControlPage = () => {
  const navigate = useNavigate();
  const [selectedCab, setSelectedCab] = useState<string | null>(null);
  const [passwordDialog, setPasswordDialog] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isRecording, setIsRecording] = useState<{ [key: string]: boolean }>({});
  
  // Hardcoded password for demo
  const ADMIN_PASSWORD = 'admin123';
  
  // Mock cab data with camera information
  const [cabCameras, setCabCameras] = useState<CabCamera[]>([
    {
      id: 'cab_001',
      cabNumber: 'TN38A1234',
      driver: 'Rajesh Kumar',
      route: 'Gandhipuram → Pollachi',
      location: { lat: 11.0176, lng: 76.9558 },
      cameraURL: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      lastMoved: Date.now() - 2 * 60 * 1000, // 2 minutes ago
      sos: false,
      status: 'locked'
    },
    {
      id: 'cab_002',
      cabNumber: 'TN38B5678',
      driver: 'Priya Devi',
      route: 'Ukkadam → Eachanari',
      location: { lat: 10.9983, lng: 76.9674 },
      cameraURL: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      lastMoved: Date.now() - 8 * 60 * 1000, // 8 minutes ago (idle)
      sos: false,
      status: 'idle'
    },
    {
      id: 'cab_003',
      cabNumber: 'TN38C9012',
      driver: 'Murugan S',
      route: 'Town Hall → Kinathukadavu',
      location: { lat: 10.9976, lng: 76.9629 },
      cameraURL: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
      lastMoved: Date.now() - 1 * 60 * 1000, // 1 minute ago
      sos: true,
      status: 'sos'
    },
    {
      id: 'cab_004',
      cabNumber: 'TN38D3456',
      driver: 'Lakshmi R',
      route: 'Singanallur → Vadavalli',
      location: { lat: 11.0023, lng: 77.0277 },
      cameraURL: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      lastMoved: Date.now() - 30 * 1000, // 30 seconds ago
      sos: false,
      status: 'locked'
    }
  ]);

  // Update camera statuses based on conditions
  useEffect(() => {
    const interval = setInterval(() => {
      setCabCameras(prev => prev.map(cab => {
        const now = Date.now();
        const timeSinceLastMove = now - cab.lastMoved;
        const fiveMinutes = 5 * 60 * 1000;
        
        // Check manual unlock expiry
        if (cab.status === 'manual_unlock' && cab.manualUnlockExpiry && now > cab.manualUnlockExpiry) {
          return { ...cab, status: 'locked' as CameraStatus, manualUnlockExpiry: undefined };
        }
        
        // Check for idle detection (if not SOS and not manually unlocked)
        if (!cab.sos && cab.status !== 'manual_unlock' && timeSinceLastMove > fiveMinutes) {
          return { ...cab, status: 'idle' as CameraStatus };
        }
        
        // Check for SOS
        if (cab.sos) {
          return { ...cab, status: 'sos' as CameraStatus };
        }
        
        // Default to locked if no special conditions
        if (cab.status !== 'manual_unlock' && !cab.sos && timeSinceLastMove < fiveMinutes) {
          return { ...cab, status: 'locked' as CameraStatus };
        }
        
        return cab;
      }));
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate SOS alert sound effect
  useEffect(() => {
    const sosAlerts = cabCameras.filter(cab => cab.sos);
    if (sosAlerts.length > 0) {
      // Would play alert sound here
      console.log('🚨 SOS Alert Sound');
    }
  }, [cabCameras]);

  const handlePasswordSubmit = (cabId: string) => {
    if (password === ADMIN_PASSWORD) {
      const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000;
      setCabCameras(prev => prev.map(cab =>
        cab.id === cabId
          ? { ...cab, status: 'manual_unlock' as CameraStatus, manualUnlockExpiry: fiveMinutesFromNow }
          : cab
      ));
      setPasswordDialog(null);
      setPassword('');
      toast.success('Camera unlocked for 5 minutes');
    } else {
      toast.error('Incorrect password');
      setPassword('');
    }
  };

  const getCameraStatusInfo = (cab: CabCamera) => {
    switch (cab.status) {
      case 'sos':
        return {
          label: '🚨 SOS - Live Camera Enabled',
          color: 'bg-red-100 text-red-800 border-red-200',
          canView: true,
          autoRecord: true
        };
      case 'idle':
        return {
          label: '⚠️ Idle Detected: Camera Activated',
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          canView: true,
          autoRecord: false
        };
      case 'manual_unlock':
        const timeLeft = cab.manualUnlockExpiry ? Math.ceil((cab.manualUnlockExpiry - Date.now()) / 1000 / 60) : 0;
        return {
          label: `🔓 Manual Unlock (${timeLeft}m left)`,
          color: 'bg-green-100 text-green-800 border-green-200',
          canView: true,
          autoRecord: false
        };
      default:
        return {
          label: '🔒 Camera Locked',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          canView: false,
          autoRecord: false
        };
    }
  };

  const toggleRecording = (cabId: string) => {
    setIsRecording(prev => ({ ...prev, [cabId]: !prev[cabId] }));
    const isNowRecording = !isRecording[cabId];
    toast.success(isNowRecording ? 'Recording started' : 'Recording stopped');
  };

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    return `${minutes} minutes ago`;
  };

  const simulateSOSToggle = (cabId: string) => {
    setCabCameras(prev => prev.map(cab =>
      cab.id === cabId ? { ...cab, sos: !cab.sos } : cab
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 mt-4">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="outline"
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Camera Control Center</h1>
              <p className="text-gray-600 mt-1">Monitor cab cameras with intelligent access control</p>
            </div>
          </div>

          {/* Camera Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cabCameras.map((cab) => {
              const statusInfo = getCameraStatusInfo(cab);
              
              return (
                <Card key={cab.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">
                        CAB #{cab.cabNumber}
                      </CardTitle>
                      <Badge className={cn('px-3 py-1 text-xs font-medium', statusInfo.color)}>
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Driver: {cab.driver}</div>
                      <div>Route: {cab.route}</div>
                      <div>Last Update: {getTimeAgo(cab.lastMoved)}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Camera View Area */}
                    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                      {statusInfo.canView ? (
                        <div className="relative w-full h-full">
                          {/* Simulated Camera Feed */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center">
                            <div className="text-center text-white">
                              <Camera className="h-12 w-12 mx-auto mb-2 animate-pulse" />
                              <div className="text-sm font-medium">Live Camera Feed</div>
                              <div className="text-xs opacity-75 mt-1">Streaming from {cab.cabNumber}</div>
                            </div>
                          </div>
                          
                          {/* Live Status Indicator */}
                          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                            <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                            LIVE
                          </div>
                          
                          {/* Recording Indicator */}
                          {(statusInfo.autoRecord || isRecording[cab.id]) && (
                            <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                              <Circle className="h-3 w-3" />
                              REC
                            </div>
                          )}
                          
                          {/* Camera Controls */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => toggleRecording(cab.id)}
                                className="bg-black/50 hover:bg-black/70 text-white border-0"
                              >
                                {isRecording[cab.id] ? <Pause className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="bg-black/50 hover:bg-black/70 text-white border-0"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-white text-xs bg-black/50 px-2 py-1 rounded">
                              {new Date().toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          {/* Blurred/Locked View */}
                          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                            <div className="text-center text-gray-400">
                              <Lock className="h-12 w-12 mx-auto mb-2" />
                              <div className="text-sm font-medium">Camera Locked</div>
                              <div className="text-xs opacity-75 mt-1">Password required to view</div>
                            </div>
                          </div>
                          
                          {/* Blur Effect Overlay */}
                          <div className="absolute inset-0 backdrop-blur-lg bg-black/30"></div>
                        </div>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {!statusInfo.canView && (
                          <Dialog open={passwordDialog === cab.id} onOpenChange={(open) => !open && setPasswordDialog(null)}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                onClick={() => setPasswordDialog(cab.id)}
                                className="flex items-center gap-2"
                              >
                                <Unlock className="h-4 w-4" />
                                Unlock Camera
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Enter Admin Password</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Password</label>
                                  <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="mt-1"
                                    onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit(cab.id)}
                                  />
                                  <p className="text-xs text-gray-500 mt-1">Demo password: admin123</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button onClick={() => handlePasswordSubmit(cab.id)} className="flex-1">
                                    Unlock
                                  </Button>
                                  <Button variant="outline" onClick={() => setPasswordDialog(null)}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        
                        {cab.status === 'sos' && (
                          <Button
                            variant="destructive"
                            className="flex items-center gap-2"
                            onClick={() => toast.info('Emergency response initiated')}
                          >
                            <Shield className="h-4 w-4" />
                            Respond to SOS
                          </Button>
                        )}
                      </div>
                      
                      {/* Demo Controls */}
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => simulateSOSToggle(cab.id)}
                          className="text-xs"
                        >
                          {cab.sos ? 'Clear SOS' : 'Trigger SOS'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Legend */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Camera Access Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Badge className="bg-gray-100 text-gray-800 border-gray-200">🔒 Locked</Badge>
                  <span>Password required to view</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800 border-red-200">🚨 SOS Active</Badge>
                  <span>Emergency - Auto enabled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">⚠️ Idle</Badge>
                  <span>Cab idle for 5+ minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 border-green-200">🔓 Unlocked</Badge>
                  <span>Manual unlock (5 min timer)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CameraControlPage;
