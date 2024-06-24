import React, { useState } from 'react';
import Product from '../interface/Product';

const ProductForm: React.FC<{ onSave: (product: Product) => void, onClose: () => void, product?: Product }> = ({ onSave, onClose, product }) => {
  const [name, setName] = useState(product?.name || '');
  const [weight, setWeight] = useState(product?.weight || '');
  const [weightType, setWeightType] = useState(product?.weightType || 'kg');
  const [category, setCategory] = useState(product?.category || 'categoria1');
  const [price, setPrice] = useState(product?.price || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct: Product = { id: product?.id || Date.now(), name, weight, weightType, category, price };
    onSave(newProduct);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">{product ? 'Editar Producto' : 'Añadir Producto'}</h2>
        <label className="block mb-2">Nombre</label>
        <input
          className="border p-2 w-full mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block mb-2">Peso</label>
        <input
          type="number"
          className="border p-2 w-full mb-4"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />

        <label className="block mb-2">Tipo de Peso</label>
        <select
          className="border p-2 w-full mb-4"
          value={weightType}
          onChange={(e) => setWeightType(e.target.value)}
          required
        >
          <option value="kg">kg</option>
          <option value="lb">lb</option>
        </select>

        <label className="block mb-2">Categoría</label>
        <select
          className="border p-2 w-full mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="categoria1">Categoría 1</option>
          <option value="categoria2">Categoría 2</option>
        </select>
        <button type="button" className="text-blue-500 mb-4">Añadir Categoría</button>

        <label className="block mb-2">Precio</label>
        <input
          type="number"
          className="border p-2 w-full mb-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <div className="flex justify-end">
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
