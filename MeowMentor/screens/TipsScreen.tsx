import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Tippek adatstruktúrája
const tipsData = [
  { id: '1', category: 'Etetés', tip: 'A macskáknak napi 2-3 étkezésre van szükségük.' },
  { id: '2', category: 'Etetés', tip: 'Ne adj csokoládét vagy hagymát a macskádnak, mert mérgezőek.' },
  { id: '3', category: 'Etetés', tip: 'A száraz és nedves táp kombinálása segít az egészséges étrend fenntartásában.' },
  { id: '4', category: 'Higiénia', tip: 'Az almot naponta tisztítani kell, hogy a macska mindig szívesen használja.' },
  { id: '5', category: 'Higiénia', tip: 'A hosszúszőrű macskákat naponta érdemes kefélni a szőrcsomók elkerülése érdekében.' },
  { id: '6', category: 'Higiénia', tip: 'A macskák ritkán igényelnek fürdetést, kivéve, ha nagyon koszosak vagy betegségtől szenvednek.' },
  { id: '7', category: 'Viselkedés', tip: 'A dorombolás a macska elégedettségét vagy megnyugtatásának eszköze lehet.' },
  { id: '8', category: 'Viselkedés', tip: 'A kaparófa segít a macskának élesíteni a karmait anélkül, hogy a bútorokat tönkretenné.' },
  { id: '9', category: 'Viselkedés', tip: 'Ha a macska elbújik, adj neki időt, hogy kényelmesen érezze magát a környezetében.' },
  { id: '10', category: 'Egészség', tip: 'A macskák éves állatorvosi ellenőrzése segít a betegségek korai felismerésében.' },
  { id: '11', category: 'Egészség', tip: 'A macskáknak kötelező oltásokat kell kapniuk, például veszettség és panleukopénia ellen.' },
  { id: '12', category: 'Egészség', tip: 'Ha a macska nem eszik vagy inaktív, fordulj állatorvoshoz.' },
];

const categories = ['Etetés', 'Higiénia', 'Viselkedés', 'Egészség'];

const TipsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Etetés');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tippek</Text>

      {/* Kategóriák */}
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tippek listázása */}
      <FlatList
        data={tipsData.filter((tip) => tip.category === selectedCategory)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tipItem}>
            <FontAwesome name="lightbulb-o" size={20} color="#FFD700" />
            <Text style={styles.tipText}>{item.tip}</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#5A5C69',
    borderRadius: 5,
  },
  categoryButtonActive: {
    backgroundColor: '#FFD700',
  },
  categoryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A5C69',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  tipText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default TipsScreen;
