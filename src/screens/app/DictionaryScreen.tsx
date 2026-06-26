import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import BurgerMenu from "../../components/BurgerMenu";
import DictionaryActions from "../../components/dictionary/DictionarysActions";
import DictionaryFilters from "../../components/dictionary/DictionaryFilters";
import WordsTable from "../../components/dictionary/WordsTable";
import DictionaryHeader from "../../components/dictionary/DictionaryHeader";
import { colors, spacing } from "../../constants/theme";
import type { BottomTabParamList } from "../../navigation/BottomTabNavigator";
import { logout } from "../../store/authSlice";

type Props = BottomTabScreenProps<BottomTabParamList, "Dictionary">;

export default function DictionaryScreen({ navigation }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleAddWord = () => {
    navigation.getParent()?.navigate("AddWord" as never);
  };

  const handleTrain = () => {
    navigation.navigate("Training");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <DictionaryHeader onMenuPress={() => setIsMenuOpen(!isMenuOpen)} />

        {isMenuOpen && (
          <BurgerMenu
            onClose={() => setIsMenuOpen(false)}
            onDictionaryPress={() => setIsMenuOpen(false)}
            onRecommendPress={() => {
              setIsMenuOpen(false);
              navigation.navigate("Recommend");
            }}
            onTrainingPress={() => {
              setIsMenuOpen(false);
              navigation.navigate("Training");
            }}
            onLogoutPress={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
          />
        )}

        <View style={styles.content}>
          <DictionaryFilters />
          <DictionaryActions
            onAddWordPress={handleAddWord}
            onTrainPress={handleTrain}
          />
          <WordsTable />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  content: {
    flex: 1,
  },
});
