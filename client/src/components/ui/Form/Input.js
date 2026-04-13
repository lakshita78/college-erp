import React from 'react';

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  className = '', 
  ...props 
}) => {
  const commonClasses = `
    w-full px-5 py-3 
    bg-white/50 dark:bg-dark-900/50 
    border border-gray-200 dark:border-dark-600 
    rounded-2xl 
    focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 
    transition-all outline-none
    placeholder:text-gray-400
    ${className}
  `;

  if (type === 'textarea') {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={commonClasses}
        {...props}
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={commonClasses}
      {...props}
    />
  );
};

export default Input;
