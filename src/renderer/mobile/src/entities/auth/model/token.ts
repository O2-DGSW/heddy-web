import { SecureStoragePlugin } from "capacitor-secure-storage-plugin";

const ACCESS_TOKEN_KEY = "accessToken";

export const setAccessToken = async (token: string) => {
  await SecureStoragePlugin.set({ key: ACCESS_TOKEN_KEY, value: token });
};

export const getAccessToken = async () => {
  try {
    const { value } = await SecureStoragePlugin.get({ key: ACCESS_TOKEN_KEY });
    return value;
  } catch {
    return null;
  }
};

export const clearAccessToken = async () => {
  await SecureStoragePlugin.remove({ key: ACCESS_TOKEN_KEY });
};
