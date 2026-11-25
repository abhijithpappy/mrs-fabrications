/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  BUSINESS DETAILS — the single source of truth for the whole website.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Every phone link, WhatsApp button, address, map, opening-hours table,
 *  social link and the structured data for Google is generated from this file.
 *
 *  ✔ Fill in the empty values below.
 *  ✔ Leave a value empty ('' / null / []) if you don't have it yet — anything
 *    that depends on it is hidden automatically (no broken buttons).
 *  ✘ Don't add details that aren't true (years, awards, certifications…).
 *
 *  While running `npm run dev`, a small "Setup" panel in the bottom-left
 *  corner lists the details that are still missing. It never appears on the
 *  live site.
 */

export type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface OpeningHours {
  /** Days these hours apply to, e.g. ['Monday', 'Tuesday', …]. */
  days: Weekday[];
  /** 24-hour time, e.g. '09:00'. */
  opens: string;
  /** 24-hour time, e.g. '18:30'. */
  closes: string;
}

export interface BusinessConfig {
  name: string;
  /** Short line used beside the logo and in page titles. */
  tagline: string;
  /** One or two sentences used for SEO descriptions and the footer. */
  description: string;
  ownerName: string;
  /** e.g. 2012 — leave null if you'd rather not show it. */
  foundedYear: number | null;

  /** Display format is up to you, e.g. '+91 98470 00000'. Include the country code. */
  phone: string;
  /** WhatsApp number with country code. Spaces/symbols are ignored, e.g. '+91 98470 00000'. */
  whatsapp: string;
  email: string;

  address: {
    street: string;
    locality: string; // town / city
    district: string;
    region: string; // state
    postalCode: string;
    country: string;
    countryCode: string; // ISO 3166-1 alpha-2
  };
  /** Exact map position (optional but recommended for Google). */
  geo: { lat: number; lng: number } | null;
  /** Link to your Google Maps / Google Business Profile listing (the "Share" link). */
  googleMapsUrl: string;
  /** Link where customers can read or leave Google reviews (optional). */
  googleReviewsUrl: string;

  hours: OpeningHours[];
  /** Plain-language service area, e.g. 'Thrissur and surrounding districts'. */
  serviceArea: string;

  social: {
    instagram: string;
    facebook: string;
    youtube: string;
  };

  /** Only shown when filled in. Use real, verifiable numbers. */
  stats: {
    yearsExperience: number | null;
    projectsCompleted: number | null;
  };

  /**
   * Your live website address, e.g. 'https://www.example.in' (no trailing slash).
   * Leave empty on Netlify to use the Netlify site URL automatically.
   */
  website: string;
}

export const business: BusinessConfig = {
  name: 'MRS Fabrications',
  tagline: 'Aluminium & Glass Fabrication',
  description:
    'Aluminium windows, doors, glass partitions, sliding systems and shopfronts — measured, fabricated and installed in Kerala.',
  ownerName: '', // TODO: owner name

  foundedYear: null, // TODO (optional)

  phone: '', // TODO: e.g. '+91 98470 00000'
  whatsapp: '', // TODO: e.g. '+91 98470 00000'
  email: '', // TODO: e.g. 'hello@yourdomain.in'

  address: {
    street: '', // TODO
    locality: '', // TODO: city / town
    district: '', // TODO
    region: 'Kerala',
    postalCode: '', // TODO
    country: 'India',
    countryCode: 'IN',
  },
  geo: null, // TODO (optional): { lat: 10.5276, lng: 76.2144 }
  googleMapsUrl: '', // TODO (optional)
  googleReviewsUrl: '', // TODO (optional)

  hours: [
    // TODO: e.g.
    // { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '18:00' },
  ],
  serviceArea: '', // TODO (optional)

  social: {
    instagram: '', // TODO: full URL
    facebook: '', // TODO: full URL
    youtube: '',
  },

  stats: {
    yearsExperience: null,
    projectsCompleted: null,
  },

  website: '',
};
