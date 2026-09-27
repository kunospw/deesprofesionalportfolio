import { Image as ImageIcon, PlayCircle } from "lucide-react";

import { MediaDialog, type Media } from "@/components/media-dialog";
import { Reveal } from "@/components/motion";
import { Section, SectionHeading } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experiences, type Experience as ExperienceItem } from "@/data/experience";
import { cn } from "@/lib/utils";

function toMedia(item: ExperienceItem): Media | null {
  if (!item.media) return null;
  return item.media.kind === "image"
    ? {
        kind: "image",
        src: item.media.src,
        alt: `Photo from ${item.organization}${item.context ? ` (${item.context})` : ""}`,
      }
    : { kind: "youtube", id: item.media.youtubeId };
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        index="04"
        eyebrow="Career"
        title="Experience"
        description="Professional work first, then the training and teams that got me there."
      />

      {/* The ::before is the timeline spine: left edge on mobile, centred from md up. */}
      <ol className="relative before:absolute before:top-2 before:bottom-0 before:left-[7px] before:w-0.5 before:bg-foreground md:before:left-1/2 md:before:-translate-x-1/2">

        {experiences.map((item, index) => {
          const alignRight = index % 2 === 0;
          const media = toMedia(item);
          return (
            <li
              key={item.id}
              // Rows overlap on wide screens, so only the card itself takes clicks;
              // the empty half of a row must not cover the item above it.
              className="relative grid pb-12 md:pointer-events-none md:grid-cols-2 md:gap-x-16 md:pb-0 md:not-first:-mt-24"
            >
              <span aria-hidden="true" className="absolute top-8 left-[7px] -translate-x-1/2 md:left-1/2">
                <span className="relative block size-3.5 border-2 border-foreground bg-brand ring-4 ring-background" />
              </span>

              <Reveal
                x={alignRight ? -24 : 24}
                y={0}
                className={cn(
                  "pl-8 md:pointer-events-auto md:pl-0",
                  alignRight ? "md:col-start-1 md:text-right" : "md:col-start-2",
                )}
              >
                <article className="border border-foreground bg-card p-5 transition-[translate,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal md:p-6">
                  <div className={cn("flex flex-wrap items-center gap-3", alignRight && "md:justify-end")}>
                    <Badge variant="outline">{item.type}</Badge>
                    <span className="font-mono text-xs text-muted-foreground">{item.period}</span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold tracking-tight">{item.role}</h3>
                  <p className="font-medium text-muted-foreground">{item.organization}</p>
                  {item.context ? (
                    <p className="text-sm text-muted-foreground/80">{item.context}</p>
                  ) : null}

                  <ul className="mt-4 space-y-2 text-sm text-pretty text-muted-foreground">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className={cn("flex gap-3", alignRight && "md:flex-row-reverse")}>
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-foreground" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={cn("mt-4 flex flex-wrap gap-1.5", alignRight && "md:justify-end")}>
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {media ? (
                    <div className={cn("mt-4 flex", alignRight && "md:justify-end")}>
                      <MediaDialog
                        title={item.organization}
                        description={[item.role, item.context, item.period].filter(Boolean).join(" · ")}
                        media={media}
                      >
                        <Button variant="ghost" size="sm" className="-mx-3 text-muted-foreground">
                          {media.kind === "image" ? <ImageIcon /> : <PlayCircle />}
                          {media.kind === "image" ? "View photo" : "Watch recap"}
                        </Button>
                      </MediaDialog>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
