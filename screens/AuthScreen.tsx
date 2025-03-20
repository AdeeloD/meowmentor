import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { register, login } from "../services/auth";

const AuthScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    setError(null);
    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          setError("A jelszavak nem egyeznek!");
          return;
        }
        if (!acceptedTerms) {
          setError("El kell fogadnod a felhasználási feltételeket!");
          return;
        }

        const newUser = await register(email, password, name, birthdate);
        if (newUser) {
          setIsRegistering(false);
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          Alert.alert("Sikeres regisztráció!");
        }
      } else {
        const loggedInUser = await login(email, password);
        if (loggedInUser) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }
      }
    } catch (err: any) {
      setError(err.message || "Hiba történt.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/cat.png")} style={styles.image} />
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>{isRegistering ? "Regisztráció" : "Bejelentkezés"}</Text>

        {isRegistering && (
          <>
            <TextInput
              placeholder="Teljes név"
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor="#444"
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
              <Text style={styles.dateText}>{birthdate.toDateString()}</Text>
            </TouchableOpacity>

            <Modal visible={showDatePicker} transparent animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <DateTimePicker
                    value={birthdate}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(_, date) => {
                      setShowDatePicker(false);
                      if (date) setBirthdate(date);
                    }}
                    textColor={Platform.OS === "ios" ? "black" : undefined} 
                  />
                  <Button title="OK" onPress={() => setShowDatePicker(false)} />
                </View>
              </View>
            </Modal>
          </>
        )}

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          placeholderTextColor="#444"
        />
        <TextInput
          placeholder="Jelszó"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#444"
        />

        {isRegistering && (
          <>
            <TextInput
              placeholder="Jelszó megerősítése"
              value={confirmPassword}
              secureTextEntry
              onChangeText={setConfirmPassword}
              style={styles.input}
              placeholderTextColor="#444"
            />

            <TouchableOpacity onPress={() => setAcceptedTerms(!acceptedTerms)}>
  <Text style={styles.terms}>
    {acceptedTerms ? "☑ Elfogadom" : "☐ Elfogadom"}{" "}
    <Text
      style={styles.termsLink}
      onPress={() => navigation.navigate("Terms")} // 📌 Navigálás a TermsScreen-re
    >
      a felhasználási feltételeket és adatvédelmi irányelveket
    </Text>
  </Text>
            </TouchableOpacity>
          </>
        )}

        <Button title={isRegistering ? "Regisztráció" : "Bejelentkezés"} onPress={handleAuth} />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.switchText}>
            {isRegistering ? "Már van fiókod? Bejelentkezés" : "Nincs fiókod? Regisztráció"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#717296",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 15,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#fff",
    fontSize: 16,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 16,
    color: "black",
  },
  terms: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  termsLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  switchText: {
    marginTop: 10,
    color: "blue",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default AuthScreen;
