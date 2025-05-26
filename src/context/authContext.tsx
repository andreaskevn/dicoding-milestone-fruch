"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserSafeData } from '@/lib/definition';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: UserSafeData | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoadingAuth: boolean; 
    login: (userData: UserSafeData, token: string) => void; 
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserSafeData | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true); 
    const router = useRouter();

    useEffect(() => {
        setIsLoadingAuth(true);
        try {
            const storedUser = localStorage.getItem('currentUser');
            const storedToken = localStorage.getItem('authToken');

            if (storedUser && storedToken) {
                const parsedUser: UserSafeData = JSON.parse(storedUser);
                setUser(parsedUser);
                setToken(storedToken);
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('authToken');
            }
        } catch (error) {
            console.error("Gagal mem-parse data pengguna dari localStorage atau token tidak valid:", error);
            localStorage.removeItem('currentUser');
            localStorage.removeItem('authToken');
            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoadingAuth(false);
        }
    }, []);

    const login = (userData: UserSafeData, jwtToken: string) => {
        setUser(userData);
        setToken(jwtToken);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem('authToken', jwtToken);
        console.log("Pengguna login, token disimpan:", jwtToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        console.log("Pengguna logout, token dihapus.");
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isLoadingAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth harus digunakan di dalam AuthProvider');
    }
    return context;
};