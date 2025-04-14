import { db } from "./firebaseConfig"; 
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";


export const saveUserData = async (
  userUid: string,
  data: any
): Promise<void> => {
  try {
    await setDoc(doc(db, "users", userUid), data, { merge: true });
    console.log("✅ Felhasználói adatok elmentve Firestore-ba.");
  } catch (error) {
    console.error("❌ Hiba történt a felhasználói adatok mentésekor:", error);
    throw error;
  }
};


export const loadUserData = async (userUid: string): Promise<any> => {
  try {
    const snapshot = await getDoc(doc(db, "users", userUid));
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      console.log("⚠️ Nincs adat a felhasználóhoz!");
      return null;
    }
  } catch (error) {
    console.error("❌ Hiba történt a felhasználói adatok lekérésekor:", error);
    throw error;
  }
};


export const saveMilestone = async (
  userUid: string,
  milestone: { id: string; title: string }
): Promise<void> => {
  try {
    const userRef = doc(db, "users", userUid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const updatedMilestones = userData.milestones
        ? [...userData.milestones, milestone]
        : [milestone];

      await updateDoc(userRef, { milestones: updatedMilestones });
      console.log("✅ Milestone hozzáadva.");
    } else {
      console.log("⚠️ A felhasználó nem létezik Firestore-ban!");
    }
  } catch (error) {
    console.error("❌ Hiba történt a milestone mentésekor:", error);
    throw error;
  }
};


export const loadMilestones = async (userUid: string): Promise<any[]> => {
  try {
    const userRef = doc(db, "users", userUid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data().milestones || [];
    } else {
      console.log("⚠️ Nincs milestone adat!");
      return [];
    }
  } catch (error) {
    console.error("❌ Hiba történt a milestone-ok lekérésekor:", error);
    throw error;
  }
};
