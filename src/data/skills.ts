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
        usedIn: ["Invoice Delivery Platform", "Fleet Management System"],
      },
      {
        name: "C#",
        note: "Backend services at work, and gameplay scripting in Unity on the side.",
        usedIn: ["Invoice Delivery Platform", "Hanoman Adventure"],
      },
      {
        name: "SignalR",
        note: "Real-time updates for live driver tracking.",
        usedIn: ["Fleet Management System"],
      },
      {
        name: "Node.js & Express",
        note: "REST APIs with role-based authentication and MongoDB.",
        usedIn: ["Job Hive"],
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
        note: "Admin and operations dashboards for production client apps, and this site.",
        usedIn: ["Invoice Delivery Platform", "This portfolio"],
      },
      {
        name: "React",
        note: "Component-driven interfaces with routing and live API data.",
        usedIn: ["Fleet Management System", "InsightHub", "Job Hive"],
      },
      {
        name: "Tailwind CSS",
        note: "Utility-first styling for fast, consistent, responsive layouts.",
        usedIn: ["WordIT", "GeekyNerds.io", "This portfolio"],
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
        note: "Driver, outlet and field-staff apps: clock-in, proof of delivery and work orders.",
        usedIn: ["Fleet Management System", "Restaurant Operations App", "Time Entry & Proof of Delivery"],
      },
      {
        name: "iOS release",
        note: "Builds, certificates and code signing, including recovering a broken signing setup.",
        usedIn: ["Restaurant Operations App", "Time Entry & Proof of Delivery"],
      },
      {
        name: "Play Store release",
        note: "Release signing and publishing for Android apps.",
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
        note: "The ERP behind every client product I work on at Kairos.",
        usedIn: ["Invoice Delivery Platform", "Fleet Management System", "Restaurant Operations App"],
      },
      {
        name: "BPMs & BAQs",
        note: "Business rules and queries, such as enforcing an invoice delivery method on customers, with test plans.",
        usedIn: ["Invoice Delivery Platform"],
      },
      {
        name: "DMT data loads",
        note: "Loading customer billing and configuration data for go-lives.",
        usedIn: ["Invoice Delivery Platform"],
      },
    ],
  },
  {
    id: "workflow",
    label: "Delivery",
    color: "#a3a3a3",
    skills: [
      {
        name: "Docker",
        note: "Containerised deployments; cut one build context from 2.8 GB to about 1 MB.",
        usedIn: ["Invoice Delivery Platform"],
      },
      {
        name: "Linux servers",
        note: "Deployments and production support, plus the team's server-access guide.",
      },
      {
        name: "Git & GitHub",
        note: "Version control and team workflow standards.",
      },
      {
        name: "Incident response",
        note: "Root-cause analysis, runbooks and go-live checklists.",
        usedIn: ["Invoice Delivery Platform", "Restaurant Operations App"],
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
        note: "Platformers, narrative games and game jam prototypes.",
        usedIn: ["Hanoman Adventure", "Blessed Are the Peacemakers", "Raturu: Homefever"],
      },
      {
        name: "Pixel Art",
        note: "Sprites, scenes and UI, including in Aseprite.",
        usedIn: ["Hanoman Adventure", "Blessed Are the Peacemakers"],
      },
    ],
  },
];
