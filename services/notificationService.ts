

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export async function scheduleHydrationReminder() {
  
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Alapértelmezett",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });
  }

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    console.warn("⛔ Az értesítési engedély nem lett megadva.");
    return;
  }

 
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "💧 Itt az ideje!",
      body: "Ne felejtsd el megitatni a cicát! 🐱",
    },
    trigger: {
      type: "timeInterval",
      seconds: 600, // 10 perc
      repeats: true,
    } as Notifications.TimeIntervalTriggerInput, // ✅ ez a fix a TS hibára
  });
}
