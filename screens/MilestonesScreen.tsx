import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const MilestonesScreen = () => {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  const [milestones, setMilestones] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMilestones = async () => {
      if (!user) {
        Alert.alert("Hiba", "Jelentkezz be a mérföldkövek megtekintéséhez.");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setMilestones([]);
          return;
        }

        const data = userSnap.data();
        const result: string[] = [];

        result.push("🆕 Regisztráció sikeres");

        if (data?.name) result.push("👤 Név megadva");
        if (data?.email) result.push("📧 Email megadva");
        if (data?.birthdate) result.push("🎂 Születési dátum rögzítve");
        if (data?.catName) result.push("🐱 Cica neve rögzítve");
        if (data?.profilePicture) result.push("📸 Profilkép beállítva");

        if (data?.dailyInteractions?.feeding) result.push("🍽️ Etetés megtörtént");
        if (data?.dailyInteractions?.drinking) result.push("💧 Itatás megtörtént");
        if (data?.dailyInteractions?.playing) result.push("🎾 Játék rögzítve");

        setMilestones(result);
      } catch (error) {
        console.error("Hiba a mérföldkövek betöltésekor:", error);
        Alert.alert("Hiba", "Nem sikerült lekérni a mérföldköveket.");
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏆 Mérföldkövek</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : milestones.length === 0 ? (
        <Text style={styles.empty}>Nincsenek még elért mérföldköveid.</Text>
      ) : (
        milestones.map((item, index) => (
          <View key={index} style={styles.milestone}>
            <Text style={styles.milestoneText}>{item}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#717296",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  milestone: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  milestoneText: {
    fontSize: 16,
    color: "#333",
  },
  empty: {
    color: "#eee",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default MilestonesScreen;
