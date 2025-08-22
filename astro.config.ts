import { defineConfig } from "astro/config"
import hyperapp from "astrojs-hyperapp"

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
    },
  },
  integrations: [hyperapp({ include: "**/client-components/**" })],
})
