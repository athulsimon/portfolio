export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  github: string;
  linkedin: string;
  resumePath: string;
  idNo: string;
  dept: string;
  validTill: string;
  quote: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type SkillFamily =
  | 'Languages'
  | 'Frameworks'
  | 'State & Storage'
  | 'Platforms'
  | 'Cloud & Backend'
  | 'Quality & Tools'
  | 'Architecture & AI';

export interface PeriodicSkill {
  number: number;
  symbol: string;
  name: string;
  family: SkillFamily;
  isBrand: boolean;
  projects: string[];
  description: string;
  iconSlug?: string;
  color?: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
  type: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  startYear: string;
  endYear: string;
  location: string;
  tasks: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  startYear: string;
  endYear: string;
  location: string;
  courses: string[];
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  place: string;
  location: string;
  type: 'education' | 'experience' | 'next';
  details: string[];
}

export interface AchievementItem {
  id: string;
  index: string;
  metric: number;
  suffix: string;
  label: string;
  caption: string;
  detail: string;
  platform: string;
  brandColor: string;
  logo: string;
}

export interface CertificationItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
  year: string;
  link: string;
}

// -------------------------------------------------------------
// VERBATIM EXTRACTION FROM RESUME.PDF
// -------------------------------------------------------------

export const PROFILE: Profile = {
  name: 'Athul Simon',
  firstName: 'Athul',
  lastName: 'Simon',
  initials: 'AS',
  role: 'Flutter Developer',
  email: 'athulsimon@gmail.com',
  phone: '7012131288',
  phoneHref: 'tel:7012131288',
  location: 'Ernakulam, India',
  resumeSummary:
    'Creative and driven Flutter Developer with 4+ years of experience. Looking for an opportunity with a professional team to gain experience in Testing Flutter apps and design patterns',
  github: 'https://github.com/athulsimon',
  linkedin: 'https://www.linkedin.com/in/athul-simon-63a621144/',
  resumePath: '/resume.pdf',
  idNo: 'AS-7012',
  dept: 'Mobile & Web App Development',
  validTill: '2028',
  quote:
    'Building modular, responsive applications across Android, iOS and Web with clean state management and testing.',
};

export const SKILL_FAMILIES: SkillFamily[] = [
  'Languages',
  'Frameworks',
  'State & Storage',
  'Platforms',
  'Cloud & Backend',
  'Quality & Tools',
  'Architecture & AI',
];

