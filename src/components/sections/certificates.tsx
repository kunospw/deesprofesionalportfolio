import Image from "next/image";
import { Expand } from "lucide-react";

import { MediaDialog } from "@/components/media-dialog";
import { Reveal } from "@/components/motion";
import { Section, SectionHeading } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { certificates } from "@/data/certificates";

export function Certificates() {
  return (
    <Section id="certificates">
      <SectionHeading
        index="05"
        eyebrow="Credentials"
        title="Certificates & Achievements"
        description="Programs, competitions and language tests along the way."
      />

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, index) => (
          <li key={cert.id}>
            <Reveal delay={(index % 3) * 0.05} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card/40 transition-colors duration-300 hover:border-foreground/20">
                <MediaDialog
                  title={cert.title}
                  description={`${cert.category} · ${cert.date}`}
                  media={{ kind: "image", src: cert.image, alt: `${cert.title} certificate` }}
                >
                  <button
                    type="button"
                    className="relative aspect-[4/3] overflow-hidden border-b bg-muted outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    aria-label={`View ${cert.title} certificate`}
                  >
                    <Image
                      src={cert.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      placeholder="blur"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-xs opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                      <Expand className="size-3" /> View
                    </span>
                  </button>
                </MediaDialog>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="brand">{cert.category}</Badge>
                    <span className="font-mono text-xs text-muted-foreground">{cert.date}</span>
                  </div>
                  <h3 className="font-semibold tracking-tight">{cert.title}</h3>
                  <p className="text-sm text-pretty text-muted-foreground">{cert.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
