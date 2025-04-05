
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import NavBar from '@/components/NavBar';
import { FileText, Upload, Calendar, User, Search, CheckCircle, AlertCircle, Clock, Plus } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

interface DriverDocument {
  id: string;
  type: 'license' | 'rcBook' | 'insurance' | 'fitnessTest' | 'other';
  driverId: string;
  driverName: string;
  busId: string;
  documentNumber: string;
  issuedDate: string;
  expiryDate: string;
  status: 'valid' | 'expired' | 'expiringSoon';
  fileUrl: string;
}

const DriverDocumentsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [documents, setDocuments] = useState<DriverDocument[]>([
    {
      id: 'DOC001',
      type: 'license',
      driverId: 'DRV001',
      driverName: 'John Smith',
      busId: 'B001',
      documentNumber: 'DL98765432',
      issuedDate: '2021-06-15',
      expiryDate: '2026-06-14',
      status: 'valid',
      fileUrl: '/placeholder.svg',
    },
    {
      id: 'DOC002',
      type: 'rcBook',
      driverId: 'DRV001',
      driverName: 'John Smith',
      busId: 'B001',
      documentNumber: 'RC12345678',
      issuedDate: '2020-03-10',
      expiryDate: '2025-03-09',
      status: 'valid',
      fileUrl: '/placeholder.svg',
    },
    {
      id: 'DOC003',
      type: 'insurance',
      driverId: 'DRV002',
      driverName: 'Sarah Johnson',
      busId: 'B002',
      documentNumber: 'INS87654321',
      issuedDate: '2022-01-20',
      expiryDate: '2023-01-19',
      status: 'expired',
      fileUrl: '/placeholder.svg',
    },
    {
      id: 'DOC004',
      type: 'license',
      driverId: 'DRV002',
      driverName: 'Sarah Johnson',
      busId: 'B002',
      documentNumber: 'DL12378945',
      issuedDate: '2019-08-05',
      expiryDate: '2024-08-04',
      status: 'expiringSoon',
      fileUrl: '/placeholder.svg',
    },
    {
      id: 'DOC005',
      type: 'fitnessTest',
      driverId: 'DRV003',
      driverName: 'Mike Davis',
      busId: 'B003',
      documentNumber: 'FT24680135',
      issuedDate: '2022-11-12',
      expiryDate: '2023-11-11',
      status: 'valid',
      fileUrl: '/placeholder.svg',
    },
    {
      id: 'DOC006',
      type: 'rcBook',
      driverId: 'DRV003',
      driverName: 'Mike Davis',
      busId: 'B003',
      documentNumber: 'RC98761234',
      issuedDate: '2021-09-30',
      expiryDate: '2031-09-29',
      status: 'valid',
      fileUrl: '/placeholder.svg',
    },
  ]);
  
  const [isAddingDocument, setIsAddingDocument] = useState(false);
  const [newDocument, setNewDocument] = useState<Partial<DriverDocument>>({
    type: 'license',
    driverId: '',
    driverName: '',
    busId: '',
    documentNumber: '',
    issuedDate: '',
    expiryDate: '',
  });
  
  const [viewingDocument, setViewingDocument] = useState<DriverDocument | null>(null);
  
  const handleAddDocument = () => {
    if (!newDocument.driverId || !newDocument.driverName || !newDocument.documentNumber || !newDocument.issuedDate || !newDocument.expiryDate) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill all required fields.",
      });
      return;
    }
    
    const today = new Date();
    const expiryDate = new Date(newDocument.expiryDate);
    let status: 'valid' | 'expired' | 'expiringSoon' = 'valid';
    
    if (expiryDate < today) {
      status = 'expired';
    } else if ((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) < 30) {
      status = 'expiringSoon';
    }
    
    const newDoc: DriverDocument = {
      id: `DOC${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      type: newDocument.type as any,
      driverId: newDocument.driverId,
      driverName: newDocument.driverName,
      busId: newDocument.busId || 'N/A',
      documentNumber: newDocument.documentNumber,
      issuedDate: newDocument.issuedDate,
      expiryDate: newDocument.expiryDate,
      status,
      fileUrl: '/placeholder.svg',
    };
    
    setDocuments([...documents, newDoc]);
    setIsAddingDocument(false);
    setNewDocument({
      type: 'license',
      driverId: '',
      driverName: '',
      busId: '',
      documentNumber: '',
      issuedDate: '',
      expiryDate: '',
    });
    
    toast({
      title: "Document Added",
      description: `${getDocumentTypeName(newDoc.type)} for ${newDoc.driverName} has been added successfully.`,
    });
  };
  
  const getDocumentTypeName = (type: string): string => {
    switch (type) {
      case 'license': return 'Driver License';
      case 'rcBook': return 'RC Book';
      case 'insurance': return 'Insurance';
      case 'fitnessTest': return 'Fitness Test';
      default: return 'Other Document';
    }
  };
  
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'valid': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'expiringSoon': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid': return <CheckCircle className="h-3 w-3" />;
      case 'expired': return <AlertCircle className="h-3 w-3" />;
      case 'expiringSoon': return <Clock className="h-3 w-3" />;
      default: return null;
    }
  };
  
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const filteredDocuments = documents.filter(doc => {
    // Filter by search term
    const searchFields = [
      doc.driverName.toLowerCase(),
      doc.documentNumber.toLowerCase(),
      doc.busId.toLowerCase(),
      getDocumentTypeName(doc.type).toLowerCase()
    ];
    
    const matchesSearch = searchTerm === '' || searchFields.some(field => field.includes(searchTerm.toLowerCase()));
    
    // Filter by type and status
    let matchesFilter = true;
    
    if (filter === 'license') matchesFilter = doc.type === 'license';
    else if (filter === 'rcBook') matchesFilter = doc.type === 'rcBook';
    else if (filter === 'insurance') matchesFilter = doc.type === 'insurance';
    else if (filter === 'expired') matchesFilter = doc.status === 'expired';
    else if (filter === 'expiring') matchesFilter = doc.status === 'expiringSoon';
    
    return matchesSearch && matchesFilter;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <NavBar userType="admin" />
        
        <main className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Driver Document Management</h1>
              <p className="text-gray-500">Manage driver licenses, RC books, and other important documents</p>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0">
              <div className="relative mr-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search documents..."
                  className="pl-8 w-[200px] md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Dialog open={isAddingDocument} onOpenChange={setIsAddingDocument}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Document</DialogTitle>
                    <DialogDescription>
                      Upload a new driver or vehicle document to the system.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="documentType" className="text-right">Document Type</Label>
                      <select 
                        id="documentType" 
                        className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                        value={newDocument.type}
                        onChange={(e) => setNewDocument({...newDocument, type: e.target.value as any})}
                      >
                        <option value="license">Driver License</option>
                        <option value="rcBook">RC Book</option>
                        <option value="insurance">Insurance</option>
                        <option value="fitnessTest">Fitness Test</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="driverId" className="text-right">Driver ID</Label>
                      <Input 
                        id="driverId" 
                        placeholder="Enter driver ID" 
                        className="col-span-3"
                        value={newDocument.driverId}
                        onChange={(e) => setNewDocument({...newDocument, driverId: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="driverName" className="text-right">Driver Name</Label>
                      <Input 
                        id="driverName" 
                        placeholder="Enter driver name" 
                        className="col-span-3"
                        value={newDocument.driverName}
                        onChange={(e) => setNewDocument({...newDocument, driverName: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="busId" className="text-right">Bus ID</Label>
                      <Input 
                        id="busId" 
                        placeholder="Enter bus ID (if applicable)" 
                        className="col-span-3"
                        value={newDocument.busId}
                        onChange={(e) => setNewDocument({...newDocument, busId: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="documentNumber" className="text-right">Document Number</Label>
                      <Input 
                        id="documentNumber" 
                        placeholder="Enter document number" 
                        className="col-span-3"
                        value={newDocument.documentNumber}
                        onChange={(e) => setNewDocument({...newDocument, documentNumber: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="issuedDate" className="text-right">Issue Date</Label>
                      <Input 
                        id="issuedDate" 
                        type="date"
                        className="col-span-3"
                        value={newDocument.issuedDate}
                        onChange={(e) => setNewDocument({...newDocument, issuedDate: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="expiryDate" className="text-right">Expiry Date</Label>
                      <Input 
                        id="expiryDate" 
                        type="date"
                        className="col-span-3"
                        value={newDocument.expiryDate}
                        onChange={(e) => setNewDocument({...newDocument, expiryDate: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="documentFile" className="text-right">Upload Document</Label>
                      <div className="col-span-3">
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 mb-1">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400">PDF, JPG, PNG (Max 5MB)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingDocument(false)}>Cancel</Button>
                    <Button onClick={handleAddDocument}>Save Document</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="mb-6">
            <Tabs defaultValue="all" onValueChange={setFilter}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Documents</TabsTrigger>
                <TabsTrigger value="license">Driver Licenses</TabsTrigger>
                <TabsTrigger value="rcBook">RC Books</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
                <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
              </TabsList>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Type</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Bus ID</TableHead>
                        <TableHead>Document Number</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.length > 0 ? (
                        filteredDocuments.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                {getDocumentTypeName(doc.type)}
                              </div>
                            </TableCell>
                            <TableCell>{doc.driverName}</TableCell>
                            <TableCell>{doc.busId}</TableCell>
                            <TableCell>{doc.documentNumber}</TableCell>
                            <TableCell>{formatDate(doc.issuedDate)}</TableCell>
                            <TableCell>{formatDate(doc.expiryDate)}</TableCell>
                            <TableCell>
                              <Badge className={`${getStatusColor(doc.status)} flex items-center gap-1 w-fit`}>
                                {getStatusIcon(doc.status)}
                                <span>
                                  {doc.status === 'valid' && 'Valid'}
                                  {doc.status === 'expired' && 'Expired'}
                                  {doc.status === 'expiringSoon' && 'Expiring Soon'}
                                </span>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="h-8" onClick={() => setViewingDocument(doc)}>
                                    View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>
                                      {getDocumentTypeName(doc.type)} - {doc.documentNumber}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Driver: {doc.driverName} | Bus: {doc.busId}
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="grid gap-4 py-4">
                                    <div className="border rounded-md overflow-hidden">
                                      <img 
                                        src={doc.fileUrl} 
                                        alt={`${getDocumentTypeName(doc.type)} Document`}
                                        className="w-full h-[300px] object-contain bg-gray-100"
                                      />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                      <Card>
                                        <CardHeader className="py-3">
                                          <CardTitle className="text-sm font-medium">Document Details</CardTitle>
                                        </CardHeader>
                                        <CardContent className="py-0">
                                          <dl className="divide-y divide-gray-100">
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                              <dt className="text-sm font-medium text-gray-500">Document Type</dt>
                                              <dd className="text-sm text-gray-900 sm:col-span-2">{getDocumentTypeName(doc.type)}</dd>
                                            </div>
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                              <dt className="text-sm font-medium text-gray-500">Document Number</dt>
                                              <dd className="text-sm text-gray-900 sm:col-span-2">{doc.documentNumber}</dd>
                                            </div>
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                              <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
                                              <dd className="text-sm text-gray-900 sm:col-span-2">{formatDate(doc.issuedDate)}</dd>
                                            </div>
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                              <dt className="text-sm font-medium text-gray-500">Expiry Date</dt>
                                              <dd className="text-sm text-gray-900 sm:col-span-2">{formatDate(doc.expiryDate)}</dd>
                                            </div>
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                              <dt className="text-sm font-medium text-gray-500">Status</dt>
                                              <dd className="text-sm sm:col-span-2">
                                                <Badge className={`${getStatusColor(doc.status)} flex items-center gap-1 w-fit`}>
                                                  {getStatusIcon(doc.status)}
                                                  <span>
                                                    {doc.status === 'valid' && 'Valid'}
                                                    {doc.status === 'expired' && 'Expired'}
                                                    {doc.status === 'expiringSoon' && 'Expiring Soon'}
                                                  </span>
                                                </Badge>
                                              </dd>
                                            </div>
                                          </dl>
                                        </CardContent>
                                      </Card>
                                      
                                      <Card>
                                        <CardHeader className="py-3">
                                          <CardTitle className="text-sm font-medium">Driver & Vehicle Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className="py-0">
                                          <dl className="divide-y divide-gray-100">
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                              <dt className="text-sm font-medium text-gray-500">Driver ID</dt>
                                              <dd className="text-sm text-gray-900 sm:col-span-2">{doc.driverId}</dd>
                                            </div>
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                              <dt className="text-sm font-medium text-gray-500">Driver Name</dt>
                                              <dd className="text-sm text-gray-900 sm:col-span-2">{doc.driverName}</dd>
                                            </div>
                                            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                              <dt className="text-sm font-medium text-gray-500">Bus ID</dt>
                                              <dd className="text-sm text-gray-900 sm:col-span-2">{doc.busId}</dd>
                                            </div>
                                          </dl>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </div>
                                  
                                  <DialogFooter>
                                    <Button variant="outline" className="mr-2">
                                      <Upload className="h-4 w-4 mr-2" />
                                      Upload New Version
                                    </Button>
                                    <Button>Download Document</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-12">
                            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No documents found</h3>
                            <p className="text-gray-500 mb-4">
                              {searchTerm ? 'Try adjusting your search terms' : 'Add a document to get started'}
                            </p>
                            {!searchTerm && (
                              <Button variant="outline" onClick={() => setIsAddingDocument(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Document
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Documents Overview</CardTitle>
                <CardDescription>Status summary of all documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Documents</span>
                    <Badge variant="outline">{documents.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Valid Documents</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                      {documents.filter(doc => doc.status === 'valid').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Expiring Soon</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-100">
                      {documents.filter(doc => doc.status === 'expiringSoon').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Expired Documents</span>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-100">
                      {documents.filter(doc => doc.status === 'expired').length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Document Types</CardTitle>
                <CardDescription>Distribution by document type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Driver Licenses</span>
                    <Badge variant="outline">
                      {documents.filter(doc => doc.type === 'license').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">RC Books</span>
                    <Badge variant="outline">
                      {documents.filter(doc => doc.type === 'rcBook').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Insurance</span>
                    <Badge variant="outline">
                      {documents.filter(doc => doc.type === 'insurance').length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Fitness Tests</span>
                    <Badge variant="outline">
                      {documents.filter(doc => doc.type === 'fitnessTest').length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Document alerts and reminders</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[200px]">
                  <div className="divide-y">
                    <div className="flex items-start p-4">
                      <div className="mr-3 mt-0.5">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Insurance Expired</p>
                        <p className="text-xs text-gray-500">
                          Bus B002 insurance (INS87654321) expired on January 19, 2023
                        </p>
                        <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start p-4">
                      <div className="mr-3 mt-0.5">
                        <Clock className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">License Expiring Soon</p>
                        <p className="text-xs text-gray-500">
                          Sarah Johnson's license (DL12378945) will expire on August 4, 2024
                        </p>
                        <p className="text-xs text-gray-400 mt-1">1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-start p-4">
                      <div className="mr-3 mt-0.5">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New Document Added</p>
                        <p className="text-xs text-gray-500">
                          Fitness Test (FT24680135) added for Mike Davis
                        </p>
                        <p className="text-xs text-gray-400 mt-1">3 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default DriverDocumentsPage;