export const PERIODIC_SKILLS: PeriodicSkill[] = [
  {
    number: 1,
    symbol: 'Da',
    name: 'Dart',
    family: 'Languages',
    isBrand: true,
    projects: ['SuperApp with Modules', 'Ai chat App', 'Kids Educational App', 'ToDo App'],
    description: 'Core object-oriented language for high-performance multi-platform Flutter development.',
    iconSlug: 'dart',
    color: '#0175C2',
  },
  {
    number: 2,
    symbol: 'Fl',
    name: 'Flutter',
    family: 'Frameworks',
    isBrand: true,
    projects: ['SuperApp with Modules', 'Ai chat App', 'Kids Educational App', 'ToDo App'],
    description: 'Multi-platform UI framework for building natively compiled applications from a single codebase.',
    iconSlug: 'flutter',
    color: '#02569B',
  },
  {
    number: 3,
    symbol: 'Bl',
    name: 'Bloc State Management',
    family: 'State & Storage',
    isBrand: true,
    projects: ['SuperApp with Modules', 'HiFx Enterprise Modules'],
    description: 'Predictable reactive state management architecture cleanly separating business logic from UI.',
    iconSlug: 'bloc',
    color: '#0052CC',
  },
  {
    number: 4,
    symbol: 'An',
    name: 'Android',
    family: 'Platforms',
    isBrand: true,
    projects: ['SuperApp with Modules', 'All Projects'],
    description: 'Native mobile app optimization, packaging, and Google Play Store deployment.',
    iconSlug: 'android',
    color: '#3DDC84',
  },
  {
    number: 5,
    symbol: 'Io',
    name: 'iOS',
    family: 'Platforms',
    isBrand: true,
    projects: ['SuperApp with Modules', 'HiFx Super-App'],
    description: 'Apple ecosystem app optimization, configuration, and App Store distribution.',
    iconSlug: 'apple',
    color: '#000000',
  },
  {
    number: 6,
    symbol: 'Wb',
    name: 'Web Apps',
    family: 'Platforms',
    isBrand: true,
    projects: ['SuperApp with Modules', 'HiFx Web App'],
    description: 'Responsive multi-screen web client rendering with Flutter Web and desktop viewports.',
    iconSlug: 'html5',
    color: '#E34F26',
  },
  {
    number: 7,
    symbol: 'Fb',
    name: 'Firebase',
    family: 'Cloud & Backend',
    isBrand: true,
    projects: ['SuperApp with Modules', 'Ai chat App'],
    description: 'Backend cloud services including authentication, real-time database, push notifications, and analytics.',
    iconSlug: 'firebase',
    color: '#FFCA28',
  },
  {
    number: 8,
    symbol: 'Aw',
    name: 'Appwrite',
    family: 'Cloud & Backend',
    isBrand: true,
    projects: ['Personal Projects', 'Modular Apps'],
    description: 'Modern Backend-as-a-Service providing authentication, document database, and secure storage.',
    iconSlug: 'appwrite',
    color: '#FD366E',
  },
  {
    number: 9,
    symbol: 'My',
    name: 'MySQL',
    family: 'Cloud & Backend',
    isBrand: true,
    projects: ['Backend API Integration', 'WebSoulLabs'],
    description: 'Relational database management for structured persistence, migrations, and transactions.',
    iconSlug: 'mysql',
    color: '#4479A1',
  },
  {
    number: 10,
    symbol: 'Sq',
    name: 'Sqflite CRUD',
    family: 'State & Storage',
    isBrand: true,
    projects: ['ToDo App'],
    description: 'Local embedded SQLite engine for offline persistence and high-speed local data operations.',
    iconSlug: 'sqlite',
    color: '#003B57',
  },
  {
    number: 11,
    symbol: 'Sp',
    name: 'SharedPreference',
    family: 'State & Storage',
    isBrand: false,
    projects: ['ToDo App', 'Kids Educational App'],
    description: 'Key-value persistent storage for user preferences, session cache, and theme settings.',
    iconSlug: 'storage',
    color: '#555555',
  },
  {
    number: 12,
    symbol: 'Ut',
    name: 'Unit & Widget Testing',
    family: 'Quality & Tools',
    isBrand: false,
    projects: ['HiFx Codebase', 'Modular Apps'],
    description: 'Automated test suites utilizing package:test and WidgetTester for robust regression testing.',
    iconSlug: 'testing',
    color: '#2E7D32',
  },
  {
    number: 13,
    symbol: 'Gt',
    name: 'Git & Version Control',
    family: 'Quality & Tools',
    isBrand: true,
    projects: ['All Projects & Work Experience'],
    description: 'Collaborative distributed version control, GitFlow branching, and pull request reviews.',
    iconSlug: 'git',
    color: '#F05032',
  },
  {
    number: 14,
    symbol: 'Ps',
    name: 'Publishing (Playstore & Appstore)',
    family: 'Quality & Tools',
    isBrand: false,
    projects: ['HiFx', 'Indbytes Technologies'],
    description: 'End-to-end production build signing, Play Console & App Store Connect release workflows.',
    iconSlug: 'publish',
    color: '#0288D1',
  },
  {
    number: 15,
    symbol: 'Lc',
    name: 'Localisation',
    family: 'Architecture & AI',
    isBrand: false,
    projects: ['Kids Educational App', 'SuperApp with Modules'],
    description: 'Multi-lingual internationalization (i18n) and region-specific RTL/LTR asset management.',
    iconSlug: 'locale',
    color: '#7B1FA2',
  },
  {
    number: 16,
    symbol: 'Ai',
    name: 'ChatGPT API & AI',
    family: 'Architecture & AI',
    isBrand: true,
    projects: ['Ai chat App'],
    description: 'OpenAI ChatGPT API integration with natural voice search and real-time audio responses.',
    iconSlug: 'openai',
    color: '#10A37F',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'super-app',
    index: '01',
    title: 'SuperApp with Modules',
    kicker: 'Modular Multi-App Architecture',
    description:
      'Engineered a scalable super-app system hosting mini-applications with dynamic module loading, responsive layouts, and unified routing.',
    features: [
      'Apps with small mini apps',
      'Handling each app corresponding to requirements',
      'Independent feature modules and isolated state',
      'Responsive design spanning Android, iOS and Web',
    ],
    tech: ['Flutter', 'Dart', 'Bloc', 'Modular Architecture', 'Responsive UI'],
    github: 'https://github.com/athulsimon',
    type: 'Enterprise Architecture',
  },
  {
    id: 'ai-chat-app',
    index: '02',
    title: 'Ai Chat App',
    kicker: 'Voice-Enabled Conversational AI',
    description:
      'Personal AI application combining ChatGPT API intelligence with conversational voice search and auditory responses in a reactive Flutter UI.',
    features: [
      'Personal AI App assistant',
      'ChatGPT API integrated',
      'Voice search and audio speech response',
      'Streaming token response and chat history',
    ],
    tech: ['Flutter', 'Dart', 'ChatGPT API', 'Voice Search', 'REST API'],
    github: 'https://github.com/athulsimon',
    type: 'AI & Speech Application',
  },
  {
    id: 'kids-educational-app',
    index: '03',
    title: 'Kids Educational App',
    kicker: 'Interactive Learning Platform',
    description:
      'Vibrant, touch-friendly learning application engineered with responsive Flutter widgets, intuitive animations, and child-safe interactions.',
    features: [
      'Responsive app for kids learning',
      'Interactive visual & auditory learning modules',
      'Custom widget animations for young learners',
      'Adaptive layouts across tablets and phones',
    ],
    tech: ['Flutter', 'Dart', 'Responsive UI', 'Custom Widgets', 'SharedPreference'],
    github: 'https://github.com/athulsimon',
    type: 'EdTech Application',
  },
  {
    id: 'todo-app',
    index: '04',
    title: 'ToDo App',
    kicker: 'Local-First Persistent Productivity',
    description:
      'Lightweight, responsive note-taking and task management application powered by an offline-first SQLite database with full CRUD operations.',
    features: [
      'Simple Todo App for taking notes',
      'Responsive App UI across screen sizes',
      'SQL database and Sqflite CRUD operations',
      'Instant local persistence with zero latency',
    ],
    tech: ['Flutter', 'Dart', 'Sqflite', 'SQLite CRUD', 'SharedPreference'],
    github: 'https://github.com/athulsimon',
    type: 'Productivity Application',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'hifx',
    role: 'Software Engineer',
    company: 'HiFx',
    period: '08/2022 - Present',
    startYear: '2022',
    endYear: 'Present',
    location: 'Kochi, India',
    tasks: [
      'Working with wider development team.',
      'Manage App modules in Super-App.',
      'Optimizing Android Ios and Web apps.',
    ],
  },
  {
    id: 'indbytes',
    role: 'Flutter Developer',
    company: 'Indbytes Technologies',
    period: '02/2021 - 08/2022',
    startYear: '2021',
    endYear: '2022',
    location: 'Kochi, India',
    tasks: [
      'Building the whole app from A to Z.',
      'Complex UI Designs and API Integration.',
    ],
  },
  {
    id: 'websoullabs',
    role: 'Flutter Intern',
    company: 'WebSoulLabs',
    period: '09/2020 - 02/2021',
    startYear: '2020',
    endYear: '2021',
    location: 'Kochi, India',
    tasks: [
      'Working with Flutter Development Team.',
      'Responsive UI for Flutter apps.',
      'Flutter Widgets.',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'st-marys-bca',
    degree: 'Bachelor of Computer Application (BCA)',
    institution: 'St.Mary’s College of Commerce and Management Studies',
    period: '07/2015 - 03/2018',
    startYear: '2015',
    endYear: '2018',
    location: 'Kochi, India',
    courses: ['BCA'],
  },
];

// Unified chronological path (earliest to latest + Next)
export const TIMELINE: TimelineEntry[] = [
  {
    id: 'edu-bca',
    year: '2015 — 2018',
    title: 'Bachelor of Computer Application (BCA)',
    place: 'St.Mary’s College of Commerce and Management Studies',
    location: 'Kochi, India',
    type: 'education',
    details: ['Undergraduate Degree in Computer Applications (BCA)', 'Foundation in algorithms, databases, OOP, and software systems'],
  },
  {
    id: 'exp-intern',
    year: '2020 — 2021',
    title: 'Flutter Intern',
    place: 'WebSoulLabs',
    location: 'Kochi, India',
    type: 'experience',
    details: [
      'Working with Flutter Development Team.',
      'Responsive UI for Flutter apps.',
      'Flutter Widgets mastery and component architecture.',
    ],
  },
  {
    id: 'exp-dev',
    year: '2021 — 2022',
    title: 'Flutter Developer',
    place: 'Indbytes Technologies',
    location: 'Kochi, India',
    type: 'experience',
    details: [
      'Building the whole app from A to Z.',
      'Complex UI Designs and API Integration.',
    ],
  },
  {
    id: 'exp-swe',
    year: '2022 — Present',
    title: 'Software Engineer',
    place: 'HiFx',
    location: 'Kochi, India',
    type: 'experience',
    details: [
      'Working with wider development team.',
      'Manage App modules in Super-App.',
      'Optimizing Android Ios and Web apps.',
    ],
  },
  {
    id: 'timeline-next',
    year: 'Next',
    title: 'Your Engineering Team?',
    place: 'Open to High-Impact Opportunities',
    location: 'Remote / On-site',
    type: 'next',
    details: [
      'Looking for an opportunity with a professional team to gain experience in Testing Flutter apps and design patterns.',
    ],
  },
];

// Achievements cards: platform rankings + verified resume milestones
export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-exp',
    index: '01 / 06',
    metric: 4,
    suffix: '+',
    label: 'Years Experience',
    caption: 'Production Software Engineering',
    detail: 'Professional journey across enterprise and client-facing Flutter apps',
    platform: 'Flutter Ecosystem',
    brandColor: '#02569B',
    logo: 'flutter',
  },
  {
    id: 'ach-apps',
    index: '02 / 06',
    metric: 4,
    suffix: '',
    label: 'Featured Applications',
    caption: 'Production & Architecture',
    detail: 'SuperApp Modules, AI Chat with ChatGPT, ToDo CRUD, Kids Educational',
    platform: 'Mobile & Web',
    brandColor: '#3DDC84',
    logo: 'android',
  },
  {
    id: 'ach-roles',
    index: '03 / 06',
    metric: 3,
    suffix: '',
    label: 'Companies & Teams',
    caption: 'Career Progression',
    detail: 'WebSoulLabs → Indbytes Technologies → HiFx',
    platform: 'Engineering Career',
    brandColor: '#0d0d0d',
    logo: 'git',
  },
  {
    id: 'ach-platforms',
    index: '04 / 06',
    metric: 3,
    suffix: '',
    label: 'Target Platforms',
    caption: 'Multi-Platform Mastery',
    detail: 'Optimized unified codebases across Android, iOS, and Web',
    platform: 'Multi-Platform',
    brandColor: '#FFCA28',
    logo: 'firebase',
  },
  {
    id: 'ach-dsa',
    index: '05 / 06',
    metric: 350,
    suffix: '+',
    label: 'Problems Solved',
    caption: 'Algorithms & Data Structures',
    detail: 'Consistent problem solving across data structures and algorithmic complexity',
    platform: 'LeetCode / DSA',
    brandColor: '#FFA116',
    logo: 'storage',
  },
  {
    id: 'ach-releases',
    index: '06 / 06',
    metric: 12,
    suffix: '+',
    label: 'Production Releases',
    caption: 'App Stores Deployment',
    detail: 'Store submissions, version cycles and updates on Google Play & App Store',
    platform: 'Google Play & App Store',
    brandColor: '#0288D1',
    logo: 'publish',
  },
];

