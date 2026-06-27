import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "../../constants/theme";
import { dictionaryCategories, verbTypeOptions } from "../../data/mockWords";
import type { HomeParamList } from "../../navigation/HomeNavigator";
import type { VerbType, WordCategory } from "../../types/word";

type Props = NativeStackScreenProps<HomeParamList, "AddWord">;

export default function AddWordScreen({ navigation }: Props) {
  const [englishWord, setEnglishWord] = useState("");
  const [turkishWord, setTurkishWord] = useState("");
  const [category, setCategory] = useState<WordCategory>("verb");
  const [verbType, setVerbType] = useState<VerbType>("regular");

  const handleSubmit = () => {
    if (!englishWord.trim() || !turkishWord.trim()) {
      Alert.alert("Missing info", "Please fill in both word fields.");
      return;
    }

    Alert.alert("Added", "The word has been added to your dictionary.");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Add word</Text>
          <Text style={styles.description}>
            Build a fresh card for your learning queue and keep the wording
            consistent with your study plan.
          </Text>

          <TextInput
            placeholder="English word"
            style={styles.input}
            value={englishWord}
            onChangeText={setEnglishWord}
          />
          <TextInput
            placeholder="Translation"
            style={styles.input}
            value={turkishWord}
            onChangeText={setTurkishWord}
          />

          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.chipList}>
            {dictionaryCategories.map((item) => {
              const isActive = item.value === category;

              return (
                <Pressable
                  key={item.value}
                  onPress={() => setCategory(item.value)}
                  style={[styles.chip, isActive && styles.chipActive]}
                >
                  <Text
                    style={[styles.chipText, isActive && styles.chipTextActive]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {category === "verb" ? (
            <>
              <Text style={styles.sectionTitle}>Verb type</Text>
              <View style={styles.radioList}>
                {verbTypeOptions.map((item) => {
                  const isActive = item.value === verbType;

                  return (
                    <Pressable
                      key={item.value}
                      onPress={() => setVerbType(item.value)}
                      style={styles.radioRow}
                    >
                      <View
                        style={
                          isActive
                            ? styles.radioOuterActive
                            : styles.radioOuter
                        }
                      >
                        {isActive ? <View style={styles.radioInner} /> : null}
                      </View>
                      <Text style={styles.radioText}>{item.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </>
          ) : null}

          <View style={styles.actions}>
            <Pressable onPress={() => navigation.goBack()} style={styles.cancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleSubmit} style={styles.submit}>
              <Text style={styles.submitText}>Add</Text>
            </Pressable>
          </View>
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
  content: {
    paddingBottom: spacing.xxl,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textMuted,
  },
  input: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.sm,
  },
  chipList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
  },
  chipActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  chipText: {
    color: colors.text,
    fontSize: 14,
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: "700",
  },
  radioList: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginRight: 8,
  },
  radioOuterActive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.brand,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand,
  },
  radioText: {
    color: colors.text,
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  cancel: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  cancelText: {
    color: colors.text,
    fontWeight: "600",
  },
  submit: {
    borderRadius: 999,
    backgroundColor: colors.brand,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  submitText: {
    color: colors.white,
    fontWeight: "700",
  },
});
