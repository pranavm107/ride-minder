
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const isMobile = useIsMobile();
  
  return (
    <section
      className={cn(
        'relative py-12 sm:py-20 bg-gradient-to-b from-white to-gray-50',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-brand-50 rounded-full">
              <Smartphone className="h-8 w-8 text-brand-500" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            College Bus Tracking System
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Enhanced safety and efficiency with our mobile-optimized bus tracking solution.
          </p>
          
          <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center space-y-3 sm:space-y-0">
            <Link to="/student" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size={isMobile ? "lg" : "default"}
                className="w-full sm:w-auto shadow-sm"
              >
                Student Dashboard
              </Button>
            </Link>
            
            <Link to="/driver" className="w-full sm:w-auto">
              <Button 
                variant="default" 
                size={isMobile ? "lg" : "default"}
                className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 shadow-sm"
              >
                Driver Dashboard
              </Button>
            </Link>
            
            <Link to="/admin" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size={isMobile ? "lg" : "default"}
                className="w-full sm:w-auto shadow-sm"
              >
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
