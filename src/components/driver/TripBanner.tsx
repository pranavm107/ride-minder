import React from 'react';
import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';

interface TripBannerProps {
  currentTripStatus: 'inactive' | 'active';
  onStartTrip: () => void;
}

const TripBanner = ({ currentTripStatus, onStartTrip }: TripBannerProps) => {
  if (currentTripStatus === 'active') return null;

  return (
    <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-8 shadow-lg text-primary-foreground">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold mb-2">Ready to Start Your Trip?</h2>
          <p className="text-primary-foreground/90 max-w-md">
            Start your trip to begin navigation and track student attendance on Route #248.
          </p>
        </div>
        <Button 
          size="lg" 
          variant="secondary"
          className="bg-white text-primary hover:bg-white/90 px-8 py-3 font-semibold"
          onClick={onStartTrip}
        >
          <Navigation size={20} className="mr-2" />
          Start Trip
        </Button>
      </div>
    </div>
  );
};

export default TripBanner;