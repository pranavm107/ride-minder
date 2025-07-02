
import React from 'react';
import { BarChart3, Bus, MapPin, Settings } from 'lucide-react';

interface AdminNavigationTabsProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AdminNavigationTabs = ({ activeSection, setActiveSection }: AdminNavigationTabsProps) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'buses', label: 'Fleet Management', icon: Bus },
    { id: 'routes', label: 'Routes', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="mb-8">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeSection === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default AdminNavigationTabs;
