# 🐾 MeowMentor – Mobile App for Cat Owners

Welcome to **MeowMentor**, a cross-platform **React Native (Expo)** mobile application that helps cat owners track, manage, and celebrate their feline companion’s daily care and important milestones.

---

## 🚀 Getting Started

### 🔹 1. Prerequisites

Make sure you have the following installed:

- **Node.js** (Recommended: LTS version): [Download](https://nodejs.org/)
- **Git** (optional): [Download](https://git-scm.com/)
- **Expo CLI** (install globally via terminal):
  ```sh
  npm install -g expo-cli
  ```
- **Expo Go app** on your phone (Android/iOS)

---

### 🔹 2. Clone the Repository

Clone the project from GitHub:

```sh
git clone https://github.com/AdeeloD/meowmentor.git
cd meowmentor
```

Alternatively, download it as a ZIP from GitHub and extract it.

---

### 🔹 3. Install Dependencies

Run the following command to install all required packages:

```sh
npm install
```

---

### 🔹 4. Environment Setup

Create a `.env` file in the root folder and add your Firebase credentials like this:

```env
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
```

Also make sure `.env` is excluded from Git in `.gitignore`.

---

### 🔹 5. Start the App

Run the following command to launch the development server:

```sh
npx expo start
```

Then open the **Expo Developer Tools** in your browser.

---

### 🔹 6. Open the App on Your Phone

1. Open the **Expo Go** app on your mobile device.
2. Scan the **QR code** shown in the browser.
3. The app will automatically start on your phone! 🎉

📌 **Note:** Ensure your phone is on the **same Wi-Fi network** as your computer.

---

## 💡 Key Features

- 🔐 **User Authentication** (Firebase Auth)
- 📸 **Profile Setup with Cat Name & Picture**
- 🐾 **Daily Interactions** (Feeding, Playing, Hydration)
- 🗓️ **Calendar Integration**
- 🏆 **Milestones System**
- 📷 **User-Specific Photo Gallery**
- 🔔 **Hydration Reminders** every 10 minutes (with local notifications)
- ⚙️ **Settings and Account Management**
- 📄 **Terms, Privacy, and Feedback Screens**

---

## ⚙️ Useful Commands

🔹 Run on Android emulator:
```sh
npx expo start --android
```

🔹 Run on iOS simulator (macOS only):
```sh
npx expo start --ios
```

🔹 Clear cache and restart:
```sh
npx expo start -c
```

---

## 🧰 Technologies Used

- **React Native (Expo)**
- **TypeScript**
- **Firebase (Auth, Firestore)**
- **AsyncStorage** (Gallery and local data)
- **React Navigation (Stack Navigator)**
- **Expo Notifications**

---

## 🛠 Common Issues

❌ **Error:** `ENOSPC: System limit for number of file watchers reached`  
✅ **Fix (Linux):**
```sh
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

❌ **Firebase Auth not working?**  
✅ Check your `.env` values and ensure Firebase is initialized correctly.

❌ **Metro bundler not starting?**  
✅ Run:
```sh
npx expo start -c
```

---

🎉 You’re ready to take care of your cat with MeowMentor! Happy coding & caring! 🐱