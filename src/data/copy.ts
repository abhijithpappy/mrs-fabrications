/**
 * Reusable marketing copy: process steps, reasons to choose us, values.
 * Edit freely — keep claims accurate and specific to how you actually work.
 */

export const processSteps = [
  {
    key: 'consultation',
    title: 'Consultation',
    text: 'Tell us what you have in mind. We discuss the space, how it will be used, styles, glass options and your budget.',
  },
  {
    key: 'measurement',
    title: 'Measurement',
    text: 'We visit the site and measure every opening accurately — the foundation of a good fit.',
  },
  {
    key: 'design',
    title: 'Design & planning',
    text: 'We confirm sizes, configurations, finishes and hardware, and give you a clear, itemised quotation.',
  },
  {
    key: 'fabrication',
    title: 'Fabrication',
    text: 'Profiles are cut, drilled and assembled in the workshop to the agreed measurements.',
  },
  {
    key: 'installation',
    title: 'Installation',
    text: 'Our team installs, seals and adjusts everything on site, checks each unit and leaves the space clean.',
  },
] as const;

export const reasons = [
  {
    title: 'Quality materials',
    text: 'Aluminium sections, glass and hardware are chosen for strength, finish and long-term performance in a humid, rainy climate.',
  },
  {
    title: 'Professional workmanship',
    text: 'Square frames, clean cuts, tight joints and careful sealing — the details you notice every time you open a window.',
  },
  {
    title: 'Customised solutions',
    text: 'Every job is made to measure. We adapt sizes, configurations and finishes to your space rather than forcing a standard fit.',
  },
  {
    title: 'Timely completion',
    text: 'We agree a realistic schedule up front, keep you informed and work to finish when we said we would.',
  },
  {
    title: 'Customer satisfaction',
    text: 'We are not finished until you are happy: everything is checked and adjusted with you before we hand over.',
  },
] as const;

export const values = [
  {
    title: 'Precision',
    text: 'Accurate measuring and careful fabrication, because a few millimetres decide whether a window seals or leaks.',
  },
  {
    title: 'Honesty',
    text: 'Clear advice, transparent quotations and no surprises. If something isn’t right for your space, we’ll say so.',
  },
  {
    title: 'Durability',
    text: 'We build for years of daily use and Kerala’s monsoon, not just for the day of handover.',
  },
  {
    title: 'Respect',
    text: 'For your time, your home and your business — punctual visits, tidy work and a clean site.',
  },
] as const;

export const qualityChecks = [
  'Every opening measured on site before fabrication',
  'Frames cut and assembled square in the workshop',
  'Joints, drainage and seals finished with care',
  'Hardware fitted and adjusted for smooth operation',
  'Final walk-through with you before handover',
] as const;
