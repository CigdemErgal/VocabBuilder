import { useSelector } from "react-redux";

import { AuthNavigator } from "../navigation/AuthNavigator";
import { HomeNavigator } from "../navigation/HomeNavigator";
import type { RootState } from "../store/store";

export function RootNavigator() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return isAuth ? <HomeNavigator key="home" /> : <AuthNavigator key="auth" />;
}
