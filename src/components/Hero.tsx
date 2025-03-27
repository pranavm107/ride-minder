
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Bus, MapPin, Clock } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const elements = heroRef.current.querySelectorAll('.parallax');
        
        elements.forEach((element) => {
          const speed = Number((element as HTMLElement).dataset.speed) || 0.1;
          (element as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen pt-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 to-white -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-brand-100/40 blur-3xl -z-5 parallax" data-speed="-0.1"></div>
      <div className="absolute bottom-10 left-[5%] w-72 h-72 rounded-full bg-brand-200/30 blur-3xl -z-5 parallax" data-speed="0.05"></div>
      
      {/* Floating Bus Icon */}
      <div className="absolute top-40 right-[15%] animate-float opacity-10 hidden lg:block">
        <Bus size={120} className="text-brand-300" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text Content */}
          <div className="pt-10 md:pt-16 lg:pt-20 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-brand-100 text-brand-700">
                Campus Transportation Revolutionized
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Smart Campus <span className="text-brand-500">Transportation</span> System
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Connecting students, drivers, and administrators through a seamless real-time platform for safer, more efficient campus transportation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/student" className="btn-premium">
                Student Access
              </Link>
              <div className="flex gap-4">
                <Link to="/driver" className="btn-premium-outline">
                  Driver Portal
                </Link>
                <Link to="/admin" className="btn-premium-outline">
                  Admin Dashboard
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 text-center">
              <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm hover-lift">
                <div className="mb-2 text-brand-500 flex justify-center">
                  <Bus size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">20+</h3>
                <p className="text-sm text-gray-600">Campus Routes</p>
              </div>
              <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm hover-lift">
                <div className="mb-2 text-brand-500 flex justify-center">
                  <Clock size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">99.8%</h3>
                <p className="text-sm text-gray-600">On-time Rate</p>
              </div>
              <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm hover-lift">
                <div className="mb-2 text-brand-500 flex justify-center">
                  <User size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">5,000+</h3>
                <p className="text-sm text-gray-600">Daily Riders</p>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-100 to-brand-200 rounded-full blur-3xl opacity-40"></div>
              <div className="glass rounded-2xl p-4 relative">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="h-80 bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full bg-gray-200 rounded-lg p-4">
                        <div className="bg-brand-50 h-full rounded-lg flex items-center justify-center relative">
                          <div className="absolute top-4 left-4 text-xs font-medium text-gray-600">Campus Map View</div>
                          
                          {/* Map mockup with bus routes */}
                          <div className="h-4/5 w-4/5 bg-white rounded-lg shadow-sm relative">
                            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-brand-500 rounded-full pulse"></div>
                            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-brand-500 rounded-full pulse"></div>
                            
                            <div className="absolute top-1/3 right-1/3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-brand-500">
                              <Bus size={14} className="text-brand-500" />
                            </div>
                            
                            <div className="h-1 bg-brand-200 absolute top-1/3 left-1/4 w-1/2 rounded-full"></div>
                            <div className="h-1 bg-brand-200 absolute bottom-1/3 left-1/5 w-3/5 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-900">Bus #42 - North Campus</h3>
                      <span className="flex items-center text-sm text-brand-500 gap-1">
                        <Clock size={14} /> 3 min
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-1 mb-4">
                      <MapPin size={14} className="text-brand-400" />
                      <span>Engineering Building → Student Center</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">23 students on board</span>
                      <span className="text-xs font-medium text-brand-600">Track live →</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent -z-5"></div>
    </div>
  );
};

export default Hero;
