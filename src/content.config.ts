import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * SERVICES — one Markdown file per service in `src/content/services/`.
 * The file name is the URL slug, e.g. `aluminium-windows.md` → /services/aluminium-windows/.
 * Set `published: false` to hide a service you don't offer.
 */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Short label used in filters and menus, e.g. "Windows". */
      shortTitle: z.string(),
      order: z.number(),
      published: z.boolean().default(true),
      summary: z.string(),
      seoDescription: z.string().optional(),
      image: image(),
      imageAlt: z.string(),
      applications: z.array(z.string()).default([]),
      benefits: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      options: z.array(z.string()).default([]),
    }),
});

/**
 * PROJECTS — one Markdown file per project in `src/content/projects/`.
 * `category` must match a service file name. Add real photos under
 * `src/assets/images/projects/<project-name>/` and reference them relatively.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: reference('services'),
      sector: z.enum(['Residential', 'Commercial', 'Hospitality', 'Institutional']),
      /** Only fill in when true and the client is happy to be named/located. */
      location: z.string().optional(),
      year: z.number().int().optional(),
      summary: z.string(),
      cover: image(),
      coverAlt: z.string(),
      gallery: z
        .array(z.object({ image: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      beforeAfter: z
        .object({
          before: image(),
          beforeAlt: z.string(),
          after: image(),
          afterAlt: z.string(),
          caption: z.string().optional(),
        })
        .optional(),
      scope: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(100),
      /**
       * true = an illustrative entry using stock photography, not a real job.
       * Replace sample entries with real projects (or delete them) before launch.
       */
      sample: z.boolean().default(false),
      published: z.boolean().default(true),
    }),
});

export const collections = { services, projects };
