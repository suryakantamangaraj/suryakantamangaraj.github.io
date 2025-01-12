import { IProject } from '../../models/project.interface';

export const DAQWAQMData: IProject = {
  id: 'dc9a7e1b-e47c-11ea-a146-68ecc5e082cd',
  name: 'SoC Data Acquisition System for Water Quality Monitoring',
  description: 'Development of a System-on-Chip (SoC) based data acquisition system for real-time water quality monitoring. Features high-precision analog front-end, integrated signal processing, and low-power design implemented in TSMC 65nm technology.',
  projectLink: 'https://www.researchgate.net/publication/352169765_The_Architecture_of_VENUS_Data_Acquisition_System_for_WAQM_Project',
  liveUrl: '',
  isFeatured: false,
  features: [
    'High-precision multi-channel analog data acquisition',
    'Real-time signal processing and analysis',
    'Built-in self-test capabilities',
    'Advanced power management system',
    'Integrated sensor calibration',
    'Automated measurement sequences'
  ],
  tags: ['semiconductor', 'automation', 'iot'],
  techStuff: [
    'TSMC 65nm Technology',
    'Cadence Virtuoso Suite',
    'OrCAD PCB Design',
    'MATLAB for Signal Processing',
    'LabVIEW Instrumentation',
    'Xilinx FPGA Development',
    'Mixed-Signal Verification'
  ],
  additionalData: [
    {
      title: 'Technical Specifications',
      data: [
        'ADC Resolution: 16-bit',
        'Sampling Rate: Up to 1MSPS',
        'Power Consumption: <100mW',
        'Supply Voltage: 1.2V/3.3V',
        'Multiple sensor interfaces: I2C, SPI, Analog'
      ]
    },
    {
      title: 'Implementation Details',
      data: [
        'Custom analog front-end design',
        'Digital signal processing blocks',
        'On-chip calibration circuits',
        'Power management unit',
        'Digital control and interface logic'
      ]
    },
    {
      title: 'Project Status',
      data: [
        'Developed at e-COE, BBSR',
        'Contributed to analog front-end design and verification',
        'Successfully taped-out and validated'
      ]
    }
  ]
};