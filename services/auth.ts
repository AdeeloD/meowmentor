import { auth } from "../services/config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

// E-mail és jelszó validációs függvények
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string) => {
  return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
};

export const register = async (email: string, password: string, name: string, birthdate: Date) => {
  if (!email || !password || !name || !birthdate) {
    throw new Error("Minden mezőt ki kell tölteni!");
  }
  if (!isValidEmail(email)) {
    throw new Error("Hibás e-mail cím formátum!");
  }
  if (!isValidPassword(password)) {
    throw new Error("A jelszónak legalább 8 karakternek kell lennie, és tartalmaznia kell egy nagybetűt és egy számot!");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Felhasználói név beállítása
    await updateProfile(user, {
      displayName: name,
    });

    return user;
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
