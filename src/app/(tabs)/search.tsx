import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🔍 Search Items</Text>
          <Text style={styles.headerSubtitle}>
            Check if an item is recyclable
          </Text>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>
            Search coming soon...
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          
          <View style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>♻️</Text>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>Plastic</Text>
              <Text style={styles.categoryDesc}>
                Bottles, bags, containers
              </Text>
            </View>
          </View>

          <View style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>🍶</Text>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>Glass</Text>
              <Text style={styles.categoryDesc}>
                Bottles, jars, containers
              </Text>
            </View>
          </View>

          <View style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>📄</Text>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>Paper</Text>
              <Text style={styles.categoryDesc}>
                Newspapers, cardboard, books
              </Text>
            </View>
          </View>

          <View style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>🥫</Text>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>Metal</Text>
              <Text style={styles.categoryDesc}>
                Cans, tins, foil
              </Text>
            </View>
          </View>

          <View style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>💻</Text>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>E-Waste</Text>
              <Text style={styles.categoryDesc}>
                Phones, batteries, electronics
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coming Soon</Text>
          <Text style={styles.placeholder}>
            🚧 Dropdown search will be implemented in Week 2
          </Text>
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
  searchBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#999',
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
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  categoryDesc: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  placeholder: {
    fontSize: 14,
    color: '#F57F17',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 8,
  },
});