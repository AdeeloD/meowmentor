import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Milestones: undefined;
  Gallery: undefined;
  Profile: undefined;
  Tips: undefined;
  Settings: undefined;
  Calendar: undefined
  Terms: undefined;
  AccountSettings: undefined;
};

export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
