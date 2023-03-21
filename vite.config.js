import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { terser } from 'rollup-plugin-terser';

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
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: [
              '@shopify/app-bridge',
              '@shopify/app-bridge-react',
              '@shopify/polaris',
              'react',
              'react-dom',
              'react-query',
              'react-router-dom'
            ]
          }
        },
        plugins: [
          terser(), // or closureCompiler()
        ],
      },
    }
  }
});
