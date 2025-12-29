'use client';
import React, { useState } from "react";
import { ClientDTO } from "../types/ClientDTO";
import { clientApi } from "../api/clientApi";
import ClientQuickActions from "./ClientQuickActions";
import { useAuth } from "../context/AuthContext";

export default function ClientSearch() {
  const { token } = useAuth();

  const [phone, setPhone] = useState("");
  const [client, setClient] = useState<ClientDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!token || !phone) return;

    setLoading(true);
    setError(null);
    setClient(null);

    try {
      const found = await clientApi.searchByPhone(phone, token);
      setClient(found);
    } catch (err: any) {
      setError("Cliente no encontrado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Buscar Cliente</h3>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
        >
          Buscar
        </button>
      </div>

      {loading && <p className="mt-2 text-gray-500">Buscando...</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}

      {/* ✅ SOLO renderiza ClientQuickActions */}
      {client && (
        <ClientQuickActions
          client={client}
          onClientUpdate={setClient}
        />
      )}
    </div>
  );
}