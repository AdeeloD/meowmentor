// services/config/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAirb_nI9VQyHD9PoqoTxIToeyTgQcuGRU",
  authDomain: "meowmentor-97c17.firebaseapp.com",
  projectId: "meowmentor-97c17",
  storageBucket: "meowmentor-97c17.firebasestorage.app",
  messagingSenderId: "967113875756",
  appId: "1:967113875756:web:e221de7c7dc64ca1860c89"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
