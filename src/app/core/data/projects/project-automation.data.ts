import { IProject } from '../../models/project.interface';

export const ProjectAutomationData: IProject = {
  id: 'de64e26c-e482-11ea-adfe-68ecc5e082cd',
  name: 'Git & GitHub Automation CLI Tool',
  description: 'Command-line interface tool for automating Git and GitHub workflows. Features include repository management, automated commits, branch handling, and development environment setup using Python and Shell scripting.',
  projectLink: 'https://github.com/suryakantamangaraj/ProjectAutomation',
  liveUrl: '',
  isFeatured: false,
  features: [
    'Automated Git repository initialization and configuration',
    'Batch processing for multiple repositories',
    'Customizable commit message templates',
    'Integrated VS Code workspace management',
    'GitHub API integration for remote operations',
    'Cross-platform compatibility scripts'
  ],
  tags: ['automation'],
  techStuff: [
    'Python 3.x',
    'Shell Scripting (Bash/PowerShell)',
    'GitHub REST API',
    'GitPython Library',
    'Click CLI Framework',
    'VSCode Extension API'
  ],
  additionalData: [
    {
      title: 'Implementation Details',
      data: [
        'Object-oriented architecture for modularity',
        'Asynchronous operations for performance',
        'Error handling and logging system',
        'Configuration management via JSON',
        'Environment variable security'
      ]
    },
    {
      title: 'Usage Examples',
      data: [
        'Batch repository creation and setup',
        'Automated commit and push workflows',
        'Project workspace initialization',
        'Remote repository management',
        'Development environment configuration'
      ]
    }
  ]
};