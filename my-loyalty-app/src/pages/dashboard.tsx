'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AddPoints from '../components/AddPoints';
import History from '../pages/history';
import DashboardHome from '../components/DashboardHome';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Clients from '../components/Clients';

type MenuOption = 'home' | 'addPoints' | 'history' | 'clients';

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState<MenuOption>('home');

  const { logout, business } = useAuth(); // 🔑 usamos el contexto
  const router = useRouter();

  const renderContent = () => {
    switch (activeMenu) {
      case 'addPoints':
        return <AddPoints />;
      case 'history':
        return <History />;
      case 'clients':
        return <Clients />;
      default:
        return <DashboardHome />;
    }
  };

  // ✅ Cerrar sesión real
  const handleLogout = () => {
    logout();               // borra token + estado
    router.push('/login');  // vuelve al login
  };

  return (
    <div className="min-h-screen bg-beige-50 font-sans text-gray-800">
      {/* Navbar */}
      <Navbar
        businessName={business?.nombre ?? ''}
        onLogout={handleLogout}
        onSelectPage={(page: MenuOption) => setActiveMenu(page)}
      />

      {/* Contenido principal */}
      <main className="pt-6 px-6 md:px-12">
        {renderContent()}
      </main>
    </div>
  );
}