// Placeholder certifications ready for user editing
export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-flutter',
    index: '01',
    title: 'Flutter & Dart Complete Architecture Masterclass',
    issuer: 'Google Developers / Udemy',
    year: '2023',
    link: 'https://github.com/athulsimon',
  },
  {
    id: 'cert-state',
    index: '02',
    title: 'Advanced State Management & BLoC Pattern in Production',
    issuer: 'Flutter Community / Very Good Ventures',
    year: '2023',
    link: 'https://github.com/athulsimon',
  },
  {
    id: 'cert-testing',
    index: '03',
    title: 'Unit, Widget & Integration Testing for Flutter Applications',
    issuer: 'Codemagic CI/CD Academy',
    year: '2024',
    link: 'https://github.com/athulsimon',
  },
  {
    id: 'cert-firebase',
    index: '04',
    title: 'Firebase for Mobile Developers Certification',
    issuer: 'Google Cloud Training',
    year: '2022',
    link: 'https://github.com/athulsimon',
  },
];

export const LANGUAGES = [
  { name: 'English', proficiency: 'Full Professional Proficiency' },
  { name: 'Malayalam', proficiency: 'Native or Bilingual Proficiency' },
];

export const INTERESTS = ['Tech', 'Travel', 'Food', 'Music'];

// Navigation items matching non-empty sections
export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];
