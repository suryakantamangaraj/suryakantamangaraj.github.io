import { IProject } from '../../models/project.interface';

export const ConnectedAgricultureData: IProject = {
  id: '390a07ad-e480-11ea-ac53-68ecc5e082cd',
  name: 'Smart Farming with Edge AI and Cloud Intelligence',
  description: 'Advanced agricultural monitoring system leveraging Edge AI and cloud computing for real-time crop analysis and yield prediction. Implements IoT sensors network for environmental monitoring, machine learning for predictive analytics, and cloud-based dashboard for comprehensive farm management.',
  projectLink: '',
  liveUrl: 'https://suryaraj.com/SmartFarming/',
  isFeatured: true,
  features: [
    'Real-time environmental monitoring with distributed IoT sensors',
    'Edge AI-powered crop health analysis and disease detection',
    'Cloud-based predictive analytics for yield optimization',
    'Automated irrigation control based on soil moisture analysis',
    'Weather pattern analysis and crop planning recommendations',
    'Mobile-responsive dashboard for remote monitoring'
  ],
  tags: ['iot', 'ai-ml', 'automation'],
  techStuff: [
    'TensorFlow Lite for Edge AI',
    'AWS IoT Core',
    'Python/Flask Backend',
    'React.js Frontend',
    'MongoDB Atlas',
    'Arduino/ESP32 Sensors',
    'Docker Containers'
  ],
  additionalData: [
    {
      title: 'System Architecture',
      data: [
        'Distributed sensor network with ESP32 microcontrollers',
        'Edge processing units with TensorFlow Lite models',
        'AWS IoT Core for device management and data ingestion',
        'Serverless backend with AWS Lambda and API Gateway',
        'Real-time data visualization with WebSocket integration'
      ]
    },
    {
      title: 'ML Components',
      data: [
        'Crop disease detection using CNN',
        'Yield prediction using time-series analysis',
        'Weather pattern analysis with LSTM networks',
        'Soil quality assessment using regression models'
      ]
    }
  ]
};