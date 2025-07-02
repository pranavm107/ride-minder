
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

const ParentLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (values: { email: string; password: string }) => {
    // Mock authentication - in real app, this would validate against Supabase
    console.log('Parent login:', values);
    navigate('/parent');
  };

  return (
    <AuthLayout 
      heading="Parent Portal Login"
      subheading="Track your child's bus journey and stay connected with their daily commute"
      dashboardType="student"
      quote={{
        text: "Stay connected with your child's journey, every step of the way.",
        author: "RideMinder Parent Portal"
      }}
    >
      <LoginForm
        dashboardType="student"
        onSuccess={handleLogin}
      />
    </AuthLayout>
  );
};

export default ParentLogin;
