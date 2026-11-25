import { business, type OpeningHours, type Weekday } from '../config/business';

/** Keep only digits (and a leading +) from a phone number. */
function normalisePhone(value: string): string {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, '');
  return trimmed.startsWith('+') ? `+${digits}` : digits;
}

/** A phone number is usable if it has at least 10 digits. */
function isUsablePhone(value: string): boolean {
  return value.replace(/\D/g, '').length >= 10;
}

export const hasPhone = isUsablePhone(business.phone);
export const hasWhatsApp = isUsablePhone(business.whatsapp);
export const hasEmail = /\S+@\S+\.\S+/.test(business.email);

export const phoneHref = hasPhone ? `tel:${normalisePhone(business.phone)}` : '';
export const emailHref = hasEmail ? `mailto:${business.email}` : '';

/** Default opening line for WhatsApp messages. */
export const defaultWhatsAppMessage = `Hello ${business.name}, I'd like to enquire about aluminium / glass work.`;

/**
 * Build a WhatsApp click-to-chat link with a prefilled message.
 * Returns an empty string when no WhatsApp number is configured.
 */
export function whatsappHref(message: string = defaultWhatsAppMessage): string {
  if (!hasWhatsApp) return '';
  const number = business.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** The WhatsApp number in wa.me format (digits only), for client scripts. */
export const whatsappNumber = hasWhatsApp ? business.whatsapp.replace(/\D/g, '') : '';

/* ── Address & location ─────────────────────────────────────────────────── */

const { address } = business;

/** e.g. "Thrissur, Kerala" — falls back to just the state. */
export const locationLabel = [address.locality, address.district, address.region]
  .filter(Boolean)
  .filter((part, i, all) => all.indexOf(part) === i)
  .join(', ');

/** Full postal address lines (only non-empty parts). */
export const addressLines: string[] = [
  address.street,
  [address.locality, address.postalCode].filter(Boolean).join(' '),
  [address.district, address.region].filter(Boolean).join(', '),
].filter(Boolean);

/** True when there is enough address detail to show on a map. */
export const hasStreetAddress = Boolean(address.street && (address.locality || address.district));
export const hasMapLocation = Boolean(business.geo) || hasStreetAddress;

const mapQuery = business.geo
  ? `${business.geo.lat},${business.geo.lng}`
  : [business.name, address.street, address.locality, address.district, address.region, address.postalCode]
      .filter(Boolean)
      .join(', ');

/** Google Maps embed (no API key needed). Empty when no location is configured. */
export const mapEmbedSrc = hasMapLocation
  ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`
  : '';

/** Link that opens directions in Google Maps. */
export const directionsHref = business.googleMapsUrl
  ? business.googleMapsUrl
  : hasMapLocation
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
    : '';

/* ── Opening hours ──────────────────────────────────────────────────────── */

const WEEK: Weekday[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SHORT: Record<Weekday, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

function formatTime(value: string): string {
  const [h, m] = value.split(':').map(Number);
  const period = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, '0')} ${period}` : `${hour} ${period}`;
}

/** Turn ['Monday','Tuesday','Wednesday'] into "Mon – Wed" (consecutive runs collapse). */
function formatDays(days: Weekday[]): string {
  const sorted = [...days].sort((a, b) => WEEK.indexOf(a) - WEEK.indexOf(b));
  const runs: Weekday[][] = [];
  for (const day of sorted) {
    const last = runs.at(-1);
    if (last && WEEK.indexOf(day) === WEEK.indexOf(last.at(-1)!) + 1) last.push(day);
    else runs.push([day]);
  }
  return runs
    .map((run) => (run.length > 2 ? `${SHORT[run[0]]} – ${SHORT[run.at(-1)!]}` : run.map((d) => SHORT[d]).join(', ')))
    .join(', ');
}

export interface HoursRow {
  days: string;
  time: string;
}

/** Display rows for opening hours, including closed days. */
export function hoursRows(hours: OpeningHours[] = business.hours): HoursRow[] {
  if (!hours.length) return [];
  const rows: HoursRow[] = hours.map((h) => ({
    days: formatDays(h.days),
    time: `${formatTime(h.opens)} – ${formatTime(h.closes)}`,
  }));
  const open = new Set(hours.flatMap((h) => h.days));
  const closed = WEEK.filter((d) => !open.has(d));
  if (closed.length) rows.push({ days: formatDays(closed), time: 'Closed' });
  return rows;
}

/* ── Social ─────────────────────────────────────────────────────────────── */

export const socialLinks = (
  [
    { label: 'Instagram', icon: 'instagram', href: business.social.instagram },
    { label: 'Facebook', icon: 'facebook', href: business.social.facebook },
    { label: 'YouTube', icon: 'youtube', href: business.social.youtube },
  ] as const
).filter((link) => /^https?:\/\//.test(link.href));

/* ── Setup checklist (shown only in development) ────────────────────────── */

export function missingBusinessDetails(): string[] {
  const missing: string[] = [];
  if (!hasPhone) missing.push('Phone number');
  if (!hasWhatsApp) missing.push('WhatsApp number');
  if (!hasEmail) missing.push('Email address');
  if (!hasStreetAddress) missing.push('Street address / town');
  if (!business.hours.length) missing.push('Opening hours');
  if (!business.social.instagram) missing.push('Instagram URL');
  if (!business.social.facebook) missing.push('Facebook URL');
  if (!business.ownerName) missing.push('Owner name (optional)');
  return missing;
}
