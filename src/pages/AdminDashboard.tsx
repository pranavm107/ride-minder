
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import AdminNavigationTabs from '@/components/admin/AdminNavigationTabs';
import AdminOverview from '@/components/admin/AdminOverview';
import FleetManagement from '@/components/admin/FleetManagement';
import RouteManagement from '@/components/admin/RouteManagement';
import SystemSettings from '@/components/admin/SystemSettings';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <AdminOverview />;
      case 'buses':
        return <FleetManagement />;
      case 'routes':
        return <RouteManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar userType="admin" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your campus transportation system</p>
        </div>

        <AdminNavigationTabs 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />

        {renderActiveSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;
