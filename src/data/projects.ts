import type { StaticImageData } from "next/image";

import FamilyStore from "@/assets/FamilyStore.png";
import Hanoman from "@/assets/Hanoman.png";
import JobHive from "@/assets/JobHive.png";

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: "completed" | "in-progress";
  context: string;
  year: string;
  /** Client work: private code, so no screenshot or link. */
  client?: boolean;
  image?: StaticImageData;
  href?: string;
  hrefLabel?: string;
  /** Playable itch.io upload shown in a dialog. */
  playEmbed?: string;
};

export const projects: Project[] = [
  {
    id: "invoice-delivery",
    title: "Invoice Delivery Application",
    description:
      "Pulls invoices from Epicor Kinetic, packages them as PDFs and delivers them by email or Google Drive according to each customer's delivery preference. I supported the go-live and monitoring: 362 invoices went out in the first week with no application errors. I also added sync reconciliation with run history and alerts, and a circuit breaker for ERP outages.",
    tech: ["ASP.NET Core 8", "Next.js", "Epicor Kinetic", "Google Drive API", "Docker"],
    status: "completed",
    context: "Kairos",
    year: "2026",
    client: true,
  },
  {
    id: "fleet-management",
    title: "Fleet Management System",
    description:
      "A planner web app, a driver mobile app and a real-time API. I'm the sole developer: requirements, QA and user acceptance testing, live driver tracking and route maps, ERP-rendered work orders and Play Store releases.",
    tech: ["React", "Flutter", ".NET 8", "SignalR", "Epicor Kinetic"],
    status: "in-progress",
    context: "Kairos",
    year: "2026",
    client: true,
  },
  {
    id: "start-triage",
    title: "START Triage Simulation",
    description:
      "A Roblox emergency-triage training simulation with ESP32 hardware controls, patient deterioration scenarios, vital-sign inputs, and single-player and multiplayer modes.",
    tech: ["Roblox Studio", "Luau", "ESP32"],
    status: "completed",
    context: "Training simulation",
    year: "2026",
  },
  {
    id: "jobhive",
    title: "Job Hive",
    description:
      "A job portal with AI-powered CV analysis using GPT-4o for job matching and recommendations. I built the backend APIs with Node.js, Express and MongoDB, and role-based authentication.",
    tech: ["React", "Node.js", "Express", "MongoDB", "GPT-4o"],
    status: "completed",
    context: "KADA Bootcamp capstone",
    year: "2025",
    image: JobHive,
    href: "https://sonervous.site/",
    hrefLabel: "Live site",
  },
  {
    id: "vr-courtroom",
    title: "VR Courtroom Game",
    description:
      "An educational, narrative-driven VR courtroom simulation built with President University's Law Study Program, to support law-student training and serve as an accreditation demo.",
    tech: ["Unity", "C#", "VR"],
    status: "completed",
    context: "Law Study Program",
    year: "2025",
  },
  {
    id: "hanoman",
    title: "Hanoman Adventure",
    description:
      "A 2D platformer in Unity based on the story of Hanoman, built as a commission by combining the provided assets with custom gameplay systems.",
    tech: ["Unity", "C#", "Pixel Art"],
    status: "completed",
    context: "Commission",
    year: "2025",
    image: Hanoman,
    playEmbed: "https://itch.io/embed-upload/14241671?color=bababa",
  },
  {
    id: "family-store",
    title: "E-commerce Website",
    description:
      "A form-based e-commerce site for a family business, with an admin dashboard for managing products.",
    tech: ["React", "Firebase"],
    status: "completed",
    context: "Family business",
    year: "2025",
    image: FamilyStore,
    href: "https://faeza-store.vercel.app/",
    hrefLabel: "Live site",
  },
];
