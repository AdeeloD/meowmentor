import React, { useEffect, useState } from "react";
import { View, Text, Switch, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { enableNetwork, disableNetwork } from "firebase/firestore";
import { db } from "../services/config/firebaseConfig";

const NotificationScreen = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const user = getAuth().currentUser;

  useEffect(() => {
    checkNotificationPermission();
    setupFirestoreConnection();
  }, []);

  const checkNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationEnabled(status === "granted");
  };

  const toggleNotification = async () => {
    if (notificationEnabled) {
      await Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: false,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
      setNotificationEnabled(false);
    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        setNotificationEnabled(true);
      } else {
        Alert.alert("Hiba", "A push értesítések engedélyezése nem sikerült.");
      }
    }
  };

  const scheduleDailyNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "💬 Napi emlékeztető",
        body: "Ne felejtsd el, hogy beléptél! :)",
      },
      trigger: {
        hour: 9,
        minute: 0,
        repeats: true,
        type: "calendar", 
      } as Notifications.NotificationTriggerInput, 
    });
  };
  

  const setupFirestoreConnection = async () => {
    try {
      await enableNetwork(db);
      console.log("✅ Firestore kapcsolat aktív.");
    } catch (error) {
      console.error("🔥 Firestore kapcsolat hiba:", error);
      await disableNetwork(db);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Push értesítések beállítása</Text>
      <Text style={styles.description}>
        {notificationEnabled
          ? "A push értesítések engedélyezve vannak."
          : "Engedélyezd a push értesítéseket, hogy értesítést kapj fontos eseményekről!"}
      </Text>
      <Switch 
        value={notificationEnabled}
        onValueChange={toggleNotification}
        thumbColor={notificationEnabled ? "#D3D3D3" : "#D3D3D3"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#717296",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default NotificationScreen;