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
              <ProjectCard project={project} index={index} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="flex h-full flex-col border border-foreground bg-card transition-[translate,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal">
      {/* No screenshots for private client work: an index plate with pencil-style hatching. */}
      <div className="relative flex aspect-[21/9] items-end justify-between overflow-hidden border-b border-foreground bg-foreground p-5 text-background">
        <span aria-hidden="true" className="absolute inset-0 opacity-15 bg-stripes" />
        <span className="relative text-7xl leading-none font-extrabold tracking-[-0.05em]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="relative font-mono text-xs">{"// private client work"}</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Briefcase className="size-3.5" />
            {project.context}
          </span>
          {project.status === "in-progress" ? <Badge variant="brand">In progress</Badge> : null}
        </div>

        <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
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
