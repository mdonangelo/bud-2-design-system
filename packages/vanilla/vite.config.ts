import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@root-styles": resolve(__dirname, "../../src/styles"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "BUDS",
      formats: ["es", "iife"],
      fileName: (format) => (format === "es" ? "buds.js" : "buds.iife.js"),
    },
    cssCodeSplit: false,
    minify: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((n) => n.endsWith(".css"))) {
            return "buds.css";
          }
          return "[name][extname]";
        },
      },
    },
  },
});
