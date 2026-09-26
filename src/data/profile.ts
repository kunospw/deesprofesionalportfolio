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
    "Software Developer at Kairos",
    ".NET · Next.js · Flutter",
    "Game Developer on weekends",
  ],
  tagline: "Blending creativity and logic like a witchcraft spell.",
  intro:
    "I build production apps end to end, from .NET APIs and Next.js dashboards to Flutter mobile apps and ERP integrations.",
  location: "Bekasi, Indonesia",
  mapsUrl: "https://maps.google.com/?q=Bekasi%2C%20Indonesia",
  email: "dyahrini908@gmail.com",
  phone: "+62 812 9859 0798",
  cv: "/Dyah_Puspo_RIni_CV.pdf",
  cvFileName: "Dyah_Puspo_Rini_CV.pdf",
  /** From the back of Dee's ID card. */
  quote: "I am inimitable, I am an original.",
  about: [
    "I'm Dee, a full-stack developer at Kairos Solutions, based in Bekasi, Indonesia. I build and support client products on top of Epicor Kinetic ERP: ASP.NET Core APIs, React and Next.js web apps, Flutter mobile apps, and the ERP configuration that ties them together.",
    "I like owning a product end to end. I've taken an invoice-delivery platform through go-live and hardened it for production, and I'm now the sole developer on a fleet-management system, from requirements and QA with the client to Play Store releases.",
    "Before Kairos I studied Informatics and completed 250 hours of full-stack, cloud and DevOps training at the KADA Bootcamp. I still build pixel-art games in Unity on the side, which is where my eye for detail comes from.",
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
      "ASP.NET Core 8 APIs, React and Next.js front-ends, SignalR real-time features and Docker deployments, shipped to production for real clients.",
  },
  {
    icon: "mobile",
    title: "Mobile Apps",
    description:
      "Flutter apps for drivers, outlets and field staff, including iOS builds and code signing and Play Store release management.",
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
      "Go-live checklists, runbooks and root-cause write-ups, plus onboarding guides, dev standards and knowledge-sharing sessions for the team.",
  },
] as const;
