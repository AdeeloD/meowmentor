import React, { useEffect, useState } from "react";
import { View, Text, Switch, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { getAuth } from "firebase/auth";
import { db } from "../services/config/firebaseConfig"; // Ha szükséges a Firestore

const NotificationScreen = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const user = getAuth().currentUser;

  useEffect(() => {
    checkNotificationPermission();

    // Ha engedélyezve van, naponta egyszer küldjön értesítést
    if (notificationEnabled) {
      scheduleDailyNotification();
    }
  }, [notificationEnabled]);

  const checkNotificationPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    setNotificationEnabled(status === "granted");
  };

  const toggleNotification = async () => {
    if (notificationEnabled) {
      // Ha a felhasználó letiltja az értesítéseket
      await Notifications.setNotificationHandler({
        handleNotification: async () => {
          return {
            shouldShowAlert: false,
            shouldPlaySound: false,
            shouldSetBadge: false,
          };
        },
      });
    } else {
      // Ha a felhasználó engedélyezi az értesítéseket
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status === "granted") {
        setNotificationEnabled(true);
      } else {
        Alert.alert("Hiba", "A push értesítések engedélyezése nem sikerült.");
      }
    }
  };

  const scheduleDailyNotification = async () => {
    // Külön értesítési üzenet beállítása
    const trigger = new Date();
    trigger.setHours(9, 0, 0, 0); // Minden nap 9:00-kor értesítés

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "💬 Napi emlékeztető",
        body: "Ne felejtsd el, hogy beléptél! :)",
      },
      trigger: {
        hour: 9,
        minute: 0,
        repeats: true,
      },
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
        thumbColor={notificationEnabled ? "#4CAF50" : "#F44336"}
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
