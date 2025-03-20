import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { logout } from "../services/auth";
import { deleteUser } from "firebase/auth";
import { auth } from "../services/config/firebaseConfig";

const SettingsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

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
    Alert.alert(
      "Fiók törlése",
      "Biztosan törölni szeretnéd a fiókodat? Ez a művelet visszavonhatatlan.",
      [
        { text: "Mégse", style: "cancel" },
        {
          text: "Törlés",
          style: "destructive",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (user) {
                await deleteUser(user);
                Alert.alert("Siker", "A fiókod törölve lett.");
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Auth" }],
                });
              }
            } catch (error) {
              Alert.alert("Hiba", "Nem sikerült törölni a fiókot. Jelentkezz be újra, majd próbáld újra.");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Beállítások</Text>
      
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("AccountSettings")}>  
        <Text>Profil kezelése</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Notification")}>
        <Text>Értesítések kezelése</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text>Adatvédelem és biztonság</Text>
      </TouchableOpacity>

      <View style={styles.optionRow}>
        <Text>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>

      <TouchableOpacity style={styles.option} onPress={() => Alert.alert("Nyelv beállítás", "Ez a funkció jelenleg nem elérhető.")}>
        <Text>Nyelv beállítás</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Terms")}>  
        <Text>Felhasználási feltételek</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text>Támogatás és visszajelzés</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text>Alkalmazás verziója: 1.0.0</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteText}>Fiók törlése</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "90%",
    alignSelf: "center",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
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
  logoutText: {
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default SettingsScreen;
