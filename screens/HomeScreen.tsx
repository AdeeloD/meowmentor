import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Képválasztó funkció
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.status !== 'granted') {
        Alert.alert(
          'Engedély szükséges',
          'A kép kiválasztásához engedélyezd a hozzáférést a fotókhoz.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri); 
      }
    } catch (error) {
      console.error('Hiba történt a kép kiválasztása közben:', error);
      Alert.alert('Hiba', 'Nem sikerült a kép kiválasztása.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={selectedImage ? { uri: selectedImage } : require('../assets/cat.png')}
          style={styles.catImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Milestones')}>
          <FontAwesome name="trophy" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
          <FontAwesome name="image" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <FontAwesome name="paw" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Tips')}>
          <FontAwesome name="graduation-cap" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <FontAwesome name="cog" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#717296',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catImage: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2,
    marginBottom: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    position: 'absolute',
    bottom: 30,
  },
});

export default HomeScreen;
