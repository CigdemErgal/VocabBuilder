import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BottomTabNavigator } from "../navigation/BottomTabNavigator";
import AddWordScreen from "../screens/app/AddWordScreen";

export type HomeParamList = {
  HomeTabs: undefined;
  AddWord: undefined;
};

const Stack = createNativeStackNavigator<HomeParamList>();

export function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs" component={BottomTabNavigator} />
      <Stack.Screen name="AddWord" component={AddWordScreen} />
    </Stack.Navigator>
  );
}
