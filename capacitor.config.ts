/// <reference types="node" />
import type { CapacitorConfig } from "@capacitor/cli";

const isLive = process.env.CAPACITOR_LIVE === "true";
const liveServerUrl = process.env.CAPACITOR_SERVER_URL ?? "https://localhost:5174";

const config: CapacitorConfig = {
  appId: "com.heddy.app",
  appName: "heddy",
  webDir: "dist/mobile",
  ...(isLive && {
    server: {
      url: liveServerUrl,
      cleartext: liveServerUrl.startsWith("http://"),
    },
  }),
};

export default config;
