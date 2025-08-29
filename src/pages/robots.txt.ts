// src/pages/robots.txt.js
import type { APIRoute } from 'astro';

const generateRobotsTxt = (sitemapURL: URL) => {
  return `
User-agent: *
Allow: /

User-agent: GPTBot
Disallow:

User-agent: Googlebot
Disallow:

User-agent: Bytespider
Disallow:

User-agent: Meta-ExternalAgent
Disallow:

Sitemap: ${sitemapURL.href}
`.trim();
};

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response('Sitemap requires a `site` configured in astro.config.mjs', { status: 500 });
  }
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(generateRobotsTxt(sitemapURL), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};