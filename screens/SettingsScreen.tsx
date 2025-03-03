import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

// Engedély kérése az értesítésekhez
const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Betöltjük az értesítési beállításokat
  useEffect(() => {
    const loadSettings = async () => {
      const storedValue = await AsyncStorage.getItem('notificationsEnabled');
      if (storedValue !== null) {
        setNotificationsEnabled(JSON.parse(storedValue));
      }
    };
    loadSettings();
  }, []);

  // Értesítések be- vagy kikapcsolása
  const toggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(newValue));

    if (newValue) {
      const granted = await requestNotificationPermissions();
      if (!granted) {
        Alert.alert('Engedély szükséges', 'Engedélyezd az értesítéseket a beállításokban.');
        setNotificationsEnabled(false);
        await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(false));
      }
    }
  };

  // Teszt értesítés küldése
  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'MeowMentor Emlékeztető',
        body: 'Ne felejtsd el megetetni a cicádat!',
      },
      trigger: { seconds: 3 },
    });
  };

  // Adatok törlése
  const resetData = async () => {
    await AsyncStorage.clear();
    Alert.alert('Alkalmazásadatok törölve!', 'Az összes beállítás visszaállt.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beállítások</Text>

      {/* Értesítések kapcsoló */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Értesítések engedélyezése</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      {/* Teszt értesítés küldése */}
      {notificationsEnabled && (
        <TouchableOpacity style={styles.button} onPress={sendTestNotification}>
          <Text style={styles.buttonText}>Teszt értesítés küldése</Text>
        </TouchableOpacity>
      )}

      {/* Adatok törlése */}
      <TouchableOpacity style={styles.deleteButton} onPress={resetData}>
        <Text style={styles.buttonText}>Alkalmazásadatok törlése</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#717296',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#5A5C69',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  settingText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SettingsScreen;
