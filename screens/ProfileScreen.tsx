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
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import GombolyagIcon from "../assets/gombolyagicon.png";
import KajastalIcon from "../assets/kajastalicon.png";
import VizIcon from "../assets/vizcseppicon.png";


type DailyInteractions = {
  [key: string]: { [action: string]: number };
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  const [catImage, setCatImage] = useState<string | null>(null);
  const [catName, setCatName] = useState("");
  const [dailyInteractions, setDailyInteractions] = useState<DailyInteractions>({});

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setCatImage(data.profilePicture || null);
          setCatName(data.catName || "");
          setDailyInteractions(data.dailyInteractions || {});
        }
      } catch (error) {
        console.error("🔥 Hiba a Firestore adatok betöltésekor:", error);
      }
    };

    loadData();
  }, [user]);

  const saveCatName = async (name: string) => {
    setCatName(name);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { catName: name }, { merge: true });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && user) {
      setCatImage(result.assets[0].uri);

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { profilePicture: result.assets[0].uri }, { merge: true });
    }
  };

  const handleInteraction = async (action: string) => {
    if (!user) return;

    const today = new Date().toISOString().split("T")[0];

    const updatedData: DailyInteractions = {
      ...dailyInteractions,
      [today]: {
        ...(dailyInteractions[today] || {}),
        [action]: (dailyInteractions[today]?.[action] || 0) + 1,
      },
    };

    setDailyInteractions(updatedData);
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { dailyInteractions: updatedData }, { merge: true });

    // 🔹 Alert üzenet a felhasználónak interakció után
    Alert.alert(
      "✅ Sikeres művelet!",
      `A cica ${action} megtörtént! 🐾`,
      [{ text: "OK", onPress: () => console.log(`${action} megerősítve`) }]
    );
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
          <Text style={styles.imagePlaceholder}>📷 Kép kiválasztása</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleInteraction("Etetés")}>
        <Image source={KajastalIcon} style={styles.iconk}/>
        <Text style={styles.buttonText}>Etetés</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleInteraction("Itatás")}>
        <Image source={VizIcon} style={styles.icon}/>
        <Text style={styles.buttonText}>Itatás</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleInteraction("Játék")}>
        <Image source={GombolyagIcon} style={styles.icon}/>
        <Text style={styles.buttonText}>Játék</Text>
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
     flexDirection: "row",
    justifyContent: "center",
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
  icon: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  iconk:{
    width: 35,
    height: 35,
    marginRight: 10,
  }
});

export default ProfileScreen;
