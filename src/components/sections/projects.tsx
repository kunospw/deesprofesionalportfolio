import { Briefcase } from "lucide-react";

import { Reveal } from "@/components/motion";
import { Section, SectionHeading } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { projects, type Project } from "@/data/projects";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="02"
        eyebrow="Work"
        title="Projects"
        description="Production apps from my work at Kairos. The code is private, so these cards describe the work rather than link to it."
      />

      <ul className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.id}>
            <Reveal delay={index * 0.05} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card/40 transition-colors duration-300 hover:border-foreground/20">
      {/* No screenshots for private client work: a pattern tile borrowed from the ID card's stripes. */}
      <div className="relative flex aspect-[21/9] flex-col items-center justify-center gap-3 overflow-hidden border-b bg-[#1e1f4b] text-[#8c8de3]">
        <span aria-hidden="true" className="absolute inset-0 opacity-20 bg-stripes" />
        <Briefcase className="relative size-9" />
        <span className="relative font-pixel text-xs tracking-[0.2em] uppercase">Client project</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Briefcase className="size-3.5" />
            {project.context}
          </span>
          {project.status === "in-progress" ? <Badge variant="brand">In progress</Badge> : null}
        </div>

        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="text-sm text-pretty text-muted-foreground">{project.description}</p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="Built with">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Badge variant="secondary" className="font-normal">
                {tech}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
