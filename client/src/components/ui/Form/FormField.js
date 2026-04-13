import React from 'react';

const FormField = ({ label, children, error, className = '', required = false }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        {children}
      </div>
      {error && (
        <p className="text-[10px] font-medium text-rose-500 ml-1 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
