'use client';
import React, { useState } from "react";
import { ClientDTO } from "../types/ClientDTO";
import { clientApi } from "../api/clientApi";
import { useAuth } from "../context/AuthContext";

interface Props {
  client: ClientDTO;
  onClientUpdate?: (client: ClientDTO) => void;
}

export default function ClientQuickActions({ client, onClientUpdate }: Props) {
  const { token } = useAuth(); // ✅ token desde contexto

  const [localClient, setLocalClient] = useState<ClientDTO>(client);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'redeem' | null>(null);
  const [points, setPoints] = useState(0);

  const openModal = (type: 'add' | 'redeem') => {
    setModalType(type);
    setPoints(0);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setPoints(0);
  };

  const handleConfirm = async () => {
    if (!token || points <= 0 || !modalType) return;

    try {
      let updated: ClientDTO | null = null;

      if (modalType === 'add') {
        updated = await clientApi.addPoints(Number(localClient.id), points, token);
      } else {
        updated = await clientApi.redeemPoints(localClient.id, points, token);
      }

      if (updated) {
        setLocalClient(updated);
        onClientUpdate?.(updated);
      }
    } catch (err: any) {
      console.error(err.message || err);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="bg-green-50 p-4 rounded mt-4">
      <h4 className="font-semibold mb-2">Cliente encontrado</h4>
      <p><b>Nombre:</b> {localClient.nombre}</p>
      <p><b>Teléfono:</b> {localClient.telefono}</p>
      <p><b>Puntos:</b> {localClient.puntos}</p>

      <div className="flex gap-2 mt-3">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={() => openModal('add')}
        >
          ➕ Agregar puntos
        </button>

        <button
          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
          onClick={() => openModal('redeem')}
        >
          🎁 Redimir
        </button>

        <button className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800">
          ✏️ Editar
        </button>
      </div>

      {showModal && modalType && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h3 className="text-lg font-semibold mb-4">
              {modalType === 'add' ? 'Agregar Puntos' : 'Redimir Puntos'}
            </h3>

            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => setPoints(Math.max(points - 1, 0))}
              >
                -
              </button>
              <span className="text-xl">{points}</span>
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => setPoints(points + 1)}
              >
                +
              </button>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-200 px-3 py-1 rounded"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={handleConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}