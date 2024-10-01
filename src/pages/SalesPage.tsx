import React, { useState, useEffect } from 'react';
import { getSales, deleteSale } from '../db';
import { Product } from '../interface/Product';

interface Sale {
  id: number;
  date: string;
  cart: { product: Product, quantity: number }[];
  saleType: string;
}

const SalesPage: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      const salesFromDB = await getSales();
      setSales(salesFromDB.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())); // Order by date descending
    };
    fetchSales();
  }, []);

  useEffect(() => {
    let filtered = sales;

    if (filter) {
      filtered = filtered.filter(sale => sale.saleType === filter);
    }

    if (dateFilter) {
      filtered = filtered.filter(sale => sale.date.startsWith(dateFilter));
    }

    setFilteredSales(filtered);
  }, [sales, filter, dateFilter]);

  const handleDeleteSale = async (id: number) => {
    await deleteSale(id);
    const salesFromDB = await getSales();
    setSales(salesFromDB.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())); // Re-ordenar por fecha descendente
  };

  const salesByMonth = filteredSales.reduce((acc, sale) => {
    const month = sale.date.substring(0, 7); // Obtener formato YYYY-MM
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(sale);
    return acc;
  }, {} as { [key: string]: Sale[] });

  const totalSalesByMonth = Object.entries(salesByMonth).map(([month, sales]) => ({
    month,
    total: sales.reduce((acc, sale) => acc + sale.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0), 0),
    sales,
  }));

  const uniqueMonths = [...new Set(sales.map(sale => sale.date.substring(0, 7)))];

  return (
    <div className="container mx-auto p-4 text-gray-900">
      <h1 className="text-3xl font-semibold mb-6">Ventas</h1>
      <div className="mb-4 flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Filtrar por tipo de venta</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          >
            <option value="">Todos</option>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
            <option value="fiado">Fiado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Filtrar por fecha</label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          >
            <option value="">Todos</option>
            {uniqueMonths.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>
      {totalSalesByMonth.map(({ month, total, sales }) => (
        <div key={month} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{month}</h2>
          <p className="text-lg mb-4">Total: ${total.toFixed(2)}</p>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-x-auto max-h-80 overflow-y-scroll">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-center">Fecha</th>
                <th className="py-3 px-6 text-center">Producto</th>
                <th className="py-3 px-6 text-center">Cantidad</th>
                <th className="py-3 px-6 text-center">Precio</th>
                <th className="py-3 px-6 text-center">Tipo de Venta</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => (
                <tr key={sale.id} className="text-center border-t">
                  <td className="py-3 px-6">{sale.date}</td>
                  <td className="py-3 px-6">
                    {sale.cart.map(item => (
                      <div key={item.product.id}>{item.product.name}</div>
                    ))}
                  </td>
                  <td className="py-3 px-6">
                    {sale.cart.map(item => (
                      <div key={item.product.id}>{item.quantity}</div>
                    ))}
                  </td>
                  <td className="py-3 px-6">
                    {sale.cart.map(item => (
                      <div key={item.product.id}>${(item.product.price * item.quantity).toFixed(2)}</div>
                    ))}
                  </td>
                  <td className="py-3 px-6">{sale.saleType}</td>
                  <td className="py-3 px-6">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded"
                      onClick={() => handleDeleteSale(sale.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SalesPage;
