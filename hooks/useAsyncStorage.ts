import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export const useLocalStorage = () => {
  const [value, setValue] = useState<String | null>(null);

  const saveItem = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      setValue(value);
    } catch (e) {
      console.log("Failed to save key value pair");
    }
  };

  const getItem = async (key: string) => {
    try {
      await AsyncStorage.getItem(key);
      setValue(value);
      return value;
    } catch (e) {
      console.log("Failed to retrieve key value pair");
    }
  };

  const removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      setValue(null);
    } catch (e) {
      console.log("Failed to remove key value pair");
    }
  };

  return {value, saveItem, getItem, removeItem}
};
