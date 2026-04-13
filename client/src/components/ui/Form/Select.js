import React from 'react';

const Select = ({ 
  value, 
  onChange, 
  options = [], 
  placeholder = 'Select option', 
  required = false, 
  className = '',
  ...props 
}) => {
  return (
    <div className="relative group">
      <select
        value={value}
        onChange={onChange}
        required={required}
        className={`
          w-full px-5 py-3 
          bg-white/50 dark:bg-dark-900/50 
          border border-gray-200 dark:border-dark-600 
          rounded-2xl 
          focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 
          transition-all outline-none 
          appearance-none cursor-pointer
          text-gray-700
          ${className}
        `}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-primary-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </div>
  );
};

export default Select;
