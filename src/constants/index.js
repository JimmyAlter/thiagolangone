export const NAV_LINKS = [
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Stack' },
  { id: 'work', title: 'Work' },
  { id: 'contact', title: 'Contact' },
];

export const PERSONAL_INFO = {
  name: 'Thiago Langone',
  role: 'Full Stack Developer',
  email: 'thiagoivan029@gmail.com',
  phone: '+54 9 (11) 2844-1081',
  location: 'Buenos Aires, Argentina',
  github: 'https://github.com/JimmyAlter',
  linkedin: 'https://www.linkedin.com/in/thiago-langone-365825229/',
  bio: 'I build monitoring tools and modern web apps that feel fast, reliable, and easy to use. Based in Buenos Aires, I work mostly with React, Node, and PostgreSQL, and I am always happy to learn whatever the project needs.',
  available: true,
};

export const SKILLS = [
  {
    category: 'Frontend',
    icon: '🎨',
    items: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 70 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Next.js', level: 65 },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    items: [
      { name: 'Node.js', level: 80 },
      { name: 'Express', level: 75 },
      { name: 'Python', level: 60 },
      { name: 'PostgreSQL', level: 65 },
      { name: 'MongoDB', level: 70 },
      { name: 'REST APIs', level: 85 },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: '🛠️',
    items: [
      { name: 'Git / GitHub', level: 85 },
      { name: 'Linux', level: 75 },
      { name: 'Docker', level: 55 },
      { name: 'VS Code', level: 90 },
      { name: 'PowerShell', level: 70 },
      { name: 'Vite', level: 80 },
    ],
  },
];

export const projects = [
  {
    title: 'SystemMonitor (RMM Control)',
    description: 'Remote monitoring and management dashboard that centralizes inventory, health metrics, remote commands, and reports. Built with a React + Vite UI, Node/Express API, PostgreSQL storage, and PowerShell/Bash agents for Windows and Linux.',
    image: '/projects/systemmonitor-1.png',
    repoUrl: 'https://github.com/JimmyAlter/remote-monitoring-dashboard',
    liveUrl: '',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'PowerShell', 'Bash', 'TypeScript'],
    featured: true,
    gallery: ['/projects/systemmonitor-1.png', '/projects/systemmonitor-2.png'],
  },
  {
    title: 'AssetDesk',
    description: 'Enterprise service desk and asset inventory platform with ticket workflows, device health, and team coverage. Designed for IT operations with a clean UI and secure API.',
    image: '/projects/assetdesk-1.png',
    repoUrl: 'https://github.com/JimmyAlter/AssetDesk',
    liveUrl: '',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'SQLite', 'JWT'],
    featured: true,
    gallery: ['/projects/assetdesk-1.png', '/projects/assetdesk-2.png'],
  },
  {
    title: 'CommerceSuite',
    description: 'Enterprise procurement storefront with secure checkout, catalog filtering, and admin-ready order management. Designed for internal purchasing teams.',
    image: '/projects/commercesuite-1.png',
    repoUrl: 'https://github.com/JimmyAlter/CommerceSuite',
    liveUrl: '',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'SQLite', 'JWT'],
    featured: true,
    gallery: ['/projects/commercesuite-1.png', '/projects/commercesuite-2.png'],
  },
];
