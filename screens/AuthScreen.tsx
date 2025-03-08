import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, ImageBackground, Animated, StyleSheet } from "react-native";
import { register, login, logout } from "../services/auth";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fadeAnim = new Animated.Value(0); // Animáció

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRegister = async () => {
    setError(null);
    try {
      const newUser = await register(email, password);
      setUser(newUser);
    } catch (err: any) {
      setError(err.message || "Hiba a regisztráció során.");
    }
  };

  const handleLogin = async () => {
    setError(null);
    try {
      const loggedInUser = await login(email, password);
      setUser(loggedInUser);
    } catch (err: any) {
      setError(err.message || "Hibás bejelentkezési adatok.");
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <ImageBackground source={require("../assets/cat.png")} style={styles.background}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {user ? (
          <>
            <Text style={styles.text}>Bejelentkezve: {user.email}</Text>
            <Button title="Kijelentkezés" onPress={handleLogout} />
          </>
        ) : (
          <>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Jelszó"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              style={styles.input}
            />
            <Button title="Regisztráció" onPress={handleRegister} />
            <Button title="Bejelentkezés" onPress={handleLogin} />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </>
        )}
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default AuthScreen;
