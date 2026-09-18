import NetInfo from '@react-native-community/netinfo';

// Check if online
export const isOnline = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected === true && state.isInternetReachable !== false;
  } catch (error) {
    return false;
  }
};

// Subscribe to network changes
export const subscribeToNetwork = (
  callback: (isConnected: boolean) => void
) => {
  return NetInfo.addEventListener((state) => {
    const connected =
      state.isConnected === true && state.isInternetReachable !== false;
    callback(connected);
  });
};