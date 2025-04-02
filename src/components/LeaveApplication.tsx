
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type LeaveApplicationProps = {
  className?: string;
  onClose?: () => void;
  leaveType: 'regular' | 'emergency';
};

const LeaveApplication = ({ className, onClose, leaveType }: LeaveApplicationProps) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (fromDate && (leaveType === 'emergency' || toDate) && reason) {
      toast.success(`Your ${leaveType === 'emergency' ? 'emergency' : 'leave'} application has been submitted successfully.`);
      if (onClose) onClose();
    } else {
      toast.error('Please fill in all required fields.');
    }
  };
  
  return (
    <div className={cn('bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100', className)}>
      <div className={cn(
        'p-4 border-b',
        leaveType === 'emergency' ? 'bg-red-50 border-red-100' : 'border-gray-100'
      )}>
        <h3 className={cn(
          'text-lg font-semibold flex items-center gap-2',
          leaveType === 'emergency' ? 'text-red-700' : 'text-gray-900'
        )}>
          {leaveType === 'emergency' ? (
            <AlertTriangle className="h-5 w-5 text-red-500" />
          ) : (
            <Calendar className="h-5 w-5 text-brand-500" />
          )}
          {leaveType === 'emergency' ? 'Emergency Leave' : 'Apply for Leave'}
        </h3>
        <p className={cn(
          'text-sm mt-1',
          leaveType === 'emergency' ? 'text-red-600' : 'text-gray-500'
        )}>
          {leaveType === 'emergency' 
            ? 'For urgent situations requiring immediate approval'
            : 'Submit your leave request for approval'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">
              {leaveType === 'emergency' ? 'Date' : 'From Date'}*
            </label>
            <input
              type="date"
              id="fromDate"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>
          
          {leaveType !== 'emergency' && (
            <div>
              <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">
                To Date*
              </label>
              <input
                type="date"
                id="toDate"
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason*
          </label>
          <textarea
            id="reason"
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[100px]"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            placeholder={leaveType === 'emergency' 
              ? 'Briefly describe your emergency situation...' 
              : 'Why are you applying for leave?'}
          />
        </div>
        
        {leaveType === 'emergency' && (
          <div className="bg-red-50 border border-red-100 rounded-md p-3 text-sm text-red-600">
            <p className="font-medium flex items-center gap-1">
              <AlertTriangle size={14} />
              Emergency leave requests are escalated for immediate review.
            </p>
          </div>
        )}
        
        <div className="pt-2 border-t border-gray-100 flex justify-end gap-3">
          {onClose && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
          )}
          
          <Button 
            type="submit"
            className={cn(
              leaveType === 'emergency' ? 'bg-red-500 hover:bg-red-600' : 'bg-brand-500 hover:bg-brand-600'
            )}
          >
            Submit Application
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LeaveApplication;
