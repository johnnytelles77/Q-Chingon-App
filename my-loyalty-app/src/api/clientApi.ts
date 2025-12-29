import axios from 'axios';
import { ClientDTO } from '../types/ClientDTO';

const BASE_URL = 'http://localhost:8080/api'; // 🔑 Puerto del backend

export const clientApi = {
  searchByPhone: async (telefono: string, token: string): Promise<ClientDTO> => {
    const { data } = await axios.get(`${BASE_URL}/users/telefono/${telefono}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Si tu endpoint requiere JWT
      },
    });
    return data;
  },
  addPoints: async (userId: number, puntos: number, token: string): Promise<ClientDTO> => {
    const { data } = await axios.put(
      `${BASE_URL}/users/${userId}/add-points/${puntos}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
  redeemPoints: async (userId: number, puntos: number, token: string): Promise<ClientDTO> => {
    const { data } = await axios.put(
      `${BASE_URL}/users/${userId}/redeem-points/${puntos}`, null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
};