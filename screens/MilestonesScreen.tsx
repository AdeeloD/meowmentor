import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const milestonesList = [
  { key: "register", label: "🆕 Regisztráció" },
  { key: "profile_picture", label: "📸 Profilkép beállítva" },
  { key: "feeding", label: "🍽️ Első etetés" },
  { key: "drinking", label: "💧 Első itatás" },
  { key: "playing", label: "🎾 Játékidő" },
];

const MilestonesScreen = () => {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  const [milestones, setMilestones] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchMilestones = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setMilestones(userSnap.data().milestones || []);
        }
      } catch (error) {
        console.error("🔥 Hiba a Firestore mérföldkövek betöltésekor:", error);
      }
    };

    fetchMilestones();
  }, [user]);

  const unlockMilestone = async (milestoneKey: string) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const existingMilestones = userSnap.exists() ? userSnap.data().milestones || [] : [];

    if (!existingMilestones.includes(milestoneKey)) {
      await setDoc(userRef, { milestones: [...existingMilestones, milestoneKey] }, { merge: true });
      setMilestones((prev) => [...prev, milestoneKey]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🏆 Mérföldkövek</Text>
      {milestonesList.map((milestone) => (
        <TouchableOpacity
          key={milestone.key}
          style={[
            styles.milestone,
            milestones.includes(milestone.key) ? styles.completed : styles.incomplete,
          ]}
          onPress={() => unlockMilestone(milestone.key)}
        >
          <Text style={styles.milestoneText}>{milestone.label}</Text>
          {milestones.includes(milestone.key) && <Text style={styles.checkmark}>✅</Text>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#717296",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  milestone: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  completed: {
    backgroundColor: "lightgreen",
  },
  incomplete: {
    backgroundColor: "lightgray",
  },
  milestoneText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkmark: {
    fontSize: 18,
  },
});

export default MilestonesScreen;
