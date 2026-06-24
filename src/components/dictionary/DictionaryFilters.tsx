import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "../../constants/theme";

type DictionaryFiltersProps = {
  selectedCategory?: string;
};
const categories = [
  "Verb",
  "Participle",
  "Noun",
  "Adjective",
  "Pronoun",
  "Numerals",
  "Adverb",
  "Preposition",
  "Conjunction",
  "Phrasal verb",
  "Functional phrase",
];

export default function DictionaryFilters({
  selectedCategory = "Categories",
}: DictionaryFiltersProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(selectedCategory);

  const isVerbSelected = currentCategory === "Verb";

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputBox}>
        <Text style={styles.inputText}>Find the word</Text>
        <Image
          source={require("../../../assets/dictionary-icon.png")}
          style={styles.searchIcon}
          resizeMode="contain"
        />
      </View>

      <Pressable
        style={styles.inputBox}
        onPress={() => setIsCategoryOpen(!isCategoryOpen)}
      >
        <Text style={styles.inputText}>{currentCategory}</Text>
        <Image
          source={require("../../../assets/edit-01.png")}
          style={[styles.chevronIcon, isCategoryOpen && styles.chevronIconOpen]}
          resizeMode="contain"
        />
      </Pressable>

      {isCategoryOpen && (
        <View style={styles.dropdown}>
          {categories.map((item) => (
            <Pressable
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setCurrentCategory(item);
                setIsCategoryOpen(false);
              }}
            >
              <Text style={styles.dropdownText}>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {isVerbSelected && (
        <View style={styles.radioRow}>
          <View style={styles.radioItem}>
            <View style={styles.radioOuterActive}>
              <View style={styles.radioInnerActive} />
            </View>
            <Text style={styles.radioText}>Regular</Text>
          </View>

          <View style={styles.radioItem}>
            <View style={styles.radioOuter} />
            <Text style={styles.radioText}>Irregular</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
    zIndex: 20,
  },
  inputBox: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  inputText: {
    fontSize: 16,
    color: colors.text,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    backgroundColor: colors.white,
    paddingVertical: 8,
    marginBottom: 8,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.text,
  },
  chevronIcon: {
    width: 20,
    height: 20,
    transform: [{ rotate: "90deg" }],
  },
  chevronIconOpen: {
    transform: [{ rotate: "-90deg" }],
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  radioOuterActive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.brand,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  radioInnerActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#D4D4D4",
    marginRight: 6,
  },
  radioText: {
    fontSize: 14,
    color: colors.text,
  },
});
