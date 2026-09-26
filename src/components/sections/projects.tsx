"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronDown,
  Clapperboard,
  Gamepad2,
  Globe,
  PenTool,
  Play,
} from "lucide-react";

import { InstagramIcon } from "@/components/icons";
import { MediaDialog } from "@/components/media-dialog";
import { Reveal } from "@/components/motion";
import { Section, SectionHeading } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { cn } from "@/lib/utils";

const INITIAL_COUNT = 6;

const categoryMeta: Record<ProjectCategory, { label: string; icon: typeof Globe }> = {
  web: { label: "Web", icon: Globe },
  game: { label: "Game", icon: Gamepad2 },
  design: { label: "Design", icon: PenTool },
  video: { label: "Animation", icon: Clapperboard },
};

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [showAll, setShowAll] = useState(false);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <Section id="projects">
      <SectionHeading
        index="02"
        eyebrow="Work"
        title="Projects"
        description="Web apps, games and the odd creative experiment. Games marked playable run right here in your browser."
      />

      <Reveal>
        <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
          {projectCategories.map(({ id, label }) => {
            const count =
              id === "all" ? projects.length : projects.filter((p) => p.category === id).length;
            const active = filter === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(id);
                  setShowAll(false);
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {label}
                <span className="font-mono text-xs opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.ul layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length > INITIAL_COUNT ? (
        <div className="mt-10 flex justify-center">
          <Button variant="outline" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show fewer" : `Show all ${filtered.length} projects`}
            <ChevronDown className={cn("transition-transform", showAll && "rotate-180")} />
          </Button>
        </div>
      ) : null}
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { label, icon: CategoryIcon } = categoryMeta[project.category];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card/40 transition-colors duration-300 hover:border-foreground/20">
      <div className="relative aspect-[16/10] overflow-hidden border-b bg-muted">
        <ProjectMedia project={project} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CategoryIcon className="size-3.5" />
            {label}
            {project.context ? <span className="text-muted-foreground/70">· {project.context}</span> : null}
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
          {project.youtubeId ? (
            <MediaDialog
              title={project.title}
              media={{ kind: "youtube", id: project.youtubeId }}
              href={project.href}
            >
              <Button size="sm">
                <Play />
                Watch
              </Button>
            </MediaDialog>
          ) : null}
          {project.href && !project.youtubeId ? (
            <Button asChild size="sm" variant="outline">
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                {project.hrefLabel ?? "Open"}
                <ArrowUpRight />
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const thumbnail = project.youtubeId
    ? `https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg`
    : undefined;

  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
        placeholder="blur"
        className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  if (thumbnail && !failed) {
    return (
      <Image
        src={thumbnail}
        alt={`Still from ${project.title}`}
        fill
        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
        onError={() => setFailed(true)}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  // No screenshot: a pattern tile borrowed from the ID card's stripes.
  const Icon = project.href?.includes("instagram.com") ? InstagramIcon : Clapperboard;
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 bg-[#1e1f4b] text-[#8c8de3]">
      <span aria-hidden="true" className="absolute inset-0 opacity-20 bg-stripes" />
      <Icon className="relative size-9" />
      <span className="relative font-pixel text-xs tracking-[0.2em] uppercase">
        {categoryMeta[project.category].label}
      </span>
    </div>
  );
}
