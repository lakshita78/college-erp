import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  icon: Icon,
  action,
  footer,
  padding = 'md',
  shadow = 'dark',
  border = true,
  gradient = false,
  hover = false,
  className = '',
  onClick,
}) => {
  const baseStyles = 'bg-white dark:bg-dark-800 rounded-2xl overflow-hidden transition-all duration-200';

  const shadows = {
    none: '',
    sm: 'shadow-dark-sm',
    dark: 'shadow-dark',
    md: 'shadow-dark-md',
    lg: 'shadow-dark-lg',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const borders = border ? 'border border-light-600 dark:border-dark-600' : '';
  const gradients = gradient ? 'relative before:absolute before:inset-0 before:p-[1px] before:rounded-2xl before:bg-gradient-border before:-z-10' : '';
  const hovers = hover ? 'hover:border-light-500 dark:hover:border-dark-500 hover:shadow-light-md dark:hover:shadow-dark-md cursor-pointer' : '';

  return (
    <div
      className={`
        ${baseStyles}
        ${shadows[shadow]}
        ${borders}
        ${gradients}
        ${hovers}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Card Header */}
      {(title || Icon) && (
        <div className={`flex items-center justify-between ${paddings[padding]} pb-0`}>
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary-400" />
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-content">{title}</h3>
              )}
              {subtitle && (
                <p className="text-sm text-content-muted mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {action && (
            <div className="flex items-center gap-2">
              {action}
            </div>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className={paddings[padding]}>
        {children}
      </div>

      {/* Card Footer */}
      {footer && (
        <div className={`border-t border-light-600 dark:border-dark-600 ${paddings[padding]} pt-4`}>
          {footer}
        </div>
      )}
    </div>
  );
};

// Card Section for grouping content within cards
export const CardSection = ({ children, title, className = '' }) => (
  <div className={`${className}`}>
    {title && (
      <h4 className="text-sm font-medium text-content-muted dark:text-content-dark-muted uppercase tracking-wider mb-3">
        {title}
      </h4>
    )}
    {children}
  </div>
);

// Card Grid for multiple cards
export const CardGrid = ({ children, columns = 3, gap = 6, className = '' }) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <div className={`grid ${colClasses[columns] || colClasses[3]} ${gapClasses[gap] || gapClasses[6]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
