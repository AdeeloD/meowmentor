import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [catImage, setCatImage] = useState<string | null>(null);
  const [catName, setCatName] = useState("");
  const [dailyInteractions, setDailyInteractions] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const loadData = async () => {
      const storedImage = await AsyncStorage.getItem("catImage");
      if (storedImage) setCatImage(storedImage);

      const storedName = await AsyncStorage.getItem("catName");
      if (storedName) setCatName(storedName);
    };
    loadData();
  }, []);

  const saveCatName = async (name: string) => {
    setCatName(name);
    await AsyncStorage.setItem("catName", name);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCatImage(result.assets[0].uri);
      await AsyncStorage.setItem("catImage", result.assets[0].uri);
    }
  };

  const handleInteraction = async (action: string) => {
    const today = new Date().toISOString().split("T")[0];
    const storedData = await AsyncStorage.getItem("dailyInteractions");
    const parsedData = storedData ? JSON.parse(storedData) : {};
    
    const updatedData = {
      ...parsedData,
      [today]: {
        ...parsedData[today],
        [action]: (parsedData[today]?.[action] || 0) + 1,
      },
    };

    setDailyInteractions(updatedData);
    await AsyncStorage.setItem("dailyInteractions", JSON.stringify(updatedData));

    Alert.alert("Siker!", `Sikeresen elvégezted: ${action}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.catName}
        value={catName}
        onChangeText={saveCatName}
        placeholder="Add meg a cica nevét"
        placeholderTextColor="white"
      />

      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {catImage ? (
          <Image source={{ uri: catImage }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Kép kiválasztása</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleInteraction("Etetés")}>
        <Text style={styles.buttonText}>🐱 Etetés</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleInteraction("Itatás")}>
        <Text style={styles.buttonText}>💧 Itatás</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleInteraction("Játék")}>
        <Text style={styles.buttonText}>🎾 Játék</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Calendar")}
      >
        <Text style={styles.buttonText}>📅 Naptár</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#717296",
    alignItems: "center",
    paddingTop: 50,
  },
  catName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    width: "80%",
  },
  imageContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  imagePlaceholder: {
    color: "#555",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#333",
  },
});

export default ProfileScreen;
