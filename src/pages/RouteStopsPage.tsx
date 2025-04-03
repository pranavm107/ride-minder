
import React from 'react';
import NavBar from '@/components/NavBar';
import StopsPage from '@/components/StopsPage';

const RouteStopsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar userType="driver" />
      <div className="pt-20 pb-8">
        <StopsPage />
      </div>
    </div>
  );
};

export default RouteStopsPage;
