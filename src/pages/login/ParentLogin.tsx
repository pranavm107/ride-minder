
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

const ParentLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - in real app, this would validate against Supabase
    console.log('Parent login:', { email, password });
    navigate('/parent');
  };

  return (
    <AuthLayout userType="parent">
      <LoginForm
        userType="parent"
        onLogin={handleLogin}
        title="Parent Portal Login"
        subtitle="Track your child's bus journey and stay connected with their daily commute"
      />
    </AuthLayout>
  );
};

export default ParentLogin;
