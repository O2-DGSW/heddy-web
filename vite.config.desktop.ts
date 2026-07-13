import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";
import { createLocalHttpsConfig } from "./vite.https";

export default defineConfig(({ command }) => ({
  root: resolve(__dirname, "src/renderer/desktop"),
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
        replacement: resolve(__dirname, "src/renderer/desktop/src"),
      },
    ],
  },
  server: {
    port: 5173,
    ...(command === "serve" && {
      https: createLocalHttpsConfig(__dirname),
    }),
  },
  preview: {
    port: 4173,
    ...(command === "serve" && {
      https: createLocalHttpsConfig(__dirname),
    }),
  },
  build: {
    outDir: resolve(__dirname, "dist/desktop"),
    emptyOutDir: true,
  },
}));
