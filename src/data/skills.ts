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
    id: "backend",
    label: "Backend",
    color: "#5eead4",
    skills: [
      {
        name: "ASP.NET Core",
        note: ".NET 8 APIs with background sync jobs, retries, circuit breakers and configurable timeouts.",
        usedIn: ["Invoice Delivery Application", "Fleet Management System"],
      },
      {
        name: "C#",
        note: "Backend services at work, and simulation and gameplay scripting in Unity.",
        usedIn: ["Invoice Delivery Application", "Research simulation"],
      },
      {
        name: "SignalR",
        note: "Real-time updates for live driver tracking.",
        usedIn: ["Fleet Management System"],
      },
      {
        name: "Node.js & Express",
        note: "REST APIs with role-based authentication, including OpenAI API integration.",
      },
      {
        name: "Databases",
        note: "MySQL, MongoDB, Firebase and SQLite, plus SQL for ERP queries.",
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    color: "#8c8de3",
    skills: [
      {
        name: "Next.js",
        note: "Admin and operations dashboards for production apps, and this site.",
        usedIn: ["Invoice Delivery Application", "This portfolio"],
      },
      {
        name: "React",
        note: "Component-driven interfaces with routing and live API data.",
        usedIn: ["Fleet Management System"],
      },
      {
        name: "TypeScript",
        note: "Typed front-ends and APIs, alongside JavaScript.",
        usedIn: ["This portfolio"],
      },
      {
        name: "Tailwind & Bootstrap",
        note: "Utility-first and component-based styling for responsive layouts.",
        usedIn: ["This portfolio", "WeBage Liber"],
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    color: "#fbbf24",
    skills: [
      {
        name: "Flutter",
        note: "Driver and field-staff apps: clock-in, proof of delivery and work orders.",
        usedIn: ["Fleet Management System"],
      },
      {
        name: "React Native",
        note: "An internal dashboard with real-time farm-operations data, used daily.",
        usedIn: ["PT Hyoshii Agri Sejahtera"],
      },
      {
        name: "App releases",
        note: "iOS builds and code signing, and Play Store release signing and publishing.",
        usedIn: ["Fleet Management System"],
      },
    ],
  },
  {
    id: "erp",
    label: "ERP",
    color: "#f472b6",
    skills: [
      {
        name: "Epicor Kinetic",
        note: "The ERP behind the apps I build at Kairos.",
        usedIn: ["Invoice Delivery Application", "Fleet Management System"],
      },
      {
        name: "BPMs & BAQs",
        note: "Business rules and queries, such as enforcing an invoice delivery method, with test plans.",
        usedIn: ["Invoice Delivery Application"],
      },
      {
        name: "Data migration",
        note: "DMT data loads of billing and configuration data for go-lives.",
        usedIn: ["Invoice Delivery Application"],
      },
    ],
  },
  {
    id: "workflow",
    label: "Delivery",
    color: "#a3a3a3",
    skills: [
      {
        name: "Docker & AWS",
        note: "Containerised deployments; cut one build context from 2.8 GB to about 1 MB.",
        usedIn: ["Invoice Delivery Application"],
      },
      {
        name: "Git & GitHub",
        note: "Version control and team workflow standards.",
      },
      {
        name: "QA & UAT",
        note: "Requirements gathering, QA and user acceptance testing with users.",
        usedIn: ["Fleet Management System"],
      },
      {
        name: "Production support",
        note: "Go-lives, root-cause analysis and technical, deployment and onboarding guides.",
        usedIn: ["Invoice Delivery Application"],
      },
    ],
  },
  {
    id: "game",
    label: "Game Dev",
    color: "#fb923c",
    skills: [
      {
        name: "Unity",
        note: "Simulations, platformers and narrative games, including a physiological research simulation.",
        usedIn: ["Research simulation"],
      },
      {
        name: "Blender & Adobe Suite",
        note: "3D assets, sprites, scenes and UI.",
      },
    ],
  },
];
