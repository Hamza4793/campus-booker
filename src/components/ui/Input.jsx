import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  helperText, 
  required = false, 
  disabled = false, 
  placeholder = '',
  className = '',
  ...props 
}) => {
  const inputId = `input-${name || Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        className={`form-input ${error ? 'error' : ''}`}
        {...props}
      />
      {error && (
        <span className="error">{error}</span>
      )}
      {helperText && !error && (
        <span className="helper-text">{helperText}</span>
      )}
    </div>
  );
};

export default Input;
