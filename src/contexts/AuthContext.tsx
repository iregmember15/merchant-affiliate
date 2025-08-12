import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'merchant' | 'affiliate';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'merchant' | 'affiliate') => void;
  signup: (email: string, password: string, name: string, type: 'merchant' | 'affiliate') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, type: 'merchant' | 'affiliate') => {
    // Simulate login - in real app, this would be an API call
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      type
    };
    setUser(mockUser);
  };

  const signup = (email: string, password: string, name: string, type: 'merchant' | 'affiliate') => {
    // Simulate signup - in real app, this would be an API call
    const mockUser: User = {
      id: '1',
      email,
      name,
      type
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
