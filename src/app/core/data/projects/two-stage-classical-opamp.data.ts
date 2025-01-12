import { IProject } from '../../models/project.interface';

export const TwoStageClassicalOpAmpData: IProject = {
  id: '5e9f8c2a-e47f-11ea-a188-68ecc5e082cd',
  name: 'Two-Stage Classical OpAmp Design for LDO Applications',
  description: 'Design and implementation of a two-stage operational amplifier optimized for Low-Dropout Regulator applications. Implemented in UMC 180nm CMOS technology with focus on power efficiency and stability.',
  projectLink: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=mUm3SwkAAAAJ&authuser=1&citation_for_view=mUm3SwkAAAAJ:u5HHmVD_uO8C',
  liveUrl: '',
  isFeatured: true,
  features: [
    'Miller compensation for enhanced stability',
    'High gain-bandwidth product (>10MHz)',
    'Rail-to-rail input common-mode range',
    'Low power consumption (<1mW)',
    'Improved slew rate (>10V/µs)',
    'High PSRR and CMRR (>60dB)'
  ],
  tags: ['semiconductor'],
  techStuff: [
    'UMC 180nm CMOS Process',
    'Cadence Virtuoso Suite',
    'Spectre Circuit Simulator',
    'Layout XL',
    'Calibre DRC/LVS',
    'ADE-XL for Corners'
  ],
  additionalData: [
    {
      title: 'Technical Specifications',
      data: [
        'DC Gain: >80dB',
        'Unity Gain Bandwidth: 15MHz',
        'Phase Margin: 60°',
        'Input Common Mode Range: 0.3V to 1.5V',
        'Output Swing: 0.2V to 1.6V',
        'Slew Rate: 12V/µs'
      ]
    },
    {
      title: 'Implementation Details',
      data: [
        'Telescopic cascode first stage',
        'Class-A output stage',
        'Miller compensation network',
        'Optimized for area efficiency',
        'Process corner simulations validated'
      ]
    },
    {
      title: 'Publication',
      data: [
        'Published in IEEE Electron Device Society Conference',
        'National Conference on Devices and Circuits 2018',
        'ISBN: 978-93-83060-16-0',
        'Cited in multiple research papers'
      ]
    }
  ]
};