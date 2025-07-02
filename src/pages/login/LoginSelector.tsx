
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus, User, UserPlus, ArrowLeft } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const LoginSelector = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="flex items-center mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white shadow-lg">
                <Bus className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">RideMinder</h1>
            <p className="text-gray-600">Choose your login type</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Assigned Student Login */}
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border border-border">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-brand-500" />
                </div>
                <CardTitle className="text-xl text-foreground">Assigned Student</CardTitle>
                <p className="text-muted-foreground text-sm">Login to your assigned cab</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>• View your assigned cab details</p>
                    <p>• Track real-time location</p>
                    <p>• Skip rides when needed</p>
                    <p>• Select drop location</p>
                  </div>
                  <Link to="/login/student" className="block">
                    <Button className="w-full">
                      Login as Assigned Student
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Guest Student Login */}
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border border-border">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <UserPlus className="h-6 w-6 text-brand-500" />
                </div>
                <CardTitle className="text-xl text-foreground">Guest Student</CardTitle>
                <p className="text-muted-foreground text-sm">Book available cab seats</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>• View available cab seats</p>
                    <p>• Book seats in real-time</p>
                    <p>• Get instant confirmation</p>
                    <p>• Track your booked cab</p>
                  </div>
                  <Link to="/guest/login" className="block">
                    <Button className="w-full" variant="secondary">
                      Book a Cab as Guest
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">
              Need help? Contact your transport coordinator
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default LoginSelector;
