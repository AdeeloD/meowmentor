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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { register, login } from "../services/auth";

const AuthScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Állapotok kezelése
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

  // 📌 Hitelesítés kezelése (Regisztráció/Bejelentkezés)
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
      {/* Profilkép */}
      <View style={styles.imageContainer}>
        <Image source={require("../assets/cat.png")} style={styles.image} />
      </View>

      {/* Űrlap */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>{isRegistering ? "Regisztráció" : "Bejelentkezés"}</Text>

        {/* Regisztráció esetén név és születési dátum */}
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

            {showDatePicker && (
              <DateTimePicker
                value={birthdate}
                mode="date"
                display="spinner"
                onChange={(_, date) => {
                  setShowDatePicker(false);
                  if (date) setBirthdate(date);
                }}
              />
            )}
          </>
        )}

        {/* E-mail és jelszó mezők */}
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

        {/* Regisztráció esetén jelszó megerősítés és felhasználási feltételek */}
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
                <Text style={styles.termsLink} onPress={() => setShowTerms(true)}>
                  a felhasználási feltételeket és adatvédelmi irányelveket
                </Text>
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Gomb a bejelentkezéshez/regisztrációhoz */}
        <Button title={isRegistering ? "Regisztráció" : "Bejelentkezés"} onPress={handleAuth} />

        {/* Hibaüzenet */}
        {error && <Text style={styles.error}>{error}</Text>}

        {/* Módváltás (Bejelentkezés ⇄ Regisztráció) */}
        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.switchText}>
            {isRegistering ? "Már van fiókod? Bejelentkezés" : "Nincs fiókod? Regisztráció"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Felhasználási feltételek Modal */}
      <Modal visible={showTerms} transparent animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Felhasználási feltételek</Text>
      <ScrollView style={{ maxHeight: 400 }}>
        <Text style={styles.modalText}>
          A MeowMentor alkalmazás célja, hogy segítséget nyújtson macskatulajdonosoknak 
          a felelős és tudatos kisállattartásban. Az alkalmazás letöltése ingyenes, 
          azonban bizonyos prémium funkciók díjkötelesek. 

          A regisztrációval elfogadod, hogy az alkalmazás használata során bizonyos adatokat 
          gyűjtünk, például neved, e-mail címed és egyéb beállításokat. Az adatok kezelésére 
          az adatvédelmi irányelveink vonatkoznak.

          A felhasználók vállalják, hogy az alkalmazás használata során nem töltenek fel 
          jogsértő, sértő vagy más módon nem megfelelő tartalmat. Az alkalmazás üzemeltetője 
          fenntartja a jogot, hogy az ilyen tartalmakat törölje, illetve a felhasználót 
          kitiltsa.

          További részletekért kérjük, olvasd el az Általános Szerződési Feltételeket 
          a beállítások menüben.
        </Text>
      </ScrollView>
      <Button title="Bezárás" onPress={() => setShowTerms(false)} />
    </View>
  </View>
</Modal>
    </View>
  );
};

// 🎨 **Stílusok**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#717296",
    alignItems: "center",
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
    color: "black",
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default AuthScreen;
