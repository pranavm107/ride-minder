import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings } from 'lucide-react';

interface NavBarProps {
  userType: 'student' | 'driver' | 'admin' | 'parent';
}

const NavBar: React.FC<NavBarProps> = ({ userType }) => {
  const userName = "John Doe"; // Replace with actual user name
  const userAvatarUrl = "/placeholder-avatar.jpg"; // Replace with actual avatar URL

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold">
          RideMinder
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={userAvatarUrl} alt={userName} />
              <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavBar;
