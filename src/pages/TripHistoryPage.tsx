
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import NavBar from '@/components/NavBar';
import TripHistory from '@/components/TripHistory';
import { useNavigate } from 'react-router-dom';

const TripHistoryPage = () => {
  const navigate = useNavigate();
  
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
            <h1 className="text-2xl font-semibold text-gray-800">Recent Trip History</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/driver')}
              className="text-sm"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-brand" />
              <h2 className="text-lg font-medium">Trip Records</h2>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline">This Week</Button>
              <Button size="sm" variant="outline">This Month</Button>
              <Button size="sm" variant="outline">Export</Button>
            </div>
          </div>
          
          <TripHistory userType="driver" />
        </div>
      </main>
    </div>
  );
};

export default TripHistoryPage;
