import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-500 text-white focus:ring-primary-500 shadow-dark-sm hover:shadow-dark',
    secondary: 'bg-dark-700 hover:bg-dark-600 text-content border border-dark-600 focus:ring-dark-500',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 focus:ring-primary-500',
    ghost: 'bg-transparent text-content-muted hover:text-content hover:bg-dark-700 focus:ring-dark-500',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500 shadow-dark-sm',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-500 shadow-dark-sm',
    accent: 'bg-accent-purple hover:bg-accent-purple/80 text-white focus:ring-accent-purple shadow-dark-sm',
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
    xl: 'px-6 py-4 text-lg',
  };

  const sizeStyles = {
    xs: 'h-7',
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-14',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <Loader2 className={`${size === 'xs' ? 'w-3 h-3' : 'w-4 h-4'} animate-spin mr-2`} />
      )}
      {!loading && LeftIcon && (
        <LeftIcon className={`${size === 'xs' ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
      )}
      {children}
      {!loading && RightIcon && (
        <RightIcon className={`${size === 'xs' ? 'w-3 h-3' : 'w-4 h-4'} ml-2`} />
      )}
    </button>
  );
};

export default Button;
