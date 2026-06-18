import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { colors, Spacing } from '@/constants/theme';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.logo}>VocabBuilder</Text>

        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.description}>
            Login formunu bir sonraki adimda gercek inputlarla kuracagiz. Su an sadece ekran
            yerlerini netlestiriyoruz.
          </Text>

          <View style={styles.placeholder} />
          <View style={styles.placeholder} />
          <View style={styles.button} />

          <Link href="/(auth)/register" style={styles.link}>
            Register
          </Link>
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
    padding: Spacing.four,
    justifyContent: 'center',
    gap: Spacing.four,
  },
  logo: {
    color: colors.brand,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '700',
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  placeholder: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.white,
  },
  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.brand,
    marginTop: Spacing.one,
  },
  link: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
