
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileUp, Upload, Check, Clock, File, Trash2 } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

type BillType = 'fuel' | 'service' | 'maintenance' | 'other';
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface UploadedBill {
  id: string;
  name: string;
  type: BillType;
  date: string;
  amount: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
}

const BillUploadsPage = () => {
  const navigate = useNavigate();
  const [billType, setBillType] = useState<BillType>('fuel');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [billHistory, setBillHistory] = useState<UploadedBill[]>([
    {
      id: '1',
      name: 'Fuel_receipt_12345.jpg',
      type: 'fuel',
      date: '2023-10-01',
      amount: '75.50',
      status: 'approved',
      uploadedAt: '2023-10-01'
    },
    {
      id: '2',
      name: 'Oil_change_service.pdf',
      type: 'service',
      date: '2023-09-20',
      amount: '120.00',
      status: 'pending',
      uploadedAt: '2023-09-20'
    }
  ]);
  
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStatus('uploading');
    
    // Simulate upload
    setTimeout(() => {
      const newBill: UploadedBill = {
        id: Date.now().toString(),
        name: `Bill_${Date.now()}.jpg`,
        type: billType,
        date: date,
        amount: amount,
        status: 'pending',
        uploadedAt: new Date().toISOString().split('T')[0]
      };
      
      setBillHistory([newBill, ...billHistory]);
      setUploadStatus('success');
      setBillType('fuel');
      setDate('');
      setAmount('');
      
      toast({
        title: "Bill uploaded successfully",
        description: "Your bill has been submitted for approval.",
      });
      
      setTimeout(() => {
        setUploadStatus('idle');
      }, 2000);
    }, 1500);
  };
  
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
            <h1 className="text-2xl font-semibold text-gray-800">Upload Bills</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/driver')}
              className="text-sm"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <FileUp className="h-5 w-5 text-brand" />
                <h2 className="text-lg font-medium">Upload New Bill</h2>
              </div>
              
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <Label htmlFor="bill-type">Bill Type</Label>
                  <select 
                    id="bill-type"
                    value={billType}
                    onChange={(e) => setBillType(e.target.value as BillType)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="fuel">Fuel Bill</option>
                    <option value="service">Service Bill</option>
                    <option value="maintenance">Maintenance Bill</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input 
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="file">Bill Image</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-brand hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG, PDF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={uploadStatus === 'uploading'}
                >
                  {uploadStatus === 'idle' && (
                    <>
                      <FileUp className="mr-2 h-4 w-4" />
                      Upload Bill
                    </>
                  )}
                  {uploadStatus === 'uploading' && (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Uploading...
                    </>
                  )}
                  {uploadStatus === 'success' && (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Uploaded!
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <File className="h-5 w-5 text-brand" />
                <h2 className="text-lg font-medium">Bill History</h2>
              </div>
              
              <div className="space-y-4">
                {billHistory.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No bills uploaded yet
                  </div>
                ) : (
                  billHistory.map((bill) => (
                    <div 
                      key={bill.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-start gap-3 mb-2 sm:mb-0">
                        <div className="bg-gray-100 rounded-lg p-2">
                          <File className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{bill.name}</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs capitalize">
                              {bill.type}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Date: {bill.date}
                            </span>
                            <span className="text-xs text-gray-500">
                              Amount: ${bill.amount}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <Badge 
                          variant={bill.status === 'approved' ? 'default' : bill.status === 'rejected' ? 'destructive' : 'outline'}
                          className="capitalize"
                        >
                          {bill.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                          {bill.status === 'approved' && <Check className="mr-1 h-3 w-3" />}
                          {bill.status}
                        </Badge>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillUploadsPage;
