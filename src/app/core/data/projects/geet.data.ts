import { IProject } from '../../models/project.interface';

export const GeetData: IProject = {
  id: 'f797eca1-e486-11ea-aa84-68ecc5e082cd',
  name: 'Geet - Music Streaming Platform',
  description: 'Web-based music streaming platform built with Django, featuring personalized recommendations and advanced search capabilities. Implements responsive design and optimized audio streaming.',
  projectLink: '',
  liveUrl: '',
  isFeatured: false,
  features: [
    'Personalized music recommendations using collaborative filtering',
    'Advanced search with fuzzy matching algorithm',
    'Real-time audio streaming with buffer management',
    'User playlist management and sharing',
    'Responsive UI with Bootstrap framework',
    'Optimized media storage and delivery'
  ],
  tags: ['web-apps'],
  techStuff: [
    'Python 3.x',
    'Django Framework',
    'PostgreSQL Database',
    'Redis Cache',
    'Bootstrap 5',
    'HTML5/CSS3',
    'JavaScript ES6',
    'AWS S3 Storage',
    'GitHub Actions CI'
  ],
  additionalData: []
};