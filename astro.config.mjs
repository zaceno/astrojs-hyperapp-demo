import { defineConfig } from "astro/config";
import hyperapp from "@zxlabs/astrojs-hyperapp";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [hyperapp()],
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  })
});