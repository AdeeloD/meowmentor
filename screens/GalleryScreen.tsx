import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';

const GalleryScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [images, setImages] = useState<string[]>([]);

  const storageKey = `galleryImages_${user?.uid}`;
  const milestoneKey = `unlockedMilestones_${user?.uid}`;

  useEffect(() => {
    const loadImages = async () => {
      try {
        const storedImages = await AsyncStorage.getItem(storageKey);
        if (storedImages) {
          setImages(JSON.parse(storedImages));
        }
      } catch (error) {
        console.error('Hiba az adatok betöltésekor:', error);
      }
    };

    if (user) loadImages();
  }, [user]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      Alert.alert('Engedély szükséges', 'A fotók kiválasztásához engedélyezd a hozzáférést.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && user) {
      const newImages = [...images, result.assets[0].uri];
      setImages(newImages);
      await AsyncStorage.setItem(storageKey, JSON.stringify(newImages));

      if (newImages.length === 3) {
        unlockMilestone();
      }
    }
  };

  const unlockMilestone = async () => {
    try {
      const storedMilestones = await AsyncStorage.getItem(milestoneKey);
      const unlockedMilestones = storedMilestones ? JSON.parse(storedMilestones) : [];

      if (!unlockedMilestones.includes('upload_3_photos')) {
        const updatedMilestones = [...unlockedMilestones, 'upload_3_photos'];
        await AsyncStorage.setItem(milestoneKey, JSON.stringify(updatedMilestones));
        Alert.alert('🎉 Mérföldkő feloldva!', 'Fotóalbum: Legalább 3 képet feltöltöttél!');
      }
    } catch (error) {
      console.error('Hiba a mérföldkő mentésekor:', error);
    }
  };

  const deleteImage = async (uri: string) => {
    Alert.alert('Kép törlése', 'Biztosan törölni szeretnéd ezt a képet?', [
      { text: 'Mégse', style: 'cancel' },
      {
        text: 'Törlés',
        style: 'destructive',
        onPress: async () => {
          const updatedImages = images.filter((img) => img !== uri);
          setImages(updatedImages);
          await AsyncStorage.setItem(storageKey, JSON.stringify(updatedImages));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galéria</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <FontAwesome name="plus" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>Kép hozzáadása</Text>
      </TouchableOpacity>

      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.imageContainer}
            onLongPress={() => deleteImage(item)}
          >
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableOpacity>
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
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});

export default GalleryScreen;
