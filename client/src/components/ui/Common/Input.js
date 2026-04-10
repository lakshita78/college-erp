import React, { forwardRef } from 'react';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  success,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  size = 'md',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  id,
  name,
  autoComplete,
  maxLength,
  minLength,
  pattern,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const baseStyles = 'w-full bg-dark-700 border rounded-xl text-content placeholder-content-disabled transition-all duration-200 focus:outline-none';

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const states = {
    default: 'border-dark-600 hover:border-dark-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
    error: 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20',
    success: 'border-emerald-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
    disabled: 'border-dark-600 bg-dark-800 text-content-disabled cursor-not-allowed',
  };

  const currentState = disabled ? 'disabled' : error ? 'error' : success ? 'success' : 'default';

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-content mb-1.5"
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <LeftIcon className={`w-5 h-5 ${error ? 'text-rose-400' : isFocused ? 'text-primary-400' : 'text-content-disabled'}`} />
          </div>
        )}
        <input
          ref={ref}
          id={id || name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          className={`
            ${baseStyles}
            ${sizes[size]}
            ${states[currentState]}
            ${LeftIcon ? 'pl-10' : ''}
            ${type === 'password' || RightIcon || error || success ? 'pr-10' : ''}
          `}
          {...props}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-content-muted hover:text-content transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
          {error && !type === 'password' && (
            <AlertCircle className="w-5 h-5 text-rose-400" />
          )}
          {success && !error && !type === 'password' && (
            <Check className="w-5 h-5 text-emerald-400" />
          )}
          {RightIcon && !error && !success && (
            <RightIcon className="w-5 h-5 text-content-disabled" />
          )}
        </div>
      </div>
      {(error || helperText) && (
        <p className={`mt-1.5 text-sm ${error ? 'text-rose-400' : 'text-content-muted'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
