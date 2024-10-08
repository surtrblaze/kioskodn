import React from 'react';
import { Product } from '../../interface/Product';

const ProductSearchTable: React.FC<{ products: Product[], onAddToCart: (product: Product) => void }> = ({ products, onAddToCart }) => {
  return (
    <div className="shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-center">Nombre</th>
            <th className="py-3 px-6 text-center">Peso</th>
            <th className="py-3 px-6 text-center">Categoría</th>
            <th className="py-3 px-6 text-center">Precio</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="text-center border-t">
              <td className="py-3 px-6">{product.name}</td>
              <td className="py-3 px-6">{product.weight}{product.weightType}</td>
              <td className="py-3 px-6">{product.category}</td>
              <td className="py-3 px-6">{product.price}$</td>
              <td className="py-3 px-6">
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => onAddToCart(product)}
                >
                  Añadir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSearchTable;
