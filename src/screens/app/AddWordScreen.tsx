import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "../../constants/theme";
import type { VerbType, WordCategory } from "../../types/word";

export default function AddWordScreen() {
  const [englishWord, setEnglishWord] = useState("");
  const [turkishWord, setTurkishWord] = useState("");
  const [category, setCategory] = useState<WordCategory>("verb");
  const [verbType, setVerbType] = useState<VerbType>("regular");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Add word</Text>
        <Text style={styles.description}>
          Burada add word formunu kuracağız.
        </Text>
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
});
