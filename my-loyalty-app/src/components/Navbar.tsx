'use client';
import React, { useState } from 'react';

interface NavbarProps {
  businessName?: string;
  onLogout?: () => void;
  onSelectPage?: (page: 'home' | 'addPoints' | 'history' | 'clients') => void;
}

export default function Navbar({ businessName, onLogout, onSelectPage }: NavbarProps) {
  const [activePage, setActivePage] = useState<
    'home' | 'addPoints' | 'history' | 'clients'
  >('home');

  const handleClick = (page: 'home' | 'addPoints' | 'history' | 'clients') => {
    setActivePage(page);
    onSelectPage?.(page);
  };

  return (
    <nav className="bg-beige-200 p-4 flex justify-between items-center shadow-md">
      {/* Nombre del negocio */}
      <div className="text-xl font-bold">LoyaltyOS</div>

      {/* Menú de navegación */}
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded ${activePage === 'home' ? 'bg-beige-100 font-semibold' : ''}`}
          onClick={() => handleClick('home')}
        >
          Dashboard
        </button>

        <button
          className={`px-4 py-2 rounded ${activePage === 'addPoints' ? 'bg-beige-100 font-semibold' : ''}`}
          onClick={() => handleClick('addPoints')}
        >
          Agregar puntos
        </button>

        <button
          className={`px-4 py-2 rounded ${activePage === 'history' ? 'bg-beige-100 font-semibold' : ''}`}
          onClick={() => handleClick('history')}
        >
          Historial
        </button>

        {/* 🔹 NUEVO: Clientes */}
        <button
          className={`px-4 py-2 rounded ${activePage === 'clients' ? 'bg-beige-100 font-semibold' : ''}`}
          onClick={() => handleClick('clients')}
        >
          Clientes
        </button>
      </div>

      {/* Botón de cerrar sesión */}
      <button
        className="px-4 py-2 rounded bg-red-400 text-white hover:bg-red-500 transition"
        onClick={() => onLogout?.()}
      >
        Cerrar sesión
      </button>
    </nav>
  );
}