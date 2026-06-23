import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "../../constants/theme";

type DictionaryFiltersProps = {
  selectedCategory?: string;
};

export default function DictionaryFilters({
  selectedCategory = "Categories",
}: DictionaryFiltersProps) {
  const isVerbSelected = selectedCategory === "Verb";

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

      <Pressable style={styles.inputBox}>
        <Text style={styles.inputText}>{selectedCategory}</Text>
        <Image
          source={require("../../../assets/edit-01.png")}
          style={styles.chevronIcon}
          resizeMode="contain"
        />
      </Pressable>

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
  chevronIcon: {
    width: 20,
    height: 20,
    transform: [{ rotate: "90deg" }],
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
