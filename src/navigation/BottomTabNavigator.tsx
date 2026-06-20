import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DictionaryScreen from "../screens/app/DictionaryScreen";
import RecommendScreen from "../screens/app/RecommendScreen";
import TrainingScreen from "../screens/app/TrainingScreen";

export type BottomTabParamList = {
  Dictionary: undefined;
  Recommend: undefined;
  Training: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dictionary" component={DictionaryScreen} />
      <Tab.Screen name="Recommend" component={RecommendScreen} />
      <Tab.Screen name="Training" component={TrainingScreen} />
    </Tab.Navigator>
  );
}
