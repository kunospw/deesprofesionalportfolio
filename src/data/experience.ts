import type { StaticImageData } from "next/image";

import KadaPhoto from "@/assets/KADAEX.jpeg";
import TechXPhoto from "@/assets/techx.jpg";
import TemuAlumniPhoto from "@/assets/TemuAlumni.png";
import WeBageLiberPhoto from "@/assets/WeBageLiber.png";
import InternshipPhoto from "@/assets/Magang.png";

export type ExperienceMedia =
  | { kind: "image"; src: StaticImageData }
  | { kind: "video"; youtubeId: string };

export type Experience = {
  id: string;
  role: string;
  organization: string;
  context?: string;
  period: string;
  type: "Bootcamp" | "Committee" | "Volunteer" | "Organizer" | "Project" | "Internship";
  bullets: string[];
  tags: string[];
  media?: ExperienceMedia;
};

export const experiences: Experience[] = [
  {
    id: "kada",
    role: "Bootcamp Participant",
    organization: "KADA Bootcamp",
    context: "NIPA Global ICT Portal (GIP)",
    period: "Jun 2024 – Aug 2024",
    type: "Bootcamp",
    bullets: [
      "Completed 250 hours of intensive training covering web development, backend, cloud services and DevOps, finishing with a capstone project.",
      "Applied data analysis and UI/UX principles in capstone projects shaped around industry needs.",
      "Worked with peers using industry-standard tools and practices to solve practical tech problems.",
    ],
    tags: ["Web Development", "Backend", "Cloud Services", "DevOps", "Capstone"],
    media: { kind: "image", src: KadaPhoto },
  },
  {
    id: "techx",
    role: "Decoration Team Member",
    organization: "PUMA Informatics × PUMA Information System",
    context: "Tech Exploration 2024",
    period: "Jun 2024 – Oct 2024",
    type: "Committee",
    bullets: [
      "Developed the event's visual concept together with the team.",
      "Built custom event props to match the design direction.",
      "Helped decorate the venue and stage for the Computer Science student event.",
    ],
    tags: ["Design", "Teamwork", "Event Management"],
    media: { kind: "image", src: TechXPhoto },
  },
  {
    id: "pulau-pramuka",
    role: "Documentation Lead",
    organization: "Social Project, Pulau Pramuka",
    period: "May 2024 – Jun 2024",
    type: "Volunteer",
    bullets: [
      "Designed the banner and visual material for the exhibition.",
      "Edited recap videos and handled documentation during the event.",
      "Took part in mangrove planting as part of an environmental initiative.",
    ],
    tags: ["Environment", "Documentation", "Video Editing"],
    media: { kind: "video", youtubeId: "BLLQIHAuIlQ" },
  },
  {
    id: "temu-alumni",
    role: "Event Organizer (PIC)",
    organization: "PUMA Informatics",
    context: "Temu Alumni 2024",
    period: "Feb 2024 – May 2024",
    type: "Organizer",
    bullets: [
      "Curated the event theme and chose alumni speakers aligned with its goals.",
      "Designed the rundown and managed venue setup and logistics.",
      "The event led to students getting free access to a Google Cloud bootcamp through Digitalent.",
    ],
    tags: ["Leadership", "Event Planning", "Networking"],
    media: { kind: "image", src: TemuAlumniPhoto },
  },
  {
    id: "webage-liber",
    role: "Web Developer",
    organization: "CharBage Developer Team",
    context: "WeBage Liber",
    period: "Sep 2022 – Dec 2022",
    type: "Project",
    bullets: [
      "Developed a prototype school library website with HTML, CSS and PHP.",
      "Built the core pages, styled the layout with Bootstrap and implemented CRUD features and form handling.",
      "Worked with the school library staff to gather feedback and improve usability.",
    ],
    tags: ["Web Development", "PHP", "Bootstrap"],
    media: { kind: "image", src: WeBageLiberPhoto },
  },
  {
    id: "teluk-pucung",
    role: "Administrative Assistant Intern",
    organization: "Teluk Pucung Sub-District Office",
    period: "Jan 2022 – Apr 2022",
    type: "Internship",
    bullets: [
      "Organized and processed administrative documents for 30+ residents per day.",
      "Recapped PBB (land and building tax) data from Excel into the government database system.",
      "Handled data entry for 4 RW covering 40–120 RT, over 1,600 resident entries in total.",
    ],
    tags: ["Administration", "Data Entry", "Government"],
    media: { kind: "image", src: InternshipPhoto },
  },
];
