import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootNavigator } from "./src/navigation/RootNavigator";
import { restoreSessionThunk } from "./src/store/authSlice";
import { store } from "./src/store/store";
import type { AppDispatch } from "./src/store/store";

function AppContent() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(restoreSessionThunk());
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
