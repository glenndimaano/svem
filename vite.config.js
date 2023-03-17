import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const proxyOptions = (port) => {
  return {
    target: `http://127.0.0.1:${port}`,
    changeOrigin: false,
    secure: true,
    ws: false,
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "process.env.SHOPIFY_API_KEY": JSON.stringify(env.SHOPIFY_API_KEY),
    },
    plugins: [react()],
    resolve: {
      preserveSymlinks: true,
    },
    server: {
      proxy: {
        // "^/(\\?.*)?$": proxyOptions(env.PORT),
        "^/api(/|(\\?.*)?$)": proxyOptions(env.PORT)
      },

    }
  }
});
