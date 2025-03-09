import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { logout } from "../services/auth";

const SettingsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beállítások</Text>

      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <Text style={[styles.optionText, styles.logoutText]}>Kijelentkezés</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  option: {
    width: "90%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default SettingsScreen;
