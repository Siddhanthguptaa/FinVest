// src/context/AuthContext.tsx
'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
    userId: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            try {
                const decodedUser: User = jwtDecode(storedToken);
                setUser(decodedUser);
                setToken(storedToken);
            } catch (error) {
                console.error("Invalid token found in localStorage", error);
                localStorage.removeItem('jwtToken');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (newToken: string) => {
        const decodedUser: User = jwtDecode(newToken);
        localStorage.setItem('jwtToken', newToken);
        setUser(decodedUser);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {!isLoading && children}
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