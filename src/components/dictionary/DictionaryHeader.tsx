import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "../../constants/theme";

type DictionaryHeaderProps = {
  onMenuPress: () => void;
};

export default function DictionaryHeader({
  onMenuPress,
}: DictionaryHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.logoRow}>
        <Image
          source={require("../../../assets/Craftwork.png")}
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>VocabBuilder</Text>
      </View>

      <View style={styles.headerRight}>
        <Text style={styles.userName}>Iryna</Text>

        <View style={styles.userIconWrapper}>
          <Image
            source={require("../../../assets/user-icon.png")}
            style={styles.userIcon}
            resizeMode="contain"
          />
        </View>

        <Pressable onPress={onMenuPress}>
          <Image
            source={require("../../../assets/hamburger-menu.png")}
            style={styles.menuIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  logoText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    color: "#121417",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    color: "#121417",
    marginRight: 8,
  },
  userIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  userIcon: {
    width: 18,
    height: 18,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
});
