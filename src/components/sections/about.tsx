import { CodeXml, Database, Smartphone, Users } from "lucide-react";

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

const facts = [
  { label: "Role", value: profile.role },
  { label: "Currently", value: "Software Developer Intern, Kairos Business Solutions" },
  { label: "Education", value: "BSc Computing, President University (GPA 3.84)" },
  { label: "Based in", value: profile.location },
  { label: "Languages", value: "Indonesian (native), English (advanced)" },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading index="01" eyebrow="About" title="About Me" />

      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="space-y-6 text-lg leading-relaxed text-pretty lg:col-span-3">
          {profile.about.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <p className={index === 0 ? "text-foreground" : "text-muted-foreground"}>{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="lg:col-span-2">
          <dl className="border-t border-foreground font-mono text-sm">
            {facts.map(({ label, value }) => (
              <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-foreground py-3">
                <dt className="text-muted-foreground">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2">
        {highlights.map(({ icon, title, description }, index) => {
          const Icon = icons[icon];
          return (
            <Reveal key={title} delay={index * 0.05} className="h-full">
              <SpotlightCard className="h-full p-6">
                <div className="mb-4 flex items-center gap-4">
                  <span className="border border-foreground bg-foreground p-2 text-background">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-bold">{title}</h3>
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
