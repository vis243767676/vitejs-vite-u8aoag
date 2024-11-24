import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface LeadFormData {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  cartItems?: Array<{
    id: number;
    title: string;
    section: string;
    quantity: number;
  }>;
  submittedAt: Timestamp;
}

export const submitLead = async (data: Omit<LeadFormData, 'submittedAt'>): Promise<string> => {
  try {
    const leadData: LeadFormData = {
      ...data,
      submittedAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'leads'), leadData);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting lead:', error);
    throw new Error('Failed to submit lead');
  }
};