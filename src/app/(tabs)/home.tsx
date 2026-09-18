import ProgressRing from "@/components/ProgressRing";
import { useAuth } from "@/contexts/AuthContext";
import {
  cacheUserProfile,
  getCachedUserProfile,
} from "@/services/cacheService";
import { getUserProfile } from "@/services/firestoreService";
import { isOnline } from "@/services/networkService";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadUserProfile();
    }, [user]),
  );

  const loadUserProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Check network
      const online = await isOnline();
      setIsOffline(!online);

      if (online) {
        // Online: Fetch from Firestore
        const { user: userProfile, error } = await getUserProfile(user.uid);

        if (error) {
          // Fallback to cache
          const { data: cachedProfile } = await getCachedUserProfile();
          if (cachedProfile) {
            setProfile(cachedProfile);
          } else {
            setProfile({ points: 0, itemsRecycled: 0 });
          }
        } else {
          setProfile(userProfile);
          // Save to cache
          await cacheUserProfile(userProfile);
        }
      } else {
        // Offline: Load from cache
        const { data: cachedProfile } = await getCachedUserProfile();
        if (cachedProfile) {
          setProfile(cachedProfile);
        } else {
          setProfile({ points: 0, itemsRecycled: 0 });
        }
      }
    } catch (err) {
      console.log("Error:", err);
      // Fallback to cache on error
      const { data: cachedProfile } = await getCachedUserProfile();
      if (cachedProfile) {
        setProfile(cachedProfile);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            📡 Offline Mode - Showing cached data
          </Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>♻️ Welcome back!</Text>
          <Text style={styles.welcomeSubtitle}>{user?.email || "User"}</Text>
        </View>

        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>Your Eco Points</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#2E7D32" />
          ) : (
            <ProgressRing
              size={180}
              strokeWidth={14}
              progress={Math.min(((profile?.points || 0) / 1000) * 100, 100)}
              color="#2E7D32"
              backgroundColor="#E8F5E9"
              value={`${profile?.points || 0} pts`}
              label={`${profile?.itemsRecycled || 0} items`}
              onPress={() => console.log("Points tapped!")}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Nearby Centers</Text>
          <Text style={styles.placeholder}>
            {isOffline
              ? "Available in Locate tab (cached)"
              : "Go to Locate tab to find centers"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🕐 Recent Activity</Text>
          <Text style={styles.placeholder}>
            {isOffline ? "Activity requires internet" : "No activity yet"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  offlineBanner: {
    backgroundColor: "#FF9800",
    padding: 10,
    alignItems: "center",
  },
  offlineText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  scrollContent: { padding: 16 },
  welcomeCard: {
    backgroundColor: "#2E7D32",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#C8E6C9",
    marginTop: 6,
  },
  pointsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
    elevation: 2,
  },
  pointsLabel: {
    fontSize: 14,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  placeholder: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
});
