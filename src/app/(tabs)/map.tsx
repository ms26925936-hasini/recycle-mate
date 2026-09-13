import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🗺️ Recycling Centers</Text>
          <Text style={styles.headerSubtitle}>
            Find recycling centers near you
          </Text>
        </View>

        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapIcon}>📍</Text>
          <Text style={styles.mapText}>Map Loading...</Text>
          <Text style={styles.mapSubtext}>
            GPS integration coming soon
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Centers</Text>
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderText}>
              🚧 Location feature will be implemented in Week 2
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Materials Accepted</Text>
          <View style={styles.materialsRow}>
            <View style={styles.materialChip}>
              <Text style={styles.materialText}>♻️ Plastic</Text>
            </View>
            <View style={styles.materialChip}>
              <Text style={styles.materialText}>🍶 Glass</Text>
            </View>
            <View style={styles.materialChip}>
              <Text style={styles.materialText}>📄 Paper</Text>
            </View>
            <View style={styles.materialChip}>
              <Text style={styles.materialText}>🥫 Metal</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  mapPlaceholder: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#A5D6A7',
    borderStyle: 'dashed',
  },
  mapIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  mapText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  mapSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  placeholderCard: {
    backgroundColor: '#FFF9C4',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#F57F17',
    textAlign: 'center',
  },
  materialsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  materialChip: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  materialText: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '600',
  },
});