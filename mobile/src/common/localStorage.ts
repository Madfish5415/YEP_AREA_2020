import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLocalStorage = async (
  key: string,
  value: string
): Promise<void> => {
  await AsyncStorage.setItem(key, value);
};

export const getLocalStorage = async (key: string): Promise<string | null> => {
  return await AsyncStorage.getItem(key);
};
