import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  trend,
  suffix = '',
  prefix = '',
  loading = false,
  onClick,
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-emerald-400';
    if (changeType === 'negative') return 'text-rose-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getTrendIcon = () => {
    if (changeType === 'positive') return <TrendingUp className="w-4 h-4" />;
    if (changeType === 'negative') return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-light-600 dark:border-dark-600 animate-pulse">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="h-4 w-24 bg-light-600 dark:bg-dark-600 rounded" />
            <div className="h-8 w-32 bg-light-600 dark:bg-dark-600 rounded" />
          </div>
          <div className="w-12 h-12 bg-light-600 dark:bg-dark-600 rounded-xl" />
        </div>
        <div className="mt-4 h-4 w-20 bg-light-600 dark:bg-dark-600 rounded" />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`
        relative bg-white/90 backdrop-blur-sm dark:bg-dark-800 rounded-3xl p-6 
        shadow-infix hover:shadow-infix-hover border border-white dark:border-dark-600
        transition-all duration-300 transform hover:-translate-y-1
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      {/* Gradient accent on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-accent-purple/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {prefix}{value}{suffix}
            </h3>
          </div>

          {Icon && (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-purple/20 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary-400" />
            </div>
          )}
        </div>

        {(change !== undefined || trend) && (
          <div className="flex items-center gap-2 mt-4">
            <div className={`flex items-center gap-1 text-sm font-medium ${getChangeColor()}`}>
              {getTrendIcon()}
              {change !== undefined && (
                <span>
                  {change > 0 ? '+' : ''}{change}%
                </span>
              )}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              vs last month
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
