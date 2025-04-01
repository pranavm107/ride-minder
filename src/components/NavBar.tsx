
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Bus, User, MapPin, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useDeviceInfo } from '@/hooks/use-mobile';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useDeviceInfo();
  
  // Add scroll event listener to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we're on the home page
  const isHomePage = location.pathname === '/';
  
  // Menu items
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Student', path: '/student' },
    { label: 'Driver', path: '/driver' },
    { label: 'Admin', path: '/admin' }
  ];

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4',
        isScrolled || !isHomePage ? 
          'bg-white/90 backdrop-blur-md shadow-sm' : 
          'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo & Brand */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white shadow-md">
            <Bus className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-semibold text-xl text-gray-900">RideMinder</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-sm font-medium relative px-1 py-2 transition-colors duration-200',
                location.pathname === item.path 
                  ? 'text-brand-500' 
                  : 'text-gray-600 hover:text-brand-500',
              )}
            >
              {item.label}
              {location.pathname === item.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full animate-fade-in-up" />
              )}
            </Link>
          ))}
          
          <Button variant="default" className="bg-brand-500 hover:bg-brand-600">
            Sign In
          </Button>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <div className="py-4 space-y-4">
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white shadow-md">
                      <Bus className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-xl text-gray-900">RideMinder</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        'px-2 py-3 rounded-md text-base font-medium transition-colors',
                        location.pathname === item.path 
                          ? 'bg-brand-50 text-brand-500' 
                          : 'text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                
                <div className="pt-4 mt-6 border-t border-gray-100">
                  <Button 
                    variant="default" 
                    className="w-full bg-brand-500 hover:bg-brand-600"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
