import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { colors, Spacing } from '@/constants/theme';

export default function RecommendScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Recommend</Text>
        <Text style={styles.description}>
          Onerilen kelimeler listesi ve add to dictionary akisi burada olacak.
        </Text>
        <View style={styles.input} />
        <View style={styles.input} />
        <View style={styles.table} />
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
    padding: Spacing.four,
    gap: Spacing.three,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  input: {
    height: 48,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  table: {
    flex: 1,
    minHeight: 280,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
});
