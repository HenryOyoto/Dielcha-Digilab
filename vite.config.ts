import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig(({ command }) => ({
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart(),
    // The Netlify plugin is only needed to produce the Netlify build output.
    // In `npm run dev` it starts a Deno-based Edge Functions emulator that can
    // fail on some machines ("--allow-scripts" error), and this site uses no
    // edge functions, so it is skipped during local development.
    ...(command === "build" ? [netlify()] : []),
    viteReact(),
  ],
}));
