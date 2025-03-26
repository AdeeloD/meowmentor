import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PrivacyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🔒 Adatvédelem és Biztonság</Text>
        
        <Text style={styles.sectionTitle}>📖 Adatkezelési Tájékoztató</Text>
        <Text style={styles.text}>
          Az Ön adatai biztonságban vannak. Az alkalmazásunk kizárólag azokat az információkat tárolja,
          amelyeket Ön megadott. Ezeket az adatokat soha nem adjuk ki harmadik félnek.
        </Text>

        <Text style={styles.sectionTitle}>🔐 Biztonsági intézkedések</Text>
        <Text style={styles.text}>
          • Az adatok titkosítása AES-256 szabvánnyal történik.{"\n"}
          • Kétlépcsős azonosítás elérhető a beállításokban.{"\n"}
          • Rendszeresen ellenőrizzük a biztonsági réseket.
        </Text>

        <Text style={styles.sectionTitle}>🛡️ Ön rendelkezik az adatai felett</Text>
        <Text style={styles.text}>
          Az alkalmazásban bármikor törölheti fiókját a beállításokban, ezzel az összes személyes adatát véglegesen eltávolítjuk.
        </Text>

        <Text style={styles.sectionTitle}>❓ További információ</Text>
        <Text style={styles.text}>
          Ha bármilyen kérdése van, lépjen kapcsolatba velünk az{" "}
          <Text style={styles.link}>adatvedelem@meowmentor.com</Text> címen.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Vissza</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#717296",
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "white",
    lineHeight: 22,
  },
  link: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PrivacyScreen;
