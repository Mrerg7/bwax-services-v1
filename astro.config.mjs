import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Pure static output for Cloudflare Workers Static Assets (no adapter required)
export default defineConfig({
  site: 'https://bwax.services',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      priority: 0.8,
    }),
  ],
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
