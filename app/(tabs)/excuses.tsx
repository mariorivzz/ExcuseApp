// app/(tabs)/excuses.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Button, Pressable, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useExcuses } from '../../hooks/ExcuseContext';
import { EXCUSES } from '../../constants/excusesData';
import { Link } from 'expo-router';

export default function ExcusesScreen() {
  const { selectedCategory: category, saveFavorite, favorites } = useExcuses();
  const [randomExcuse, setRandomExcuse] = useState<string | null>(null);
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (category && favorites[category]) {
      setSavedSet(new Set(favorites[category]));
    }
  }, [favorites, category]);

  if (!category) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>❗️ Selecciona primero una categoría en Inicio</Text>
        <Link href="/" style={styles.link}><Text style={styles.linkText}>Ir a Inicio</Text></Link>
      </SafeAreaView>
    );
  }

  const list = EXCUSES[category];
  const showRandom = () => setRandomExcuse(list[Math.floor(Math.random() * list.length)]);
  const handleSave = (exc: string) => !savedSet.has(exc) && saveFavorite(category, exc);

  return (
    <SafeAreaView style={styles.container}>

      <Button title="🎲 Excusa Aleatoria" onPress={showRandom} />

      {randomExcuse && (
        <View style={[styles.card, styles.randomCard]}>
          <Text style={styles.randomText}>{randomExcuse}</Text>
          <Pressable style={styles.saveBtn} onPress={() => handleSave(randomExcuse)}>
            <Text style={styles.saveText}>
              {savedSet.has(randomExcuse) ? 'Guardada' : 'Guardar'}
            </Text>
          </Pressable>
        </View>
      )}

      <Text style={styles.subtitle}>Todas las excusas para {category}:</Text>
      <FlatList
        data={list}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
            <Pressable style={styles.saveBtn} onPress={() => handleSave(item)}>
              <Text style={styles.saveText}>
                {savedSet.has(item) ? 'Guardada' : 'Guardar'}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },      // ya no paddingTop
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  nav: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  navLink: { padding: 8, backgroundColor: '#efefff', borderRadius: 6 },
  error: { fontSize: 18, color: '#ef4444', marginBottom: 12, textAlign: 'center' },
  link: { padding: 8, backgroundColor: '#3b82f6', borderRadius: 6 },
  linkText: { color: 'white' },
  subtitle: { fontSize: 18, color: '#64748b', marginVertical: 12, textAlign: 'center' },
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2, shadowRadius: 1.5,
  },
  randomCard: { backgroundColor: '#fef3c7', marginTop: 12 },  // un pequeño marginTop
  randomText: { fontSize: 16, fontStyle: 'italic', flex: 1 },
  saveBtn: { backgroundColor: '#3b82f6', padding: 8, borderRadius: 6, marginLeft: 10 },
  saveText: { color: '#fff', fontWeight: 'bold' },
  cardText: { flex: 1, color: '#1e293b' },
});
