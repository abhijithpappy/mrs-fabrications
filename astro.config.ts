import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { business } from './src/config/business';

/**
 * The canonical site URL is used for canonical links, Open Graph URLs and the sitemap.
 * Priority: `business.website` → Netlify's `URL` build variable (set automatically on Netlify).
 */
const site = business.website || process.env.URL || undefined;

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    // The CSS is small (~8 KB); inlining it removes render-blocking requests.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thank-you'),
    }),
  ],
  image: {
    // Images are styled explicitly in components; no global responsive styles needed.
    responsiveStyles: false,
  },
  // Prefetch internal pages on hover / tap so navigation feels instant.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
