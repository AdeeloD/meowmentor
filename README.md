# 🐾 MeowMentor - Macskatartóknak készült mobilalkalmazás

Üdvözöllek a **MeowMentor** projektben! Ez egy **React Native Expo** alkalmazás, amely segít a macskatulajdonosoknak a felelős és tudatos gondoskodásban.

---

## 🚀 **Telepítés és futtatás**

### 🔹 **1. Előfeltételek**
Mielőtt elkezdenéd, szükséged lesz a következőkre:
- **Node.js** (ajánlott verzió: **LTS**): [Letöltés](https://nodejs.org/)
- **Git** (opcionális): [Letöltés](https://git-scm.com/)
- **Expo CLI** (Globális telepítéshez futtasd ezt a parancsot a terminálban):
  ```sh
  npm install -g expo-cli
  ```
- **Expo Go alkalmazás a telefonodra (Android/iOS)**

---

### 🔹 **2. A projekt letöltése**
Másold le a projektet a számítógépedre GitHubról:

```sh
git clone https://github.com/AdeeloD/meowmentor.git
```

Ezután lépj be a mappába:

```sh
cd meowmentor
```

Ha nincs Git, akkor töltsd le a kódot ZIP formátumban a GitHubról, majd csomagold ki.

---

### 🔹 **3. Függőségek telepítése**
A következő parancs telepíti az összes szükséges csomagot:

```sh
npm install
```

---

### 🔹 **4. Az alkalmazás futtatása**
Fejlesztői módban való futtatáshoz használd ezt a parancsot:

```sh
npx expo start
```

Ezután az **Expo Developer Tools** megnyílik a böngésződben.

---

### 🔹 **5. Az alkalmazás futtatása telefonon**
1. Nyisd meg az **Expo Go** alkalmazást a telefonodon.
2. Szkenneld be a **QR-kódot**, amely az Expo Developer Tools felületen látható.
3. Az alkalmazás automatikusan elindul a telefonodon! 🚀

📌 **Megjegyzés:** Ha iOS-t használsz, győződj meg róla, hogy ugyanarra a Wi-Fi hálózatra csatlakozol, mint a számítógéped.

---

## 🔥 **Extra parancsok**

🔹 **Android emulátorral való futtatás:**
```sh
npx expo start --android
```

🔹 **iOS szimulátorral való futtatás (csak macOS-en):**
```sh
npx expo start --ios
```

🔹 **Gyorsítótár törlése (ha hibák vannak):**
```sh
npx expo start -c
```

---

## 🎨 **Technológiák**

- **React Native (Expo)**
- **Firebase Auth** (Felhasználók regisztrációja, bejelentkezés)
- **AsyncStorage** (Adatok tárolása)
- **React Navigation** (Navigációs rendszer)

---

## 🛠 **Gyakori problémák és megoldások**

❌ **Hiba:** "Error: ENOSPC: System limit for number of file watchers reached"
✅ **Megoldás (Linux esetén):**
```sh
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

❌ **Hiba:** "Metro bundler nem indul el"
✅ **Megoldás:**
```sh
npx expo start -c
```

❌ **Hiba:** "Firebase Auth nem működik"
✅ **Megoldás:**
Győződj meg róla, hogy a **Firebase konfigurációs adatok** helyesen vannak beállítva a `firebaseConfig.ts` fájlban.

---

🎉 **Most már készen állsz a fejlesztésre!** 🚀