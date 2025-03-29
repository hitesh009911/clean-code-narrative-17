
import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default password - in a real app, this would be hashed and stored securely
const DEFAULT_PASSWORD = "hitesh123";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Get the stored password from localStorage or use the default
  const [password, setPassword] = useState(() => {
    const storedPassword = localStorage.getItem('adminPassword');
    return storedPassword || DEFAULT_PASSWORD;
  });

  // Check local storage on initial load for auth status
  useEffect(() => {
    const authStatus = localStorage.getItem('cmsAuth');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const login = (attemptedPassword: string) => {
    if (attemptedPassword === password) {
      setIsAuthenticated(true);
      localStorage.setItem('cmsAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cmsAuth');
  };

  const updatePassword = (currentPassword: string, newPassword: string) => {
    if (currentPassword === password) {
      // Save password to both state and localStorage
      setPassword(newPassword);
      localStorage.setItem('adminPassword', newPassword);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
