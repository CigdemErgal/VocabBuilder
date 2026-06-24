import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../constants/theme";

type DictionaryActionsProps = {
  onAddWordPress: () => void;
  onTrainPress: () => void;
};

export default function DictionaryActions({
  onAddWordPress,
  onTrainPress,
}: DictionaryActionsProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.studyRow}>
        <Text style={styles.studyLabel}>To Study</Text>
        <Text style={styles.studyCount}>20</Text>
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
    marginBottom: spacing.lg,
  },
  studyRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: spacing.md,
  },
  studyLabel: {
    fontSize: 16,
    color: colors.textMuted,
    marginRight: 8,
  },
  studyCount: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  actionText: {
    fontSize: 16,
    color: colors.text,
    marginRight: 8,
  },
  plusText: {
    fontSize: 20,
    color: colors.brand,
    lineHeight: 20,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: colors.brand,
  },
});
