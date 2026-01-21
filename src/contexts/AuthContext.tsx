import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo
const mockUser: User = {
    id: 'user-1',
    name: 'Ahmad Hidayat',
    email: 'ahmad@example.com',
    phone: '+62812345678',
    membershipLevel: 'Gold',
    coinBalance: 450,
    totalTrips: 12,
    joinedAt: '2025-06-15',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(mockUser); // Auto login untuk demo
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const login = async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser(mockUser);
        setIsAuthenticated(true);
    };

    const register = async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newUser: User = {
            ...mockUser,
            name,
            email,
            membershipLevel: 'Bronze',
            coinBalance: 100,
            totalTrips: 0,
            joinedAt: new Date().toISOString(),
        };
        setUser(newUser);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
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
