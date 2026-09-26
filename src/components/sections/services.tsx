import { AppWindow, ArrowRight, Check, Gamepad2, LayoutTemplate } from "lucide-react";

import { Reveal } from "@/components/motion";
import { Section, SectionHeading } from "@/components/section";
import { SpotlightCard } from "@/components/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { services, workPolicy } from "@/data/services";

const icons = {
  landing: LayoutTemplate,
  portfolio: AppWindow,
  game: Gamepad2,
} as const;

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        index="06"
        eyebrow="Services"
        title="Work With Me"
        description="Small, focused builds for small businesses and fellow students, at student-friendly prices. Opening on Fiverr soon; until then, just message me."
      />

      <ul className="grid gap-5 md:grid-cols-3">
        {services.map((service, index) => {
          const Icon = icons[service.icon];
          return (
            <li key={service.id}>
              <Reveal delay={index * 0.05} className="h-full">
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-lg bg-brand/10 p-2 text-brand">
                        <Icon className="size-5" />
                      </span>
                      {service.fiverrUrl ? null : (
                        <Badge variant="outline" className="font-normal text-muted-foreground">
                          Coming soon on Fiverr
                        </Badge>
                      )}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{service.title}</h3>
                    <p className="mt-2 text-sm text-pretty text-muted-foreground">
                      {service.description}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5">
                          <Check className="size-4 shrink-0 text-brand" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                      {service.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-normal">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {service.fiverrUrl ? (
                      <Button asChild className="mt-6">
                        <a href={service.fiverrUrl} target="_blank" rel="noopener noreferrer">
                          Order on Fiverr <ArrowRight />
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </SpotlightCard>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <Reveal>
        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {workPolicy.map(({ label, text }) => (
            <div key={label} className="bg-background p-5">
              <dt className="font-pixel text-[11px] tracking-[0.2em] text-brand uppercase">{label}</dt>
              <dd className="mt-2 text-sm text-pretty text-muted-foreground">{text}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal>
        <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border bg-card/40 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Have a project in mind?</p>
            <p className="text-sm text-muted-foreground">
              Tell me what you need and I&apos;ll reply with a plan and a quote.
            </p>
          </div>
          <Button asChild className="group">
            <a href="#contact">
              Start a conversation
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
