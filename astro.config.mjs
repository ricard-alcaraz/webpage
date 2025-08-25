// astro.config.mjs

// @ts-check
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap"
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite"; 

// https://astro.build/config
export default defineConfig({
  site: "https://ricard-alcaraz.com",
  integrations: [
    preact(), 
    icon(), 
    sitemap({
      filter: (page) =>
        !page.includes("/blog/tags") &&
        !page.includes("/blog/techs"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    },
  },
});