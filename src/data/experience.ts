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
  type: "Full-time" | "Bootcamp" | "Organizer" | "Project";
  bullets: string[];
  tags: string[];
  media?: ExperienceMedia;
};

export const experiences: Experience[] = [
  {
    id: "kairos",
    role: "Software Developer (Full-Stack)",
    organization: "Kairos Solutions",
    context: "Client products built on Epicor Kinetic ERP",
    period: "May 2026 – Present",
    type: "Full-time",
    bullets: [
      "Build and support around half a dozen client products end to end: .NET 8 APIs, React/Next.js web apps, Flutter mobile apps and Epicor Kinetic configuration (BPMs, BAQs, DMT data loads).",
      "Took an invoice-delivery platform through production go-live; it delivered 362 invoices in its first week with zero send errors across roughly 90,000 log lines.",
      "Led resilience work during an ERP outage, adding a circuit breaker and configurable timeouts, and cut the service's Docker build context from 2.8 GB to about 1 MB.",
      "Became sole developer and owner of a fleet-management product (React planner, Flutter driver app, .NET 8 API with SignalR) and handle iOS and Play Store releases across projects.",
      "Wrote the team's onboarding guide, development handbook, workflow standards and deployment guides, and ran internal knowledge-sharing sessions.",
    ],
    tags: [".NET 8", "ASP.NET Core", "Next.js", "React", "Flutter", "Epicor Kinetic", "Docker"],
  },
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
];
