// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// Clerk imports
import { ClerkProvider } from '@clerk/clerk-react';

// Optional: Your custom AuthContext (if used)
import { AuthProvider } from './context/AuthContext';

// Fonts (optional)
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

// Load Clerk publishable key from Vite env variable
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_aG9uZXN0LXNoaW5lci02My5jbGVyay5hY2NvdW50cy5kZXYk';

// Check that the key exists
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key in .env file');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      afterSignInUrl="/dashboard"
      afterSignOutUrl="/"
    >
      {/* Wrap your app in custom context if needed */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </ClerkProvider>
  </React.StrictMode>
);
