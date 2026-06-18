import { StyleSheet, Text, View } from 'react-native';

import { colors, Spacing } from '@/constants/theme';

export default function WellDoneModalScreen() {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Well done</Text>
        <Text style={styles.description}>
          Dogru ve yanlis cevaplarin listesi burada gosterilecek.
        </Text>
        <View style={styles.list} />
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
  list: {
    height: 220,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
});
