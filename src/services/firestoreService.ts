import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';

// Get all centers
export const getAllCenters = async () => {
  try {
    const centersRef = collection(db, 'centers');
    const snapshot = await getDocs(centersRef);
    const centers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { centers, error: null };
  } catch (error: any) {
    return { centers: [], error: error.message };
  }
};

// Get single center by ID
export const getCenterById = async (centerId: string) => {
  try {
    const centerRef = doc(db, 'centers', centerId);
    const snapshot = await getDoc(centerRef);
    if (snapshot.exists()) {
      return { center: { id: snapshot.id, ...snapshot.data() }, error: null };
    }
    return { center: null, error: 'Center not found' };
  } catch (error: any) {
    return { center: null, error: error.message };
  }
};

// Get all items
export const getAllItems = async () => {
  try {
    const itemsRef = collection(db, 'items');
    const snapshot = await getDocs(itemsRef);
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { items, error: null };
  } catch (error: any) {
    return { items: [], error: error.message };
  }
};

// Get items by category
export const getItemsByCategory = async (category: string) => {
  try {
    const itemsRef = collection(db, 'items');
    const q = query(itemsRef, where('category', '==', category));
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { items, error: null };
  } catch (error: any) {
    return { items: [], error: error.message };
  }
};

// Create user profile
export const createUserProfile = async (uid: string, email: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      email,
      points: 0,
      itemsRecycled: 0,
      createdAt: new Date().toISOString(),
    }).catch(async () => {
      // If doc doesn't exist, create it
      await addDoc(collection(db, 'users'), {
        uid,
        email,
        points: 0,
        itemsRecycled: 0,
        createdAt: new Date().toISOString(),
      });
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Get user profile
export const getUserProfile = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      return { user: { id: snapshot.id, ...snapshot.data() }, error: null };
    }
    return { user: null, error: 'User not found' };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

// Update user points
export const updateUserPoints = async (
  uid: string,
  pointsToAdd: number
) => {
  try {    
    const userRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      const currentData = snapshot.data();
      await updateDoc(userRef, {
        points: (currentData.points || 0) + pointsToAdd,
        itemsRecycled: (currentData.itemsRecycled || 0) + 1,
      });
    }
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};