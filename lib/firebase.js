import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCf7O7C9uQxKIrjsAj4ucQ7CtYqR8qVtEc",
  authDomain: "garba-night-app.firebaseapp.com",
  projectId: "garba-night-app",
  storageBucket: "garba-night-app.appspot.com",
  messagingSenderId: "139557609108",
  appId: "1:139557609108:web:77d4886e6594fa15611e81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
