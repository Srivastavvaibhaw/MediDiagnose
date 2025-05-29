// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

// Theme
import theme from './styles/theme';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { DiagnosisProvider } from './context/DiagnosisContext';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';


// Protected Route Components
const ClerkProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <Navigate to="/login" />
      </SignedOut>
    </>
  );
};

const CustomAuthProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('medidiagnose_token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <DiagnosisProvider>
          <Router>
            <Navbar>
              {/* Add Clerk auth buttons to your navbar */}
              <SignedOut>
                <SignInButton mode="modal" />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </Navbar>
            
            <main>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                
               
                {/* Routes protected by Clerk auth */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ClerkProtectedRoute>
                      {/* <Dashboard /> */}
                      <div>Dashboard (Clerk Protected)</div>
                    </ClerkProtectedRoute>
                  } 
                />
                
                {/* Routes protected by custom auth */}
                <Route 
                  path="/profile" 
                  element={
                    <CustomAuthProtectedRoute>
                      {/* <Profile /> */}
                      <div>Profile (Custom Auth Protected)</div>
                    </CustomAuthProtectedRoute>
                  } 
                />
                
                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </DiagnosisProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;