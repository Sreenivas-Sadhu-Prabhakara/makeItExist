import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'website',
    title: 'Websites',
    description:
      'Quick, professional websites built just-in-time. Perfect for landing pages, portfolios, and business presence.',
    pricing: 'free',
    pricingNote: 'Completely free for all AIM students',
    icon: 'Globe',
    features: [
      'Responsive design',
      'Modern UI/UX',
      'SEO optimized',
      'Fast deployment',
      'Custom domain support',
      'Free hosting setup',
    ],
    available: true,
  },
  {
    id: 'mobile_app',
    title: 'Mobile Apps',
    description:
      'Native and cross-platform mobile applications. From concept to App Store, we build apps that users love.',
    pricing: 'charged',
    pricingNote: 'Charged during build based on developer availability',
    icon: 'Smartphone',
    features: [
      'iOS & Android',
      'Cross-platform (React Native)',
      'UI/UX design included',
      'API integration',
      'Push notifications',
      'App Store submission',
    ],
    available: true,
  },
  {
    id: 'web_app',
    title: 'Web Applications',
    description:
      'Full-stack web applications with complex business logic, authentication, databases, and real-time features.',
    pricing: 'charged',
    pricingNote: 'Charged during build based on developer availability',
    icon: 'Layout',
    features: [
      'Full-stack development',
      'Database design',
      'User authentication',
      'Real-time features',
      'Cloud deployment',
      'Scalable architecture',
    ],
    available: true,
  },
  {
    id: 'llm_model',
    title: 'Custom LLM Solutions',
    description:
      'Custom large language model fine-tuning, RAG systems, AI agents, and intelligent automation solutions.',
    pricing: 'charged',
    pricingNote: 'Based on availability of developers',
    icon: 'Brain',
    features: [
      'Model fine-tuning',
      'RAG pipelines',
      'AI agent development',
      'Prompt engineering',
      'API integration',
      'Performance optimization',
    ],
    available: true,
  },
  {
    id: 'other',
    title: 'Emerging Tech',
    description:
      'Blockchain, IoT, AR/VR, and other cutting-edge technology solutions. If it exists, we can build it.',
    pricing: 'charged',
    pricingNote: 'Based on availability of developers',
    icon: 'Sparkles',
    features: [
      'Blockchain & Web3',
      'IoT solutions',
      'AR/VR experiences',
      'Data analytics',
      'Cloud infrastructure',
      'Custom integrations',
    ],
    available: true,
  },
];

export const WEEKEND_SLOTS = [
  { startTime: '09:00', endTime: '10:30', label: '9:00 AM – 10:30 AM' },
  { startTime: '10:30', endTime: '12:00', label: '10:30 AM – 12:00 PM' },
  { startTime: '13:00', endTime: '14:30', label: '1:00 PM – 2:30 PM' },
  { startTime: '14:30', endTime: '16:00', label: '2:30 PM – 4:00 PM' },
  { startTime: '16:00', endTime: '17:30', label: '4:00 PM – 5:30 PM' },
];

export const AIM_EMAIL_DOMAIN = '@aim.edu';

export const STATS = [
  { label: 'Projects Launched', value: '50+', icon: 'Rocket' },
  { label: 'AIM Students Served', value: '120+', icon: 'Users' },
  { label: 'Technologies', value: '15+', icon: 'Code2' },
  { label: 'Weekend Builds', value: '30+', icon: 'Calendar' },
];
