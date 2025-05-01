import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCsXuQJgY7jOh79Zl2BZxdxqh8MH9RMMYg",
  authDomain: "tashkent-law-spring.firebaseapp.com",
  projectId: "tashkent-law-spring",
  storageBucket: "tashkent-law-spring.appspot.com",
  messagingSenderId: "297599705494",
  appId: "1:297599705494:web:0b17db59d162420d38bdb7",
  measurementId: "G-4924CCBC6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

export default app;
