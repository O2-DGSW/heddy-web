import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  root: resolve(__dirname, "src/renderer/mobile"),
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
  },
  build: {
    outDir: resolve(__dirname, "dist/mobile"),
    emptyOutDir: true,
  },
});
