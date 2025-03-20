// services/firestoreService.ts
import { db } from "./firebaseConfig";  // ✅ Helyes importálás
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

/**
 * Felhasználói adatok mentése a "users/{userUid}" dokumentumba
 */
export const saveUserData = async (
  userUid: string,
  data: any
): Promise<void> => {
  try {
    await setDoc(doc(db, "users", userUid), data, { merge: true });
    console.log("User data saved successfully");
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

/**
 * Felhasználói adatok lekérése a "users/{userUid}" dokumentumból
 */
export const loadUserData = async (userUid: string): Promise<any> => {
  try {
    const snapshot = await getDoc(doc(db, "users", userUid));
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      console.log("No user data found!");
      return null;
    }
  } catch (error) {
    console.error("Error loading user data:", error);
    throw error;
  }
};

/**
 * Új milestone hozzáadása a "users/{userUid}/milestones" alkollekcióhoz
 */
export const saveMilestone = async (
  userUid: string,
  milestone: any
): Promise<void> => {
  try {
    await addDoc(collection(db, "users", userUid, "milestones"), milestone);
    console.log("Milestone added successfully");
  } catch (error) {
    console.error("Error saving milestone:", error);
    throw error;
  }
};

/**
 * Milestone-ok lekérése a "users/{userUid}/milestones" alkollekcióból
 */
export const loadMilestones = async (userUid: string): Promise<any[]> => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "users", userUid, "milestones")
    );
    const milestones: any[] = [];
    querySnapshot.forEach((docItem) => {
      milestones.push({ id: docItem.id, ...docItem.data() });
    });
    return milestones;
  } catch (error) {
    console.error("Error loading milestones:", error);
    throw error;
  }
};
