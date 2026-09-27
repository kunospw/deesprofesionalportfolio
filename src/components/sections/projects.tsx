import Image from "next/image";
import { ArrowUpRight, Briefcase, Gamepad2 } from "lucide-react";

import { MediaDialog } from "@/components/media-dialog";
import { Reveal } from "@/components/motion";
import { Section, SectionHeading } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/data/projects";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="02"
        eyebrow="Work"
        title="Projects"
        description="Production apps from my work at Kairos, followed by simulations, games and web apps from my CV. Client code is private, so those cards describe the work rather than link to it."
      />

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <li key={project.id}>
            <Reveal delay={(index % 3) * 0.05} className="h-full">
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
    <article className="group flex h-full flex-col border border-foreground bg-card transition-[translate,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-foreground bg-foreground text-background">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
            placeholder="blur"
            className="size-full object-cover object-top grayscale transition-[filter] duration-300 group-hover:grayscale-0"
          />
        ) : (
          // No screenshot: an index plate with pencil-style hatching.
          <div className="flex size-full items-end justify-between p-5">
            <span aria-hidden="true" className="absolute inset-0 opacity-15 bg-stripes" />
            <span className="relative text-7xl leading-none font-extrabold tracking-[-0.05em]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="relative font-mono text-xs">
              {project.client ? "// private client work" : `// ${project.year}`}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
          <span className="flex min-w-0 items-center gap-1.5">
            {project.client ? <Briefcase className="size-3.5 shrink-0" /> : null}
            <span className="truncate">
              {project.context} · {project.year}
            </span>
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

        {project.href || project.playEmbed ? (
          <div className="flex flex-wrap gap-2 pt-2">
            {project.playEmbed ? (
              <MediaDialog
                title={project.title}
                description="Runs in your browser. Click the game to focus it."
                media={{ kind: "game", src: project.playEmbed }}
              >
                <Button size="sm">
                  <Gamepad2 />
                  Play in browser
                </Button>
              </MediaDialog>
            ) : null}
            {project.href ? (
              <Button asChild size="sm" variant="outline">
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  {project.hrefLabel ?? "Open"}
                  <ArrowUpRight />
                </a>
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
