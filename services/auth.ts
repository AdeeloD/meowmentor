import { auth } from "../services/config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// E-mail és jelszó validációs függvények
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string) => {
  return password.length >= 6; // Firebase legalább 6 karaktert kér
};

export const register = async (email: string, password: string) => {
  if (!isValidEmail(email)) {
    throw new Error("Hibás e-mail cím formátum!");
  }

  if (!isValidPassword(password)) {
    throw new Error("A jelszónak legalább 6 karakter hosszúnak kell lennie!");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error("Regisztrációs hiba:", error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error("Bejelentkezési hiba:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Kijelentkezési hiba:", error);
  }
};
