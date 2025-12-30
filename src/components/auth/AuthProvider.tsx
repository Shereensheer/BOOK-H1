import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our auth context
interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  loading: boolean;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Mock authentication service
class MockAuthService {
  static async login(email: string, password: string) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple validation
    if (email === 'admin@example.com' && password === 'password123') {
      return {
        id: 1,
        email,
        name: 'Admin User',
        token: 'mock-jwt-token-' + Date.now()
      };
    }
    
    throw new Error('Invalid email or password');
  }

  static async register(email: string, password: string, name: string) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple validation
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }
    
    // Return mock user data
    return {
      id: Date.now(),
      email,
      name,
      token: 'mock-jwt-token-' + Date.now()
    };
  }

  static logout() {
    // Clear any stored tokens
    localStorage.removeItem('authToken');
  }

  static getStoredUser() {
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, you'd decode the JWT to get user info
      // For this mock, we'll return a fake user object
      return {
        id: 1,
        email: 'admin@example.com',
        name: 'Admin User',
        token
      };
    }
    return null;
  }

  static storeUser(user: any) {
    if (user.token) {
      localStorage.setItem('authToken', user.token);
    }
  }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = MockAuthService.getStoredUser();
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await MockAuthService.login(email, password);
      MockAuthService.storeUser(userData);
      setIsAuthenticated(true);
      setUser(userData);
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    MockAuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const userData = await MockAuthService.register(email, password, name);
      MockAuthService.storeUser(userData);
      setIsAuthenticated(true);
      setUser(userData);
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};