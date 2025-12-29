'use client';
import React from 'react';
import Navbar from '../components/Navbar';

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-beige-50 text-gray-800">
      <Navbar />

      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Clientes</h1>

        <p className="text-gray-600 mb-6">
          Aquí podrás administrar tus clientes, ver su información y asignar puntos.
        </p>

        {/* Aquí irán los componentes */}
        <div className="bg-white p-6 rounded shadow">
          Próximamente: lista de clientes
        </div>
      </main>
    </div>
  );
}