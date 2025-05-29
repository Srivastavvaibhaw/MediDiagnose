// src/services/api.js
import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.medidiagnose.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('medidiagnose_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('medidiagnose_token');
      localStorage.removeItem('medidiagnose_user');
      window.location.href = '/login?session_expired=true';
    }
    
    // Create a more user-friendly error message
    const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'An unknown error occurred';
    
    // Enhanced error object
    const enhancedError = {
      ...error,
      message: errorMessage,
      isApiError: true,
      statusCode: error.response?.status,
      timestamp: new Date().toISOString()
    };
    
    return Promise.reject(enhancedError);
  }
);

// Helper function for file uploads
const uploadFile = async (url, file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      }
    }
  });
};

// General API service functions
const apiService = {
  // Generic CRUD operations
  get: (endpoint, params) => api.get(endpoint, { params }),
  post: (endpoint, data) => api.post(endpoint, data),
  put: (endpoint, data) => api.put(endpoint, data),
  patch: (endpoint, data) => api.patch(endpoint, data),
  delete: (endpoint) => api.delete(endpoint),
  
  // File upload
  upload: uploadFile,
  
  // Health check
  healthCheck: () => api.get('/health'),
  
  // Mock API for development without backend
  mock: {
    get: (endpoint) => {
      console.log(`Mock GET request to ${endpoint}`);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { success: true, message: 'This is mock data' } });
        }, 500);
      });
    },
    post: (endpoint, data) => {
      console.log(`Mock POST request to ${endpoint}`, data);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { success: true, message: 'Data received', data } });
        }, 500);
      });
    }
  }
};

export default apiService;
