"use client";

import { useState } from "react";

import { LogoMark } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { Section, SectionHeading } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { skillGroups, type Skill, type SkillGroup } from "@/data/skills";
import { cn } from "@/lib/utils";

type Selection = { group: SkillGroup; skill: Skill };

const initial: Selection = { group: skillGroups[0], skill: skillGroups[0].skills[0] };

export function Skills() {
  const [selected, setSelected] = useState<Selection>(initial);
  // Other branches fade back only while someone is exploring the tree.
  const [exploring, setExploring] = useState(false);

  return (
    <Section id="skills">
      <SectionHeading
        index="03"
        eyebrow="Skills"
        title="Skill Tree"
        description="The tools I reach for, laid out like an RPG skill tree. Hover or tap a node to see where I've used it."
      />

      <Reveal>
        <div
          onPointerEnter={() => setExploring(true)}
          onPointerLeave={() => setExploring(false)}
          onFocus={() => setExploring(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setExploring(false);
          }}
        >
          {/* Root node and the bus that feeds each branch (wide screens only). */}
          <div className="hidden flex-col items-center lg:flex">
            <div className="inline-flex items-center gap-2.5 rounded-lg border bg-card px-4 py-2 shadow-sm">
              <LogoMark className="size-4 text-brand" />
              <span className="font-pixel text-xs tracking-[0.2em] uppercase">Dee&apos;s toolbox</span>
            </div>
            <span aria-hidden="true" className="h-8 w-px bg-border" />
          </div>

          <div className="relative grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
            <span
              aria-hidden="true"
              className="absolute top-0 right-[calc(10%-0.4rem)] left-[calc(10%-0.4rem)] hidden h-px bg-border lg:block"
            />
            {skillGroups.map((group) => {
              const isActiveGroup = selected.group.id === group.id;
              return (
                <div
                  key={group.id}
                  className={cn(
                    "flex flex-col items-center transition-opacity duration-300",
                    exploring && !isActiveGroup && "opacity-40",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="hidden h-8 w-px transition-colors lg:block"
                    style={{ backgroundColor: isActiveGroup ? group.color : "var(--border)" }}
                  />
                  <h3
                    className="flex items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm font-semibold"
                    style={isActiveGroup ? { borderColor: group.color } : undefined}
                  >
                    <span aria-hidden="true" className="size-2" style={{ backgroundColor: group.color }} />
                    {group.label}
                  </h3>

                  <ul className="flex flex-col items-center" aria-label={`${group.label} skills`}>
                    {group.skills.map((skill) => {
                      const isSelected = isActiveGroup && selected.skill.name === skill.name;
                      return (
                        <li key={skill.name} className="flex flex-col items-center">
                          <span
                            aria-hidden="true"
                            className="h-4 w-px transition-colors"
                            style={{
                              backgroundColor: isActiveGroup
                                ? `color-mix(in oklab, ${group.color} 60%, transparent)`
                                : "var(--border)",
                            }}
                          />
                          <button
                            type="button"
                            aria-pressed={isSelected}
                            onPointerEnter={() => setSelected({ group, skill })}
                            onFocus={() => setSelected({ group, skill })}
                            onClick={() => setSelected({ group, skill })}
                            className={cn(
                              "rounded-md border bg-background px-3 py-1.5 text-center text-sm text-muted-foreground outline-none transition-all duration-200 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
                              isSelected && "text-foreground shadow-sm",
                            )}
                            style={
                              isSelected
                                ? {
                                    borderColor: group.color,
                                    backgroundColor: `color-mix(in oklab, ${group.color} 12%, var(--background))`,
                                  }
                                : undefined
                            }
                          >
                            {skill.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          <SkillReadout selection={selected} />
        </div>
      </Reveal>
    </Section>
  );
}

function SkillReadout({ selection: { group, skill } }: { selection: Selection }) {
  return (
    <div
      aria-live="polite"
      className="mt-12 rounded-xl border bg-card/40 p-5 md:p-6"
      style={{ borderLeft: `3px solid ${group.color}` }}
    >
      <p className="font-pixel text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        {group.label} <span aria-hidden="true">/</span>{" "}
        <span className="text-foreground">{skill.name}</span>
      </p>
      <p className="mt-2 text-lg text-pretty">{skill.note}</p>
      {skill.usedIn?.length ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">Used in</span>
          {skill.usedIn.map((item) => (
            <Badge key={item} variant="outline" className="font-normal">
              {item}
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
