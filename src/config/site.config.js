/**
 * ===========================================================================
 *  EDIT YOUR INFO HERE — this is the only file you need to touch to make
 *  PortfolioOS your own.
 * ===========================================================================
 *
 *  Every field is plain text and is safely HTML-escaped before it's
 *  rendered (see src/scripts/utils/sanitize.js), so you can paste real
 *  content without worrying about breaking the page.
 *
 *  For `links`, use a full URL starting with "https://" (or "http://"),
 *  and a plain email address for `links.email`. Anything else is replaced
 *  with a harmless "#" at render time as a safety net.
 */
export const CONFIG = {
  name: 'Your Name',
  initials: 'YN',
  role: 'Full-Stack Developer',
  tagline: 'Building things for the web, one commit at a time.',
  location: 'City, Country',
  bio: 'Placeholder bio — replace with two or three sentences about who you are, what you work on, and what you care about.',
  experience: 'X years',
  building: "Placeholder — e.g. a side project you're shipping",
  learning: 'Placeholder — e.g. Rust',
  stack: 'JavaScript, React, Node.js',

  links: {
    github: '#',
    linkedin: '#',
    email: 'you@example.com',
    resume: '#',
  },

  skills: {
    Languages: ['JavaScript / TypeScript', 'Python', 'placeholder'],
    'Frameworks & Libraries': ['React', 'Next.js', 'Node.js'],
    'Tools & Platforms': ['Git', 'Docker', 'Figma'],
    'Currently learning': ['placeholder'],
  },

  projects: [
    {
      name: 'Project One',
      tag: 'Web',
      desc: "Placeholder description of what this project does and why it's interesting.",
      live: '#',
      code: '#',
    },
    {
      name: 'Project Two',
      tag: 'Tool',
      desc: 'Placeholder description of what this project does.',
      live: '#',
      code: '#',
    },
    {
      name: 'Project Three',
      tag: 'Mobile',
      desc: 'Placeholder description of what this project does.',
      live: '#',
      code: '#',
    },
    {
      name: 'Project Four',
      tag: 'Open Source',
      desc: 'Placeholder description of what this project does.',
      live: '#',
      code: '#',
    },
  ],

  archive: [
    { name: 'Old Project A', note: 'Retired — placeholder note about why.' },
    { name: 'Old Project B', note: 'Sunset — placeholder note about why.' },
  ],
};
