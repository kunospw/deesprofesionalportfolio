import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dyahrini.space";

export const profile = {
  name: "Dyah Puspo Rini",
  nickname: "Dee",
  handle: "kunospw",
  wordmark: "dyah.rini",
  role: "Web & Game Developer",
  /** Cycled by the typewriter in the hero. */
  roles: [
    "Web Developer",
    "Game Developer",
    "Informatics Student",
    "Pixel-Art Tinkerer",
  ],
  tagline: "Blending creativity and logic like a witchcraft spell.",
  intro:
    "I build web apps and pixel-art games, and I sweat the small details that make them feel alive.",
  location: "Bekasi, Indonesia",
  mapsUrl: "https://maps.google.com/?q=Bekasi%2C%20Indonesia",
  email: "dyahrini908@gmail.com",
  phone: "+62 812 9859 0798",
  cv: "/Dyah_Puspo_RIni_CV.pdf",
  cvFileName: "Dyah_Puspo_Rini_CV.pdf",
  /** From the back of Dee's ID card. */
  quote: "I am inimitable, I am an original.",
  about: [
    "I'm Dee, an Informatics student and web & game developer from Bekasi, Indonesia. I like building things people can actually use or play: React apps wired to real APIs, and pixel-art games made in Unity.",
    "Most of what I know I learned by shipping. I completed 250 hours of full-stack, cloud and DevOps training at the KADA Bootcamp, studied Generative AI through the Digital Talent Scholarship, and joined game jams like ITB GIMJAM 2025, where our team built Raturu: Homefever.",
    "Outside the editor I organize campus events, design social posts, edit videos and animate in Blender, which is probably why I care so much about how things look and feel.",
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
    title: "Web Development",
    description:
      "React and Tailwind front-ends backed by Node.js, Express, MongoDB or Firebase, from landing pages to full-stack apps with auth and AI features.",
  },
  {
    icon: "game",
    title: "Game Development",
    description:
      "Unity and C# games with hand-made pixel art, built for commissions, coursework and game jams.",
  },
  {
    icon: "palette",
    title: "Design & Motion",
    description:
      "Event and social media visuals in Canva, 3D animation in Blender and video edits in After Effects.",
  },
  {
    icon: "users",
    title: "Community & Events",
    description:
      "Led Temu Alumni 2024 as person in charge, built event decor for Tech Exploration and documented community projects.",
  },
] as const;
