import React from 'react';

interface DriverGreetingProps {
  driverName: string;
  currentDate: string;
}

const DriverGreeting = ({ driverName, currentDate }: DriverGreetingProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border">
      <h1 className="text-2xl font-semibold text-foreground">Hello, {driverName}</h1>
      <p className="text-muted-foreground mt-1">{currentDate}</p>
    </div>
  );
};

export default DriverGreeting;