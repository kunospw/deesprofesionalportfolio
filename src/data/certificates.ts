import type { StaticImageData } from "next/image";

import Kada from "@/assets/kada.jpeg";
import Gimjam from "@/assets/gimjam.jpg";
import GenAI from "@/assets/genai.jpg";
import DET from "@/assets/det.jpg";
import TOEIC from "@/assets/toeic.jpg";
import Prep from "@/assets/prep.jpg";
import LSP from "@/assets/lsp.jpg";

export type Certificate = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "Bootcamp" | "Competition" | "Certification" | "Language" | "Training";
  skills: string[];
  image: StaticImageData;
};

export const certificates: Certificate[] = [
  {
    id: "kada",
    title: "KADA Bootcamp",
    description:
      "Completed intensive full-stack web development training through the NIPA Global ICT Portal (GIP).",
    date: "2024",
    category: "Bootcamp",
    skills: ["React", "Node.js", "Full-Stack Development"],
    image: Kada,
  },
  {
    id: "gimjam",
    title: "ITB GIMJAM 2025",
    description:
      "Took part in the Ganesha Interactive Media game jam at Institut Teknologi Bandung.",
    date: "Mar 2025",
    category: "Competition",
    skills: ["Unity", "Game Development", "Team Collaboration"],
    image: Gimjam,
  },
  {
    id: "genai",
    title: "Generative AI for Information Systems",
    description:
      "Completed the Thematic Academy program through the Digital Talent Scholarship.",
    date: "Jul 2024",
    category: "Certification",
    skills: ["AI", "Machine Learning", "Information Systems"],
    image: GenAI,
  },
  {
    id: "det",
    title: "Duolingo English Test",
    description: "Scored 120 on the Duolingo English Test (valid until Oct 2025).",
    date: "Oct 2023",
    category: "Language",
    skills: ["English Proficiency", "Communication"],
    image: DET,
  },
  {
    id: "toeic",
    title: "TOEIC",
    description: "Scored 865 on the TOEIC by ETS Global B.V. (valid until Dec 2024).",
    date: "Dec 2022",
    category: "Language",
    skills: ["English Proficiency", "Business English"],
    image: TOEIC,
  },
  {
    id: "toeic-prep",
    title: "TOEIC Preparation Course",
    description: "Completed a 20-hour intensive TOEIC preparation course with WELTS.",
    date: "Dec 2022",
    category: "Training",
    skills: ["Test Preparation", "English"],
    image: Prep,
  },
  {
    id: "lsp",
    title: "Web Development Skill Passport",
    description:
      "Certified by LSP SMKN 5 Kota Bekasi (valid until Jun 2025).",
    date: "Jun 2022",
    category: "Certification",
    skills: ["Web Development", "HTML", "CSS", "JavaScript"],
    image: LSP,
  },
];
