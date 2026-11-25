import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub repository: 2Dada1/CJ-s-Wedding-Invitation
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === "true" ? "/CJ-s-Wedding-Invitation/" : "/",
});
