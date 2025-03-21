import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { getFirestore, doc, getDoc, setDoc, enableNetwork } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import NetInfo from "@react-native-community/netinfo"; // 🔹 Hálózat figyelése

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
  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      Alert.alert("Hiba", "Be kell jelentkezned a mérföldkövek megtekintéséhez.");
      return;
    }

    // 🔹 Hálózatfigyelés
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setIsOffline(true);
        Alert.alert("Offline mód", "Jelenleg nincs internetkapcsolat, az adatok elavultak lehetnek.");
      } else {
        setIsOffline(false);
        enableNetwork(db).catch(() => {});
      }
    });

    // 🔹 Mérföldkövek betöltése Firestore-ból
    const fetchMilestones = async () => {
      try {
        setLoading(true);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data()?.milestones) {
          setMilestones(userSnap.data().milestones);
        } else {
          setMilestones([]);
        }
      } catch (error) {
        console.error("🔥 Hiba a Firestore mérföldkövek betöltésekor:", error);
        Alert.alert("Hiba", "Nem sikerült lekérni a mérföldköveket.");
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
    return () => unsubscribe(); // 🔹 Memóriaszivárgás elkerülése
  }, [user]);

  // 🔹 Mérföldkő hozzáadása Firestore-hoz
  const unlockMilestone = async (milestoneKey: string) => {
    if (!user) {
      Alert.alert("Hiba", "Nincs bejelentkezett felhasználó.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const existingMilestones = userSnap.exists() ? userSnap.data()?.milestones || [] : [];

      if (!existingMilestones.includes(milestoneKey)) {
        const updatedMilestones = [...existingMilestones, milestoneKey];
        await setDoc(userRef, { milestones: updatedMilestones }, { merge: true });
        setMilestones(updatedMilestones);
      }
    } catch (error) {
      console.error("🔥 Hiba a mérföldkő mentésekor:", error);
      Alert.alert("Hiba", "Nem sikerült elmenteni a mérföldkövet.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🏆 Mérföldkövek</Text>
      {isOffline && <Text style={styles.offlineText}>⚠️ Jelenleg offline módban vagy.</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        milestonesList.map((milestone) => (
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
        ))
      )}
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
  offlineText: {
    fontSize: 16,
    color: "yellow",
    textAlign: "center",
    marginBottom: 10,
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
