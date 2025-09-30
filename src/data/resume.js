import Techx from '../assets/techx.jpg';
import TemuAlumni from '../assets/TemuAlumni.png';
import Magang from '../assets/Magang.png';
import WeBageLiber from '../assets/WeBageLiber.png';
import KADA from '../assets/kada.jpeg';
import Gimjam from '../assets/gimjam.jpg';
import GenAI from '../assets/genai.jpg';
import DET from '../assets/det.jpg';
import TOEIC from '../assets/toeic.jpg';
import Prep from '../assets/prep.jpg';
import LSP from '../assets/lsp.jpg';
import KADAEX from '../assets/KADAEX.jpeg';

export const experiences = [
  {
    id: 1,
    title: 'Bootcamp Participant, Participant, KADA Bootcamp – NIPA 글로벌ICT포털(GIP) | 해외IT동향 · 정보제공',
    shortTitle: 'KADA Bootcamp 2024',
    duration: 'Jun 2024 – Aug 2024',
    description: [
      'Completed 250 hours of intensive training covering web development, backend, cloud services, and DevOps, culminating in a capstone project.',
      'Applied data analysis and UI/UX principles in capstone projects that matched the demands of the industry.',
      'Worked together with peers to use industry-standard tools and practices to tackle practical tech problems.',
    ],
    type: 'image',
    imageUrl: KADAEX,
    guild: 'KADA Bootcamp',
    role: 'Participant',
    tags: ['Web Development', 'Backend', 'Cloud Services', 'DevOps', 'Capstone Project'],
  },
  {
    id: 2,
    title: 'Decoration, Member, PUMA Informatics X PUMA Information System Tech Exploration 2024',
    shortTitle: 'Tech Exploration 2024',
    duration: 'Jun 2024 - Oct 2024',
    description: [
      'Worked collaboratively to create concept visual themes.',
      'Created custom event props to match the design direction.',
      'Assisted in venue and stage decoration for the Computer Science student event.',
    ],
    type: 'image',
    imageUrl: Techx,
    guild: 'PUMA Informatics',
    role: 'Decorator',
    tags: ['Design', 'Teamwork', 'Event Management'],
  },
  {
    id: 3,
    title: 'Volunteer, Documentation Team, Social Project, Pulau Pramuka',
    shortTitle: 'Pulau Pramuka Social Project',
    duration: 'May 2024 - Jun 2024',
    description: [
      'Designed banner and visual material for the exhibition.',
      'Edited recap videos and assisted in documentation during the event.',
      'Participated in mangrove planting activities as part of an environmental initiative.',
    ],
    type: 'video',
    embedUrl: 'https://www.youtube.com/embed/BLLQIHAuIlQ?si=EfuG7_SsRdqhIHTI',
    guild: 'Social Project',
    role: 'Documentation Lead',
    tags: ['Environment', 'Documentation', 'Video Editing'],
  },
  {
    id: 4,
    title: 'Event Organizer, Person in Charge (PIC), PUMA Informatics Temu Alumni 2024',
    shortTitle: 'Temu Alumni 2024',
    duration: 'Feb 2024 - May 2024',
    description: [
      'Curated the event theme and selected alumni speakers aligned with the event goals.',
      "Designed the event rundown and managed venue setup and logistics.",
      'The event resulted in student access to a free Google Cloud bootcamp via Digitalent.',
    ],
    type: 'image',
    imageUrl: TemuAlumni,
    guild: 'PUMA Informatics',
    role: 'Event Organizer',
    tags: ['Leadership', 'Event Planning', 'Networking'],
  },
  {
    id: 5,
    title: 'Web Developer, Developer Team, WeBage Liber',
    shortTitle: 'WeBage Liber Development',
    duration: 'Sep 2022 - Dec 2022',
    description: [
      'Developed a prototype school library website using HTML, CSS, and PHP.',
      'Built core page structures, styled front-end layout using Bootstrap, and implemented basic CRUD functions and form handling.',
      'Collaborated with school library staff to gather feedback and improve usability.',
    ],
    type: 'image',
    imageUrl: WeBageLiber,
    guild: 'CharBage',
    role: 'Web Developer',
    tags: ['Web Development', 'PHP', 'Bootstrap'],
  },
  {
    id: 6,
    title: 'Intern, Administrative Assistant, Teluk Pucung Sub-District Office',
    shortTitle: 'Government Internship',
    duration: 'Jan 2022 - Apr 2022',
    description: [
      'Organized and processed administrative documents for 30+ residents per day.',
      'Inputted and recapped PBB (Land and Building Tax) data from Excel into the government database system.',
      'Handled data entry for 4 RW, covering 40-120 RT and up to 1,600+ resident entries in total.',
    ],
    type: 'image',
    imageUrl: Magang,
    guild: 'Government Office',
    role: 'Administrative Assistant',
    tags: ['Administration', 'Data Entry', 'Government'],
  },
]

export const achievements = [
  {
    id: 1,
    title: 'KADA Bootcamp',
    description: 'Completed Full-Stack Web Development intensive training through NIPA Global ICT Portal (GIP).',
    date: '2024',
    skills: ['React', 'Node.js', 'Full-Stack Development'],
    category: 'bootcamp',
    imageUrl: KADA,
  },
  {
    id: 2,
    title: 'ITB GIMJAM 2025',
    description: 'Participated in Ganesha Interactive Media game jam event at Institut Teknologi Bandung.',
    date: 'Mar 2025',
    skills: ['Unity', 'Game Development', 'Team Collaboration'],
    category: 'competition',
    imageUrl: Gimjam,
  },
  {
    id: 3,
    title: 'Generative AI for Information System',
    description: 'Completed Thematic Academy program through Digital Talent Scholarship.',
    date: 'Jul 2024',
    skills: ['AI', 'Machine Learning', 'Information Systems'],
    category: 'certification',
    imageUrl: GenAI,
  },
  {
    id: 4,
    title: 'Duolingo English Test',
    description: 'Achieved proficiency score of 120 (Valid until Oct 2025).',
    date: 'Oct 2023',
    skills: ['English Proficiency', 'Communication'],
    category: 'language',
    imageUrl: DET,
  },
  {
    id: 5,
    title: 'TOEIC Excellence',
    description: 'Scored 865 on TOEIC by ETS Global B.V. (Valid until Dec 2024).',
    date: 'Dec 2022',
    skills: ['English Proficiency', 'Business English'],
    category: 'language',
    imageUrl: TOEIC,
  },
  {
    id: 6,
    title: 'TOEIC Preparation Course',
    description: 'Completed 20-hour intensive TOEIC preparation course with WELTS.',
    date: 'Dec 2022',
    skills: ['Test Preparation', 'English'],
    category: 'training',
    imageUrl: Prep,
  },
  {
    id: 7,
    title: 'Web Development Skill Passport',
    description: 'Certified by LSP SMKN 5 Kota Bekasi (Valid until Jun 2025).',
    date: 'Jun 2022',
    skills: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
    category: 'certification',
    imageUrl: LSP,
  },
]
