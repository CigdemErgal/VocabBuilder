import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { colors, Spacing } from '@/constants/theme';

export default function DictionaryScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Dictionary</Text>
        <Text style={styles.description}>
          Search, category filter, table ve progress listesi bu ekranda olacak.
        </Text>

        <View style={styles.toolbar}>
          <View style={styles.input} />
          <View style={styles.input} />
        </View>

        <View style={styles.table} />

        <Link href="/modals/add-word" style={styles.link}>
          Add word modalini ac
        </Link>
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
  toolbar: {
    gap: Spacing.two,
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
  link: {
    color: colors.brand,
    fontSize: 15,
    fontWeight: '600',
  },
});
