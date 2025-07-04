import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Receipt,
  DollarSign,
  TrendingUp,
  FileText,
  IndianRupee
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentBillingProps {
  studentData: any;
}

const PaymentBilling = ({ studentData }: PaymentBillingProps) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { toast } = useToast();

  // Mock payment data
  const paymentSummary = {
    monthlyFee: 2500,
    currentBalance: 2500,
    dueDate: '2025-01-15',
    status: 'Pending',
    lastPayment: {
      amount: 2500,
      date: '2024-12-10',
      method: 'UPI',
      transactionId: 'TXN123456789'
    }
  };

  const paymentHistory = [
    {
      id: 'PAY001',
      date: '2024-12-10',
      amount: 2500,
      period: 'December 2024',
      method: 'UPI',
      status: 'Completed',
      transactionId: 'TXN123456789',
      receiptUrl: '#'
    },
    {
      id: 'PAY002',
      date: '2024-11-08',
      amount: 2500,
      period: 'November 2024',
      method: 'Net Banking',
      status: 'Completed',
      transactionId: 'TXN123456788',
      receiptUrl: '#'
    },
    {
      id: 'PAY003',
      date: '2024-10-05',
      amount: 2500,
      period: 'October 2024',
      method: 'Card',
      status: 'Completed',
      transactionId: 'TXN123456787',
      receiptUrl: '#'
    },
    {
      id: 'PAY004',
      date: '2024-09-12',
      amount: 2500,
      period: 'September 2024',
      method: 'UPI',
      status: 'Completed',
      transactionId: 'TXN123456786',
      receiptUrl: '#'
    }
  ];

  const upcomingPayments = [
    {
      dueDate: '2025-01-15',
      amount: 2500,
      period: 'January 2025',
      status: 'Due'
    },
    {
      dueDate: '2025-02-15',
      amount: 2500,
      period: 'February 2025',
      status: 'Upcoming'
    },
    {
      dueDate: '2025-03-15',
      amount: 2500,
      period: 'March 2025',
      status: 'Upcoming'
    }
  ];

  const handlePayNow = async () => {
    setIsProcessingPayment(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Initiated",
        description: "Redirecting to payment gateway...",
      });
      
      // In real implementation, redirect to payment gateway
      setTimeout(() => {
        toast({
          title: "Payment Successful!",
          description: "Your payment has been processed successfully.",
        });
        setIsProcessingPayment(false);
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
      setIsProcessingPayment(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pending</Badge>;
      case 'Failed':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Failed</Badge>;
      case 'Due':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Due</Badge>;
      case 'Upcoming':
        return <Badge variant="outline">Upcoming</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleDownloadReceipt = (paymentId: string) => {
    toast({
      title: "Download Started",
      description: "Receipt is being downloaded...",
    });
    // Implement receipt download logic
  };

  return (
    <div className="space-y-6">
      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Amount Due</p>
                <p className="text-2xl font-bold text-red-800">₹{paymentSummary.currentBalance}</p>
              </div>
              <IndianRupee className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Due Date</p>
                <p className="text-2xl font-bold text-orange-800">Jan 15</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Last Payment</p>
                <p className="text-2xl font-bold text-green-800">₹{paymentSummary.lastPayment.amount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Monthly Fee</p>
                <p className="text-2xl font-bold text-blue-800">₹{paymentSummary.monthlyFee}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Alert */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-700">
          <strong>Payment Due:</strong> Your cab fee of ₹{paymentSummary.currentBalance} for January 2025 is due on {paymentSummary.dueDate}.
          <Button 
            size="sm" 
            className="ml-4 bg-orange-600 hover:bg-orange-700"
            onClick={handlePayNow}
            disabled={isProcessingPayment}
          >
            {isProcessingPayment ? 'Processing...' : 'Pay Now'}
          </Button>
        </AlertDescription>
      </Alert>

      {/* Main Content */}
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="current">Current Bill</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Bill */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Current Bill - January 2025
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Student Name:</span>
                    <span>{studentData.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Registration Number:</span>
                    <span>{studentData.registerNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Cab Number:</span>
                    <span>{studentData.cabNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Route:</span>
                    <span>Rajouri Garden ↔ DTU</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Monthly Cab Fee:</span>
                    <span>₹2,500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Service Tax (18%):</span>
                    <span>₹450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Convenience Fee:</span>
                    <span>₹50</span>
                  </div>
                  <div className="border-t pt-2 flex items-center justify-between font-bold text-lg">
                    <span>Total Amount:</span>
                    <span>₹3,000</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full" 
                    onClick={handlePayNow}
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay ₹3,000 Now
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Available Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg text-center hover:bg-muted/50 cursor-pointer">
                    <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Credit/Debit Card</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center hover:bg-muted/50 cursor-pointer">
                    <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">UPI</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center hover:bg-muted/50 cursor-pointer">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Net Banking</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center hover:bg-muted/50 cursor-pointer">
                    <Receipt className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Digital Wallet</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">Auto-Pay Benefits</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Never miss a payment</li>
                    <li>• 5% discount on monthly fees</li>
                    <li>• Priority customer support</li>
                  </ul>
                  <Button variant="outline" size="sm" className="mt-2 border-blue-300 text-blue-700">
                    Enable Auto-Pay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Payment History
              </CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory.map((payment) => (
                  <div 
                    key={payment.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{payment.period}</h4>
                        {getStatusBadge(payment.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Paid on {payment.date} via {payment.method}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Transaction ID: {payment.transactionId}
                      </p>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <p className="font-bold text-lg">₹{payment.amount}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadReceipt(payment.id)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingPayments.map((payment, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{payment.period}</h4>
                        {getStatusBadge(payment.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Due Date: {payment.dueDate}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{payment.amount}</p>
                      {payment.status === 'Due' && (
                        <Button size="sm" className="mt-1">
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Payment Reminders</h4>
                <p className="text-sm text-green-700 mb-3">
                  Get notified 3 days before your payment is due
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-green-300 text-green-700">
                    Enable SMS Alerts
                  </Button>
                  <Button variant="outline" size="sm" className="border-green-300 text-green-700">
                    Enable Email Alerts
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentBilling;