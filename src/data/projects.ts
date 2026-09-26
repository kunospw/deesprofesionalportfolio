import type { StaticImageData } from "next/image";

import WordIT from "@/assets/wordit.png";
import GeekyNerds from "@/assets/geekynerds.png";
import InsightHub from "@/assets/insighthub.png";
import InternTrack from "@/assets/Interntrack.png";
import JobHive from "@/assets/JobHive.png";
import Hanoman from "@/assets/Hanoman.png";
import Blessed from "@/assets/Blessed.png";
import Raturu from "@/assets/Raturu.png";
import Faeza from "@/assets/image.png";

export type ProjectCategory = "client" | "web" | "game";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  tech: string[];
  status: "completed" | "in-progress";
  /** Screenshot; video projects fall back to their YouTube thumbnail. */
  image?: StaticImageData;
  youtubeId?: string;
  /** Opened in a new tab. */
  href?: string;
  hrefLabel?: "Live site" | "View on itch.io";
  /** Playable itch.io upload shown in a dialog. */
  playEmbed?: string;
  context?: string;
};

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] =
  [
    { id: "all", label: "All" },
    { id: "client", label: "Client work" },
    { id: "web", label: "Web" },
    { id: "game", label: "Games" },
  ];

export const projects: Project[] = [
  {
    id: "invoice-delivery",
    title: "Invoice Delivery Platform",
    category: "client",
    description:
      "Pulls invoices from Epicor Kinetic, builds PDF packages and delivers them by email or Google Drive based on each customer's preference. I took it through go-live, built sync reconciliation with run history and alerts, and hardened it with a circuit breaker. First week live: 362 invoices, zero send errors.",
    tech: ["ASP.NET Core 8", "Next.js", "Epicor Kinetic", "Docker"],
    status: "completed",
    context: "Kairos Solutions",
  },
  {
    id: "fleet-management",
    title: "Fleet Management System",
    category: "client",
    description:
      "A planner web app, a driver mobile app and a real-time API for a logistics company. I own it end to end: requirements, QA with the client, live driver tracking and route maps, ERP-rendered work orders and Play Store releases.",
    tech: ["React", "Flutter", ".NET 8", "SignalR", "Epicor Kinetic"],
    status: "in-progress",
    context: "Kairos Solutions",
  },
  {
    id: "operations-app",
    title: "Restaurant Operations App",
    category: "client",
    description:
      "Mobile operations app for a restaurant chain's outlets. I handled iOS builds and code signing, and root-caused duplicate purchase-order and inventory-transfer entries reported by outlets.",
    tech: ["Flutter", ".NET", "iOS", "Epicor Kinetic"],
    status: "completed",
    context: "Kairos Solutions",
  },
  {
    id: "time-entry",
    title: "Time Entry & Proof of Delivery",
    category: "client",
    description:
      "Clock-in and proof-of-delivery mobile apps. I shipped iOS deployments, fixed clock-out edge cases and produced an actual-vs-billable hours report that shaped a change request.",
    tech: ["Flutter", "iOS", "Epicor Kinetic"],
    status: "completed",
    context: "Kairos Solutions",
  },
  {
    id: "wordit",
    title: "WordIT",
    category: "web",
    description:
      "A Wordle-style word game where every answer is IT terminology or tech lingo.",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    status: "completed",
    image: WordIT,
    href: "https://wordit-game.vercel.app/",
    hrefLabel: "Live site",
  },
  {
    id: "geekynerds",
    title: "GeekyNerds.io",
    category: "web",
    description:
      "An IT bookstore with ratings, prices, category search and a working cart.",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    status: "completed",
    image: GeekyNerds,
    href: "https://geekynerdsio.vercel.app/",
    hrefLabel: "Live site",
  },
  {
    id: "insighthub",
    title: "InsightHub",
    category: "web",
    description:
      "An AI news portal that brings together The Guardian, GNews and NewsAPI.",
    tech: ["React", "Tailwind CSS", "News APIs", "AI"],
    status: "completed",
    image: InsightHub,
    href: "https://insighthubweb.vercel.app/",
    hrefLabel: "Live site",
  },
  {
    id: "interntrack",
    title: "Internship Tracker",
    category: "web",
    description:
      "A lightweight tracker for internship applications that keeps everything in local storage.",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "in-progress",
    image: InternTrack,
    href: "https://interntrackme.vercel.app/",
    hrefLabel: "Live site",
  },
  {
    id: "jobhive",
    title: "Job Hive",
    category: "web",
    description:
      "A job portal with AI-powered CV analysis and role-based authentication.",
    tech: ["React", "Node.js", "Express", "MongoDB", "GPT-4o"],
    status: "completed",
    image: JobHive,
    href: "https://sonervous.site/",
    hrefLabel: "Live site",
  },
  {
    id: "hanoman",
    title: "Hanoman Adventure",
    category: "game",
    description: "A pixel-art platformer built in Unity as a commission.",
    tech: ["Unity", "C#", "Pixel Art"],
    status: "completed",
    image: Hanoman,
    playEmbed: "https://itch.io/embed-upload/14241671?color=bababa",
    context: "Commission",
  },
  {
    id: "blessed",
    title: "Blessed Are the Peacemakers",
    category: "game",
    description:
      "A narrative pixel-art western made in Unity as an academic project.",
    tech: ["Unity", "C#", "Aseprite", "Pixel Art"],
    status: "completed",
    image: Blessed,
    playEmbed: "https://itch.io/embed-upload/14252047?color=333333",
    context: "Academic project",
  },
  {
    id: "raturu",
    title: "Raturu: Homefever",
    category: "game",
    description: "An experimental Unity game made with my team for GIMJAM ITB 2025.",
    tech: ["Unity", "Blender", "C#"],
    status: "completed",
    image: Raturu,
    href: "https://baraaaa.itch.io/raturu-home-fever",
    hrefLabel: "View on itch.io",
    context: "Game jam",
  },
  {
    id: "faeza",
    title: "Faeza Store",
    category: "web",
    description:
      "An e-commerce web app with an admin dashboard, built on React and Firebase.",
    tech: ["React", "Firebase", "JavaScript"],
    status: "completed",
    image: Faeza,
    href: "https://faeza-store.vercel.app/",
    hrefLabel: "Live site",
  },
];
