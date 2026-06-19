import { refreshTokenApi } from "@/entities/auth/api/authApi";
import { clearAuthTokens, setAuthTokens } from "@/entities/auth/model/token";

let refreshTokenRequest: ReturnType<typeof refreshTokenApi> | null = null;
let restoreSessionRequest: Promise<boolean> | null = null;

export const refreshAuthTokens = async () => {
  try {
    refreshTokenRequest ??= refreshTokenApi();
    const tokens = await refreshTokenRequest;
    await setAuthTokens(tokens);
    return tokens;
  } catch (error) {
    await clearAuthTokens();
    throw error;
  } finally {
    refreshTokenRequest = null;
  }
};

const restoreAuthSessionInternal = async () => {
  try {
    await refreshAuthTokens();
    return true;
  } catch {
    return false;
  }
};

export const restoreAuthSession = () => {
  restoreSessionRequest ??= restoreAuthSessionInternal().finally(() => {
    restoreSessionRequest = null;
  });

  return restoreSessionRequest;
};
