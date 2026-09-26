export type Service = {
  id: string;
  icon: "landing" | "portfolio" | "game";
  title: string;
  description: string;
  features: string[];
  tech: string[];
  /** Set this once the gig is live on Fiverr. */
  fiverrUrl?: string;
};

export const services: Service[] = [
  {
    id: "landing-page",
    icon: "landing",
    title: "Simple Landing Page",
    description:
      "A clean, fast landing page that turns visitors into customers. A good fit for small businesses and startups getting online.",
    features: ["Mobile responsive", "Contact form", "SEO basics", "Fast loading"],
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "portfolio-website",
    icon: "portfolio",
    title: "Portfolio Website",
    description:
      "A custom portfolio for freelancers, artists and professionals that shows off your work and feels like you.",
    features: ["Custom design", "Project showcase", "Contact section", "Mobile friendly"],
    tech: ["React", "Tailwind CSS"],
  },
  {
    id: "game-development",
    icon: "game",
    title: "Game Development",
    description:
      "Small 2D indie games and interactive stories, from educational games to quirky gameplay ideas.",
    features: ["2D platformers", "Puzzle games", "Interactive stories", "Custom mechanics"],
    tech: ["Unity", "C#", "Pixel Art"],
  },
];

export const workPolicy = [
  {
    label: "Timeline",
    text: "Delivery in about 3 business days. If something with higher priority comes up, I'll tell you upfront.",
  },
  {
    label: "Process",
    text: "You fill in a short requirements form and I share style references. No video calls needed.",
  },
  {
    label: "Pricing",
    text: "I'm a college student too, so pricing is student-friendly without cutting corners on quality.",
  },
  {
    label: "Revisions",
    text: "Two free revisions included. Extra changes are available for a small fee.",
  },
];
