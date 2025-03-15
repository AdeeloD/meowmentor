import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../services/config/firebaseConfig";

const AccountSettingsScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nincs bejelentkezett felhasználó</Text>
      </View>
    );
  }

  const handleUpdateEmail = async () => {
    if (!newEmail) {
      Alert.alert("Hiba", "Adj meg egy új e-mail címet!");
      return;
    }
    try {
      await updateEmail(user, newEmail);
      Alert.alert("Siker", "Az e-mail címed frissítve lett!");
    } catch (error) {
      Alert.alert("Hiba", "Nem sikerült frissíteni az e-mail címet. Próbáld újra.");
    }
  };

  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert("Hiba", "Töltsd ki mindkét mezőt!");
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(user.email || "", oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      Alert.alert("Siker", "A jelszavad frissítve lett!");
    } catch (error) {
      Alert.alert("Hiba", "Nem sikerült frissíteni a jelszót. Ellenőrizd a régi jelszavad!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil kezelése</Text>
      <Text style={styles.label}>Jelenlegi email: {user.email || "Nincs adat"}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Új e-mail"
        value={newEmail}
        onChangeText={setNewEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateEmail}>
        <Text style={styles.buttonText}>E-mail frissítése</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Régi jelszó"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Új jelszó"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Jelszó módosítása</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#717296",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AccountSettingsScreen;