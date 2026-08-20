// vite.config.ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
var vite_config_default = defineConfig({
  server: {
    port: 3e3
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      server: { entry: "server" }
    }),
    netlify(),
    viteReact(),
    tailwindcss()
  ]
});
export {
  vite_config_default as default
};
