
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { User, Bus, Search } from 'lucide-react';

type UserTypeProps = {
  className?: string;
};

const UserTypeSelector = ({ className }: UserTypeProps) => {
  const userTypes = [
    {
      title: 'Student',
      description: 'View bus schedules and track your rides in real-time',
      icon: <User className="h-6 w-6 text-brand-500" />,
      link: '/login',
      color: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-100',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Driver',
      description: 'Manage your route and communicate with students',
      icon: <Bus className="h-6 w-6 text-brand-500" />,
      link: '/login/driver',
      color: 'from-emerald-50 to-emerald-100',
      iconBg: 'bg-emerald-100',
      borderColor: 'border-emerald-200',
    },
    {
      title: 'Administrator',
      description: 'Monitor fleet, manage routes, and access analytics',
      icon: <Search className="h-6 w-6 text-brand-500" />,
      link: '/login/admin',
      color: 'from-amber-50 to-amber-100',
      iconBg: 'bg-amber-100',
      borderColor: 'border-amber-200',
    },
  ];

  return (
    <div className={cn('py-16 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            RideMinder provides a tailored experience based on your role in the campus transportation system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((type, index) => (
            <Link 
              key={type.title}
              to={type.link}
              className={cn(
                'group relative rounded-2xl p-8 transition-all duration-300',
                'bg-gradient-to-br border hover:shadow-xl',
                'transform hover:-translate-y-1',
                type.color,
                type.borderColor
              )}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="absolute top-0 right-0 opacity-10 p-6">
                {type.icon}
              </div>
              <div className={cn(
                'p-3 rounded-xl inline-flex mb-4 transition-all duration-300',
                'group-hover:scale-110',
                type.iconBg
              )}>
                {type.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {type.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {type.description}
              </p>
              <div className="text-brand-500 text-sm font-medium inline-flex items-center group-hover:underline">
                Login
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelector;
