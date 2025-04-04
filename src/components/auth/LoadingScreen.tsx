
import React, { useEffect, useState } from 'react';
import { Bus } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading" }) => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="w-16 h-16 mb-8 relative">
        <div className="w-full h-0.5 absolute top-1/2 left-0 bg-gradient-to-r from-transparent via-brand-300 to-transparent">
          <div 
            className="absolute top-1/2 left-0 transform -translate-y-1/2"
            style={{ 
              animation: 'bus-drive 1.5s ease-in-out infinite alternate',
            }}
          >
            <div className="bg-brand-500 p-2 rounded-full">
              <Bus className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className="h-1 w-48 mb-4 bg-gray-200 rounded-full overflow-hidden"
        style={{ transform: 'perspective(200px) rotateX(5deg)' }}
      >
        <div 
          className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full"
          style={{ animation: 'progress 2s ease-in-out infinite' }}
        ></div>
      </div>
      
      <p className="text-xl font-medium text-gray-700">
        {message}{dots}
      </p>
    </div>
  );
};

export default LoadingScreen;
