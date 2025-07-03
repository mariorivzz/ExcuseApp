// app/_layout.tsx
import { Stack } from 'expo-router';
import { ExcuseProvider } from '../hooks/ExcuseContext';

export default function RootLayout() {
  return (
    <ExcuseProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
    </ExcuseProvider>
  );
}
