
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Check } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: ForgotPasswordValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <AuthLayout 
      heading={isSubmitted ? "Check your email" : "Reset your password"}
      subheading={
        isSubmitted 
          ? "We've sent a password reset link to your email address" 
          : "Enter your email address and we'll send you a link to reset your password"
      }
      dashboardType="student"
    >
      {!isSubmitted ? (
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="your.email@example.com" 
                          className="pl-10"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </Form>

          <div className="flex justify-center">
            <Link 
              to="/login/student" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          
          <p className="text-center text-sm text-gray-600">
            If an account exists with that email, you will receive a password reset link shortly.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link 
              to="/login/student" 
              className="text-sm text-brand-600 hover:text-brand-700"
            >
              Return to login
            </Link>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Try another email
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
