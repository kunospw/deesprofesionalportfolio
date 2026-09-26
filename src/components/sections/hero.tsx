import { ArrowRight, FileDown, Mail, MapPin } from "lucide-react";

import { IdCard } from "@/components/id-card";
import { Reveal } from "@/components/motion";
import { Typewriter } from "@/components/typewriter";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { profile, socials } from "@/data/profile";

const quickLinks = [
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  ...socials.slice(0, 3).map(({ label, href, icon }) => ({ label, href, icon })),
  { label: profile.location, href: profile.mapsUrl, icon: MapPin },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh items-center overflow-hidden px-6 pt-24 pb-16 sm:px-10 md:pt-20 md:pr-12 md:pl-32 lg:pr-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-[8%] -z-10 size-[28rem] rounded-full bg-brand/15 blur-[120px]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-y-16 lg:grid-cols-5 lg:gap-x-12">
        <div className="space-y-8 lg:col-span-3">
          <Reveal>
            <p className="flex items-center gap-3 font-pixel text-xs tracking-[0.2em] text-brand uppercase">
              <span aria-hidden="true" className="h-3 w-10 text-brand/60 bg-stripes" />
              {profile.role}
            </p>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={0.05}>
              <h1 className="bg-gradient-to-r from-foreground to-foreground/55 bg-clip-text pb-1 text-5xl font-bold tracking-tight text-balance text-transparent sm:text-6xl lg:text-7xl">
                Hi, I&apos;m {profile.name}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="min-h-[1.25em] text-2xl text-muted-foreground sm:text-3xl lg:text-4xl">
                <Typewriter words={profile.roles} />
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <p className="max-w-xl text-lg text-pretty text-muted-foreground">
              {profile.intro}{" "}
              <span className="text-foreground">{profile.tagline}</span>
            </p>
          </Reveal>

          <Reveal delay={0.2} className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="group">
              <a href="#projects">
                View Projects
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">Get in Touch</a>
            </Button>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className="flex flex-wrap items-center gap-1">
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={href}
                        target={href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      >
                        <Icon className="size-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>{label}</TooltipContent>
                  </Tooltip>
                </li>
              ))}
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={profile.cv}
                      download={profile.cvFileName}
                      aria-label="Download CV"
                      className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <FileDown className="size-5" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Download CV</TooltipContent>
                </Tooltip>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* On large screens the lanyard hangs from just below the header,
            lined up with the right edge of the content column. */}
        <Reveal
          delay={0.3}
          y={-24}
          className="flex justify-center lg:absolute lg:top-18 lg:right-[calc(5rem+max(0px,(100%-85rem)/2))]"
        >
          <IdCard className="lg:[--card-w:320px] lg:[--strap:max(7rem,calc(50svh-12.5rem))] xl:[--card-w:380px]" />
        </Reveal>
      </div>
    </section>
  );
}
