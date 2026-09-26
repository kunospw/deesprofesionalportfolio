import Image from "next/image";
import { CodeXml, Database, Smartphone, Users } from "lucide-react";

import avatar from "@/assets/avatar.png";
import { Reveal } from "@/components/motion";
import { Section, SectionHeading } from "@/components/section";
import { SpotlightCard } from "@/components/spotlight-card";
import { highlights, profile } from "@/data/profile";

const icons = {
  code: CodeXml,
  mobile: Smartphone,
  erp: Database,
  users: Users,
} as const;

const playerStats = [
  { label: "Name", value: profile.name },
  { label: "Alias", value: `${profile.nickname} · ${profile.handle}` },
  { label: "Class", value: profile.role },
  { label: "Guild", value: "Kairos Solutions" },
  { label: "Base", value: profile.location },
  { label: "Languages", value: "Indonesian, English (TOEIC 865)" },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading index="01" eyebrow="About" title="About Me" />

      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="space-y-6 text-lg leading-relaxed text-pretty text-muted-foreground lg:col-span-3">
          {profile.about.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="lg:col-span-2">
          <figure className="overflow-hidden rounded-xl border bg-card/40">
            <figcaption className="flex items-center justify-between border-b px-4 py-2.5 font-pixel text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              <span>Player profile</span>
              <span className="text-brand">Lv. 01</span>
            </figcaption>
            <div className="flex gap-4 p-4">
              <Image
                src={avatar}
                alt={`Pixel-art portrait of ${profile.name}`}
                sizes="96px"
                placeholder="blur"
                className="h-[7.5rem] w-24 shrink-0 rounded-md border object-cover [image-rendering:pixelated]"
              />
              <dl className="grid min-w-0 flex-1 grid-cols-[auto_1fr] content-center gap-x-3 gap-y-1.5 font-mono text-xs">
                {playerStats.map(({ label, value }) => (
                  <div key={label} className="contents">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="break-words">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </figure>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {highlights.map(({ icon, title, description }, index) => {
          const Icon = icons[icon];
          return (
            <Reveal key={title} delay={index * 0.05} className="h-full">
              <SpotlightCard className="h-full p-6">
                <div className="mb-4 flex items-center gap-4">
                  <span className="rounded-lg bg-brand/10 p-2 text-brand">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <p className="text-muted-foreground">{description}</p>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
