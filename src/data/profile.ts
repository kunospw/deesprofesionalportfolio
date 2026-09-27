import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dyahrini.space";

export const profile = {
  name: "Dyah Puspo Rini",
  nickname: "Dee",
  handle: "kunospw",
  wordmark: "dyah.rini",
  role: "Full-Stack Developer",
  /** Cycled by the typewriter in the hero. */
  roles: [
    "Full-Stack Developer",
    "Build · Integrate · Deploy · Support",
    ".NET · Next.js · Flutter",
    "Software Developer Intern at Kairos",
  ],
  tagline: "Blending creativity and logic like a witchcraft spell.",
  intro:
    "Full-stack developer with broad end-to-end experience building, integrating, deploying and supporting production applications.",
  location: "Bekasi, Indonesia",
  mapsUrl: "https://maps.google.com/?q=Bekasi%2C%20Indonesia",
  email: "dyahrini908@gmail.com",
  phone: "+62 812 9859 0798",
  cv: "/Dyah_Puspo_RIni_CV.pdf",
  cvFileName: "Dyah_Puspo_Rini_CV.pdf",
  /** From the back of Dee's ID card. */
  quote: "I am inimitable, I am an original.",
  about: [
    "I'm Dee, a full-stack developer with broad end-to-end experience building, integrating, deploying and supporting production applications. I'm currently a software developer intern at Kairos Business Solutions and an Informatics student at President University, based in Bekasi, Indonesia. I build ASP.NET Core APIs, React and Next.js web apps and Flutter mobile apps integrated with Epicor Kinetic ERP.",
    "My work covers the whole lifecycle: development, deployments and go-lives, production support, QA with users, and the technical documentation that keeps a team moving. I supported an invoice-delivery application through go-live and I'm the sole developer on a fleet-management system.",
    "Before Kairos I built a React Native farm-operations dashboard at PT Hyoshii Agri Sejahtera, helped develop a Unity physiological simulation as a research assistant, and completed 250 hours of full-stack, cloud and DevOps training at the KADA Bootcamp. I still make games and simulations in Unity on the side.",
  ],
} as const;

export type Social = {
  label: string;
  handle: string;
  href: string;
  icon: typeof GitHubIcon;
};

export const socials: Social[] = [
  {
    label: "GitHub",
    handle: "kunospw",
    href: "https://github.com/kunospw",
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    handle: "dyahpusporini",
    href: "https://www.linkedin.com/in/dyahpusporini",
    icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    handle: "@kunospw",
    href: "https://instagram.com/kunospw",
    icon: InstagramIcon,
  },
  {
    label: "Instagram",
    handle: "@lemmerrison",
    href: "https://instagram.com/lemmerrison",
    icon: InstagramIcon,
  },
];

export const highlights = [
  {
    icon: "code",
    title: "Full-Stack Delivery",
    description:
      "ASP.NET Core 8 APIs, React and Next.js front-ends, SignalR real-time features and Docker deployments, shipped to production.",
  },
  {
    icon: "mobile",
    title: "Mobile Apps",
    description:
      "Flutter and React Native apps for operations and field teams, including iOS code signing and Play Store releases.",
  },
  {
    icon: "erp",
    title: "ERP Integration",
    description:
      "Epicor Kinetic BPMs, BAQs and DMT data loads, plus the sync jobs, reconciliation and alerting that keep apps and ERP data in step.",
  },
  {
    icon: "users",
    title: "Ownership & Team",
    description:
      "Go-lives, production support and root-cause analysis, plus 10 technical, deployment and onboarding guides written for the team.",
  },
] as const;
