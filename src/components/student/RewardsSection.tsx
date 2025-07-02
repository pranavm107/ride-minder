
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet2, Star, Gift, Coins } from 'lucide-react';

interface RewardsSectionProps {
  balance: number;
}

const RewardsSection = ({ balance }: RewardsSectionProps) => {
  const rewards = [
    { id: 1, name: 'Free Ride Voucher', cost: 50, available: true },
    { id: 2, name: 'Priority Seating', cost: 30, available: true },
    { id: 3, name: 'Monthly Pass Discount', cost: 100, available: false }
  ];

  const recentTransactions = [
    { id: 1, type: 'earn', amount: 10, description: 'On-time boarding bonus', date: 'Today' },
    { id: 2, type: 'spend', amount: -25, description: 'Ride payment', date: 'Yesterday' },
    { id: 3, type: 'earn', amount: 5, description: 'Feedback reward', date: '2 days ago' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Wallet Balance */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-green-800 flex items-center gap-2">
            <Wallet2 className="h-5 w-5" />
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-green-600 mb-1">${balance}</div>
            <p className="text-sm text-gray-600">Available Balance</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Coins className="h-4 w-4" />
              Recent Transactions
            </h4>
            {recentTransactions.slice(0, 3).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
                <span className={`font-medium ${
                  transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'earn' ? '+' : ''}${Math.abs(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rewards Store */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-purple-800 flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Rewards Store
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <p className="font-medium text-gray-900">{reward.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-purple-600 font-medium">{reward.cost} coins</span>
                    {!reward.available && (
                      <Badge variant="secondary" className="text-xs">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={reward.available && balance >= reward.cost ? "default" : "outline"}
                  disabled={!reward.available || balance < reward.cost}
                  className="shrink-0"
                >
                  {reward.available ? 'Redeem' : 'Soon'}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">Earn More Coins</span>
            </div>
            <p className="text-xs text-amber-700">
              Earn coins by arriving on time, providing feedback, and referring friends!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsSection;
