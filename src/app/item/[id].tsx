import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { recordRecycle } from '@/services/recycleService';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [recycling, setRecycling] = useState(false);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const itemRef = doc(db, 'items', id);
      const snapshot = await getDoc(itemRef);
      if (snapshot.exists()) {
        setItem({ id: snapshot.id, ...snapshot.data() });
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecycle = () => {
    if (!user) {
      Alert.alert('Error', 'Please login first');
      return;
    }

    if (!item?.recyclable) {
      Alert.alert(
        'Not Recyclable',
        'This item cannot be recycled.'
      );
      return;
    }

    Alert.alert(
      'Confirm Recycling',
      `Did you recycle "${item.name}"?\n\nYou'll earn ${item.points} points!`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, I did!',
          onPress: async () => {
            setRecycling(true);
            const { error } = await recordRecycle(user.uid, item);
            setRecycling(false);

            if (error) {
              Alert.alert('Error', error);
            } else {
              Alert.alert(
                '🎉 Success!',
                `You earned ${item.points} eco-points!`,
                [
                  {
                    text: 'Great!',
                    onPress: () => router.back(),
                  },
                ]
              );
            }
          },
        },
      ]
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      plastic: '#1976D2',
      glass: '#00897B',
      paper: '#F57C00',
      metal: '#616161',
      ewaste: '#7B1FA2',
    };
    return colors[category] || '#2E7D32';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <Stack.Screen options={{ title: 'Loading...' }} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2E7D32" />
        </View>
      </SafeAreaView>
    );
  }

  if (!item) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <Stack.Screen options={{ title: 'Not Found' }} />
        <View style={styles.center}>
          <Text style={styles.emptyIcon}>❓</Text>
          <Text style={styles.emptyText}>Item not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen
        options={{
          title: item.name,
          headerStyle: { backgroundColor: '#2E7D32' },
          headerTintColor: '#FFFFFF',
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Icon + Name */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{item.icon || '♻️'}</Text>
          </View>
          <Text style={styles.name}>{item.name}</Text>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: getCategoryColor(item.category) + '20' },
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                { color: getCategoryColor(item.category) },
              ]}
            >
              {item.category}
            </Text>
          </View>
        </View>

        {/* Points & Recyclability */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
            <Text style={styles.statValue}>+{item.points}</Text>
            <Text style={styles.statLabel}>Eco Points</Text>
          </View>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: item.recyclable ? '#E8F5E9' : '#FFEBEE',
              },
            ]}
          >
            <Text style={styles.statValue}>
              {item.recyclable ? '✅' : '❌'}
            </Text>
            <Text style={styles.statLabel}>
              {item.recyclable ? 'Recyclable' : 'Not Recyclable'}
            </Text>
          </View>
        </View>

        {/* Tips */}
        {item.tips && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Tips</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.tipText}>• {item.tips}</Text>
            </View>
          </View>
        )}

        {/* Recycling Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>♻️ Recycling Steps</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.stepText}>1. Clean the item thoroughly</Text>
            <Text style={styles.stepText}>
              2. Remove caps, labels, or accessories
            </Text>
            <Text style={styles.stepText}>
              3. Separate by material if needed
            </Text>
            <Text style={styles.stepText}>
              4. Take to the nearest recycling center
            </Text>
            <Text style={styles.stepText}>
              5. Tap "Recycle This Item" to earn points
            </Text>
          </View>
        </View>

        {/* Recycle Button */}
        <TouchableOpacity
          style={[
            styles.recycleButton,
            (!item.recyclable || recycling) && styles.recycleButtonDisabled,
          ]}
          onPress={handleRecycle}
          disabled={!item.recyclable || recycling}
          activeOpacity={0.8}
        >
          <Ionicons
            name={item.recyclable ? 'checkmark-circle' : 'close-circle'}
            size={24}
            color="#FFFFFF"
          />
          <Text style={styles.recycleButtonText}>
            {recycling
              ? 'Processing...'
              : item.recyclable
              ? 'Recycle This Item'
              : 'Not Recyclable'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: { fontSize: 64, marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#999' },
  scrollContent: { padding: 16 },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: { fontSize: 64 },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 4,
  },
  stepText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 24,
    marginBottom: 6,
  },
  recycleButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    elevation: 2,
  },
  recycleButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  recycleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});