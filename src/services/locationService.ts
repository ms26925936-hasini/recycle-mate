import * as Location from 'expo-location';

// Request location permission
export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return {
        granted: false,
        error: 'Permission to access location was denied',
      };
    }
    return { granted: true, error: null };
  } catch (error: any) {
    return { granted: false, error: error.message };
  }
};

// Get current user location
export const getCurrentLocation = async () => {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== 'granted') {
      return {
        location: null,
        error: 'Permission not granted',
      };
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      error: null,
    };
  } catch (error: any) {
    return { location: null, error: error.message };
  }
};

// Calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

// Convert degrees to radians
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Format distance for display
export const formatDistance = (km: number): string => {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
};

// Sort centers by distance from user
export const sortCentersByDistance = (
  centers: any[],
  userLat: number,
  userLon: number
) => {
  return centers
    .map((center) => ({
      ...center,
      distance: calculateDistance(
        userLat,
        userLon,
        center.latitude,
        center.longitude
      ),
    }))
    .sort((a, b) => a.distance - b.distance);
};