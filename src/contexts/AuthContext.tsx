import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState, UserRole } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
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
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    setAuthState({
      user: mockUser,
      isAuthenticated: true,
    });

    return true;
  };

  const register = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    setAuthState({
      user: mockUser,
      isAuthenticated: true,
    });

    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
};