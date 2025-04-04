
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import LoadingScreen from '@/components/auth/LoadingScreen';

const AdminLogin = () => {
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
        navigate('/admin', { state: { fromLogin: true } });
      }, 2000);
    }, 1500);
  };

  const adminQuote = {
    text: "Effective transportation management is about moving people, not just vehicles.",
    author: "Campus Transportation Director"
  };

  if (showLoadingScreen) {
    return <LoadingScreen message="Preparing admin dashboard" />;
  }

  return (
    <AuthLayout 
      heading="Admin Dashboard"
      subheading="Login to access the administration panel"
      dashboardType="admin"
      quote={adminQuote}
    >
      <LoginForm 
        onSuccess={handleLogin}
        isLoading={loading}
        error={error}
        showPasswordLogin={true}
        showGoogleLogin={true}
        showMicrosoftLogin={true}
        dashboardType="admin"
      />
    </AuthLayout>
  );
};

export default AdminLogin;
