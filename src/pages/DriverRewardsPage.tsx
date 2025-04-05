
import React from 'react';
import { Button } from '@/components/ui/button';
import { Coins, Award, Gift, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const rewards = [
  { 
    id: 1, 
    name: "Fuel Card Bonus", 
    description: "Get a $50 fuel card bonus", 
    cost: 500, 
    image: "🛢️" 
  },
  { 
    id: 2, 
    name: "Day Off", 
    description: "Redeem for a paid day off", 
    cost: 1000, 
    image: "🏖️" 
  },
  { 
    id: 3, 
    name: "Gift Card", 
    description: "$100 Amazon gift card", 
    cost: 1200, 
    image: "🎁" 
  },
  { 
    id: 4, 
    name: "Premium Parking", 
    description: "1 month of premium parking spot", 
    cost: 800, 
    image: "🅿️" 
  },
];

const recentActivities = [
  { date: "Oct 15, 2023", activity: "Completed Route #248", coins: "+20" },
  { date: "Oct 14, 2023", activity: "Substituted for Bus #12", coins: "+50" },
  { date: "Oct 12, 2023", activity: "Redeemed Fuel Card Bonus", coins: "-500" },
  { date: "Oct 10, 2023", activity: "Completed Route #248", coins: "+20" },
  { date: "Oct 09, 2023", activity: "On-time bonus", coins: "+10" },
];

const DriverRewardsPage = () => {
  const navigate = useNavigate();
  const currentCoins = 750;
  const nextMilestone = 1000;
  const progress = (currentCoins / nextMilestone) * 100;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background shapes */}
      <div className="dashboard-bg-shape"></div>
      <div className="dashboard-bg-shape"></div>
      <div className="dashboard-bg-shape"></div>
      <div className="dashboard-bg-shape"></div>
      
      <NavBar userType="driver" />
      
      <main className="container mx-auto px-4 pt-16 pb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Driver Rewards</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/driver')}
              className="text-sm"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 shadow-lg text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Coins className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-medium">Your Balance</h2>
                <p className="text-white/80 text-sm">Current reward points</p>
              </div>
            </div>
            
            <div className="text-4xl font-bold mb-4">{currentCoins} <span className="text-xl">coins</span></div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to next tier</span>
                <span>{currentCoins} / {nextMilestone}</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/20" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-yellow-500" />
              <h2 className="text-lg font-medium">How to Earn</h2>
            </div>
            
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5 bg-green-100 text-green-700 hover:bg-green-100">+20</Badge>
                <span>Complete your regular route</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5 bg-blue-100 text-blue-700 hover:bg-blue-100">+50</Badge>
                <span>Substitute for another driver</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5 bg-purple-100 text-purple-700 hover:bg-purple-100">+10</Badge>
                <span>On-time arrival bonus</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5 bg-amber-100 text-amber-700 hover:bg-amber-100">+100</Badge>
                <span>Perfect attendance for the month</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5 bg-pink-100 text-pink-700 hover:bg-pink-100">+30</Badge>
                <span>Positive feedback from parents</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-brand" />
              <h2 className="text-lg font-medium">Monthly Stats</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Coins Earned This Month</p>
                <p className="text-2xl font-semibold text-gray-800">320</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Coins Redeemed</p>
                <p className="text-2xl font-semibold text-gray-800">500</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Substitute Trips</p>
                <p className="text-2xl font-semibold text-gray-800">3</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-brand" />
                  <h2 className="text-lg font-medium">Available Rewards</h2>
                </div>
                
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rewards.map((reward) => (
                  <div key={reward.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{reward.image}</div>
                      <div className="flex-1">
                        <h3 className="font-medium">{reward.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">{reward.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-sm">
                            <Coins className="h-3 w-3 mr-1" /> {reward.cost} coins
                          </Badge>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={currentCoins < reward.cost}
                          >
                            Redeem
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-brand" />
                <h2 className="text-lg font-medium">Recent Activity</h2>
              </div>
              
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium">{activity.activity}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                    <Badge 
                      variant={activity.coins.startsWith('+') ? 'default' : 'outline'} 
                      className={activity.coins.startsWith('+') ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'text-red-600 border-red-200'}
                    >
                      {activity.coins}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-500 shrink-0" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Pro Tip</p>
                    <p className="text-blue-600">Volunteer for substitute trips to earn 2.5x more coins!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverRewardsPage;
