import {
  Award,
  Briefcase,
  CodeXml,
  FolderOpen,
  House,
  Mail,
  User,
} from "lucide-react";

export const sections = [
  { id: "home", label: "Home", icon: House },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "skills", label: "Skills", icon: CodeXml },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

export type SectionId = (typeof sections)[number]["id"];
