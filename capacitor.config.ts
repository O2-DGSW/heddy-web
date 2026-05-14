import type { CapacitorConfig } from '@capacitor/cli';

const isLive = process.env.CAPACITOR_LIVE === 'true';

const config: CapacitorConfig = {
  appId: 'com.heddy.app',
  appName: 'heddy',
  webDir: 'dist/mobile',
  ...(isLive && {
    server: {
      url: 'http://localhost:5174',
      cleartext: true,
    },
  }),
};

export default config;
