
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Bus, ChevronLeft } from 'lucide-react';
import { AnimatedQuote } from '@/components/auth/AnimatedQuote';
import { useIsMobile } from '@/hooks/use-mobile';
import PageTransition from '@/components/PageTransition';

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
  const isMobile = useIsMobile();
  const location = useLocation();
  const [animateIn, setAnimateIn] = useState(false);
  
  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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

  // Generate animated background shapes based on dashboard type
  const renderBackgroundShapes = () => {
    const shapes = [];
    const count = 6;
    const colors = {
      admin: ['bg-blue-400/20', 'bg-blue-300/15', 'bg-indigo-400/20'],
      driver: ['bg-green-400/20', 'bg-green-300/15', 'bg-emerald-400/20'],
      student: ['bg-brand-400/20', 'bg-indigo-300/15', 'bg-purple-400/20']
    };
    
    const selectedColors = colors[dashboardType] || colors.student;
    
    for (let i = 0; i < count; i++) {
      const size = Math.floor(Math.random() * 120) + 80;
      const color = selectedColors[i % selectedColors.length];
      const delay = (i * 0.7).toFixed(1);
      const duration = (Math.random() * 15 + 20).toFixed(1);
      const left = Math.floor(Math.random() * 80) + 10;
      
      shapes.push(
        <div 
          key={i}
          className={`absolute rounded-full ${color} backdrop-blur-3xl`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            bottom: `-${size / 2}px`,
            animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`
          }}
        />
      );
    }
    
    return shapes;
  };

  return (
    <PageTransition className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel (on desktop) - Image/Quote */}
      <div 
        className={cn(
          "hidden md:flex w-full md:w-1/2 bg-gradient-to-br overflow-hidden relative",
          getBgColor()
        )}
      >
        {/* Animated background shapes */}
        {renderBackgroundShapes()}
        
        <div className="w-full p-12 flex flex-col justify-between relative z-10">
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
                <ChevronLeft className="mr-1 h-4 w-4" /> Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right panel - Form */}
      <div className={cn(
        "w-full md:w-1/2 min-h-screen p-6 sm:p-12 flex flex-col justify-center transition-all duration-500 relative",
        animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        {/* Mobile background shapes */}
        {isMobile && (
          <div className="absolute inset-0 overflow-hidden">
            {renderBackgroundShapes()}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-b opacity-20",
              getBgColor()
            )} />
          </div>
        )}
        
        <div className="md:hidden flex items-center justify-between mb-8 relative z-10">
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
            <ChevronLeft className="mr-1 h-4 w-4" /> Home
          </Link>
        </div>
        
        <div className="max-w-md mx-auto w-full relative z-10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">{heading}</h1>
            {subheading && <p className="text-gray-600">{subheading}</p>}
          </div>
          
          {children}
          
          {/* Mobile Quote */}
          {isMobile && quote && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <AnimatedQuote 
                text={quote.text} 
                author={quote.author} 
                isDark={false}
              />
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default AuthLayout;
