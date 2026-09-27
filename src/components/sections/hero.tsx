import Image from "next/image";
import { ArrowRight, FileDown, Mail, MapPin } from "lucide-react";

import portrait from "@/assets/portrait.jpg";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { profile, socials } from "@/data/profile";

const quickLinks = [
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  ...socials.slice(0, 2).map(({ label, href, icon }) => ({ label, href, icon })),
];

const nameLines = profile.name.split(" ");

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center px-6 pt-24 pb-16 sm:px-10 md:pt-24 md:pr-12 md:pl-32 lg:pr-20"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="space-y-8">
          <Reveal>
            <p className="font-mono text-sm text-muted-foreground">{"{hello, world!}"}</p>
            <h1 className="mt-3 text-[clamp(3.5rem,11vw,7.5rem)] leading-[0.92] font-extrabold tracking-[-0.045em]">
              {nameLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="font-mono text-base font-medium sm:text-lg">
              {/* Each item stays on one line; the page can only wrap at the separators. */}
              <span className="text-muted-foreground">{"//"}</span>
              {profile.focus.map((item) => (
                <span key={item}>
                  {" "}
                  <span className="whitespace-nowrap">{item}</span>{" "}
                  <span className="text-muted-foreground">{"//"}</span>
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-xl border-l-4 border-brand pl-4 text-lg text-pretty">
              {profile.intro}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group">
              <a href="#projects">
                View projects
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">Get in touch</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={profile.cv} download={profile.cvFileName}>
                <FileDown />
                CV
              </a>
            </Button>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="flex flex-wrap items-center gap-2 font-mono text-sm">
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={href}
                        target={href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex size-10 items-center justify-center border border-foreground outline-none transition-colors hover:bg-foreground hover:text-background focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      >
                        <Icon className="size-[18px]" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>{label}</TooltipContent>
                  </Tooltip>
                </li>
              ))}
              <li className="ml-2 flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="size-4" />
                {profile.location}
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto w-full max-w-sm lg:max-w-none">
          <figure>
            <div className="border border-foreground bg-muted shadow-brutal">
              <Image
                src={portrait}
                alt={`Pencil-style portrait of ${profile.name}`}
                sizes="(min-width: 1024px) 460px, 384px"
                placeholder="blur"
                loading="eager"
                className="aspect-[622/876] w-full object-cover grayscale"
              />
            </div>
            <figcaption className="mt-4 flex justify-between font-mono text-xs text-muted-foreground">
              <span>fig. 01</span>
              <span>{profile.name}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
