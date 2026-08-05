// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  assetsInclude: ["**/*.md"],
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (
            id.includes("three") ||
            id.includes("@react-three") ||
            id.includes("postprocessing") ||
            id.includes("three-stdlib")
          ) {
            return "vendor-three";
          }
          if (
            id.includes("react-markdown") ||
            id.includes("remark-gfm") ||
            id.includes("react-syntax-highlighter")
          ) {
            return "vendor-markdown";
          }
          if (
            id.includes("react-dom") ||
            id.includes("react-router-dom") ||
            id.includes("/react/") ||
            id.includes("/react-scroll/")
          ) {
            return "vendor-react";
          }
        },
      },
    },
  },
});
