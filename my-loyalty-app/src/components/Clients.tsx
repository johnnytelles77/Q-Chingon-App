'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface Client {
  id: number;
  nombre: string;
  telefono: string;
  email?: string;
  puntos: number;
  businessId: number | null;
}

export default function Clients() {
  const { business, token } = useAuth();
  const [activeAction, setActiveAction] = useState<'list' | 'create'>('list');
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [editingClientId, setEditingClientId] = useState<number | null>(null);

  // Cargar clientes
  useEffect(() => {
    const fetchClients = async () => {
      if (!token) return;
      try {
        const res = await fetch('http://localhost:8080/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Error al cargar clientes');
        const data: Client[] = await res.json();
        setClients(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClients();
  }, [token]);

  // Crear o actualizar cliente
 const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !phone) {
    setMessage('Debes ingresar nombre y teléfono');
    return;
  }

  try {
    const res = await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // 🔑 CLAVE
      },
      body: JSON.stringify({
        nombre: name,
        telefono: phone,
        email: email,
      }),
    });

    if (!res.ok) throw new Error('Error al crear cliente');

    const data = await res.json();
    setMessage(`Cliente creado: ${data.nombre}`);
    setName('');
    setPhone('');
    setEmail('');
  } catch (err) {
    setMessage(err instanceof Error ? err.message : 'Error desconocido');
  }
};

  // Editar cliente
  const handleEdit = (client: Client) => {
    setName(client.nombre);
    setPhone(client.telefono);
    setEmail(client.email || '');
    setEditingClientId(client.id);
    setActiveAction('create');
  };

  // Eliminar cliente
  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error al eliminar cliente');
      setClients((prev) => prev.filter((c) => c.id !== id));
      setMessage('Cliente eliminado');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-64 bg-beige-50 rounded p-4 shadow-md flex flex-col gap-2">
        <button
          className={`p-2 rounded text-left ${activeAction === 'list' ? 'bg-beige-200 font-bold' : ''}`}
          onClick={() => setActiveAction('list')}
        >
          Clientes
        </button>
        <button
          className={`p-2 rounded text-left ${activeAction === 'create' ? 'bg-beige-200 font-bold' : ''}`}
          onClick={() => setActiveAction('create')}
        >
          Crear Cliente
        </button>
      </div>

      {/* Contenido */}
      <div className="flex-1 bg-beige-50 p-6 rounded shadow-md">
        {activeAction === 'create' ? (
          <form onSubmit={handleSave} className="flex flex-col gap-3">
            <h2 className="text-xl font-bold mb-4">{editingClientId ? 'Editar Cliente' : 'Crear Cliente'}</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email (opcional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded"
            />

            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Guardar
              </button>
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => {
                  setName('');
                  setPhone('');
                  setEmail('');
                  setEditingClientId(null);
                }}
              >
                Cancelar
              </button>
            </div>

            {message && <p className="mt-2 text-green-600">{message}</p>}
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Lista de Clientes</h2>
            {clients.length === 0 ? (
              <p>No hay clientes registrados.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-3 py-1 text-left">Nombre</th>
                    <th className="border px-3 py-1 text-left">Teléfono</th>
                    <th className="border px-3 py-1 text-left">Email</th>
                    <th className="border px-3 py-1 text-left">Puntos</th>
                    <th className="border px-3 py-1 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td className="border px-3 py-1">{client.nombre}</td>
                      <td className="border px-3 py-1">{client.telefono}</td>
                      <td className="border px-3 py-1">{client.email || '-'}</td>
                      <td className="border px-3 py-1">{client.puntos}</td>
                      <td className="border px-3 py-1 flex gap-2">
                        <button
                          className="bg-yellow-400 px-2 py-1 rounded text-white hover:bg-yellow-500"
                          onClick={() => handleEdit(client)}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
                          onClick={() => handleDelete(client.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}