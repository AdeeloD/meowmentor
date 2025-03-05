import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

// Mérföldkövek listája és feltételeik
const milestonesData = [
  { id: '1', title: 'Új gazdi!', condition: 'first_launch' },
  { id: '2', title: 'Bemutatkozás', condition: 'set_name' },
  { id: '3', title: 'Első etetés', condition: 'feed_cat' },
  { id: '4', title: 'Friss víz', condition: 'change_water' },
  { id: '5', title: 'Játékidő', condition: 'play_with_cat' },
  { id: '6', title: 'Az első hét', condition: '7_days_usage' },
  { id: '7', title: 'Állatorvosi látogatás', condition: 'vet_visit' },
  { id: '8', title: 'Oltás napja', condition: 'vaccination_done' },
  { id: '9', title: 'Tisztaságmánia', condition: 'clean_litter' },
  { id: '10', title: 'Megosztás', condition: 'app_shared' },
  { id: '11', title: 'Szülinapos', condition: 'set_birthday' },
  { id: '12', title: 'Fotóalbum', condition: 'upload_3_photos' },
  { id: '13', title: 'Egészséges cica', condition: 'record_weight' },
  { id: '14', title: 'Aktív gazdi', condition: '1_month_usage' },
  { id: '15', title: 'Kiscica szint', condition: '5_milestones_unlocked' },
  { id: '16', title: 'Gondos gazdi', condition: '10_milestones_unlocked' },
  { id: '17', title: 'Profi macskatartó', condition: '15_milestones_unlocked' },
  { id: '18', title: 'Mester macskás', condition: 'all_milestones_unlocked' },
  { id: '19', title: 'Kedvenc gazdi', condition: '100_interactions' },
  { id: '20', title: 'Legendás páros', condition: '1_year_usage' },
];

const MilestonesScreen = () => {
  const [unlockedMilestones, setUnlockedMilestones] = useState<string[]>([]);

  // Mérföldkövek betöltése minden képernyőváltáskor
  useFocusEffect(
    useCallback(() => {
      const loadMilestones = async () => {
        try {
          const storedData = await AsyncStorage.getItem('unlockedMilestones');
          if (storedData) {
            setUnlockedMilestones(JSON.parse(storedData));
          }
        } catch (error) {
          console.error('Hiba az adatok betöltésekor:', error);
        }
      };

      loadMilestones();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mérföldkövek</Text>
      <FlatList
        data={milestonesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.milestoneItem}>
            <Text style={unlockedMilestones.includes(item.condition) ? styles.unlockedText : styles.lockedText}>
              {item.title}
            </Text>
            {unlockedMilestones.includes(item.condition) ? (
              <FontAwesome name="check-circle" size={24} color="green" />
            ) : (
              <FontAwesome name="lock" size={24} color="gray" />
            )}
          </View>
        )}
      />
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
    marginBottom: 10,
    textAlign: 'center',
  },
  milestoneItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#5A5C69',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  unlockedText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  lockedText: {
    color: '#BBBBBB',
    fontSize: 16,
  },
});

export default MilestonesScreen;
