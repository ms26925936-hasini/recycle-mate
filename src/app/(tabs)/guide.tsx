import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GuideScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📖 Recycling Guide</Text>
          <Text style={styles.headerSubtitle}>
            Learn how to recycle properly
          </Text>
        </View>

        <View style={styles.guideCard}>
          <View style={styles.guideHeader}>
            <Text style={styles.guideIcon}>♻️</Text>
            <Text style={styles.guideTitle}>Plastic</Text>
          </View>
          <Text style={styles.guideItem}>✅ Do: Rinse before recycling</Text>
          <Text style={styles.guideItem}>✅ Do: Remove caps and labels</Text>
          <Text style={styles.guideItem}>❌ Don't: Recycle dirty containers</Text>
        </View>

        <View style={styles.guideCard}>
          <View style={styles.guideHeader}>
            <Text style={styles.guideIcon}>🍶</Text>
            <Text style={styles.guideTitle}>Glass</Text>
          </View>
          <Text style={styles.guideItem}>✅ Do: Separate by color</Text>
          <Text style={styles.guideItem}>✅ Do: Remove metal lids</Text>
          <Text style={styles.guideItem}>❌ Don't: Mix broken glass</Text>
        </View>

        <View style={styles.guideCard}>
          <View style={styles.guideHeader}>
            <Text style={styles.guideIcon}>📄</Text>
            <Text style={styles.guideTitle}>Paper</Text>
          </View>
          <Text style={styles.guideItem}>✅ Do: Keep dry and clean</Text>
          <Text style={styles.guideItem}>✅ Do: Flatten cardboard</Text>
          <Text style={styles.guideItem}>❌ Don't: Recycle greasy paper</Text>
        </View>

        <View style={styles.guideCard}>
          <View style={styles.guideHeader}>
            <Text style={styles.guideIcon}>🥫</Text>
            <Text style={styles.guideTitle}>Metal</Text>
          </View>
          <Text style={styles.guideItem}>✅ Do: Rinse cans thoroughly</Text>
          <Text style={styles.guideItem}>✅ Do: Crush to save space</Text>
          <Text style={styles.guideItem}>❌ Don't: Mix with other waste</Text>
        </View>

        <View style={styles.guideCard}>
          <View style={styles.guideHeader}>
            <Text style={styles.guideIcon}>💻</Text>
            <Text style={styles.guideTitle}>E-Waste</Text>
          </View>
          <Text style={styles.guideItem}>✅ Do: Take to special centers</Text>
          <Text style={styles.guideItem}>✅ Do: Remove personal data</Text>
          <Text style={styles.guideItem}>❌ Don't: Throw in regular bins</Text>
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
  guideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  guideIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  guideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  guideItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    lineHeight: 20,
  },
});