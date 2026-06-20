import { refreshTokenApi } from "@/entities/auth/api/authApi";
import { clearAuthTokens, getRefreshToken, setAuthTokens } from "@/entities/auth/model/token";

let refreshTokenRequest: Promise<Awaited<ReturnType<typeof refreshTokenApi>>> | null = null;
let restoreSessionRequest: Promise<boolean> | null = null;

export const refreshAuthTokens = async () => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    refreshTokenRequest ??= refreshTokenApi(refreshToken);
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
    const tokens = await refreshAuthTokens();
    return Boolean(tokens);
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
