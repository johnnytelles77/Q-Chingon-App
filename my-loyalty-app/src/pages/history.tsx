'use client';

import React, { useState, useEffect } from 'react';
import { userApi } from '../api/userApi';
import ToastAlert from '../components/ToastAlert';

interface HistoryItem {
  cantidad: number;
  tipo: string;
  fecha: string;
  userId: number;
  telefono?: string; // Opcional si traes teléfono
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await userApi.getHistory(0, 15, 'ADD_POINTS');
      const data = res.data.content;
      setHistory(data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Error al cargar historial';
      setToast({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="bg-beige-50 p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Historial de puntos</h2>

      {loading && <p>Cargando...</p>}

      {!loading && history.length === 0 && <p>No hay historial</p>}

      {!loading && history.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-sm">
            <thead className="bg-beige-200 text-left">
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Puntos</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="border px-4 py-2">{item.telefono || item.userId}</td>
                  <td className="border px-4 py-2">{item.cantidad}</td>
                  <td className="border px-4 py-2 capitalize">{item.tipo}</td>
                  <td className="border px-4 py-2">{new Date(item.fecha).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {toast && <ToastAlert type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}