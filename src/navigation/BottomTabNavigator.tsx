import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DictionaryScreen from "../screens/app/DictionaryScreen";
import RecommendScreen from "../screens/app/RecommendScreen";
import TrainingScreen from "../screens/app/TrainingScreen";
import { Image } from "react-native";
import { VerbType, WordCategory } from "../types/word";
import { colors } from "../constants/theme";

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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          height: 84,
          paddingTop: 0,
          paddingBottom: 17,
          borderTopWidth: 0.5,

          backgroundColor: colors.brand,
        },
        tabBarActiveTintColor: colors.background,
        tabBarInactiveTintColor: "rgba(252, 252, 252, 0.5)",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "400",
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 2,
        },
      }}
    >
      <Tab.Screen
        name="Dictionary"
        component={DictionaryScreen}
        options={{
          tabBarLabel: "Dictionary",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/dictionary-icon.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Recommend"
        component={RecommendScreen}
        options={{
          tabBarLabel: "Recommend",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/recommend-icon.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Training"
        component={TrainingScreen}
        options={{
          tabBarLabel: "Training",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/training-icon.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
