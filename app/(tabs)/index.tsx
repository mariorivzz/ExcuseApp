// app/(tabs)/index.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useExcuses } from '../../hooks/ExcuseContext';
import { EXCUSES } from '../../constants/excusesData';

export default function HomeScreen() {
  const router = useRouter();
  const { setCategory } = useExcuses();
  const categories = Object.keys(EXCUSES) as Array<keyof typeof EXCUSES>;

  const go = (cat: keyof typeof EXCUSES) => {
    setCategory(cat);
    router.push('/excuses');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Para qué necesitas una excusa?</Text>
      {categories.map(cat => (
        <Pressable
          key={cat}
          style={styles.button}
          onPress={() => go(cat)}
        >
          <Text style={styles.buttonText}>{cat}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  button: { backgroundColor: '#3b82f6', padding: 12, marginVertical: 6, borderRadius: 8 },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16 },
});
