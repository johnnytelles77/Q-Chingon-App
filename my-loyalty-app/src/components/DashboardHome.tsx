'use client';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ClientSearch from '../components/ClientSearch';
import ClientQuickActions from './ClientQuickActions';
import { ClientDTO } from '../types/ClientDTO';

export default function DashboardHome() {
  const { business } = useAuth();
  const [selectedClient, setSelectedClient] = useState<ClientDTO | null>(null);

  return (
    <div className="space-y-8">
      {/* 🟦 BIENVENIDA (TU CÓDIGO ORIGINAL) */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Bienvenido{business?.nombre ? `, ${business.nombre}` : ''}
        </h1>

        <p className="text-gray-700 mb-6">
          Aquí puedes administrar tu programa de lealtad, agregar puntos a tus clientes y revisar el historial de movimientos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-beige-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Agregar puntos</h3>
            <p className="text-gray-600">
              Registra los puntos que ganan tus clientes fácilmente.
            </p>
          </div>

          <div className="bg-beige-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Historial</h3>
            <p className="text-gray-600">
              Consulta todas las transacciones de puntos realizadas.
            </p>
          </div>
        </div>
      </div>

      {/* 🟩 BUSCADOR DE CLIENTES */}
      <ClientSearch onClientFound={setSelectedClient} />

      {/* 🟨 ACCIONES RÁPIDAS */}
      {selectedClient && (
        <ClientQuickActions client={selectedClient} />
      )}
    </div>
  );
}