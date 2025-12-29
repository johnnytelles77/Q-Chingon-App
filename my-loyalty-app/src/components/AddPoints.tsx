'use client';

import React, { useState } from 'react';
import { userApi } from '../api/userApi';
import ToastAlert from './ToastAlert';

export default function AddPoints() {
  const [telefono, setTelefono] = useState('');
  const [puntos, setPuntos] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleAddPoints = async () => {
    if (!telefono.trim() || puntos <= 0) {
      setToast({ type: 'error', message: 'Ingresa teléfono y puntos válidos' });
      return;
    }

    setLoading(true);
    setToast(null);

    try {
      // Buscar usuario
      const userResp = await userApi.getUserByTelefono(telefono.trim());
      const userId = userResp.data?.id;

      if (!userId) throw new Error('Usuario no encontrado');

      // Agregar puntos
      await userApi.addPoints(userId, puntos);

      setToast({ type: 'success', message: 'Puntos agregados correctamente' });
      setTelefono('');
      setPuntos(0);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Error al agregar puntos';
      setToast({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-beige-50 p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Agregar puntos a cliente</h2>

      <input
        type="text"
        placeholder="Teléfono del cliente"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />

      <input
        type="number"
        placeholder="Cantidad de puntos"
        value={puntos}
        onChange={(e) => setPuntos(Number(e.target.value))}
        className="w-full p-2 border rounded mb-3"
      />

      <button
        onClick={handleAddPoints}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Agregando...' : 'Agregar puntos'}
      </button>

      {toast && <ToastAlert type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}