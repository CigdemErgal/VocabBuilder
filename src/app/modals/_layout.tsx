import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="add-word" />
      <Stack.Screen name="edit-word" />
      <Stack.Screen name="well-done" />
    </Stack>
  );
}
