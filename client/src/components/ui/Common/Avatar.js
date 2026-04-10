import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  className = '',
  fallback,
  status,
  border = false,
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4',
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-dark-400',
    away: 'bg-amber-500',
    busy: 'bg-rose-500',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`
            ${sizes[size]}
            rounded-full object-cover
            ${border ? 'ring-2 ring-dark-600' : ''}
          `}
        />
      ) : name ? (
        <div
          className={`
            ${sizes[size]}
            rounded-full bg-gradient-to-br from-primary-500 to-accent-purple
            flex items-center justify-center text-white font-semibold
            ${border ? 'ring-2 ring-dark-600' : ''}
          `}
        >
          {getInitials(name)}
        </div>
      ) : (
        <div
          className={`
            ${sizes[size]}
            rounded-full bg-dark-600 flex items-center justify-center text-content-muted
            ${border ? 'ring-2 ring-dark-500' : ''}
          `}
        >
          {fallback || <User className="w-1/2 h-1/2" />}
        </div>
      )}

      {status && (
        <span
          className={`
            absolute bottom-0 right-0 
            ${statusSizes[size]}
            ${statusColors[status]}
            rounded-full ring-2 ring-dark-800
          `}
        />
      )}
    </div>
  );
};

export default Avatar;
