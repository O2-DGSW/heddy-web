import { SecureStoragePlugin } from "capacitor-secure-storage-plugin";

const ACCESS_TOKEN_KEY = "accessToken";

const isLocalStorageAvailable = () => typeof window !== "undefined" && window.localStorage != null;

export const setAccessToken = async (token: string) => {
  try {
    await SecureStoragePlugin.set({ key: ACCESS_TOKEN_KEY, value: token });
  } catch {
    if (isLocalStorageAvailable()) {
      window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
  }
};

export const getAccessToken = async () => {
  try {
    const { value } = await SecureStoragePlugin.get({ key: ACCESS_TOKEN_KEY });
    return value;
  } catch {
    return isLocalStorageAvailable() ? window.localStorage.getItem(ACCESS_TOKEN_KEY) : null;
  }
};

export const clearAccessToken = async () => {
  try {
    await SecureStoragePlugin.remove({ key: ACCESS_TOKEN_KEY });
  } catch {
    // Ignore storage plugin failures and still clear the web fallback below.
  }

  if (isLocalStorageAvailable()) {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};
