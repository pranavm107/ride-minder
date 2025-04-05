
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const NavRedirector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Handle redirections based on current path
    if (location.pathname === '/admin') {
      // Show a toast to inform users about the available pages
      toast({
        title: "Admin Dashboard",
        description: "Use the navigation links to access Camera Control and other admin features.",
      });
    } else if (location.pathname === '/student') {
      toast({
        title: "Student Dashboard",
        description: "Check out the Community page to connect with your bus mates!",
      });
    }
  }, [location.pathname, toast]);
  
  return null; // This component doesn't render anything
};

export default NavRedirector;
