import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/config/firebaseConfig";

const SupportFeedbackScreen = () => {
  const navigation = useNavigation();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!subject || !message || !name || !email) {
      Alert.alert("Hiba", "Kérlek tölts ki minden mezőt.");
      return;
    }

    try {
      await addDoc(collection(db, "feedbacks"), {
        subject,
        message,
        name,
        email,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Köszönjük!", "A visszajelzésedet rögzítettük.");
      setSubject("");
      setMessage("");
      setName("");
      setEmail("");
    } catch (error: any) {
      console.error("Hiba a visszajelzés mentésénél:", error);
      Alert.alert("Hiba", "Nem sikerült rögzíteni a visszajelzést.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📩 Támogatás és visszajelzés</Text>

        <TextInput
          style={styles.input}
          placeholder="Neved"
          placeholderTextColor="#555"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email címed"
          placeholderTextColor="#555"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Tárgy"
          placeholderTextColor="#555"
          value={subject}
          onChangeText={setSubject}
        />

        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Üzenet szövege..."
          placeholderTextColor="#555"
          multiline
          numberOfLines={6}
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Küldés</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Vissza</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#717296",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  backButton: {
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});

export default SupportFeedbackScreen;