import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CenterCardProps {
  name: string;
  address: string;
  phone?: string;
  openHours?: string;
  rating?: number;
  materials?: string[];
  distance?: string;
  onPress?: () => void;
}

export default function CenterCard({
  name,
  address,
  phone,
  openHours,
  rating,
  materials = [],
  distance,
  onPress,
}: CenterCardProps) {
  const content = (
    <View style={styles.card}>
      {/* Header: Name + Distance + Rating */}
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.headerRight}>
          {distance && (
            <View style={styles.distanceBadge}>
              <Text style={styles.distanceText}>📍 {distance}</Text>
            </View>
          )}
          {rating !== undefined && (
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐ {rating.toFixed(1)}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Address */}
      <View style={styles.infoRow}>
        <Text style={styles.infoIcon}>📍</Text>
        <Text style={styles.infoText} numberOfLines={2}>
          {address}
        </Text>
      </View>

      {/* Open Hours */}
      {openHours && (
        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>🕐</Text>
          <Text style={styles.infoText}>{openHours}</Text>
        </View>
      )}

      {/* Phone */}
      {phone && (
        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>📞</Text>
          <Text style={styles.infoText}>{phone}</Text>
        </View>
      )}

      {/* Materials */}
      {materials.length > 0 && (
        <View style={styles.materialsContainer}>
          {materials.map((material, index) => (
            <View key={index} style={styles.materialChip}>
              <Text style={styles.materialText}>{material}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  ratingBadge: {
    backgroundColor: "#FFF9C4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#F57F17",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  infoIcon: {
    fontSize: 14,
    marginRight: 8,
    marginTop: 1,
  },
  infoText: {
    fontSize: 13,
    color: "#666",
    flex: 1,
    lineHeight: 18,
  },
  materialsContainer: {
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
    textTransform: "capitalize",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  distanceBadge: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1976D2",
  },
});
