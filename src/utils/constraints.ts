// Cache TTL constants
export const CACHE_CONFIG = {
  // 24 hours for data that changes infrequently
  CENTERS_TTL: 24 * 60 * 60 * 1000,
  ITEMS_TTL: 24 * 60 * 60 * 1000,
  USER_PROFILE_TTL: 5 * 60 * 1000, // 5 minutes (changes frequently)
};

// Location accuracy (Balanced = best battery/accuracy trade-off)
export const LOCATION_CONFIG = {
  ACCURACY: 'balanced' as const,
  TIMEOUT: 10000, // 10 seconds
  MAX_AGE: 60000, // Accept cached location up to 1 min old
};

// List rendering optimization
export const LIST_CONFIG = {
  INITIAL_NUM: 5,
  BATCH_SIZE: 5,
  WINDOW_SIZE: 5,
};

// Network timeout
export const NETWORK_TIMEOUT = 10000; // 10 seconds