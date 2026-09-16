import { useState, useEffect } from "react";
import ProgressRing from "@/components/ProgressRing";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile } from "@/services/firestoreService";

export default function HomeScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { user: userProfile, error } = await getUserProfile(user.uid);

      if (error) {
        setProfile({ points: 0, itemsRecycled: 0 });
      } else {
        setProfile(userProfile);
      }
    } catch (err) {
      console.log("Unexpected error:", err);
      setProfile({ points: 0, itemsRecycled: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>♻️ Welcome back!</Text>
          <Text style={styles.welcomeSubtitle}>{user?.email || "User"}</Text>
        </View>

        {/* Points Card */}
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

        {/* Nearby Centers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Nearby Centers</Text>
          <Text style={styles.placeholder}>Map feature coming soon...</Text>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🕐 Recent Activity</Text>
          <Text style={styles.placeholder}>No activity yet</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
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
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2E7D32",
    marginVertical: 8,
  },
  pointsSubtext: {
    fontSize: 12,
    color: "#999",
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
