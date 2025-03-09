import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const milestonesList = [
  { key: "Regisztráció", label: "🆕 Regisztráció" },
  { key: "Profilkép beállítva", label: "📸 Profilkép beállítva" },
  { key: "Etetés", label: "🍽️ Első etetés" },
  { key: "Itatás", label: "💧 Első itatás" },
  { key: "Játék", label: "🎾 Játékidő" },
];

const MilestonesScreen = () => {
  const [milestones, setMilestones] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const loadMilestones = async () => {
      const storedMilestones = await AsyncStorage.getItem("milestones");
      if (storedMilestones) {
        setMilestones(JSON.parse(storedMilestones));
      }
    };
    loadMilestones();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mérföldkövek</Text>
      {milestonesList.map((milestone) => (
        <View
          key={milestone.key}
          style={[
            styles.milestone,
            milestones[milestone.key] ? styles.completed : styles.incomplete,
          ]}
        >
          <Text style={styles.milestoneText}>{milestone.label}</Text>
          {milestones[milestone.key] && <Text style={styles.checkmark}>✅</Text>}
        </View>
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
