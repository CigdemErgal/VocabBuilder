import { Tabs } from 'expo-router';

import { colors } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.7)',
        tabBarStyle: {
          backgroundColor: colors.brand,
          borderTopWidth: 0,
        },
      }}>
      <Tabs.Screen name="dictionary" options={{ title: 'Dictionary' }} />
      <Tabs.Screen name="recommend" options={{ title: 'Recommend' }} />
      <Tabs.Screen name="training" options={{ title: 'Training' }} />
    </Tabs>
  );
}
