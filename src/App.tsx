import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import ConfirmationModal from './components/ConfirmationModal';
import { getProducts, addProduct, updateProduct, deleteProduct } from './db';

interface Product {
  id: number;
  name: string;
  weight: number;
  weightType: string;
  category: string;
  price: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const productsFromDB = await getProducts();
      setProducts(productsFromDB);
      setFilteredProducts(productsFromDB);
    };
    fetchProducts();
    console.log(products)
  }, []);

  const handleAddProduct = async (product: Product) => {
    console.log(product)
    await addProduct(product);
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setIsAdding(false);
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    await updateProduct(updatedProduct);
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setIsEditing(false);
  };

  const handleDeleteProduct = async (productId: number) => {
    await deleteProduct(productId);
    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setShowConfirmation(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.id.toString().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto p-4 text-gray-900 h-screen">
        <h1 className="text-3xl font-semibold mb-6">Lista de Productos</h1>
        <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o código"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg p-2 flex-grow mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          onClick={() => setIsAdding(true)}
        >
          Añadir Producto
        </button>
      </div>
      {isAdding && (
        <ProductForm onSave={handleAddProduct} onClose={() => setIsAdding(false)} />
      )}
      {isEditing && (
        <ProductForm
          product={currentProduct}
          onSave={handleEditProduct}
          onClose={() => setIsEditing(false)}
        />
      )}
      <ProductTable
        products={filteredProducts}
        onEdit={(product) => {
          setCurrentProduct(product);
          setIsEditing(true);
        }}
        onDelete={(product) => {
          setCurrentProduct(product);
          setShowConfirmation(true);
        }}
      />
      {showConfirmation && (
        <ConfirmationModal
          onConfirm={() => handleDeleteProduct(currentProduct!.id)}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default App;
