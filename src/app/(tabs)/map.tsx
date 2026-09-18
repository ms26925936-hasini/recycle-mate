import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getAllCenters } from "@/services/firestoreService";
import {
  requestLocationPermission,
  getCurrentLocation,
  sortCentersByDistance,
  formatDistance,
} from "@/services/locationService";
import CenterCard from "@/components/CenterCard";
import { isOnline } from "@/services/networkService";
import { cacheCenters, getCachedCenters } from "@/services/cacheService";

export default function MapScreen() {
  const [isOffline, setIsOffline] = useState(false);
  const [centers, setCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadCenters();
    }, [])
  );

  const loadCenters = async () => {
    setLoading(true);
    try {
      const online = await isOnline();
      setIsOffline(!online);

      if (online) {
        // Online: Fetch from Firestore
        const { centers: centersData, error } = await getAllCenters();
        if (!error) {
          setCenters(centersData);
          // Cache data
          await cacheCenters(centersData);
        } else {
          // Fallback to cache
          const { data: cachedCenters } = await getCachedCenters();
          if (cachedCenters) {
            setCenters(cachedCenters);
          }
        }
      } else {
        // Offline: Load from cache
        const { data: cachedCenters } = await getCachedCenters();
        if (cachedCenters) {
          setCenters(cachedCenters);
        } else {
          setCenters([]);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNearMe = async () => {
    setLocationLoading(true);

    // Step 1: Request permission
    const { granted, error: permError } = await requestLocationPermission();
    if (!granted) {
      Alert.alert(
        "Permission Required",
        "Please enable location access to find nearby centers.",
        [{ text: "OK" }],
      );
      setLocationLoading(false);
      return;
    }

    // Step 2: Get location
    const { location, error: locError } = await getCurrentLocation();
    if (locError || !location) {
      Alert.alert("Error", "Could not get your location. Try again.");
      setLocationLoading(false);
      return;
    }

    // Step 3: Sort centers by distance
    setUserLocation(location);
    const sortedCenters = sortCentersByDistance(
      centers,
      location.latitude,
      location.longitude,
    );
    setCenters(sortedCenters);

    setLocationLoading(false);
    Alert.alert(
      "📍 Location Found",
      `Centers sorted by distance from your location.`,
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>

      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            📡 Offline - Showing cached centers
          </Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🗺️ Recycling Centers</Text>
          <Text style={styles.headerSubtitle}>
            {centers.length} centers available
          </Text>
        </View>

        {/* Near Me Button */}
        <TouchableOpacity
          style={[
            styles.nearMeButton,
            locationLoading && styles.nearMeButtonDisabled,
          ]}
          onPress={handleNearMe}
          disabled={locationLoading}
        >
          <Ionicons name="location" size={20} color="#FFFFFF" />
          <Text style={styles.nearMeText}>
            {locationLoading
              ? "Finding your location..."
              : userLocation
                ? "📍 Location Active"
                : "Find Centers Near Me"}
          </Text>
        </TouchableOpacity>

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
              distance={
                center.distance !== undefined
                  ? formatDistance(center.distance)
                  : undefined
              }
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
  nearMeButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    elevation: 2,
  },
  nearMeButtonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  nearMeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  offlineBanner: {
    backgroundColor: '#FF9800',
    padding: 10,
    alignItems: 'center',
  },
  offlineText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
