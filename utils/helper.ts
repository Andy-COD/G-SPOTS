import * as SecureStore from "expo-secure-store";

export const getAsyncValue = async (key: string) => {
  const result = await SecureStore.getItemAsync(key);
  return result;
};

export const saveAsyncValue = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const removeAsyncValue = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};
