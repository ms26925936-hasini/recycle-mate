import CategoryDropdown from "@/components/CategoryDropdown";
import { CATEGORIES, Category } from "@/constants/categories";
import { useAuth } from "@/contexts/AuthContext";
import { cacheItems, getCachedItems } from "@/services/cacheService";
import { getAllItems } from "@/services/firestoreService";
import { isOnline } from "@/services/networkService";
import { recordRecycle } from "@/services/recycleService";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    CATEGORIES[0], // "all"
  );

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, []),
  );

  // Filter items when category changes
  useEffect(() => {
    if (selectedCategory.id === "all") {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter((item) => item.category === selectedCategory.id),
      );
    }
  }, [selectedCategory, items]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const online = await isOnline();
      setIsOffline(!online);

      if (online) {
        const { items: itemsData, error } = await getAllItems();
        if (!error) {
          setItems(itemsData);
          await cacheItems(itemsData);
        } else {
          const { data: cachedItems } = await getCachedItems();
          if (cachedItems) setItems(cachedItems);
        }
      } else {
        const { data: cachedItems } = await getCachedItems();
        if (cachedItems) {
          setItems(cachedItems);
        } else {
          setItems([]);
        }
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      plastic: "🍶",
      glass: "🍾",
      paper: "📰",
      metal: "🥫",
      ewaste: "📱",
      organic: "🍃",
    };
    return icons[category] || "♻️";
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            📡 Offline - Showing cached items
          </Text>
        </View>
      )}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2E7D32" />
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>🔍 Search Items</Text>
                <Text style={styles.headerSubtitle}>
                  {filteredItems.length} items
                  {selectedCategory.id !== "all" &&
                    ` in ${selectedCategory.label}`}
                </Text>
              </View>

              <CategoryDropdown
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>
                No items found in this category
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemCard}
              onPress={() => router.push(`/item/${item.id}`)}
              activeOpacity={item.recyclable ? 0.7 : 1}
              disabled={!item.recyclable}
            >
              <Text style={styles.itemIcon}>
                {item.icon || getCategoryIcon(item.category)}
              </Text>
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
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          removeClippedSubviews={true}
        />
      )}
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
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
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
  points: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
});
