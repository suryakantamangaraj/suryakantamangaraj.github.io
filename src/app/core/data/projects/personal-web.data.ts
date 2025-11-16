import { IProject } from '../../models/project.interface';

export const PersonalWebData: IProject = {
  id: '87fbeedb-e436-11ea-9206-68ecc5e082cd',
  name: 'Portfolio Website - Angular SPA',
  description: 'Modern single-page application built with Angular, featuring custom animations, responsive design, and optimized performance. Implemented with TypeScript and custom CSS architecture, following best practices for web development.',
  projectLink: 'https://github.com/suryakantamangaraj/suryakantamangaraj.github.io',
  liveUrl: 'https://suryaraj.com/',
  isFeatured: true,
  features: [
    'Custom CSS architecture with BEM methodology',
    'Route-based code splitting for optimized loading',
    'State management using Angular services',
    'Custom animations using Angular Animation API',
    'Responsive design with CSS Grid and Flexbox',
    'Component-driven architecture with reusable modules'
  ],
  tags: ['web-apps'],
  techStuff: [
    'Angular 16',
    'TypeScript 5',
    'SCSS/CSS3',
    'HTML5',
    'Angular CLI',
    'NodeJS',
    'npm',
    'Git',
    'GitHub Actions'
  ],
  additionalData: [
    {
      title: 'Development Features',
      data: [
        'Mobile-first responsive design',
        'Cross-browser compatibility',
        'SEO optimization techniques',
        'Performance optimized assets',
        'Automated deployment pipeline'
      ]
    },
    {
      title: 'Performance Metrics',
      data: [
        'Lighthouse Score: 95+ across all metrics',
        'First Contentful Paint: <1s',
        'Time to Interactive: <2s',
        'Perfect accessibility score',
        'Optimized bundle size <500KB'
      ]
    }
  ]
};