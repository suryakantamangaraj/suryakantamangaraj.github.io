import { IProject } from '../../models/project.interface';

export const LDODesignSmartPowerSaveData: IProject = {
  id: 'b8c42f63-e47d-11ea-a167-68ecc5e082cd',
  name: 'Low Dropout Regulator with Smart Power Management',
  description: 'Design and implementation of a high-performance Low Dropout (LDO) voltage regulator with integrated smart power management features. Implemented in 65nm CMOS technology, featuring adaptive bias control and power-saving modes.',
  projectLink: '',
  liveUrl: '',
  isFeatured: false,
  features: [
    'Ultra-low dropout voltage of 100mV at 100mA load',
    'Adaptive bias control for efficiency optimization',
    'Multiple power-saving modes with fast wake-up',
    'Built-in protection features (OVP, OCP, TSD)',
    'Load-dependent compensation network',
    'Digital interface for mode control and monitoring'
  ],
  tags: ['semiconductor', 'automation'],
  techStuff: [
    'TSMC 65nm CMOS Process',
    'Cadence Virtuoso Layout Suite',
    'Synopsys HSPICE',
    'Mentor Calibre DRC/LVS',
    'Custom IC Design Flow',
    'Analog/Mixed-Signal Verification'
  ],
  additionalData: [
    {
      title: 'Technical Specifications',
      data: [
        'Input Voltage Range: 1.8V to 5.5V',
        'Output Voltage: 1.2V (±2% accuracy)',
        'Maximum Load Current: 200mA',
        'Quiescent Current: <10µA',
        'PSRR: >60dB at 1kHz',
        'Load Regulation: <0.1%/mA'
      ]
    },
    {
      title: 'Implementation Details',
      data: [
        'Two-stage error amplifier with Miller compensation',
        'Dynamic biasing circuit for improved efficiency',
        'Bandgap reference with TC compensation',
        'Power-good detection circuit',
        'Soft-start functionality'
      ]
    },
    {
      title: 'Performance Results',
      data: [
        'Load transient response: <2µs',
        'Line regulation: <0.05%/V',
        'Temperature range: -40°C to 125°C',
        'Active chip area: 0.12mm²',
        'Silicon-validated performance metrics'
      ]
    }
  ]
};