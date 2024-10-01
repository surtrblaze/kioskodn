import { openDB } from 'idb';
import { Product } from './interface/Product';

const dbPromise = openDB('product-db', 2, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('products')) {
      db.createObjectStore('products', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('sales')) {
      db.createObjectStore('sales', { keyPath: 'id', autoIncrement: true });
    }
  },
});

export const addProduct = async (product: Product) => {
  const db = await dbPromise;
  return db.add('products', product);
};

export const getProducts = async () => {
  const db = await dbPromise;
  return db.getAll('products');
};

export const updateProduct = async (product: Product) => {
  const db = await dbPromise;
  return db.put('products', product);
};

export const deleteProduct = async (id: number) => {
  const db = await dbPromise;
  return db.delete('products', id);
};

export const addSale = async (sale: { date: string, cart: { product: Product, quantity: number }[], saleType: string }) => {
  const db = await dbPromise;
  return db.add('sales', sale);
};

export const getSales = async () => {
  const db = await dbPromise;
  return db.getAll('sales');
};

export const deleteSale = async (id: number) => {
  const db = await dbPromise;
  return db.delete('sales', id);
};
