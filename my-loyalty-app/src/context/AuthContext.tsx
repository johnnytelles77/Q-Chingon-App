'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';
import { BusinessDTO } from '../types/BusinessDTO';

interface AuthContextType {
  business: BusinessDTO | null;
  token: string | null;
  login: (email: string, password: string) => Promise<BusinessDTO>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  business: null,
  token: null,
  login: async () => { throw new Error('login function not implemented'); },
  logout: () => {},
  isAuthenticated: false,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [business, setBusiness] = useState<BusinessDTO | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ⚡ Cargar perfil al iniciar la app si hay token guardado
  useEffect(() => {
    const loadProfile = async () => {
      const savedToken = localStorage.getItem('token');
      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const profile = await authApi.getProfile(savedToken);
        setBusiness(profile);
        setToken(savedToken);
      } catch (err: any) {
        console.error('Error al cargar perfil:', err.message);
        localStorage.removeItem('token');
        setBusiness(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authApi.login(email, password);
      localStorage.setItem('token', data.token);
      setToken(data.token);

      const profile = await authApi.getProfile(data.token);
      setBusiness(profile);
      return profile;
    } catch (err: any) {
      throw new Error(err.message || 'Error al iniciar sesión');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setBusiness(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        business,
        token,
        login,
        logout,
        isAuthenticated: !!business,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);