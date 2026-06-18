import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { colors, Spacing } from '@/constants/theme';

export default function TrainingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Training</Text>
        <Text style={styles.description}>
          Kelime karti, cevap alani ve submit akisi bu ekranda olacak.
        </Text>

        <View style={styles.taskCard}>
          <Text style={styles.word}>Break in</Text>
        </View>

        <View style={styles.answerBox} />
        <Link href="/modals/well-done" style={styles.link}>
          Well done modalini ac
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
  taskCard: {
    height: 220,
    borderRadius: 16,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
  answerBox: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  link: {
    color: colors.brand,
    fontSize: 15,
    fontWeight: '600',
  },
});
