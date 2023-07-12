import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import vue from "@vitejs/plugin-vue";

const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./", //add base path
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
