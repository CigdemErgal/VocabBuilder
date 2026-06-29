import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import BurgerMenu from "../../components/BurgerMenu";
import DictionaryActions from "../../components/dictionary/DictionarysActions";
import DictionaryFilters from "../../components/dictionary/DictionaryFilters";
import DictionaryHeader from "../../components/dictionary/DictionaryHeader";
import EditWordModal from "../../components/dictionary/EditWordModal";
import WordsPagination from "../../components/dictionary/WordsPagination";
import WordsTable from "../../components/dictionary/WordsTable";
import { colors, spacing } from "../../constants/theme";
import { mockDictionaryWords } from "../../data/mockWords";
import type { DictionaryWord } from "../../data/mockWords";
import type { BottomTabParamList } from "../../navigation/BottomTabNavigator";
import { logoutThunk } from "../../store/authSlice";
import type { VerbType, WordCategory } from "../../types/word";
import type { AppDispatch } from "../../store/store";

type Props = BottomTabScreenProps<BottomTabParamList, "Dictionary">;

export default function DictionaryScreen({ navigation, route }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<WordCategory | null>(
    null,
  );
  const [selectedVerbType, setSelectedVerbType] = useState<VerbType>("regular");
  const [currentPage, setCurrentPage] = useState(1);
  const [words, setWords] = useState(mockDictionaryWords);
  const [editingWord, setEditingWord] = useState<DictionaryWord | null>(null);
  useEffect(() => {
    const newWord = route.params?.newWord;

    if (!newWord) return;

    setWords((currentWords) => {
      const alreadyExists = currentWords.some((item) => item.id === newWord.id);

      if (alreadyExists) {
        return currentWords;
      }

      return [newWord, ...currentWords];
    });

    setCurrentPage(1);
  }, [route.params?.newWord]);

  const dispatch = useDispatch<AppDispatch>();
  const itemsPerPage = 3;

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  const handleAddWord = () => {
    navigation.getParent()?.navigate("AddWord" as never);
  };

  const handleTrain = () => {
    navigation.navigate("Training");
  };

  const filteredWords = useMemo(() => {
    return words.filter((item) => {
      const query = searchValue.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        item.word.toLowerCase().includes(query) ||
        item.translation.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === null || item.category === selectedCategory;
      const matchesVerbType =
        selectedCategory !== "verb" || item.verbType === selectedVerbType;

      return matchesSearch && matchesCategory && matchesVerbType;
    });
  }, [searchValue, selectedCategory, selectedVerbType, words]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredWords.length / itemsPerPage),
  );
  const paginatedWords = filteredWords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleCategoryChange = (value: WordCategory | null) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleDelete = (wordId: string) => {
    Alert.alert("Delete Word", "Are you sure you want to delete this word?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setWords((currentWords) =>
            currentWords.filter((item) => item.id !== wordId),
          );
          setCurrentPage(1);
        },
      },
    ]);
  };

  const handleSaveEdit = (payload: {
    id: string;
    word: string;
    translation: string;
  }) => {
    if (!payload.word || !payload.translation) {
      Alert.alert("Missing info", "Please fill in both fields before saving.");
      return;
    }

    setWords((currentWords) =>
      currentWords.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              word: payload.word,
              translation: payload.translation,
              ua: payload.translation,
            }
          : item,
      ),
    );
    setEditingWord(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <DictionaryHeader onMenuPress={() => setIsMenuOpen(!isMenuOpen)} />

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
            searchValue={searchValue}
            selectedCategory={selectedCategory}
            selectedVerbType={selectedVerbType}
            onSearchChange={(value) => {
              setSearchValue(value);
              setCurrentPage(1);
            }}
            onCategoryChange={handleCategoryChange}
            onVerbTypeChange={setSelectedVerbType}
          />

          <DictionaryActions
            studyCount={filteredWords.length}
            onAddWordPress={handleAddWord}
            onTrainPress={handleTrain}
          />

          <WordsTable
            words={paginatedWords}
            onEdit={setEditingWord}
            onDelete={handleDelete}
          />

          <WordsPagination
            currentPage={currentPage}
            totalPages={totalPages}
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
});
