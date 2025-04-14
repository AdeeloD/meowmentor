import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../services/config/firebaseConfig";
import { enableNetwork, disableNetwork } from "firebase/firestore";

const NOTIF_KEY = "dailyNotificationId";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationScreen = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  useEffect(() => {
    checkNotificationPermission();
    setupFirestoreConnection();
  }, []);

  const checkNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationEnabled(status === "granted");
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

  const toggleNotification = async () => {
    if (notificationEnabled) {
      await cancelScheduledNotification();
      setNotificationEnabled(false);
      Alert.alert("Értesítések kikapcsolva");
    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        setNotificationEnabled(true);
        await scheduleDailyNotification();
        Alert.alert("Értesítések bekapcsolva");
      } else {
        Alert.alert("Hiba", "A push értesítések engedélyezése nem sikerült.");
      }
    }
  };

  const scheduleDailyNotification = async () => {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "💬 Napi emlékeztető",
        body: "Ne felejtsd el, hogy beléptél! :)",
      },
      trigger: {
        hour: 9,
        minute: 0,
        repeats: true,
        type: "daily",
      } as Notifications.DailyTriggerInput,
    });

    await AsyncStorage.setItem(NOTIF_KEY, id);
  };

  const cancelScheduledNotification = async () => {
    const storedId = await AsyncStorage.getItem(NOTIF_KEY);
    if (storedId) {
      await Notifications.cancelScheduledNotificationAsync(storedId);
      await AsyncStorage.removeItem(NOTIF_KEY);
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔧 Teszt értesítés",
        body: "Ez csak egy próba!",
      },
      trigger: null,
    });
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

      <TouchableOpacity style={styles.testButton} onPress={sendTestNotification}>
        <Text style={styles.testButtonText}>📩 Teszt értesítés küldése</Text>
      </TouchableOpacity>
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
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  testButton: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
  },
  testButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});

export default NotificationScreen;