import { AuthNavigator } from "../navigation/AuthNavigator";
import { HomeNavigator } from "../navigation/HomeNavigator";

export function RootNavigator() {
  const isAuth = false;

  if (isAuth) {
    return <HomeNavigator />;
  }

  return <AuthNavigator />;
}
