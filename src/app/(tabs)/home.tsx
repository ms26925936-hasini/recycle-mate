import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '@/services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';

export default function HomeScreen() {
  // Test Firebase connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'test'));
        console.log('✅ Firebase connected!');
        console.log('Documents:', querySnapshot.size);
      } catch (error) {
        console.error('❌ Firebase error:', error);
      }
    };
    testConnection();
  }, [])

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>♻️ Welcome to RecycleMate</Text>
          <Text style={styles.welcomeSubtitle}>
            Track your recycling, find centers, earn points!
          </Text>
        </View>

        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>Your Eco Points</Text>
          <Text style={styles.pointsValue}>0</Text>
          <Text style={styles.pointsSubtext}>Start recycling to earn points</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Nearby Centers</Text>
          <Text style={styles.placeholder}>Location feature coming soon...</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🕐 Recent Activity</Text>
          <Text style={styles.placeholder}>No activity yet</Text>
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
  welcomeCard: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#C8E6C9',
    marginTop: 6,
  },
  pointsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginVertical: 8,
  },
  pointsSubtext: {
    fontSize: 12,
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
  placeholder: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});