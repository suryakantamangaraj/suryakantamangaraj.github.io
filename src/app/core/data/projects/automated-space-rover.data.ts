import { IProject } from '../../models/project.interface';

export const AutomatedSpaceRoverData: IProject = {
  id: '8d9056cb-e47e-11ea-a204-68ecc5e082cd',
  name: 'FPGA-Based Autonomous Space Rover',
  description: 'Development of an autonomous space rover navigation system implemented on FPGA, featuring real-time obstacle detection and path optimization algorithms. The system utilizes hardware acceleration for efficient data processing and includes power-optimized control mechanisms.',
  projectLink: '',
  liveUrl: '',
  isFeatured: false,
  features: [
    'Real-time autonomous navigation system with obstacle avoidance',
    'Hardware-accelerated path planning algorithms',
    'Multi-sensor data fusion and processing',
    'Low-latency control system implementation',
    'Power-efficient hardware architecture',
    'Fault-tolerant system design'
  ],
  tags: ['semiconductor', 'automation'],
  techStuff: [
    'Xilinx Artix-7 FPGA',
    'Verilog HDL/SystemVerilog',
    'Xilinx Vivado Design Suite',
    'AMBA AXI4 Interface',
    'ModelSim Simulation',
    'Custom IP Core Development'
  ],
  additionalData: [
    {
      title: 'Technical Specifications',
      data: [
        'Clock frequency: 100MHz',
        'Resource utilization: <60% of FPGA',
        'Processing latency: <10ms',
        'Power consumption: <2W',
        'Dual-core processing architecture'
      ]
    },
    {
      title: 'Implementation Details',
      data: [
        'Custom FPGA-based navigation controller',
        'Hardware-accelerated sensor data processing',
        'Real-time trajectory optimization',
        'Integrated power management system',
        'Fault detection and recovery mechanisms'
      ]
    }
  ]
};