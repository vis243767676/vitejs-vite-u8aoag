import { collection, addDoc, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Product {
  title: string;
  description: string;
  image: string;
  mode: 'online' | 'offline';
  category: string;
}

export const addProduct = async (product: Product): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'products'), product);
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const getProducts = async (): Promise<DocumentData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string): Promise<DocumentData[]> => {
  try {
    const q = query(collection(db, 'products'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products by category:', error);
    throw error;
  }
};