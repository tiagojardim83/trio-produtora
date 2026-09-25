import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const githubPagesBase = "/trio-produtora/";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const base = process.env.GITHUB_PAGES === "true" ? githubPagesBase : "/";

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
