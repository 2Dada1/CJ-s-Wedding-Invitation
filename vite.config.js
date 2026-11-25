import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages, set this to your repository name:
// base: "/your-repository-name/"
// For a custom domain or username.github.io repository, use "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === "true" ? "/ivy-rose-cris-jan-wedding/" : "/",
});