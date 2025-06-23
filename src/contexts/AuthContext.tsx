import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterData } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // In a real app, this would be an API call
    setIsLoading(true);
    
    // Mock login for demo
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Hardcoded admin credentials for demo
        if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
          const adminUser = {
            id: '1',
            name: 'Admin User',
            email: credentials.email,
            role: 'admin'
          };
          setUser(adminUser);
          localStorage.setItem('user', JSON.stringify(adminUser));
          setIsLoading(false);
          resolve();
        }
        // Regular user
        else if (credentials.email === 'user@example.com' && credentials.password === 'user123') {
          const regularUser = {
            id: '2',
            name: 'Regular User',
            email: credentials.email,
            role: 'customer'
          };
          setUser(regularUser);
          localStorage.setItem('user', JSON.stringify(regularUser));
          setIsLoading(false);
          resolve();
        }
        else {
          setIsLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = async (data: RegisterData) => {
    // In a real app, this would be an API call
    setIsLoading(true);
    
    // Mock registration for demo
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now().toString(),
          name: data.name,
          email: data.email,
          role: 'customer'
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      isLoading,
      login,
      register,
      logout
    }}>
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