
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Bus, User, Search, ArrowRight, Users } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

type SelectorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DashboardSelector = ({ open, onOpenChange }: SelectorProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [animateOut, setAnimateOut] = useState(false);
  
  const dashboardOptions = [
    {
      id: 'student',
      title: 'Student',
      description: 'Track your bus and manage your schedule',
      icon: <User className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      path: '/login'
    },
    {
      id: 'driver',
      title: 'Driver',
      description: 'Manage routes and communicate with passengers',
      icon: <Bus className="h-8 w-8 text-emerald-500" />,
      color: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
      path: '/login/driver'
    },
    {
      id: 'parent',
      title: 'Parent',
      description: 'Monitor your child\'s transportation',
      icon: <Users className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      path: '/login/parent'
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Control the entire transportation system',
      icon: <Search className="h-8 w-8 text-amber-500" />,
      color: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
      path: '/login/admin'
    }
  ];

  const handleSelect = (option: string, path: string) => {
    setSelectedOption(option);
    setAnimateOut(true);
    
    // Delay navigation to allow animation to complete
    setTimeout(() => {
      onOpenChange(false);
      navigate(path);
    }, 500);
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSelectedOption(null);
        setAnimateOut(false);
      }, 300);
    }
  }, [open]);

  const content = (
    <div className={cn(
      "p-4 md:p-6 transition-all duration-500",
      animateOut ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"
    )}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Select Your Dashboard</h3>
        <p className="text-gray-600 mt-2">Choose the dashboard that matches your role</p>
      </div>

      <div className="grid gap-4 md:gap-6">
        {dashboardOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id, option.path)}
            className={cn(
              "w-full p-4 rounded-xl border text-left flex items-center transition-all duration-300",
              "transform hover:scale-[1.02] hover:shadow-md active:scale-[0.98]",
              option.color,
              selectedOption === option.id ? "ring-2 ring-offset-2 ring-brand-500" : ""
            )}
          >
            <div className="mr-4 p-2 rounded-full bg-white/50">
              {option.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-lg">{option.title}</h4>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className={cn(
      "fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-opacity duration-300",
      open ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div className={cn(
        "bg-white rounded-xl shadow-xl overflow-hidden max-w-md w-full transform transition-all duration-300",
        open ? "scale-100" : "scale-95"
      )}>
        {content}
      </div>
    </div>
  );
};

export default DashboardSelector;
