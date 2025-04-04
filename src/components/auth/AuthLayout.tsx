
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Bus } from 'lucide-react';
import { AnimatedQuote } from '@/components/auth/AnimatedQuote';

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading?: string;
  dashboardType: 'student' | 'driver' | 'admin';
  backgroundImage?: string;
  quote?: {
    text: string;
    author: string;
  };
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  heading,
  subheading,
  dashboardType,
  backgroundImage,
  quote,
}) => {
  // Background colors based on dashboard type
  const getBgColor = () => {
    switch (dashboardType) {
      case 'admin':
        return 'from-blue-600 to-blue-800';
      case 'driver':
        return 'from-green-600 to-green-800';
      case 'student':
        return 'from-brand-500 to-brand-700';
      default:
        return 'from-brand-500 to-brand-700';
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel (on desktop) - Image/Quote */}
      <div 
        className={cn(
          "hidden md:flex w-full md:w-1/2 bg-gradient-to-br",
          getBgColor()
        )}
      >
        <div className="w-full p-12 flex flex-col justify-between relative">
          <Link to="/" className="flex items-center gap-2 text-white">
            <div className="h-9 w-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Bus className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-xl">RideMinder</span>
          </Link>
          
          <div className="space-y-6">
            {quote && <AnimatedQuote text={quote.text} author={quote.author} />}
            
            <div className="flex flex-col">
              <Link 
                to="/" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors"
              >
                <span className="mr-2">←</span> Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right panel - Form */}
      <div className="w-full md:w-1/2 p-6 sm:p-12 flex flex-col justify-center">
        <div className="md:hidden flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Bus className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-lg">RideMinder</span>
          </Link>
          
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="mr-1">←</span> Home
          </Link>
        </div>
        
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">{heading}</h1>
            {subheading && <p className="text-gray-600">{subheading}</p>}
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
