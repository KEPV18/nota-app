import React, { createContext, useState, useContext, useEffect } from 'react';

// Define a type for our user object
const defaultUserState = {
  id: null,
  name: null,
  email: null,
  isAdmin: false,
  avatar: null,
};

// Create context with a more descriptive initial state
export const UserContext = createContext(null);

// Custom hook for consuming the context safely
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUserState);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user !== defaultUserState) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (userData) => {
    setLoading(true);
    try {
      setUser({
        ...defaultUserState,
        ...userData,
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem('user');
      setUser(defaultUserState);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (updates) => {
    setUser(currentUser => ({
      ...currentUser,
      ...updates,
    }));
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        setUser, 
        loading, 
        setLoading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user.id
      }}
    >
      {children}
    </UserContext.Provider>
  );
};