// app/excuses.tsx
import { useLocalSearchParams, Link } from 'expo-router';
import { View, Text, Button, Pressable, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useExcuses } from '../../hooks/ExcuseContext';
import { EXCUSES } from '../../constants/excusesData';

export default function ExcusesScreen() {
  const { category } = useLocalSearchParams<{ category?: keyof typeof EXCUSES }>();
  const [randomExcuse, setRandomExcuse] = useState<string | null>(null);
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set());
  const { saveFavorite, favorites } = useExcuses();

  useEffect(() => {
    if (category && favorites[category]) {
      setSavedSet(new Set(favorites[category]));
    }
  }, [favorites, category]);

  if (!category || !EXCUSES[category]) {
    return (
      <View style={styles.center}>
        <Text>❗️ Debes indicar categoría en la URL: ?category=Trabajo</Text>
      </View>
    );
  }

  const list = EXCUSES[category];

  const showRandom = () => {
    const idx = Math.floor(Math.random() * list.length);
    setRandomExcuse(list[idx]);
  };

  const handleSave = (excuse: string) => {
    if (!savedSet.has(excuse)) {
      saveFavorite(category, excuse);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Link href="/" style={styles.menuItem}><Text>Inicio</Text></Link>
        <Link href="/profile" style={styles.menuItem}><Text>Perfil</Text></Link>
      </View>

      <Button title="Excusa aleatoria 🎲" onPress={showRandom} />

      {randomExcuse && (
        <View style={[styles.card, styles.randomCard]}>
          <Text style={styles.randomText}>{randomExcuse}</Text>
          <Pressable
            style={[styles.saveButton, savedSet.has(randomExcuse) && styles.savedButton]}
            onPress={() => handleSave(randomExcuse)}
          >
            <Text style={styles.saveButtonText}>
              {savedSet.has(randomExcuse) ? 'Guardada' : 'Guardar'}
            </Text>
          </Pressable>
        </View>
      )}

      <Text style={styles.subtitle}>Todas las excusas:</Text>
      <FlatList
        data={list}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
            <Pressable
              style={[styles.saveButton, savedSet.has(item) && styles.savedButton]}
              onPress={() => handleSave(item)}
            >
              <Text style={styles.saveButtonText}>
                {savedSet.has(item) ? 'Guardada' : 'Guardar'}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  menu: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  menuItem: { padding: 8, backgroundColor: '#efefff', borderRadius: 6 },
  subtitle: { fontSize: 18, color: '#64748b', marginVertical: 15, textAlign: 'center' },
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.5,
  },
  randomCard: { backgroundColor: '#fef3c7' },
  randomText: { fontSize: 16, fontStyle: 'italic', flex: 1 },
  saveButton: { backgroundColor: '#f59e0b', padding: 6, borderRadius: 4, marginLeft: 10 },
  savedButton: { backgroundColor: '#10b981' },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  cardText: { flex: 1, color: '#1e293b' },
});
