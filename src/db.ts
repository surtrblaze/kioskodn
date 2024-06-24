import { openDB } from 'idb';
import Product from './interface/Product';

const dbPromise = openDB('product-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('products')) {
      db.createObjectStore('products', { keyPath: 'id' });
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
