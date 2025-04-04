
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menubar, 
  MenubarContent, 
  MenubarItem, 
  MenubarMenu, 
  MenubarSeparator, 
  MenubarTrigger 
} from "@/components/ui/menubar";
import { FileBarChart, Settings, LogOut, Menu } from 'lucide-react';

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
        <MenubarContent className="min-w-[180px]">
          <MenubarItem 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/reports')}
          >
            <FileBarChart className="mr-2 h-4 w-4" />
            <span>Reports</span>
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
