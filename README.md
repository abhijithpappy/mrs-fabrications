# MRS Fabrications — website

A fast, static marketing website for an aluminium & glass fabrication business,
built with [Astro](https://astro.build). It's designed to be hosted on **Netlify**.

- **Pages:** Home · About · Services (+ one page per service) · Projects (filterable gallery + one page per project) · Contact · Privacy · 404
- **Features:** enquiry form (Netlify Forms), WhatsApp and click-to-call buttons, floating WhatsApp button, project category filters, image lightbox, before/after slider, Google Maps embed, SEO metadata, Open Graph images, LocalBusiness structured data, sitemap and robots.txt
- **Performance:** no JavaScript framework, under 7 KB of scripts per page, responsive WebP images, self-hosted fonts, and inlined CSS. Lighthouse scores 96–100 on Performance and 100 on Accessibility, Best Practices and SEO.

---

## Quick start

Requires Node.js 22.

```bash
npm install
npm run dev        # http://localhost:4321 — live-reloading development server
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run check      # type-check
```

While `npm run dev` is running, a small **Setup** panel (bottom-left) lists
business details that are still missing. It never appears on the live site.

---

## 1. Add your business details

Everything about the business lives in **one file**: [`src/config/business.ts`](src/config/business.ts).

| Field | Used for |
| --- | --- |
| `phone` | Click-to-call buttons (header, contact page, footer) |
| `whatsapp` | Floating WhatsApp button, WhatsApp CTAs, "Send on WhatsApp" on the form |
| `email` | Contact page, footer, privacy page |
| `address`, `geo`, `googleMapsUrl` | Contact page, Google Map, "Get directions", structured data |
| `hours` | Business hours table + structured data |
| `social.instagram`, `social.facebook` | Social links (header menu, footer, contact page) |
| `ownerName`, `foundedYear`, `stats` | About page facts and the home page stats strip (only shown when set) |
| `website` | Canonical URL. Leave empty on Netlify to use the site's Netlify URL automatically |

Anything left empty is **hidden automatically**, so there are never broken buttons.
Only add details that are true and verifiable.

Navigation, the default meta description and form settings are in
[`src/config/site.ts`](src/config/site.ts).

---

## 2. Replace the placeholder photos

All current photos are **temporary stock images** in
`src/assets/images/placeholders/` (sources in its `CREDITS.md`). The site labels
each one "Representative image" so it's never mistaken for your own work.

- **Projects:** add real photos to `src/assets/images/projects/<project-name>/` and point the project's Markdown file at them (see below).
- **Hero, about, workshop, process and CTA photos:** add them to `src/assets/images/site/` and update the imports in [`src/data/media.ts`](src/data/media.ts).

Use large originals (2000–3000 px on the long edge, JPEG). The build produces
optimised, responsive WebP versions automatically. The "Representative image"
label disappears as soon as an image isn't in the `placeholders/` folder.

---

## 3. Projects

Each project is a Markdown file in `src/content/projects/`. The file name becomes
the URL (`office-partitions.md` → `/projects/office-partitions/`).

```markdown
---
title: Glass partitions for a dental clinic
category: glass-partitions        # must match a file name in src/content/services/
sector: Commercial                # Residential | Commercial | Hospitality | Institutional
location: Thrissur                # optional — only if the client is happy to be named
year: 2025                        # optional
summary: One or two sentences shown on cards and as the page intro.
cover: ../../assets/images/projects/dental-clinic/cover.jpg
coverAlt: Reception area with frosted glass partitions
gallery:
  - image: ../../assets/images/projects/dental-clinic/01.jpg
    alt: Treatment room with sliding glass door
    caption: Optional caption
beforeAfter:                      # optional
  before: ../../assets/images/projects/dental-clinic/before.jpg
  beforeAlt: The space before work began
  after: ../../assets/images/projects/dental-clinic/after.jpg
  afterAlt: The finished partitions
scope:
  - Site measurement
  - Frosted glass partitions
featured: true                    # show on the home page (up to 4)
order: 1                          # lower numbers appear first
---

Write the project story here in plain Markdown.
```

The 8 entries currently in the folder are **samples** (`sample: true`) that use
stock photos and describe types of work. Replace or delete them before launch.
The projects page shows a "Please note" banner while any sample entries remain.

## 4. Services

One Markdown file per service in `src/content/services/`. Set `published: false`
on any service you don't offer and it disappears from the menus, filters, form
and sitemap. Review the copy (descriptions, benefits, options) so it matches
exactly what you offer.

## 5. Testimonials

Add genuine customer quotes to [`src/data/testimonials.ts`](src/data/testimonials.ts).
The testimonials section appears on the home page once at least one entry exists.

---

## Deploying to Netlify

1. Push this repository to GitHub.
2. In Netlify: **Add new site → Import an existing project** and choose the repo.
   The build settings come from `netlify.toml` (`npm run build`, publish `dist`, Node 22).
3. **Enable form detection** so enquiries are captured:
   *Site configuration → Forms → Enable form detection*, then redeploy.
4. **Get enquiries by email:** *Site configuration → Forms → Form notifications →
   Add notification → Email notification* for the `enquiry` form.
5. (Optional) Add your custom domain under *Domain management*. Netlify's `URL`
   variable is used for canonical links and the sitemap automatically, or set
   `website` in `business.ts`.

Every push to the main branch redeploys the site.

### How the enquiry form works

- Submissions go to **Netlify Forms** (spam filtering via a honeypot field).
- With JavaScript: inline validation, accessible error messages, and a success message without leaving the page.
- Without JavaScript: a normal form post that lands on `/thank-you/`.
- When a WhatsApp number is set, a **"Send on WhatsApp instead"** button composes the enquiry as a WhatsApp message.
- Preselect a service by linking to `/contact/?service=<service-file-name>#enquiry` (all "Get a quote" buttons on service and project pages do this).

> Locally (`npm run preview`) the form can't actually submit, because Netlify Forms only
> exists on Netlify. You'll see the "couldn't be sent" fallback message instead.

---

## Project structure

```
src/
  config/business.ts      ← business details (single source of truth)
  config/site.ts          ← navigation, SEO defaults, form settings
  content/services/*.md   ← one file per service
  content/projects/*.md   ← one file per project
  data/media.ts           ← site-wide photos (hero, about, workshop…)
  data/copy.ts            ← process steps, "why choose us", values
  data/testimonials.ts    ← customer quotes
  assets/images/          ← photos (placeholders/, projects/, site/)
  components/             ← reusable UI (Header, Footer, Photo, Lightbox, ContactForm…)
  layouts/BaseLayout.astro
  pages/                  ← routes
  styles/global.css       ← design tokens & base styles
scripts/subset-font.py    ← rebuilds the trimmed Archivo font file
netlify.toml              ← Netlify build + caching/security headers
```

## Pre-launch checklist

- [ ] Phone, WhatsApp, email, address and hours filled in (`src/config/business.ts`)
- [ ] Instagram / Facebook links added
- [ ] Services list matches what you offer (`published: false` for any you don't)
- [ ] Sample projects replaced with real projects and real photos
- [ ] Hero / about / workshop photos replaced (`src/data/media.ts`)
- [ ] Copy on the About page and service pages reviewed for accuracy
- [ ] Netlify form detection enabled and email notifications set up
- [ ] Test the form, WhatsApp and call buttons on your phone
