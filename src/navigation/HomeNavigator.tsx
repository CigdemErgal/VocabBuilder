import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BottomTabNavigator } from "../navigation/BottomTabNavigator";

export type HomeParamList = {
  HomeTabs: undefined;
};
const Stack = createNativeStackNavigator<HomeParamList>();

export function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
