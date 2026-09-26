"use client";

import { motion } from "motion/react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { sections } from "@/data/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const sectionIds = sections.map((section) => section.id);

/** Floating icon rail on the left edge, with a pixel marker on the active section. */
export function SideRail() {
  const active = useActiveSection(sectionIds);

  return (
    <nav
      aria-label="Sections"
      className="fixed top-1/2 left-5 z-30 hidden -translate-y-1/2 md:block"
    >
      <ul className="flex animate-in flex-col items-center gap-1 rounded-full border bg-background/70 p-1.5 shadow-sm backdrop-blur-md duration-500 fill-mode-both fade-in-0 slide-in-from-left-4 [animation-delay:300ms]">
        {sections.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li key={id} className="relative">
              {isActive ? (
                <motion.span
                  layoutId="rail-pixel"
                  aria-hidden="true"
                  className="absolute top-1/2 -left-4 size-1.5 -translate-y-1/2 bg-brand"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`#${id}`}
                    aria-label={label}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative flex size-10 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
                      isActive && "text-foreground",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="rail-active"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    ) : null}
                    <Icon className="relative size-[18px]" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            </li>
          );
        })}
        <li aria-hidden="true" className="my-1 h-px w-5 bg-border" />
        <li>
          <Tooltip>
            <TooltipTrigger asChild>
              <ThemeToggle />
            </TooltipTrigger>
            <TooltipContent side="right">Toggle theme</TooltipContent>
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
}
