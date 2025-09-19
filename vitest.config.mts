import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    server: {
      deps: {
        inline: [/@fortawesome/],
      },
    },
  },
});
