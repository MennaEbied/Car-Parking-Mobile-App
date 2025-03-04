import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "firebase/auth";

const AUTH_USER_KEY = "AUTH_USER";

export const storeUser = async (user: User | null) => {
  try {
    const jsonValue = user ? JSON.stringify(user) : null;
    if (jsonValue) {
      await AsyncStorage.setItem(AUTH_USER_KEY, jsonValue);
    } else {
      await AsyncStorage.removeItem(AUTH_USER_KEY);
    }
  } catch (e) {
    console.error("Error storing use :", e);
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(AUTH_USER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error retriving user:", e);
    return null;
  }
};
