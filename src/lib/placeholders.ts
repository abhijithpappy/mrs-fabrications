import type { ImageMetadata } from 'astro';
import { siteSettings } from '../config/site';

/**
 * Every image inside `src/assets/images/placeholders/` is a temporary stock photo
 * (see CREDITS.md in that folder). This lets components label them automatically,
 * so stock photography is never presented as the company's own work.
 */
const placeholderModules = import.meta.glob<ImageMetadata>(
  '/src/assets/images/placeholders/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default' },
);

const placeholderSrcs = new Set(Object.values(placeholderModules).map((img) => img.src));

export function isPlaceholder(image: ImageMetadata): boolean {
  return placeholderSrcs.has(image.src) || image.src.includes('/placeholders/');
}

export function shouldLabel(image: ImageMetadata): boolean {
  return siteSettings.labelPlaceholderImages && isPlaceholder(image);
}
