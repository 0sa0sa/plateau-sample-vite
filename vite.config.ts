import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import cesium from "vite-plugin-cesium";

// https://vitejs.dev/config/
export default defineConfig({
  // issue: https://github.com/nshen/vite-plugin-cesium/issues/31
  plugins: [react(), cesium.default()],
});
