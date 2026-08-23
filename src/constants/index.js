export const NAV_LINKS = [
  { id: 'about', title: 'About' },
  { id: 'work', title: 'Projects' },
  { id: 'skills', title: 'Stack' },
  { id: 'contact', title: 'Contact' },
];

export const PERSONAL_INFO = {
  name: 'Thiago Langone',
  role: 'IT Infrastructure & Automation Engineer',
  email: 'thiagoivan029@gmail.com',
  phone: '+54 9 (11) 2844-1081',
  location: 'Buenos Aires, Argentina',
  github: 'https://github.com/JimmyAlter',
  linkedin: 'https://www.linkedin.com/in/thiago-langone-365825229/',
  bio: 'I look after the infrastructure of a six-company group — 500+ Windows endpoints, six AD domains — and build the tooling that runs it: an in-house RMM, internal MCP servers, and an LLM agent platform where every security-critical action runs as deterministic code. I also build full-stack apps end to end, from React UIs to Node/Postgres APIs.',
  timezone: 'UTC−3',
  overlap: 'Full day overlap with US Eastern & Central',
  available: true,
};

export const METRICS = [
  { value: '6', label: 'companies supported' },
  { value: '500+', label: 'windows endpoints' },
  { value: '30+', label: 'branch offices' },
  { value: '6', label: 'active directory domains' },
];

export const SKILLS = [
  {
    category: 'Infrastructure & Automation',
    icon: '🖥️',
    items: [
      { name: 'Windows Server', level: 90 },
      { name: 'Active Directory', level: 90 },
      { name: 'PowerShell', level: 85 },
      { name: 'Networking', level: 80 },
      { name: 'Linux', level: 75 },
      { name: 'Google Workspace Admin', level: 75 },
    ],
  },
  {
    category: 'AI Engineering',
    icon: '🤖',
    items: [
      { name: 'Multi-agent orchestration', level: 80 },
      { name: 'MCP servers', level: 80 },
      { name: 'Gemini API', level: 75 },
      { name: 'Ollama', level: 70 },
      { name: 'Prompt & guardrail design', level: 80 },
    ],
  },
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
    highlights: [
      'Centralized device inventory and health signals',
      'Remote commands via Windows/Linux agents',
      'Reports and history for ops visibility',
    ],
    image: '/projects/systemmonitor-1.png',
    repoUrl: 'https://github.com/JimmyAlter/remote-monitoring-dashboard',
    liveUrl: '',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'PowerShell', 'Bash', 'TypeScript'],
    featured: true,
    gallery: ['/projects/systemmonitor-1.png', '/projects/systemmonitor-2.png'],
  },
  {
    title: 'AI Quest RPG — AI Dungeon Master',
    description: 'A desktop RPG where an LLM acts as dungeon master, generating story, encounters, and NPC dialogue live, while a deterministic engine underneath handles combat, HP/XP, and inventory. Built to explore how far an LLM can go as a narrative engine without ever letting it touch the actual game rules.',
    highlights: [
      'LLM-driven narrative and dialogue via the Gemini API, streamed into a Pygame UI',
      'Deterministic combat, stats, and inventory — the model narrates, it never adjudicates rules',
      'Four playable classes with distinct stats and starting kits',
    ],
    image: '/projects/ai-quest-rpg.svg',
    repoUrl: '',
    liveUrl: '',
    tech: ['Python', 'Pygame', 'Gemini API', 'Threading/Queue'],
    featured: true,
    gallery: ['/projects/ai-quest-rpg.svg'],
  },
  {
    title: 'AssetDesk',
    description: 'Enterprise service desk and asset inventory platform with ticket workflows, device health, and team coverage. Designed for IT operations with a clean UI and secure API.',
    highlights: [
      'Ticket workflows with assignment and status tracking',
      'Asset inventory with device details and health',
      'Secure API with JWT authentication',
    ],
    image: '/projects/assetdesk-1.png',
    repoUrl: 'https://github.com/JimmyAlter/AssetDesk',
    liveUrl: '',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'SQLite', 'JWT'],
    featured: false,
    gallery: ['/projects/assetdesk-1.png', '/projects/assetdesk-2.png'],
  },
  {
    title: 'CommerceSuite',
    description: 'Enterprise procurement storefront with secure checkout, catalog filtering, and admin-ready order management. Designed for internal purchasing teams.',
    highlights: [
      'Product catalog search and filtering',
      'Authenticated checkout flow and user accounts',
      'Order tracking designed for admin extension',
    ],
    image: '/projects/commercesuite-1.png',
    repoUrl: 'https://github.com/JimmyAlter/CommerceSuite',
    liveUrl: '',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'SQLite', 'JWT'],
    featured: false,
    gallery: ['/projects/commercesuite-1.png', '/projects/commercesuite-2.png'],
  },
  {
    title: 'NovaSpend',
    description: 'A mobile expense tracker built with Expo/React Native, paired with a Telegram bot so an expense can be logged from a chat message without opening the app. Data syncs through Firebase so the app and the bot always agree.',
    highlights: [
      'Cross-platform app (iOS/Android/web) with Expo Router and native navigation',
      'Telegram bot for logging expenses via chat, backed by the same Firebase data',
      'Local-first UX with async storage and haptic feedback',
    ],
    image: '/projects/novaspend.svg',
    repoUrl: '',
    liveUrl: '',
    tech: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Node.js', 'Telegram Bot API'],
    featured: false,
    gallery: ['/projects/novaspend.svg'],
  },
];
