import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false, 
  className = '',
  loading = false
}) => {
  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-200 active:scale-95',
    secondary: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95',
    ghost: 'text-gray-500 hover:bg-gray-100 font-bold',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-200 active:scale-95'
  };

  const baseStyle = 'px-8 py-3 rounded-2xl font-bold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
