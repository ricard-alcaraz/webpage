// astro.config.mjs

// @ts-check
import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap"
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite"; 
// https://astro.build/config
// astro.config.mjs
const remarkMermaid = () => {
  return (tree) => {
    function walk(node) {
      if (node.type === 'code' && node.lang === 'mermaid') {
        const rawCode = node.value;

        node.type = 'html';
        node.value = `
<div class="mermaid-wrapper">
  <script type="text/plain" data-mermaid-code>${rawCode}</script>
  <div class="mermaid-output"></div>
</div>`.trim();

        delete node.children;
      }

      if (node.children) {
        node.children.forEach(walk);
      }
    }

    walk(tree);
  };
};

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
    remarkPlugins: [remarkMermaid],
  },
});