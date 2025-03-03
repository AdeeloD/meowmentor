import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

// Mérföldkövek feltételei
const milestoneConditions = {
  feed_cat: 'Első etetés',
  change_water: 'Friss víz',
  play_with_cat: 'Játékidő',
  vet_visit: 'Állatorvosi látogatás',
};

const ProfileScreen = () => {
  const [lastFed, setLastFed] = useState<string | null>(null);
  const [lastWaterChange, setLastWaterChange] = useState<string | null>(null);
  const [playCount, setPlayCount] = useState(0);
  const [vetVisit, setVetVisit] = useState<string | null>(null);
  const [unlockedMilestones, setUnlockedMilestones] = useState<string[]>([]);

  // Adatok betöltése
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedLastFed = await AsyncStorage.getItem('lastFed');
        const storedLastWaterChange = await AsyncStorage.getItem('lastWaterChange');
        const storedPlayCount = await AsyncStorage.getItem('playCount');
        const storedVetVisit = await AsyncStorage.getItem('vetVisit');
        const storedMilestones = await AsyncStorage.getItem('unlockedMilestones');

        if (storedLastFed) setLastFed(storedLastFed);
        if (storedLastWaterChange) setLastWaterChange(storedLastWaterChange);
        if (storedPlayCount) setPlayCount(parseInt(storedPlayCount, 10));
        if (storedVetVisit) setVetVisit(storedVetVisit);
        if (storedMilestones) setUnlockedMilestones(JSON.parse(storedMilestones));
      } catch (error) {
        console.error('Hiba az adatok betöltésekor:', error);
      }
    };

    loadData();
  }, []);

  // Mérföldkő feloldása
  const unlockMilestone = async (condition: keyof typeof milestoneConditions) => {
    if (!unlockedMilestones.includes(condition)) {
      const updatedMilestones = [...unlockedMilestones, condition];
      setUnlockedMilestones(updatedMilestones);
      await AsyncStorage.setItem('unlockedMilestones', JSON.stringify(updatedMilestones));
      Alert.alert('Mérföldkő feloldva!', milestoneConditions[condition]);
    }
  };

  // Etetés funkció
  const feedCat = async () => {
    const now = new Date().toLocaleString();
    setLastFed(now);
    await AsyncStorage.setItem('lastFed', now);
    unlockMilestone('feed_cat');
  };

  // Vízcsere funkció
  const changeWater = async () => {
    const now = new Date().toLocaleString();
    setLastWaterChange(now);
    await AsyncStorage.setItem('lastWaterChange', now);
    unlockMilestone('change_water');
  };

  // Játék funkció
  const playWithCat = async () => {
    const newPlayCount = playCount + 1;
    setPlayCount(newPlayCount);
    await AsyncStorage.setItem('playCount', newPlayCount.toString());

    if (newPlayCount === 1) unlockMilestone('play_with_cat');
    if (newPlayCount >= 100) unlockMilestone('100_interactions');
  };

  // Állatorvosi látogatás funkció
  const visitVet = async () => {
    const now = new Date().toLocaleString();
    setVetVisit(now);
    await AsyncStorage.setItem('vetVisit', now);
    unlockMilestone('vet_visit');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Macska profil</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Utolsó etetés: {lastFed || 'Nincs adat'}</Text>
        <TouchableOpacity style={styles.button} onPress={feedCat}>
          <FontAwesome name="cutlery" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Etetés</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Utolsó vízcsere: {lastWaterChange || 'Nincs adat'}</Text>
        <TouchableOpacity style={styles.button} onPress={changeWater}>
          <FontAwesome name="tint" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Vízcsere</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Játék interakciók: {playCount}</Text>
        <TouchableOpacity style={styles.button} onPress={playWithCat}>
          <FontAwesome name="gamepad" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Játék</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Utolsó állatorvosi látogatás: {vetVisit || 'Nincs adat'}</Text>
        <TouchableOpacity style={styles.button} onPress={visitVet}>
          <FontAwesome name="stethoscope" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Állatorvosi időpont</Text>
        </TouchableOpacity>
      </View>
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#5A5C69',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProfileScreen;
