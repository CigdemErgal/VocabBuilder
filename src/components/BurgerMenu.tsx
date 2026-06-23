import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "../constants/theme";

type BurgerMenuProps = {
  onClose: () => void;
  onDictionaryPress: () => void;
  onRecommendPress: () => void;
  onTrainingPress: () => void;
  onLogoutPress: () => void;
};

export default function BurgerMenu({
  onClose,
  onDictionaryPress,
  onRecommendPress,
  onTrainingPress,
  onLogoutPress,
}: BurgerMenuProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.userRow}>
          <Text style={styles.userName}>Iryna</Text>

          <View style={styles.userIconWrapper}>
            <Image
              source={require("../../assets/user-icon.png")}
              style={styles.userIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        <Pressable onPress={onClose}>
          <Image
            source={require("../../assets/x.png")}
            style={styles.closeIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <View style={styles.menuList}>
        <Pressable onPress={onDictionaryPress} style={styles.activeItem}>
          <Text style={styles.activeItemText}>Dictionary</Text>
        </Pressable>

        <Pressable onPress={onRecommendPress}>
          <Text style={styles.menuItem}>Recommend</Text>
        </Pressable>

        <Pressable onPress={onTrainingPress}>
          <Text style={styles.menuItem}>Training</Text>
        </Pressable>

        <Pressable onPress={onLogoutPress} style={styles.logoutRow}>
          <Text style={styles.menuItem}>Log out</Text>
          <Image
            source={require("../../assets/right-arrow.png")}
            style={styles.rightArrow}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <Image
        source={require("../../assets/illustration.png")}
        style={styles.illustration}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 185,
    height: "100%",
    backgroundColor: colors.brand,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    zIndex: 20,
    borderRadius: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 120,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    color: colors.white,
    marginRight: 8,
  },
  userIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  userIcon: {
    width: 18,
    height: 18,
    tintColor: colors.brand,
  },
  closeIcon: {
    width: 32,
    height: 32,
    fontSize: 28,
    color: colors.white,
    lineHeight: 28,
  },
  menuList: {
    gap: 28,
  },
  activeItem: {
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  activeItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  menuItem: {
    fontSize: 16,
    color: colors.white,
  },
  rightArrow: {
    width: 20,
    height: 20,
    marginLeft: 6,
    tintColor: "#FFFFFF",
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  illustration: {
    width: 363,
    height: 318,
    position: "absolute",
    left: -79,
    top: 490,
    bottom: 0,
  },
});
