import { business } from '../config/business';
import { hasEmail, hasPhone, hasStreetAddress } from './contact';

type Json = Record<string, unknown>;

/** Remove empty values so structured data never contains blank fields. */
function clean<T extends Json>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === null || v === undefined || v === '') return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    }),
  ) as T;
}

/** LocalBusiness structured data, built only from configured details. */
export function localBusinessSchema(siteUrl: URL | undefined, imageUrl?: string): Json {
  const { address } = business;
  const url = siteUrl ? new URL('/', siteUrl).href : undefined;

  const postalAddress = clean({
    '@type': 'PostalAddress',
    streetAddress: hasStreetAddress ? address.street : '',
    addressLocality: address.locality,
    addressRegion: address.region,
    postalCode: address.postalCode,
    addressCountry: address.countryCode,
  });

  return clean({
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': url ? `${url}#business` : undefined,
    name: business.name,
    description: business.description,
    url,
    image: imageUrl,
    telephone: hasPhone ? business.phone.replace(/\s+/g, '') : '',
    email: hasEmail ? business.email : '',
    address: postalAddress,
    geo: business.geo
      ? { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng }
      : undefined,
    hasMap: business.googleMapsUrl,
    areaServed: business.serviceArea || address.region,
    founder: business.ownerName ? { '@type': 'Person', name: business.ownerName } : undefined,
    foundingDate: business.foundedYear ? String(business.foundedYear) : '',
    openingHoursSpecification: business.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: Object.values(business.social).filter((v) => /^https?:\/\//.test(v)),
  });
}

export interface Crumb {
  name: string;
  href: string;
}

export function breadcrumbSchema(crumbs: Crumb[], siteUrl: URL | undefined): Json | null {
  if (!siteUrl) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: new URL(crumb.href, siteUrl).href,
    })),
  };
}

export function serviceSchema(
  service: { title: string; summary: string; slug: string },
  siteUrl: URL | undefined,
): Json {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    url: siteUrl ? new URL(`/services/${service.slug}/`, siteUrl).href : undefined,
    areaServed: business.serviceArea || business.address.region,
    provider: clean({
      '@type': 'HomeAndConstructionBusiness',
      name: business.name,
      '@id': siteUrl ? `${new URL('/', siteUrl).href}#business` : undefined,
    }),
  });
}
