import React from 'react';

const ConfirmationModal: React.FC<{ onConfirm: () => void, onCancel: () => void }> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p className="mb-4">¿Estás seguro de que quieres continuar?</p>
        <div className="flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={onCancel}>
            No
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onConfirm}>
            Sí
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
