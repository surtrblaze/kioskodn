import React, { useState, useEffect } from 'react';
import { getProducts, addSale } from '../db';
import { Product } from '../interface/Product';

const CartPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ product: Product, quantity: number }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [saleType, setSaleType] = useState('efectivo');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsFromDB = await getProducts();
      setProducts(productsFromDB);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter(item => item.product.id !== product.id);
      }
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSaveSale = async () => {
    const sale = {
      date: new Date().toISOString().split('T')[0],
      cart,
      saleType,
    };
    await addSale(sale);
    setCart([]);
    alert('Venta guardada con éxito');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.id.toString().includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-4 text-gray-900 h-screen">
      <h1 className="text-3xl font-semibold mb-6">Carrito de Compras</h1>
      <div className="flex">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Buscar por nombre o código"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg p-2 mb-4 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
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
                {filteredProducts.map(product => (
                  <tr key={product.id} className="text-center border-t">
                    <td className="py-3 px-6">{product.name}</td>
                    <td className="py-3 px-6">{product.weight}{product.weightType}</td>
                    <td className="py-3 px-6">{product.category}</td>
                    <td className="py-3 px-6">{product.price}$</td>
                    <td className="py-3 px-6">
                      <button
                        className="bg-green-500 text-white px-4 py-1 rounded"
                        onClick={() => handleAddToCart(product)}
                      >
                        Añadir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-1/2 ml-4">
          <div className="shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-center">Producto</th>
                  <th className="py-3 px-6 text-center">Cantidad</th>
                  <th className="py-3 px-6 text-center">Precio</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.product.id} className="text-center border-t">
                    <td className="py-3 px-6">{item.product.name}</td>
                    <td className="py-3 px-6">{item.quantity}</td>
                    <td className="py-3 px-6">${(item.product.price * item.quantity).toFixed(2)}</td>
                    <td className="py-3 px-6">
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded mr-2"
                        onClick={() => handleRemoveFromCart(item.product)}
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-lg font-semibold">
            Total: ${total.toFixed(2)}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Tipo de Venta</label>
            <select
              value={saleType}
              onChange={(e) => setSaleType(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="fiado">Fiado</option>
            </select>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 mt-4"
            onClick={handleSaveSale}
          >
            Guardar Venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
