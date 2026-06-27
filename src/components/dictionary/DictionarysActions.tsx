import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "../../constants/theme";

type DictionaryActionsProps = {
  studyCount: number;
  onAddWordPress: () => void;
  onTrainPress: () => void;
};

export default function DictionaryActions({
  studyCount,
  onAddWordPress,
  onTrainPress,
}: DictionaryActionsProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.studyRow}>
        <Text style={styles.studyLabel}>To Study</Text>
        <Text style={styles.studyCount}>{studyCount}</Text>
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.actionButton} onPress={onAddWordPress}>
          <Text style={styles.actionText}>Add Word</Text>
          <Text style={styles.plusText}>+</Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={onTrainPress}>
          <Text style={styles.actionText}>Train oneself</Text>
          <Image
            source={require("../../../assets/right-arrow.png")}
            style={styles.arrowIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: spacing.lg,
  },
  studyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  studyLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginRight: 8,
  },
  studyCount: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.lg,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: 16,
    color: colors.text,
  },
  plusText: {
    marginLeft: 8,
    fontSize: 20,
    color: colors.brand,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
});
