import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import MilestonesScreen from "./screens/MilestonesScreen";
import GalleryScreen from "./screens/GalleryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TipsScreen from "./screens/TipsScreen";
import CalendarScreen from "./screens/CalendarScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AuthScreen from "./screens/AuthScreen";
import { RootStackParamList } from "./navigation";
import TermsScreen from "./screens/TermsScreen";
import AccountSettingsScreen from "./screens/AccountSettingsScreen";
import NotificationScreen from "./screens/NotificationScreen";
import PrivacyScreen from "./screens/PrivacyScreen";
import SupportFeedbackScreen from "./screens/SupportFeedbackScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Milestones" component={MilestonesScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Tips" component={TipsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
         <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen name="SupportFeedback" component={SupportFeedbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
