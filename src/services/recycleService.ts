import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    where
} from "firebase/firestore";
import { db } from "./firebase";
import { updateUserPoints } from "./firestoreService";
let pendingRecycles: any[] = [];
let batchTimeout: ReturnType<typeof setTimeout> | null = null;

interface RecycleActivity {
  userId: string;
  itemId: string;
  itemName: string;
  points: number;
  category: string;
  recycledAt: string;
}

// Record a recycling activity
export const recordRecycle = async (
  userId: string,
  item: {
    id: string;
    name: string;
    points: number;
    category: string;
  },
) => {
  try {
    // 1. Save recycling activity
    const activity: RecycleActivity = {
      userId,
      itemId: item.id,
      itemName: item.name,
      points: item.points,
      category: item.category,
      recycledAt: new Date().toISOString(),
    };

    await addDoc(collection(db, "activities"), activity);

    // 2. Update user points
    const { error: pointsError } = await updateUserPoints(userId, item.points);
    if (pointsError) {
      return { error: pointsError };
    }

    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Get user's recycling activities
export const getUserActivities = async (userId: string) => {
  try {
    const activitiesRef = collection(db, "activities");
    const q = query(
      activitiesRef,
      where("userId", "==", userId),
      orderBy("recycledAt", "desc"),
    );
    const snapshot = await getDocs(q);
    const activities = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { activities, error: null };
  } catch (error: any) {
    return { activities: [], error: error.message };
  }
};

export const queueRecycle = (
  userId: string,
  item: any,
  callback?: (error: string | null) => void
) => {
  pendingRecycles.push({ userId, item });

  if (batchTimeout) {
    clearTimeout(batchTimeout);
  }

  batchTimeout = setTimeout(async () => {
    const batch = [...pendingRecycles];
    pendingRecycles = [];

    for (const { userId, item } of batch) {
      const { error } = await recordRecycle(userId, item);
      if (callback) callback(error);
    }
  }, 2000); // Wait 2 seconds to batch
};
