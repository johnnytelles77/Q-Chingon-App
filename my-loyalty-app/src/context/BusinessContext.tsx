'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Business {
  id: number;
  nombre: string;
  email: string;
}

interface BusinessContextType {
  business: Business | null;
  setBusiness: (b: Business) => void;
  loading: boolean;
  fetchBusiness: () => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider = ({ children }: { children: ReactNode }) => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBusiness = async () => {
    try {
      const res = await axios.get('/api/business/me'); // crea endpoint que retorne info del negocio
      setBusiness(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusiness();
  }, []);

  return (
    <BusinessContext.Provider value={{ business, setBusiness, loading, fetchBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) throw new Error('useBusiness must be used within a BusinessProvider');
  return context;
};