import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoSwa2J4NTh2YDANPDIdZC3de8M6mmJ-w",
  authDomain: "mern-netflix-clone-54c3e.firebaseapp.com",
  projectId: "mern-netflix-clone-54c3e",
  storageBucket: "mern-netflix-clone-54c3e.firebasestorage.app",
  messagingSenderId: "594472441144",
  appId: "1:594472441144:web:f6fd246f8169a5a6b59dcd",
  measurementId: "G-Q0CJ2X3MLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);