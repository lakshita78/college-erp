import React from 'react';

const FormHeader = ({ title, className = '' }) => {
  return (
    <div className={`flex items-center justify-between border-b border-gray-100 pb-4 mb-8 ${className}`}>
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
        {title}
      </h2>
      <div className="h-px flex-1 bg-gray-100 ml-6" />
    </div>
  );
};

export default FormHeader;
