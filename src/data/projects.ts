export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: "completed" | "in-progress";
  context: string;
};

export const projects: Project[] = [
  {
    id: "invoice-delivery",
    title: "Invoice Delivery Application",
    description:
      "Pulls invoices from Epicor Kinetic, packages them as PDFs and delivers them by email or Google Drive according to each customer's delivery preference. I supported the go-live and monitoring: 362 invoices went out in the first week with no application errors. I also added sync reconciliation with run history and alerts, and a circuit breaker for ERP outages.",
    tech: ["ASP.NET Core 8", "Next.js", "Epicor Kinetic", "Google Drive API", "Docker"],
    status: "completed",
    context: "Kairos",
  },
  {
    id: "fleet-management",
    title: "Fleet Management System",
    description:
      "A planner web app, a driver mobile app and a real-time API. I'm the sole developer: requirements, QA and user acceptance testing, live driver tracking and route maps, ERP-rendered work orders and Play Store releases.",
    tech: ["React", "Flutter", ".NET 8", "SignalR", "Epicor Kinetic"],
    status: "in-progress",
    context: "Kairos",
  },
];
