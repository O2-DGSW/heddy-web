import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";
import { createLocalHttpsConfig } from "./vite.https";

const enableHttps = process.env.ENABLE_HTTPS === "true";

export default defineConfig(({ command }) => ({
  root: resolve(__dirname, "src/renderer/mobile"),
  envDir: __dirname,
  publicDir: resolve(__dirname, "public"),
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: [
      {
        find: "@design-tokens",
        replacement: resolve(__dirname, "pakages/design-tokens"),
      },
      {
        find: "@/shared",
        replacement: resolve(__dirname, "src/renderer/shared"),
      },
      {
        find: "@",
        replacement: resolve(__dirname, "src/renderer/mobile/src"),
      },
    ],
  },
  server: {
    port: 5174,
    host: true,
    ...(command === "serve" &&
      enableHttps && {
        https: createLocalHttpsConfig(__dirname),
      }),
  },
  preview: {
    port: 4174,
    host: true,
    ...(command === "serve" &&
      enableHttps && {
        https: createLocalHttpsConfig(__dirname),
      }),
  },
  build: {
    outDir: resolve(__dirname, "dist/mobile"),
    emptyOutDir: true,
  },
}));
