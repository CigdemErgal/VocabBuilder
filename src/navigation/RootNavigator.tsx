import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { AuthNavigator } from "../navigation/AuthNavigator";
import { HomeNavigator } from "../navigation/HomeNavigator";
import { colors } from "../constants/theme";
import type { RootState } from "../store/store";

export function RootNavigator() {
  const { isAuth, isRestoringSession } = useSelector(
    (state: RootState) => state.auth,
  );

  if (isRestoringSession) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    );
  }

  return isAuth ? <HomeNavigator key="home" /> : <AuthNavigator key="auth" />;
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
