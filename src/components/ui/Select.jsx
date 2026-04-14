import React from 'react';

const Select = ({ 
  label, 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  helperText, 
  required = false, 
  disabled = false, 
  options = [], 
  placeholder = 'Select an option',
  className = '',
  ...props 
}) => {
  const selectId = `select-${name || Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`form-input ${error ? 'error' : ''}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="error">{error}</span>
      )}
      {helperText && !error && (
        <span className="helper-text">{helperText}</span>
      )}
    </div>
  );
};

export default Select;
