export type Skill = {
  name: string;
  note: string;
  usedIn?: string[];
};

export type SkillGroup = {
  id: string;
  label: string;
  /** Node colour on the skill tree. */
  color: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#8c8de3",
    skills: [
      {
        name: "React",
        note: "Component-driven interfaces with hooks, routing and API data.",
        usedIn: ["WordIT", "GeekyNerds.io", "InsightHub", "Job Hive", "Faeza Store"],
      },
      {
        name: "Tailwind CSS",
        note: "Utility-first styling for fast, consistent, responsive layouts.",
        usedIn: ["WordIT", "GeekyNerds.io", "InsightHub"],
      },
      {
        name: "JavaScript",
        note: "The glue for everything on the web: DOM, fetch, local storage.",
        usedIn: ["Internship Tracker", "WordIT", "Faeza Store"],
      },
      {
        name: "HTML & CSS",
        note: "Semantic, responsive markup from scratch, with Bootstrap when speed matters.",
        usedIn: ["Internship Tracker", "WeBage Liber"],
      },
    ],
  },
  {
    id: "backend",
    label: "Backend & Data",
    color: "#5eead4",
    skills: [
      {
        name: "Node.js & Express",
        note: "REST APIs with role-based authentication.",
        usedIn: ["Job Hive"],
      },
      {
        name: "MongoDB",
        note: "Document models for users, job listings and applications.",
        usedIn: ["Job Hive"],
      },
      {
        name: "Firebase",
        note: "Backend and admin dashboard for an online store.",
        usedIn: ["Faeza Store"],
      },
      {
        name: "PHP",
        note: "CRUD features and form handling for a school library prototype.",
        usedIn: ["WeBage Liber"],
      },
      {
        name: "AI & News APIs",
        note: "GPT-4o CV analysis, plus stories from The Guardian, GNews and NewsAPI.",
        usedIn: ["Job Hive", "InsightHub"],
      },
    ],
  },
  {
    id: "game",
    label: "Game Dev",
    color: "#fbbf24",
    skills: [
      {
        name: "Unity",
        note: "Platformers, narrative games and game jam prototypes.",
        usedIn: ["Hanoman Adventure", "Blessed Are the Peacemakers", "Raturu: Homefever"],
      },
      {
        name: "C#",
        note: "Gameplay scripting for movement, dialogue and game state.",
        usedIn: ["Hanoman Adventure", "Blessed Are the Peacemakers", "Raturu: Homefever"],
      },
      {
        name: "Pixel Art",
        note: "Sprites, scenes and UI drawn pixel by pixel, including in Aseprite.",
        usedIn: ["Hanoman Adventure", "Blessed Are the Peacemakers"],
      },
      {
        name: "Blender",
        note: "3D assets and animation.",
        usedIn: ["Raturu: Homefever", "Ancient Egypt Animation"],
      },
    ],
  },
  {
    id: "design",
    label: "Design & Media",
    color: "#f472b6",
    skills: [
      {
        name: "Canva",
        note: "Social media posts, banners and event visuals.",
        usedIn: ["Informatics Instagram Posts", "Pulau Pramuka exhibition"],
      },
      {
        name: "After Effects",
        note: "Editing and motion for short-form video.",
        usedIn: ["AMV Edits"],
      },
      {
        name: "Video Editing",
        note: "Recap videos and event documentation.",
        usedIn: ["Pulau Pramuka social project"],
      },
      {
        name: "UI/UX",
        note: "Applying UI/UX principles to capstone and product work.",
        usedIn: ["KADA Bootcamp capstone"],
      },
    ],
  },
  {
    id: "workflow",
    label: "Workflow",
    color: "#a3a3a3",
    skills: [
      {
        name: "Git & GitHub",
        note: "Version control for solo and team projects.",
      },
      {
        name: "Vercel",
        note: "Deploying and hosting web projects.",
        usedIn: ["WordIT", "GeekyNerds.io", "InsightHub", "Faeza Store", "Internship Tracker"],
      },
      {
        name: "Cloud & DevOps",
        note: "Cloud services and DevOps fundamentals.",
        usedIn: ["KADA Bootcamp"],
      },
    ],
  },
];
