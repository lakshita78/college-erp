import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = 'md',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-medium';

  const variants = {
    default: 'bg-light-600 dark:bg-dark-600 text-gray-900 dark:text-white',
    primary: 'bg-primary-500/20 text-primary-600 dark:text-primary-400 border border-primary-500/30',
    success: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    danger: 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30',
    info: 'bg-accent-teal/20 text-teal-600 dark:text-accent-teal border border-accent-teal/30',
    accent: 'bg-accent-purple/20 text-purple-600 dark:text-accent-purple border border-accent-purple/30',
    outline: 'bg-transparent border border-light-500 dark:border-dark-500 text-gray-600 dark:text-gray-400',
    ghost: 'bg-transparent text-gray-600 dark:text-gray-400',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${roundeds[rounded]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
