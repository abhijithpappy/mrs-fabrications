/**
 * Site-wide photography (hero, about, process…). Swap the imports for your own
 * photos — put them in `src/assets/images/site/` and update the paths below.
 * Images from the `placeholders/` folder are labelled automatically on the site.
 */
import heroImage from '../assets/images/placeholders/hero-modern-home-dusk.jpg';
import introPrimary from '../assets/images/placeholders/home-glass-partition-office.jpg';
import introSecondary from '../assets/images/placeholders/detail-measuring-frame.jpg';
import whyUs from '../assets/images/placeholders/workshop-measuring-cutting.jpg';
import ctaBackground from '../assets/images/placeholders/cta-modern-home-night.jpg';
import aboutHero from '../assets/images/placeholders/workshop-mitre-saw.jpg';
import aboutStory from '../assets/images/placeholders/detail-metal-fins.jpg';
import workshopWelding from '../assets/images/placeholders/workshop-welding.jpg';
import workshopTools from '../assets/images/placeholders/workshop-tool-wall.jpg';
import workshopSparks from '../assets/images/placeholders/workshop-grinder-sparks.jpg';
import workshopCutting from '../assets/images/placeholders/workshop-measuring-cutting.jpg';
import processConsult from '../assets/images/placeholders/planning-drawing-plans.jpg';
import processMeasure from '../assets/images/placeholders/detail-measuring-frame.jpg';
import processDesign from '../assets/images/placeholders/planning-technical-drawing.jpg';
import processFabricate from '../assets/images/placeholders/workshop-mitre-saw.jpg';
import processInstall from '../assets/images/placeholders/sliding-black-frame-doors.jpg';
import contactImage from '../assets/images/placeholders/facade-glass-curves.jpg';
import servicesHero from '../assets/images/placeholders/partitions-office-curtain-wall.jpg';
import projectsHero from '../assets/images/placeholders/sliding-interior-wall.jpg';

export const media = {
  hero: { src: heroImage, alt: 'Contemporary home at dusk with large glazed openings lit from inside' },
  introPrimary: { src: introPrimary, alt: 'Office corridor with black-framed glass partitions' },
  introSecondary: { src: introSecondary, alt: 'Measuring tape held against a frame during fitting' },
  whyUs: { src: whyUs, alt: 'Fabricator wearing protective gear measuring and cutting material in a workshop' },
  cta: { src: ctaBackground, alt: 'Modern home at night with tall illuminated windows' },
  aboutHero: { src: aboutHero, alt: 'Fabricators cutting a section on a mitre saw in a workshop' },
  aboutStory: { src: aboutStory, alt: 'Close-up of angled metal fins' },
  servicesHero: { src: servicesHero, alt: 'Meeting space enclosed by black-framed glazing' },
  projectsHero: { src: projectsHero, alt: 'Lounge with a full-height sliding glass wall' },
  contact: { src: contactImage, alt: 'Curved glass façade seen from below' },
  workshop: [
    { src: workshopSparks, alt: 'Angle grinder cutting metal with a shower of sparks' },
    { src: workshopCutting, alt: 'Fabricator measuring and marking material on a workbench' },
    { src: workshopTools, alt: 'Workshop wall of neatly organised hand tools' },
    { src: workshopWelding, alt: 'Fabricator in a protective mask working with sparks' },
  ],
  process: {
    consultation: { src: processConsult, alt: 'Reviewing drawings and plans on a table' },
    measurement: { src: processMeasure, alt: 'Measuring tape held against a frame' },
    design: { src: processDesign, alt: 'Pencil on a technical drawing with dimensions' },
    fabrication: { src: processFabricate, alt: 'Cutting a section on a mitre saw in the workshop' },
    installation: { src: processInstall, alt: 'Finished black-framed sliding glass doors' },
  },
} as const;
