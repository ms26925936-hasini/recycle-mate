import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/services/authService";
import { useRouter } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.userName}>
            {user?.email?.split("@")[0] || "User"}
          </Text>
          <Text style={styles.userEmail}>
            {user?.email || "guest@recyclemate.com"}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Eco Points</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Items Recycled</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Badges</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>🌱</Text>
              <Text style={styles.badgeLabel}>Beginner</Text>
            </View>
            <View style={[styles.badge, styles.badgeLocked]}>
              <Text style={styles.badgeIcon}>🌿</Text>
              <Text style={styles.badgeLabel}>Eco Warrior</Text>
            </View>
            <View style={[styles.badge, styles.badgeLocked]}>
              <Text style={styles.badgeIcon}>🌳</Text>
              <Text style={styles.badgeLabel}>Green Hero</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Settings</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>🔔 Notifications</Text>
            <Text style={styles.settingValue}>On</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>🌐 Language</Text>
            <Text style={styles.settingValue}>English</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>📊 Units</Text>
            <Text style={styles.settingValue}>Metric</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>ℹ️ About</Text>
            <Text style={styles.settingValue}>v1.0.0</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.placeholder}>
            🚧 Login / Signup will be implemented in Week 2
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
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
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  badge: {
    alignItems: "center",
    padding: 8,
  },
  badgeLocked: {
    opacity: 0.3,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  badgeLabel: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  settingText: {
    fontSize: 15,
    color: "#333",
  },
  settingValue: {
    fontSize: 14,
    color: "#999",
  },
  placeholder: {
    fontSize: 14,
    color: "#F57F17",
    fontStyle: "italic",
    textAlign: "center",
    padding: 8,
  },
  logoutButton: {
    backgroundColor: "#FFEBEE",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  logoutText: {
    color: "#C62828",
    fontSize: 16,
    fontWeight: "bold",
  },
});
