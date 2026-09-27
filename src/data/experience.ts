import type { StaticImageData } from "next/image";

import KadaPhoto from "@/assets/KADAEX.jpeg";
import TemuAlumniPhoto from "@/assets/TemuAlumni.png";
import WeBageLiberPhoto from "@/assets/WeBageLiber.png";

export type ExperienceMedia =
  | { kind: "image"; src: StaticImageData }
  | { kind: "video"; youtubeId: string };

export type Experience = {
  id: string;
  role: string;
  organization: string;
  context?: string;
  period: string;
  type: "Internship" | "Bootcamp" | "Organizer" | "Project";
  bullets: string[];
  tags: string[];
  media?: ExperienceMedia;
};

export const experiences: Experience[] = [
  {
    id: "kairos",
    role: "Software Developer Intern",
    organization: "Kairos Business Solutions",
    context: "Web and mobile apps integrated with Epicor Kinetic ERP",
    period: "Apr 2026 – Present",
    type: "Internship",
    bullets: [
      "Develop and maintain 5 full-stack web and mobile applications (.NET, React/Next.js, Flutter) integrated with Epicor Kinetic ERP.",
      "Handle deployments, go-lives and production support, including data migration and root-cause analysis; one go-live delivered 362 invoices in its first week with no application errors.",
      "Sole developer on a fleet-management product: React planner, Flutter driver app and a .NET 8 API with SignalR, through to Play Store releases.",
      "Gather requirements, run QA and user acceptance testing, and have written 10 technical, deployment and onboarding guides for the team.",
    ],
    tags: [".NET 8", "ASP.NET Core", "Next.js", "React", "Flutter", "Epicor Kinetic", "Docker"],
  },
  {
    id: "hyoshii",
    role: "Android / Mobile Developer Intern",
    organization: "PT Hyoshii Agri Sejahtera",
    context: "Internal farm-operations dashboard",
    period: "Oct 2025 – Apr 2026",
    type: "Internship",
    bullets: [
      "Developed and maintained the internal mobile dashboard in React Native to support farm operations.",
      "Integrated real-time API endpoints for pesticide usage, mortality reports, nutrient management and greenhouse metrics.",
      "Maintained and improved the mobile platform growers use daily.",
    ],
    tags: ["React Native", "REST APIs", "Android"],
  },
  {
    id: "research-assistant",
    role: "Research Assistant Intern",
    organization: "President University",
    context: "Physiological simulation research",
    period: "Sep 2025 – Jan 2026",
    type: "Internship",
    bullets: [
      "Helped develop a Unity-based physiological simulation modelling fatigue and heat stress.",
      "Worked with CTGAN-generated datasets, CSV ingestion and vital-sign modelling.",
      "Collaborated with faculty and research partners on deliverables aligned with academic standards.",
    ],
    tags: ["Unity", "C#", "Data Modelling", "Research"],
  },
  {
    id: "kada",
    role: "Bootcamp Participant",
    organization: "KADA Bootcamp",
    context: "NIPA Global ICT Portal (GIP)",
    period: "Jun 2025 – Aug 2025",
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
    id: "temu-alumni",
    role: "Event Organizer (PIC)",
    organization: "PUMA Informatics",
    context: "Temu Alumni 2024",
    period: "Feb 2024 – May 2024",
    type: "Organizer",
    bullets: [
      "Curated the event theme and chose two alumni speakers aligned with its goals.",
      "Designed the rundown and managed venue setup and logistics.",
      "The event led to students getting free access to a Google Cloud bootcamp through Digitalent.",
    ],
    tags: ["Leadership", "Event Planning", "Networking"],
    media: { kind: "image", src: TemuAlumniPhoto },
  },
  {
    id: "webage-liber",
    role: "Web Developer",
    organization: "WeBage Liber",
    context: "Developer Team",
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
];
