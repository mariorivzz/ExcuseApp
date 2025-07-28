// app/_layout.tsx
import { Stack } from 'expo-router';
import { ExcuseProvider } from '../hooks/ExcuseContext';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <ExcuseProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
        </Stack>
      </ExcuseProvider>
    </RootSiblingParent>
  );
}
