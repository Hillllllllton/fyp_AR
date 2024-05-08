import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/fyp_AR/",
  plugins: [react(), basicSsl()],
  server: {
    host: true,
    port: 8000,
  },
});
