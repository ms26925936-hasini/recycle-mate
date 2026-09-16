import { getAllCenters } from "@/services/firestoreService";
import { useEffect, useState } from "react";
import CenterCard from "@/components/CenterCard";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MapScreen() {
  const [centers, setCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCenters();
  }, []);

  const loadCenters = async () => {
    setLoading(true);
    const { centers: centersData, error } = await getAllCenters();
    if (!error) {
      setCenters(centersData);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🗺️ Recycling Centers</Text>
          <Text style={styles.headerSubtitle}>
            {centers.length} centers available
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#2E7D32"
            style={{ marginTop: 40 }}
          />
        ) : (
          centers.map((center) => (
            <CenterCard
              key={center.id}
              name={center.name}
              address={center.address}
              phone={center.phone}
              openHours={center.openHours}
              rating={center.rating}
              materials={center.materials}
              onPress={() => {
                console.log("Center pressed:", center.name);
              }}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  scrollContent: { padding: 16 },
  header: { marginBottom: 16 },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  centerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  centerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  centerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  centerRating: {
    fontSize: 14,
    color: "#F57F17",
    fontWeight: "bold",
  },
  centerAddress: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  centerHours: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  centerPhone: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  materialsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  materialChip: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  materialText: {
    fontSize: 11,
    color: "#2E7D32",
    fontWeight: "600",
  },
});
