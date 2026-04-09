import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Ensures React Router handles all routes in dev
    historyApiFallback: true,
  },
});
