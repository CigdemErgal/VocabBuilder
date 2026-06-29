import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DictionaryScreen from "../screens/app/DictionaryScreen";
import RecommendScreen from "../screens/app/RecommendScreen";
import TrainingScreen from "../screens/app/TrainingScreen";

import { VerbType, WordCategory } from "../types/word";

export type BottomTabParamList = {
  Dictionary:
    | {
        newWord?: {
          id: string;
          word: string;
          translation: string;
          ua: string;
          category: WordCategory;
          verbType?: VerbType;
          progress: number;
          nextReview: string;
        };
      }
    | undefined;

  Recommend: undefined;
  Training: undefined;
  AddWord: undefined;
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
