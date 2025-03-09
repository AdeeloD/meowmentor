import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CalendarScreen = () => {
  const [dailyInteractions, setDailyInteractions] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const loadData = async () => {
      const storedData = await AsyncStorage.getItem("dailyInteractions");
      if (storedData) {
        setDailyInteractions(JSON.parse(storedData));
      }
    };
    loadData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gondoskodási Naptár</Text>
      {Object.entries(dailyInteractions).map(([date, actions]) => (
        <View key={date} style={styles.entry}>
          <Text style={styles.date}>{date}</Text>
          {Object.entries(actions).map(([action, count]) => (
            <Text key={action} style={styles.action}>
              {`${action}: ${count} alkalom`} {/* 📌 Itt biztosítjuk, hogy mindig szöveg legyen */}
            </Text>
          ))}
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
  entry: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  action: {
    fontSize: 16,
    color: "#333",
  },
});

export default CalendarScreen;
