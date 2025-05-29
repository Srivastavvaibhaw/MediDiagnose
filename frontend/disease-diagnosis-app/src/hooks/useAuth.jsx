import { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

const API_URL = 'http://localhost:3030';
console.log('API_URL:', API_URL);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          signout();
        } else {
          setToken(storedToken);
          fetchUserData(storedToken);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        signout();
      }
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(API_URL + '/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Failed to fetch user data: ' + response.status + ' ' + errorText);
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      signout();
    }
  };

const signup = async (name, password) => {
  try {
    console.log('Attempting to fetch:', `${API_URL}/signup`); // Debug log
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    });

    if (!response.ok) {
      const errorClone = response.clone();
      try {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed: ' + response.status);
      } catch (jsonError) {
        const errorText = await errorClone.text();
        throw new Error('Signup failed: ' + response.status + ' ' + errorText);
      }
    }

    const data = await response.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error('Signup fetch error:', error.message);
    throw new Error(error.message || 'Error creating account');
  }
};

  const signin = async (name, password) => {
    try {
      const response = await fetch(API_URL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed: ' + response.status);
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      console.error('Signin fetch error:', error.message);
      throw new Error(error.message || 'Invalid name or password');
    }
  };

  const signout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const contextValue = { user, token, signin, signout, signup };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);