// app/(tabs)/profile.tsx
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useExcuses } from '../../hooks/ExcuseContext';

export default function ProfileScreen() {
  const { favorites } = useExcuses();
  const favList = Object.entries(favorites)
    .flatMap(([category, arr]) => arr.map(exc => ({ category, excuse: exc })));

  if (favList.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No tienes excusas favoritas aún.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Excusas Favoritas</Text>
      <FlatList
        data={favList}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.excuse}>{item.excuse}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#3b82f6', marginBottom: 20 },
  emptyText: { fontSize: 18, textAlign: 'center', color: '#64748b' },
  card: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.5,
  },
  category: { fontSize: 14, fontWeight: 'bold', color: '#4f46e5', marginBottom: 4 },
  excuse: { fontSize: 16, color: '#1e293b' },
});
