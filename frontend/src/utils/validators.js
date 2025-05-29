// src/utils/validators.js
/**
 * Utility functions for form validation
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid flag and message
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }
  
  return { isValid: true, message: 'Password is strong' };
};

/**
 * Check if passwords match
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {boolean} True if passwords match
 */
export const doPasswordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Validate name (non-empty and proper format)
 * @param {string} name - Name to validate
 * @returns {boolean} True if name is valid
 */
export const isValidName = (name) => {
  if (!name || name.trim() === '') return false;
  
  // Name should be at least 2 characters long
  if (name.trim().length < 2) return false;
  
  // Name should not contain numbers or special characters
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name);
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number is valid
 */
export const isValidPhone = (phone) => {
  // Allow various phone formats with optional country code
  const phoneRegex = /^(\+\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate date format (YYYY-MM-DD)
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if date is valid
 */
export const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  const timestamp = date.getTime();
  
  if (isNaN(timestamp)) return false;
  
  return date.toISOString().slice(0, 10) === dateString;
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Validate image file type and size
 * @param {File} file - File object to validate
 * @param {number} maxSize - Maximum file size in bytes (default 5MB)
 * @returns {Object} Validation result with isValid flag and message
 */
export const validateImageFile = (file, maxSize = 5 * 1024 * 1024) => {
  if (!file) {
    return { isValid: false, message: 'No file selected' };
  }
  
  // Check file type
  const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/heic', 'image/heif'];
  if (!acceptedTypes.includes(file.type)) {
    return { isValid: false, message: 'File must be a valid image (JPEG, PNG, GIF, HEIC)' };
  }
  
  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return { isValid: false, message: `Image size must be less than ${maxSizeMB}MB` };
  }
  
  return { isValid: true, message: 'Image is valid' };
};

/**
 * Validate symptom description length
 * @param {string} description - Symptom description to validate
 * @param {number} minLength - Minimum required length
 * @returns {Object} Validation result with isValid flag and message
 */
export const validateSymptomDescription = (description, minLength = 20) => {
  if (!description) {
    return { isValid: false, message: 'Symptom description is required' };
  }
  
  if (description.trim().length < minLength) {
    return { isValid: false, message: `Please provide at least ${minLength} characters describing your symptoms` };
  }
  
  return { isValid: true, message: 'Description is valid' };
};

/**
 * Form validation utility for common form fields
 * @param {Object} formData - Form data object
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} Validation errors object
 */
export const validateForm = (formData, requiredFields = []) => {
  const errors = {};
  
  // Check required fields
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });
  
  // Validate specific fields if they exist
  if (formData.email && !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (formData.password) {
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.message;
    }
  }
  
  if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  if (formData.name && !isValidName(formData.name)) {
    errors.name = 'Please enter a valid name';
  }
  
  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return errors;
};
