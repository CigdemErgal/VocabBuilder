import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import BurgerMenu from "../../components/BurgerMenu";
import { colors, spacing } from "../../constants/theme";
import type { BottomTabParamList } from "../../navigation/BottomTabNavigator";
import { logout } from "../../store/authSlice";

type Props = BottomTabScreenProps<BottomTabParamList, "Dictionary">;

export default function DictionaryScreen({ navigation }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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

            <Pressable onPress={() => setIsMenuOpen(!isMenuOpen)}>
              <Image
                source={require("../../../assets/hamburger-menu.png")}
                style={styles.menuImage}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>

        {isMenuOpen && (
          <BurgerMenu
            onClose={() => setIsMenuOpen(false)}
            onDictionaryPress={() => setIsMenuOpen(false)}
            onRecommendPress={() => {
              setIsMenuOpen(false);
              navigation.navigate("Recommend");
            }}
            onTrainingPress={() => {
              setIsMenuOpen(false);
              navigation.navigate("Training");
            }}
            onLogoutPress={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
          />
        )}

        <View style={styles.content}>
          <Text style={styles.title}>Dictionary</Text>
          <Text style={styles.description}>
            Search, category filter, statistics and words table burada olacak.
          </Text>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
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
  menuImage: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textMuted,
  },
});
