
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section
      className={cn(
        'relative py-16 sm:py-24 lg:py-32 bg-gray-50',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            College Bus Tracking System
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Enhance safety, efficiency, and communication with our real-time bus tracking solution.
          </p>
          <div className="space-x-4">
            <Link to="/student">
              <Button variant="outline" size="lg">
                Student Dashboard
              </Button>
            </Link>
            <Link to="/driver">
              <Button variant="default" size="lg" className="bg-brand-500 hover:bg-brand-600">
                Driver Dashboard
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="lg">
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
