/**
 * Site-wide settings that aren't business facts: navigation, SEO defaults,
 * enquiry form behaviour and placeholder-image labelling.
 */

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const siteSettings = {
  /** Default meta description when a page doesn't provide one. */
  defaultDescription:
    'Aluminium windows, doors, glass partitions, sliding systems, shopfronts and custom aluminium fabrication in Kerala. Measured, fabricated and installed with care.',

  /** Language / locale for <html lang> and Open Graph. */
  lang: 'en-IN',
  locale: 'en_IN',

  enquiryForm: {
    /**
     * 'netlify' — submissions are stored in Netlify Forms (and can be emailed to you).
     * Enable "Form detection" in Netlify → Site configuration → Forms.
     */
    provider: 'netlify' as const,
    /** Netlify form name (shows up in the Netlify dashboard). */
    name: 'enquiry',
    /** Shows a "Send on WhatsApp" option on the form when a WhatsApp number is set. */
    offerWhatsApp: true,
  },

  /**
   * Images stored in `src/assets/images/placeholders/` are temporary stock photos.
   * When true, they carry a small "Representative image" label so they are never
   * mistaken for your own completed work. Replace them with real photos and the
   * labels disappear automatically.
   */
  labelPlaceholderImages: true,
};
