/**
 * Mock content for the Portfolio Content editor.
 * In a real application this would come from an API (e.g. GET /api/portfolio)
 * and be hydrated into the same shape consumed by the tab components below.
 */

export const user = {
  name: 'Sarah Ahmed',
  avatarUrl:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=faces&auto=format',
};

export const navLinks = [
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'how-it-works', label: 'How It Works', href: '#how-it-works' },
  { id: 'connect-github', label: 'Connect to Github', href: '#connect-github' },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
];

export const aboutMeInitial = {
  headline: 'Full-Stack Developer | Building Modern Web Experiences',
  biography:
    "I'm a full-stack developer who loves turning complex problems into clean, intuitive products. Over the past four years I've shipped React and Node.js applications for startups and growing teams, with a focus on performance, accessibility, and developer experience. Outside of work, I contribute to open-source tooling and mentor new developers entering the field. I'm currently looking for product-minded teams building at the intersection of design and engineering.",
  interests: 'Web Development, Open Source, UI/UX Design, Cloud Computing',
  aiTip:
    'Your bio is strong! Consider adding specific achievements or projects to make it even more compelling to recruiters.',
};

export const skillsInitial = [
  { id: 'skill-1', name: 'JavaScript', level: 90 },
  { id: 'skill-2', name: 'TypeScript', level: 85 },
  { id: 'skill-3', name: 'React', level: 88 },
  { id: 'skill-4', name: 'Node.js', level: 80 },
  { id: 'skill-5', name: 'Python', level: 75 },
  { id: 'skill-6', name: 'Tailwind CSS', level: 92 },
];

export const projectsInitial = [
  {
    id: 'project-1',
    title: 'Portfolio Website',
    description:
      'A performance-first personal portfolio built to showcase projects and writing, with a fully custom design system.',
    technologies: 'React, TypeScript, Tailwind CSS',
    highlights: [
      'Achieved 98/100 Lighthouse performance score',
      'Implemented progressive web app features',
      'Built custom animation system',
    ],
  },
  {
    id: 'project-2',
    title: 'Portfolio Website',
    description:
      'A performance-first personal portfolio built to showcase projects and writing, with a fully custom design system.',
    technologies: 'React, TypeScript, Tailwind CSS',
    highlights: [
      'Achieved 98/100 Lighthouse performance score',
      'Implemented progressive web app features',
      'Built custom animation system',
    ],
  },
];

export const contentScore = {
  label: 'Content Score',
  score: 87,
  max: 100,
  tone: 'success',
  metrics: [
    { label: 'Readability', value: 92 },
    { label: 'Engagement', value: 85 },
    { label: 'Professionalism', value: 90 },
    { label: 'Completeness', value: 81 },
  ],
};

export const seoScore = {
  label: 'SEO Score',
  score: 78,
  max: 100,
  tone: 'warning',
  metrics: [
    { label: 'Keywords', value: 85 },
    { label: 'Meta Description', value: 70 },
    { label: 'Heading Structure', value: 82 },
    { label: 'Content Length', value: 75 },
  ],
};

export const quickTips = [
  'Add quantifiable achievements to your project highlights',
  'Include relevant keywords for your target role',
  'Keep your bio concise and focused on value',
];
