import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'My personal Blog | Ricard Alcaraz Mancebo',
    description: 'Welcome to my blog, where I share about my journey in the world of technology and analytics.',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>es</language>`,
  });
}