'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '@/app/types';
import { ApiClient, ApiError } from '@/app/api';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (token: string, userData: Omit<User, 'profilePictureUrl'>) => void; 
    logout: () => void;
    updateProfilePictureInContext: (url: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [token, setTokenState] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfilePicture = async (currentToken: string, baseUser: User) => {
        if (!currentToken || !baseUser) return;
        const apiClient = new ApiClient();
        apiClient.setToken(currentToken);
        try {
            const result = await apiClient.getMyProfilePicture();
            setUserState({ ...baseUser, profilePictureUrl: result?.profilePictureUrl });
        } catch (error) {
            console.error("Failed to fetch profile picture:", error);
             if (error instanceof ApiError && error.status === 401) {
                 logout(); 
             } else {
                 setUserState(baseUser);
             }
        }
    };

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true); 
        const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
        const storedUserDataString = localStorage.getItem(USER_DATA_KEY);

        if (storedToken && storedUserDataString) {
            try {
                const parsedUser = JSON.parse(storedUserDataString) as Omit<User, 'profilePictureUrl'>;
                setTokenState(storedToken);
                setUserState(parsedUser); 
                fetchProfilePicture(storedToken, parsedUser); 
            } catch (e) {
                console.error("Failed parsing stored auth data", e);
                localStorage.removeItem(AUTH_TOKEN_KEY);
                localStorage.removeItem(USER_DATA_KEY);
                setUserState(null);
                setTokenState(null);
            }
        }
        if (isMounted) {
           setIsLoading(false);
        }

        return () => { isMounted = false; };
    }, []); 

    const login = (newToken: string, userData: Omit<User, 'profilePictureUrl'>) => {
        try {
            localStorage.setItem(AUTH_TOKEN_KEY, newToken);
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
            setTokenState(newToken);
            setUserState(userData); 
            fetchProfilePicture(newToken, userData); 
        } catch (error) {
             console.error("Failed to save auth state", error);
             localStorage.removeItem(AUTH_TOKEN_KEY);
             localStorage.removeItem(USER_DATA_KEY);
             setTokenState(null);
             setUserState(null);
        }
    };

    const logout = () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
        setTokenState(null);
        setUserState(null);
    };

    const updateProfilePictureInContext = (url: string | null) => {
        setUserState(currentUser => currentUser ? { ...currentUser, profilePictureUrl: url } : null);
    };

    const value = {
        user,
        token,
        isLoading,
        login,
        logout,
        updateProfilePictureInContext
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};