import * as SecureStore from "expo-secure-store";

// Save token securely
const storeToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync("token", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

// Retrieve token securely
const getToken = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync("token");
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

// Delete token securely
const deleteToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync("token");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};

export { storeToken, getToken, deleteToken };
