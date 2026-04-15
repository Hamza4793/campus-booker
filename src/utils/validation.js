import { VALIDATION_MESSAGES } from '../constants';

/**
 * Validate booking form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation result with errors
 */
export const validateBookingForm = (formData) => {
  const errors = {};

  // User name validation
  if (!formData.userName || formData.userName.trim() === '') {
    errors.userName = VALIDATION_MESSAGES.REQUIRED;
  } else if (formData.userName.trim().length < 2) {
    errors.userName = 'Name must be at least 2 characters long';
  }
  
  // Resource ID validation
  if (!formData.resourceId) {
    errors.resourceId = VALIDATION_MESSAGES.REQUIRED;
  }
  
  // Date validation
  if (!formData.date) {
    errors.date = VALIDATION_MESSAGES.REQUIRED;
  } else {
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.date = VALIDATION_MESSAGES.INVALID_DATE;
    }
  }
  
  // Start time validation
  if (!formData.startTime) {
    errors.startTime = VALIDATION_MESSAGES.REQUIRED;
  }
  
  // End time validation
  if (!formData.endTime) {
    errors.endTime = VALIDATION_MESSAGES.REQUIRED;
  }
  
  // Time validation (end time must be after start time)
  if (formData.startTime && formData.endTime) {
    if (formData.startTime >= formData.endTime) {
      errors.endTime = VALIDATION_MESSAGES.INVALID_TIME;
    }
  }
  
  // Purpose validation
  if (!formData.purpose || formData.purpose.trim() === '') {
    errors.purpose = VALIDATION_MESSAGES.REQUIRED;
  } else if (formData.purpose.length < 10) {
    errors.purpose = 'Purpose must be at least 10 characters long';
  } else if (formData.purpose.length > 200) {
    errors.purpose = 'Purpose must not exceed 200 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate user input for booking approval/rejection
 * @param {string} action - Action type (approve/reject)
 * @param {string} reason - Rejection reason (required for rejection)
 * @returns {Object} - Validation result
 */
export const validateAdminAction = (action, reason) => {
  const errors = {};
  
  if (action === 'reject' && (!reason || reason.trim() === '')) {
    errors.reason = 'Rejection reason is required';
  } else if (reason && reason.length > 200) {
    errors.reason = 'Reason must not exceed 200 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if phone number is valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - Input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

/**
 * Validate and sanitize form data
 * @param {Object} formData - Form data to validate and sanitize
 * @returns {Object} - Validated and sanitized form data
 */
export const validateAndSanitizeForm = (formData) => {
  const sanitized = {};
  const validation = validateBookingForm(formData);
  
  // Sanitize string fields
  Object.keys(formData).forEach(key => {
    if (typeof formData[key] === 'string') {
      sanitized[key] = sanitizeInput(formData[key]);
    } else {
      sanitized[key] = formData[key];
    }
  });
  
  return {
    data: sanitized,
    ...validation
  };
};
