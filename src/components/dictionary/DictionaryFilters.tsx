import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors, spacing } from "../../constants/theme";
import { dictionaryCategories, verbTypeOptions } from "../../data/mockWords";
import type { VerbType, WordCategory } from "../../types/word";

type DictionaryFiltersProps = {
  searchValue: string;
  selectedCategory: WordCategory | null;
  selectedVerbType: VerbType;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: WordCategory | null) => void;
  onVerbTypeChange: (value: VerbType) => void;
};

export default function DictionaryFilters({
  searchValue,
  selectedCategory,
  selectedVerbType,
  onSearchChange,
  onCategoryChange,
  onVerbTypeChange,
}: DictionaryFiltersProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const selectedLabel =
    dictionaryCategories.find((item) => item.value === selectedCategory)
      ?.label ?? "Categories";

  const isVerbSelected = selectedCategory === "verb";

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Find the word"
          placeholderTextColor={colors.textMuted}
          style={styles.searchInput}
          value={searchValue}
          onChangeText={onSearchChange}
        />
        <Image
          source={require("../../../assets/search.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      <Pressable
        style={styles.inputBox}
        onPress={() => setIsCategoryOpen((prev) => !prev)}
      >
        <Text style={styles.selectText}>{selectedLabel}</Text>
        <Image
          source={require("../../../assets/down-arrow.png")}
          style={[styles.icon, isCategoryOpen && styles.iconOpen]}
          resizeMode="contain"
        />
      </Pressable>

      {isCategoryOpen && (
        <View style={styles.dropdown}>
          {dictionaryCategories.map((item) => {
            const isActive = item.value === selectedCategory;

            return (
              <Pressable
                key={item.value}
                style={[
                  styles.dropdownItem,
                  isActive && styles.dropdownItemActive,
                ]}
                onPress={() => {
                  onCategoryChange(item.value);
                  setIsCategoryOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    isActive && styles.dropdownTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      {isVerbSelected && (
        <View style={styles.radioRow}>
          {verbTypeOptions.map((option) => {
            const isActive = option.value === selectedVerbType;

            return (
              <Pressable
                key={option.value}
                onPress={() => onVerbTypeChange(option.value)}
                style={styles.radioItem}
              >
                <View
                  style={isActive ? styles.radioOuterActive : styles.radioOuter}
                >
                  {isActive ? <View style={styles.radioInnerActive} /> : null}
                </View>
                <Text style={styles.radioText}>{option.label}</Text>
              </Pressable>
            );
          })}
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
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    color: colors.text,
  },
  selectText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    color: colors.text,
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: colors.text,
  },
  iconOpen: {
    transform: [{ rotate: "180deg" }],
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 8,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemActive: {
    backgroundColor: "#F4F8F7",
  },
  dropdownText: {
    fontSize: 16,
    color: colors.text,
  },
  dropdownTextActive: {
    color: colors.brand,
    fontWeight: "600",
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: spacing.md,
    flexWrap: "wrap",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "400",
    color: colors.text,
  },
});
