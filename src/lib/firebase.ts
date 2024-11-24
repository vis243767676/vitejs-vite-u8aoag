import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAMGoqwU3voIh41TCbnJwtkkXnjwQwQOq4",
  authDomain: "wellsure-d1ba4.firebaseapp.com",
  projectId: "wellsure-d1ba4",
  storageBucket: "wellsure-d1ba4.firebasestorage.app",
  messagingSenderId: "974103582266",
  appId: "1:974103582266:web:de4dc51254115e46a08703",
  measurementId: "G-7W4JQ2LC64"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;