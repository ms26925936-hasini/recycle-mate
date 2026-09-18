import AsyncStorage from '@react-native-async-storage/async-storage';

// Cache keys
const CACHE_KEYS = {
  CENTERS: '@recyclemate_centers',
  ITEMS: '@recyclemate_items',
  USER_PROFILE: '@recyclemate_user_profile',
  LAST_SYNC: '@recyclemate_last_sync',
};

// Cache expiry: 24 hours in milliseconds
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

// ==========================================
// GENERIC CACHE FUNCTIONS
// ==========================================

export const saveToCache = async (key: string, data: any) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(cacheData));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getFromCache = async (key: string) => {
  try {
    const cached = await AsyncStorage.getItem(key);
    if (!cached) {
      return { data: null, error: 'No cache found' };
    }

    const { data, timestamp } = JSON.parse(cached);

    // Check if cache is expired
    if (Date.now() - timestamp > CACHE_EXPIRY) {
      await AsyncStorage.removeItem(key);
      return { data: null, error: 'Cache expired' };
    }

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const clearCache = async (key?: string) => {
  try {
    if (key) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.clear();
    }
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// ==========================================
// SPECIFIC CACHE FUNCTIONS
// ==========================================

// Centers
export const cacheCenters = async (centers: any[]) => {
  return saveToCache(CACHE_KEYS.CENTERS, centers);
};

export const getCachedCenters = async () => {
  return getFromCache(CACHE_KEYS.CENTERS);
};

// Items
export const cacheItems = async (items: any[]) => {
  return saveToCache(CACHE_KEYS.ITEMS, items);
};

export const getCachedItems = async () => {
  return getFromCache(CACHE_KEYS.ITEMS);
};

// User Profile
export const cacheUserProfile = async (profile: any) => {
  return saveToCache(CACHE_KEYS.USER_PROFILE, profile);
};

export const getCachedUserProfile = async () => {
  return getFromCache(CACHE_KEYS.USER_PROFILE);
};

// Last Sync Time
export const setLastSyncTime = async () => {
  try {
    await AsyncStorage.setItem(CACHE_KEYS.LAST_SYNC, Date.now().toString());
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getLastSyncTime = async () => {
  try {
    const timestamp = await AsyncStorage.getItem(CACHE_KEYS.LAST_SYNC);
    return {
      timestamp: timestamp ? parseInt(timestamp) : null,
      error: null,
    };
  } catch (error: any) {
    return { timestamp: null, error: error.message };
  }
};

export { CACHE_KEYS };