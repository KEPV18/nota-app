import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmxzZqJxdDE3q8IspgdMkvoDeYAAeGNsA",
  authDomain: "nota-5c41d.firebaseapp.com",
  projectId: "nota-5c41d",
  storageBucket: "nota-5c41d.firebasestorage.app",
  messagingSenderId: "158176338684",
  appId: "1:158176338684:android:51d3fcc2d186dad8f92d79"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;