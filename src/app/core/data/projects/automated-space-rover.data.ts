import { IProject } from '../../models/project.interface';

export const AutomatedSpaceRoverData: IProject = {
  id: '8d9056cb-e47e-11ea-a204-68ecc5e082cd',
  name: 'Automated Space Rover',
  description: 'Design of Automated Space Rover using FPGA',
  projectLink: '',
  liveUrl: '',
  isFeatured: false,
  features: [
    'Designed for space application',
    'Implementation of navigation system',
    'Hardware implementation using FPGA',
    'Real-time data processing capabilities'
  ],
  tags: ['semiconductor', 'hardware', 'automation'],
  techStuff: [
    'Xilinx ISE Design Suite',
    'FPGA Development Board',
    'Verilog HDL',
    'Hardware Simulation Tools'
  ],
  additionalData: [
    {
      title: 'Key Features',
      data: [
        'Autonomous navigation system',
        'Real-time obstacle detection',
        'Path optimization algorithms',
        'Power management system'
      ]
    }
  ]
};