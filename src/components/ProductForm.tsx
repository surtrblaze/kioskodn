import React, { useState } from 'react';
import { Product } from '../interface/Product';

interface Props {
  onSave: (product: Product) => Promise<void>;
  onClose: () => void;
  product?: Product | null;
}

const ProductForm: React.FC<Props> = ({ onSave, onClose, product }) => {
  const [name, setName] = useState(product?.name || '');
  const [weight, setWeight] = useState(product?.weight || '');
  const [weightType, setWeightType] = useState(product?.weightType || 'kg');
  const [category, setCategory] = useState(product?.category || 'Alimentos');
  const [price, setPrice] = useState(product?.price || 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct: Product = { id: product?.id || Date.now(), name, weight, weightType, category, price };
    onSave(newProduct);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg overflow-y-auto h-5/6 w-2/4">
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
          <option value="g">g</option>
        </select>

        <label className="block mb-2">Categoría</label>
        <select
          className="border p-2 w-full mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="categoria1">Alimentos</option>
          <option value="categoria2">Bebidas</option>
        </select>
        <label className="block mb-2">Precio</label>
        <input
          type="number"
          className="border p-2 w-full mb-4"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
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
