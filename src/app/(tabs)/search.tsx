import { useAuth } from "@/contexts/AuthContext";
import { getAllItems } from "@/services/firestoreService";
import { recordRecycle } from "@/services/recycleService";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    const { items: itemsData, error } = await getAllItems();
    if (!error) {
      setItems(itemsData);
    }
    setLoading(false);
  };

  const handleRecycle = (item: any) => {
    if (!user) {
      Alert.alert("Error", "Please login first");
      return;
    }

    Alert.alert(
      "Confirm Recycling",
      `Did you recycle "${item.name}"?\n\nYou'll earn ${item.points} points!`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, I did!",
          onPress: async () => {
            const { error } = await recordRecycle(user.uid, item);
            if (error) {
              Alert.alert("Error", error);
            } else {
              Alert.alert(
                "🎉 Success!",
                `You earned ${item.points} eco-points!`,
                [{ text: "Awesome!" }],
              );
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🔍 Search Items</Text>
          <Text style={styles.headerSubtitle}>
            {items.length} items in database
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#2E7D32"
            style={{ marginTop: 40 }}
          />
        ) : (
          items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemCard}
              onPress={() => item.recyclable && handleRecycle(item)}
              activeOpacity={item.recyclable ? 0.7 : 1}
              disabled={!item.recyclable}
            >
              <Text style={styles.itemIcon}>{item.icon}</Text>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemTips}>{item.tips}</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.recyclable}>
                  {item.recyclable ? "✅" : "❌"}
                </Text>
                {item.recyclable && (
                  <Text style={styles.points}>+{item.points}</Text>
                )}
              </View>
            </TouchableOpacity>
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
  itemIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemCategory: {
    fontSize: 12,
    color: "#2E7D32",
    marginTop: 2,
    textTransform: "capitalize",
  },
  itemTips: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  itemRight: {
    alignItems: "center",
  },
  recyclable: {
    fontSize: 24,
  },
  notRecyclable: {
    fontSize: 24,
  },
  points: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 4,
  },
  itemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
});
