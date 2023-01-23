import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
    VueI18nPlugin({
      compositionOnly: true,
      runtimeOnly: false,
      defaultSFCLang: "json",
      include: fileURLToPath(new URL("./src/locales/**", import.meta.url)),
    })
  ],
  envPrefix: ["VITE_", "VUE_", "APP_"],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "#": fileURLToPath(new URL("./types", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
});
