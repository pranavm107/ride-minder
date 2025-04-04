
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bus, Smartphone, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile, useTouchDevice } from '@/hooks/use-mobile';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const isMobile = useIsMobile();
  const isTouch = useTouchDevice();
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section
      className={cn(
        'relative py-12 sm:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden',
        className
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-brand-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div 
            className={cn(
              "flex justify-center mb-6 transition-all duration-700 transform",
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            )}
          >
            <div className="p-3 bg-brand-50 rounded-full">
              <Bus className="h-8 w-8 text-brand-500" />
            </div>
          </div>
          
          <h1 
            className={cn(
              "text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight transition-all duration-700 transform",
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            Campus Transportation
            <span className="block text-brand-600">Reimagined</span>
          </h1>
          
          <p 
            className={cn(
              "text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-700 transform",
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            Enhanced safety and efficiency with our mobile-optimized bus tracking solution.
            {isTouch && <span className="font-medium"> Perfect for your touch device!</span>}
          </p>
          
          <div 
            className={cn(
              "space-y-3 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center transition-all duration-700 transform",
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            )}
            style={{ transitionDelay: "300ms" }}
          >
            <Button 
              size={isMobile ? "lg" : "default"}
              className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 shadow-lg group"
            >
              <Link to="#roles" className="flex items-center">
                Get Started
                <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size={isMobile ? "lg" : "default"}
              className="w-full sm:w-auto shadow-sm"
            >
              <Smartphone className="mr-2 h-4 w-4" />
              Download App
            </Button>
          </div>
          
          {/* Animated device mockup */}
          <div 
            className={cn(
              "mt-12 relative mx-auto max-w-lg transition-all duration-1000 transform",
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            )}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
              <div className="h-6 bg-gray-100 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="aspect-[16/9] bg-gray-900 relative">
                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center">
                    <Bus className="h-10 w-10 text-brand-500" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center px-3">
                  <div className="w-1/2 h-2 bg-white/50 rounded-full"></div>
                  <div className="ml-auto px-2 py-1 rounded bg-brand-500 text-white text-xs">Track</div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl opacity-50 blur-xl animate-float"></div>
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl opacity-30 blur-xl" style={{ animationDelay: "-1.5s" }}></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        id="roles"
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block"
      >
        <ArrowDown className="h-6 w-6 text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;
