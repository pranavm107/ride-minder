
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, Check, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ReceiptPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentData = location.state?.paymentData || {
    amount: "3500.00",
    date: new Date().toLocaleDateString('en-IN'),
    time: new Date().toLocaleTimeString('en-IN'),
    transactionId: "TXN" + Math.floor(Math.random() * 1000000),
    paymentMethod: "Card Payment",
    studentId: "STD12345",
    studentName: "Alex Johnson",
    email: "alex@example.com"
  };

  const handleDownloadReceipt = () => {
    toast.success("Receipt downloaded successfully", {
      description: "The receipt has been downloaded to your device.",
    });
  };

  const handleReturnToDashboard = () => {
    navigate('/student');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar userType="student" />
      
      <main className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={handleReturnToDashboard}
            className="mb-6 gap-2"
          >
            <ArrowLeft size={16} />
            Return to Dashboard
          </Button>
          
          <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md">
            {/* Receipt Header */}
            <div className="bg-brand-500 text-white px-6 py-8 relative">
              <div className="absolute top-4 right-4 flex items-center justify-center bg-white rounded-full h-12 w-12 text-brand-500">
                <Check size={24} strokeWidth={3} />
              </div>
              <h1 className="text-2xl font-bold">Payment Receipt</h1>
              <p className="text-brand-100 mt-1">Thank you for your payment</p>
            </div>
            
            {/* Success check animation */}
            <div className="flex justify-center -mt-8">
              <div className="bg-white rounded-full p-4 shadow-lg border-4 border-brand-100">
                <div className="bg-green-100 rounded-full p-3">
                  <Check size={32} className="text-green-600 animate-[pulse_2s_ease-in-out_infinite]" strokeWidth={3} />
                </div>
              </div>
            </div>
            
            {/* Receipt Body */}
            <div className="p-6 pt-8">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">₹{paymentData.amount}</h2>
                <p className="text-gray-500 mt-1">Payment Successful</p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-500">Transaction ID</div>
                  <div className="text-right font-medium">{paymentData.transactionId}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-500">Date</div>
                  <div className="text-right">{paymentData.date}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-500">Time</div>
                  <div className="text-right">{paymentData.time}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-500">Payment Method</div>
                  <div className="text-right">{paymentData.paymentMethod}</div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-500">Student ID</div>
                  <div className="text-right">{paymentData.studentId}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-500">Student Name</div>
                  <div className="text-right">{paymentData.studentName}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-500">Email</div>
                  <div className="text-right">{paymentData.email}</div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-6">
                  This is an electronic receipt for your bus service fees payment. 
                  Please keep this for your records.
                </p>
                
                <Button 
                  onClick={handleDownloadReceipt}
                  className={cn(
                    "gap-2 bg-brand-500 hover:bg-brand-600",
                  )}
                >
                  <Download size={16} />
                  Download Receipt
                </Button>
              </div>
            </div>
            
            {/* Receipt Footer */}
            <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500 border-t border-gray-100">
              <p>If you have any questions about this payment, please contact support@rideminder.com</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReceiptPage;
