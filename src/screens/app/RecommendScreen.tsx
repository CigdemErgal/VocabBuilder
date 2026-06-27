import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "../../constants/theme";
import { mockRecommendedWords } from "../../data/mockWords";

export default function RecommendScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Recommend</Text>
        <Text style={styles.description}>
          A curated list of next-best words to pull into your daily dictionary.
        </Text>

        <View style={styles.list}>
          {mockRecommendedWords.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.word}>{item.word}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
              <Text style={styles.translation}>{item.translation}</Text>
              <Text style={styles.reason}>{item.reason}</Text>
              <View style={styles.actionPill}>
                <Text style={styles.actionText}>Add to dictionary</Text>
              </View>
            </View>
          ))}
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
    padding: spacing.lg,
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
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  card: {
    borderRadius: 24,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  word: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },
  category: {
    color: colors.brand,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  translation: {
    fontSize: 16,
    color: colors.text,
  },
  reason: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted,
  },
  actionPill: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  actionText: {
    color: colors.text,
    fontWeight: "700",
  },
});
