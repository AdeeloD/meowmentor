import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { logout } from "../services/auth";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../services/config/firebaseConfig";

const SettingsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    } catch (error) {
      Alert.alert("Hiba", "Nem sikerült kijelentkezni. Próbáld újra.");
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Hiba", "Nincs bejelentkezett felhasználó.");
      return;
    }

    Alert.alert(
      "Fiók törlése",
      "Biztosan törölni szeretnéd a fiókodat? Ez a művelet végleges.",
      [
        { text: "Mégse", style: "cancel" },
        {
          text: "Törlés",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              if (!password) {
                Alert.alert(
                  "Hiba",
                  "Biztonsági okokból előbb add meg a jelszavad!"
                );
                setLoading(false);
                return;
              }

              
              const credential = EmailAuthProvider.credential(
                user.email || "",
                password
              );
              await reauthenticateWithCredential(user, credential);

              
              await deleteUser(user);
              Alert.alert("Siker", "A fiókod törölve lett.");
              navigation.reset({
                index: 0,
                routes: [{ name: "Auth" }],
              });
            } catch (error: any) {
              if (error.code === "auth/requires-recent-login") {
                Alert.alert(
                  "Hiba",
                  "Biztonsági okokból jelentkezz be újra, majd próbáld meg ismét."
                );
              } else {
                Alert.alert(
                  "Hiba",
                  "Nem sikerült törölni a fiókot. Ellenőrizd a jelszót vagy próbáld újra később."
                );
              }
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Beállítások</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("AccountSettings")}
      >
        <Text>Profil kezelése</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("Notification")}
      >
        <Text>Értesítések kezelése</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Privacy")}>
        <Text>Adatvédelem és biztonság</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() =>
          Alert.alert("Nyelv beállítás", "Ez a funkció jelenleg nem elérhető.")
        }
      >
        <Text>Nyelv beállítás</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("Terms")}
      >
        <Text>Felhasználási feltételek</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}
      onPress={() => navigation.navigate("SupportFeedback")}>
        <Text>Támogatás és visszajelzés</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text>Alkalmazás verziója: 1.0.0</Text>
      </TouchableOpacity>

      {/* 🔹 Jelszó bekérése a törlés előtt */}
      <TextInput
        style={styles.input}
        placeholder="Jelszó"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAccount}
        disabled={loading}
      >
        <Text style={styles.deleteText}>
          {loading ? "Törlés folyamatban..." : "Fiók törlése"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Kijelentkezés a fiókból</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#717296",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  option: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    alignSelf: "center",
    marginBottom: 10,
  },
  deleteButton: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    backgroundColor: "#D32F2F",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    backgroundColor: "#D32F2F",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SettingsScreen;
