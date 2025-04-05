
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menubar, 
  MenubarContent, 
  MenubarItem, 
  MenubarMenu, 
  MenubarSeparator, 
  MenubarTrigger,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent
} from "@/components/ui/menubar";
import { 
  FileBarChart, 
  Settings, 
  LogOut, 
  Menu, 
  FileText, 
  Users, 
  Coins, 
  FileUp,
  History,
  HelpCircle,
  User 
} from 'lucide-react';

const DriverMenuBar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Navigate to home page
    navigate('/');
  };
  
  return (
    <Menubar className="border-none bg-transparent">
      <MenubarMenu>
        <MenubarTrigger className="font-medium data-[state=open]:bg-gray-100 flex items-center gap-2">
          <span>Menu</span>
          <Menu className="h-4 w-4" />
        </MenubarTrigger>
        <MenubarContent className="min-w-[220px]">
          <MenubarItem 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/dashboard')}
          >
            <Users className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </MenubarItem>

          <MenubarItem 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/trip-history')}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Recent Trip History</span>
          </MenubarItem>
          
          <MenubarItem 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/attendance')}
          >
            <Users className="mr-2 h-4 w-4" />
            <span>Student Attendance</span>
          </MenubarItem>
          
          <MenubarItem 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/bill-uploads')}
          >
            <FileUp className="mr-2 h-4 w-4" />
            <span>Upload Bills</span>
          </MenubarItem>
          
          <MenubarItem 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/coins')}
          >
            <Coins className="mr-2 h-4 w-4" />
            <span>Driver Rewards</span>
          </MenubarItem>
          
          <MenubarItem 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/substitute-history')}
          >
            <History className="mr-2 h-4 w-4" />
            <span>Substitute History</span>
          </MenubarItem>
          
          <MenubarItem 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/reports')}
          >
            <FileBarChart className="mr-2 h-4 w-4" />
            <span>Reports</span>
          </MenubarItem>
          
          <MenubarItem 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/customer-support')}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Customer Support</span>
          </MenubarItem>
          
          <MenubarItem 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </MenubarItem>
          
          <MenubarSeparator />
          
          <MenubarItem 
            className="flex items-center cursor-pointer text-red-600" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default DriverMenuBar;
