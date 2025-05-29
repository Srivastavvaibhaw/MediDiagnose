// Simple validation functions

// Validate email
exports.validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Validate password strength
exports.validatePasswordStrength = (password) => {
  // Password must be at least 6 characters and contain at least one number
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return re.test(password);
};

// Validate registration input
exports.validateRegistration = (data) => {
  const errors = {};

  // First name validation
  if (!data.firstName) {
    errors.firstName = 'First name is required';
  }

  // Last name validation
  if (!data.lastName) {
    errors.lastName = 'Last name is required';
  }

  // Email validation
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!this.validateEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (!this.validatePasswordStrength(data.password)) {
    errors.password = 'Password must be at least 6 characters and contain at least one number';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

// Validate login input
exports.validateLogin = (data) => {
  const errors = {};

  // Email validation
  if (!data.email) {
    errors.email = 'Email is required';
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

// Validate diagnosis input
exports.validateDiagnosis = (data) => {
  const errors = {};

  // Symptoms validation
  if (!data.symptoms || (Array.isArray(data.symptoms) && data.symptoms.length === 0)) {
    errors.symptoms = 'At least one symptom is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
