
import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real app, we would use a secure authentication system
// This is a simplified version for demonstration
const ADMIN_PASSWORD = "hitesh123"; // In a real app, this would be hashed and stored securely

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState(ADMIN_PASSWORD);

  // Check local storage on initial load
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
      setPassword(newPassword);
      // In a real app, we would update the password in a secure database
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
