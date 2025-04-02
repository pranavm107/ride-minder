
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  description?: string;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  actionText?: string;
  actionLink?: string;
  actionOnClick?: () => void;
  actionVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null;
};

const DashboardCard = ({
  title,
  value,
  icon,
  trend,
  trendLabel,
  description,
  loading = false,
  className,
  onClick,
  actionText,
  actionLink,
  actionOnClick,
  actionVariant = "default"
}: DashboardCardProps) => {
  const hasTrend = trend !== undefined;
  const isTrendPositive = hasTrend && trend > 0;
  const isTrendNegative = hasTrend && trend < 0;
  const isTrendNeutral = hasTrend && trend === 0;
  
  return (
    <div 
      className={cn(
        'bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300',
        onClick && 'cursor-pointer hover:-translate-y-1',
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && (
          <div className="h-8 w-8 flex items-center justify-center bg-brand-50 text-brand-500 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="animate-pulse h-8 w-2/3 bg-gray-200 rounded mb-2"></div>
      ) : (
        <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      )}
      
      {description && (
        <div className="text-sm text-gray-500 mb-3">{description}</div>
      )}
      
      {hasTrend && (
        <div className="flex items-center mt-2">
          <div 
            className={cn(
              'flex items-center text-xs font-medium rounded-full px-2 py-1',
              isTrendPositive && 'bg-green-50 text-green-700',
              isTrendNegative && 'bg-red-50 text-red-700',
              isTrendNeutral && 'bg-gray-50 text-gray-700'
            )}
          >
            {isTrendPositive && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {isTrendNegative && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M8 4V12M8 12L4 8M8 12L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {isTrendNeutral && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M4 8H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {Math.abs(trend)}% {isTrendPositive ? 'up' : isTrendNegative ? 'down' : ''}
          </div>
          {trendLabel && <span className="text-xs text-gray-500 ml-2">{trendLabel}</span>}
        </div>
      )}
      
      {actionText && (
        <div className="mt-4">
          {actionLink ? (
            <Button
              variant={actionVariant || "default"}
              size="sm"
              className="w-full"
              asChild
            >
              <a href={actionLink}>{actionText}</a>
            </Button>
          ) : (
            <Button
              variant={actionVariant || "default"}
              size="sm"
              className="w-full"
              onClick={actionOnClick}
            >
              {actionText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
