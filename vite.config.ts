import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      server: { entry: "server" },
      prerender: {
        enabled: process.env["CITY_SMILES_STATIC"] === "1",
        crawlLinks: false,
        failOnError: true,
      },
    }),
    viteReact(),
    tailwindcss(),
    nitro(),
  ],
});
