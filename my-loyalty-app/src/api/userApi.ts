import axios from './axios';
import { UserDTO } from '../types/UserDTO';
import { BusinessDTO } from '../types/BusinessDTO';

export const userApi = {
  addPoints: async (userId: number, puntos: number) => {
    // ✅ Aquí usamos userId, no telefono
    return axios.put(`/api/users/${userId}/add-points/${puntos}`);
  },
  getUserByTelefono: async (telefono: string) => {
    return axios.get<UserDTO>(`/api/users/telefono/${telefono}`);
  },
  getHistory: async (page = 0, size = 15, tipo?: string) => {
    const params: any = { page, size };
    if (tipo) params.tipo = tipo;
    return axios.get('/api/points/history/business', { params });
  },
  getBusiness: async () => {
    return axios.get<BusinessDTO>('/api/businesses/me');
  }
};

