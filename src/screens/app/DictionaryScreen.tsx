import { useIsFocused } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import BurgerMenu from "../../components/BurgerMenu";
import DictionaryActions from "../../components/dictionary/DictionarysActions";
import DictionaryFilters from "../../components/dictionary/DictionaryFilters";
import DictionaryHeader from "../../components/dictionary/DictionaryHeader";
import EditWordModal from "../../components/dictionary/EditWordModal";
import WordsPagination from "../../components/dictionary/WordsPagination";
import WordsTable from "../../components/dictionary/WordsTable";
import { colors, spacing } from "../../constants/theme";
import type { BottomTabParamList } from "../../navigation/BottomTabNavigator";
import { logoutThunk } from "../../store/authSlice";
import {
  fetchCategoriesThunk,
  fetchDictionaryWordsThunk,
  fetchStatisticsThunk,
  selectDictionaryWords,
  selectWordCategories,
  selectWordStatisticsCount,
  selectWordsError,
} from "../../store/wordsSlice";
import type { AppDispatch, RootState } from "../../store/store";
import type { VerbType, WordCategory } from "../../types/word";
import type { DictionaryWord } from "../../store/wordMapper";

type Props = BottomTabScreenProps<BottomTabParamList, "Dictionary">;

export default function DictionaryScreen({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();

  const words = useSelector(selectDictionaryWords);
  const categories = useSelector(selectWordCategories);
  const statisticsCount = useSelector(selectWordStatisticsCount);
  const paginationCurrentPage = useSelector(
    (state: RootState) => state.words.currentPage,
  );
  const paginationTotalPages = useSelector(
    (state: RootState) => state.words.totalPages,
  );
  const isLoadingWords = useSelector(
    (state: RootState) => state.words.isLoadingWords,
  );
  const error = useSelector(selectWordsError);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<WordCategory | null>(
    null,
  );
  const [selectedVerbType, setSelectedVerbType] = useState<VerbType>("regular");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingWord, setEditingWord] = useState<DictionaryWord | null>(null);

  const categoryOptions = useMemo(
    () =>
      categories.map((item) => ({
        value: item,
        label: item
          .split(" ")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" "),
      })),
    [categories],
  );

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    dispatch(fetchCategoriesThunk());
    dispatch(fetchStatisticsThunk());
  }, [dispatch, isFocused]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    dispatch(
      fetchDictionaryWordsThunk({
        keyword: searchValue,
        category: selectedCategory,
        verbType: selectedVerbType,
        page: currentPage,
        limit: 7,
      }),
    );
  }, [
    currentPage,
    dispatch,
    isFocused,
    searchValue,
    selectedCategory,
    selectedVerbType,
  ]);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  const handleAddWord = () => {
    navigation.getParent()?.navigate("AddWord" as never);
  };

  const handleTrain = () => {
    navigation.navigate("Training");
  };

  const handleCategoryChange = (value: WordCategory | null) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleDelete = (_wordId: string) => {
    Alert.alert("Delete is not connected yet");
  };

  const handleSaveEdit = (_payload: {
    id: string;
    word: string;
    translation: string;
  }) => {
    Alert.alert("Edit is not connected yet");
    setEditingWord(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <DictionaryHeader onMenuPress={() => setIsMenuOpen((prev) => !prev)} />

        {isMenuOpen ? (
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
        ) : null}

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <DictionaryFilters
            categories={categoryOptions}
            searchValue={searchValue}
            selectedCategory={selectedCategory}
            selectedVerbType={selectedVerbType}
            onSearchChange={(value) => {
              setSearchValue(value);
              setCurrentPage(1);
            }}
            onCategoryChange={handleCategoryChange}
            onVerbTypeChange={(value) => {
              setSelectedVerbType(value);
              setCurrentPage(1);
            }}
          />

          <DictionaryActions
            studyCount={statisticsCount}
            onAddWordPress={handleAddWord}
            onTrainPress={handleTrain}
          />

          {isLoadingWords ? (
            <Text style={styles.infoText}>Loading words...</Text>
          ) : null}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <WordsTable
            words={words}
            onEdit={setEditingWord}
            onDelete={handleDelete}
          />

          <WordsPagination
            currentPage={paginationCurrentPage}
            totalPages={paginationTotalPages}
            onPageChange={setCurrentPage}
          />
        </ScrollView>
      </View>

      <EditWordModal
        visible={editingWord !== null}
        word={editingWord}
        onClose={() => setEditingWord(null)}
        onSave={handleSaveEdit}
      />
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
  contentContainer: {
    paddingBottom: spacing.xxl,
  },
  infoText: {
    marginTop: spacing.md,
    color: colors.textMuted,
    fontSize: 14,
  },
  errorText: {
    marginTop: spacing.md,
    color: colors.danger,
    fontSize: 14,
  },
});
