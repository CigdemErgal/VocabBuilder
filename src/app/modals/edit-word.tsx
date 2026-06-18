import { StyleSheet, Text, View } from 'react-native';

import { colors, Spacing } from '@/constants/theme';

export default function EditWordModalScreen() {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Edit word</Text>
        <Text style={styles.description}>Mevcut kelimeyi guncelleme formu burada olacak.</Text>
        <View style={styles.input} />
        <View style={styles.input} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(18,20,23,0.45)',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  card: {
    backgroundColor: colors.brand,
    borderRadius: 24,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    lineHeight: 21,
  },
  input: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.white,
  },
});
