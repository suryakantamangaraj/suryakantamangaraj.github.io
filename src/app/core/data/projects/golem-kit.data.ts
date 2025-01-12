import { IProject } from '../../models/project.interface';

export const GolemKitData: IProject = {
  id: 'a6728e95-e485-11ea-bf1c-68ecc5e082cd',
  name: 'Golem Educational Electronics Kit',
  description: 'Advanced educational electronics kit featuring modular hardware components and companion mobile app for interactive learning. Designed to teach fundamental electronics, programming, and IoT concepts through hands-on experiments.',
  projectLink: '',
  liveUrl: '',
  isFeatured: false,
  features: [
    'Modular hardware components with plug-and-play interface',
    'Interactive mobile app with real-time experiment visualization',
    'Built-in oscilloscope and multimeter functionalities',
    'Step-by-step guided experiments and tutorials',
    'Bluetooth connectivity for wireless data acquisition',
    'Virtual breadboard simulation environment'
  ],
  tags: ['semiconductor', 'iot', 'automation'],
  techStuff: [
    'EasyEDA PCB Design',
    'MIT App Inventor',
    'ATmega328P Microcontroller',
    'Bluetooth Low Energy',
    'Android SDK',
    'Custom Sensor Modules',
    'Python Data Analysis'
  ],
  additionalData: [
    {
      title: 'Hardware Specifications',
      data: [
        'ATmega328P-based main control board',
        'Multiple sensor modules (Temperature, Light, Motion)',
        'Digital I/O and Analog input interfaces',
        'Built-in voltage regulation and protection',
        'Battery-powered operation with USB charging'
      ]
    },
    {
      title: 'Software Features',
      data: [
        'Real-time data visualization',
        'Experiment data logging and export',
        'Interactive learning modules',
        'Virtual circuit simulation',
        'Progress tracking and assessment'
      ]
    },
    {
      title: 'Intellectual Property',
      data: [
        'Developed for Protionix Technology Pvt. Ltd.',
        'Hardware design and software implementation protected',
        'Educational content and materials copyrighted'
      ]
    }
  ]
};