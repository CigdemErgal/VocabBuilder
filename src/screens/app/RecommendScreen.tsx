import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import DictionaryFilters from "../../components/dictionary/DictionaryFilters";
import DictionaryHeader from "../../components/dictionary/DictionaryHeader";
import type { VerbType, WordCategory } from "../../types/word";
import { colors, spacing } from "../../constants/theme";
import { mockRecommendedWords } from "../../data/mockWords";

export default function RecommendScreen() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<WordCategory | null>(
    "verb",
  );
  const [selectedVerbType, setSelectedVerbType] = useState<VerbType>("regular");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <DictionaryHeader onMenuPress={() => {}} />

        <DictionaryFilters
          searchValue={searchValue}
          selectedCategory={selectedCategory}
          selectedVerbType={selectedVerbType}
          onSearchChange={setSearchValue}
          onCategoryChange={setSelectedCategory}
          onVerbTypeChange={setSelectedVerbType}
        />

        <Text style={styles.studyText}>
          To study: <Text style={styles.studyCount}>20</Text>
        </Text>

        <View style={styles.trainRow}>
          <Text style={styles.trainText}>Train oneself</Text>
          <Image
            style={styles.trainArrow}
            source={require("../../../assets/right-arrow.png")}
          />
        </View>

        <View style={styles.list}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Word</Text>
            <Text style={styles.headerCell}>Translation</Text>
            <Text style={styles.headerCell}>Category</Text>
          </View>

          {mockRecommendedWords.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.cell}>{item.word}</Text>
              <Text style={styles.cell}>{item.translation}</Text>
              <Text style={styles.cell}>{item.category}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
  contentContainer: {
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textMuted,
  },

  list: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.white,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.surface,
  },

  tableRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  headerCell: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },

  cell: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 14,
    color: colors.text,
  },
  studyText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textMuted,
  },

  studyCount: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },

  trainRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
    gap: 8,
  },

  trainText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
  },

  trainArrow: {
    width: 22,
    height: 22,
    tintColor: colors.brand,
  },
});
