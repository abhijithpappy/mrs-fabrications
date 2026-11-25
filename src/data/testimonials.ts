/**
 * CUSTOMER TESTIMONIALS
 *
 * The testimonials section only appears on the website once at least one
 * entry is added here. Only add genuine feedback from real customers, with
 * their permission. Example:
 *
 * {
 *   quote: 'They measured, fabricated and fitted all our sliding doors in a week. Excellent finish.',
 *   name: 'Customer name',
 *   context: 'Sliding doors · Thrissur',
 * },
 */
export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. the service and town: 'Office partitions · Kochi' */
  context?: string;
}

export const testimonials: Testimonial[] = [];
