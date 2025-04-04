
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import LoadingScreen from '@/components/auth/LoadingScreen';

const StudentLogin = () => {
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
        navigate('/student', { state: { fromLogin: true } });
      }, 2000);
    }, 1500);
  };

  const studentQuote = {
    text: "Education is the passport to the future, and transportation is the bridge that gets you there.",
    author: "Student Leader"
  };

  if (showLoadingScreen) {
    return <LoadingScreen message="Preparing student dashboard" />;
  }

  return (
    <AuthLayout 
      heading="Student Dashboard"
      subheading="Login to track your bus and manage your schedule"
      dashboardType="student"
      quote={studentQuote}
    >
      <LoginForm 
        onSuccess={handleLogin}
        isLoading={loading}
        error={error}
        showPasswordLogin={true}
        showGoogleLogin={false}
        showMicrosoftLogin={true}
        dashboardType="student"
      />
    </AuthLayout>
  );
};

export default StudentLogin;
