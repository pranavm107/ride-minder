
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import LoadingScreen from '@/components/auth/LoadingScreen';

const DriverLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const handleLogin = (values: any) => {
    setError(undefined);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowLoadingScreen(true);
      
      // Simulate dashboard loading
      setTimeout(() => {
        navigate('/driver');
      }, 2000);
    }, 1500);
  };

  const driverQuote = {
    text: "Safe driving isn't just about the destination, it's about every life you carry along the journey.",
    author: "Professional Driver"
  };

  if (showLoadingScreen) {
    return <LoadingScreen message="Preparing driver dashboard" />;
  }

  return (
    <AuthLayout 
      heading="Driver Dashboard"
      subheading="Login to access your route and schedule"
      dashboardType="driver"
      quote={driverQuote}
    >
      <LoginForm 
        onSuccess={handleLogin}
        isLoading={loading}
        error={error}
        showPasswordLogin={true}
        showGoogleLogin={true}
        showMicrosoftLogin={true}
        dashboardType="driver"
      />
    </AuthLayout>
  );
};

export default DriverLogin;
