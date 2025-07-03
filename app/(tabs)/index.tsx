// app/(tabs)/index.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const categories = ['Trabajo', 'Pareja', 'Amigos', 'Absurdo'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Para qué necesitas una excusa?</Text>
      {categories.map((cat) => (
        <Link key={cat} href={`/excuses?category=${cat}`} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>{cat}</Text>
          </Pressable>
        </Link>
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
