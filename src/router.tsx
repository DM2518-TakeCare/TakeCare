import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// If you want to add a new page, you must add the name here
export type RootStackParamList = {
  Home: undefined;
  Playground: undefined;
  Settings: undefined;
};
export const RootStack = createStackNavigator<RootStackParamList>();

export type RoutePropsHelper<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
} 