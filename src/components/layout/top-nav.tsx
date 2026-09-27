"use client";

import { LogoMark } from "@/components/icons";
import { useUI } from "@/components/providers/ui-provider";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { sections } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useIsMac } from "@/hooks/use-platform";

const links = sections.filter((section) => section.id !== "home");

/** Desktop header. It scrolls away with the hero; the side rail takes over. */
export function TopNav() {
  const { setCommandOpen } = useUI();
  const isMac = useIsMac();

  return (
    <header className="absolute inset-x-0 top-0 z-30 hidden md:block">
      <div className="flex items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <div className="flex items-center gap-2">
          <a
            href="#home"
            className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <LogoMark className="size-6 text-brand transition-transform duration-300 group-hover:-rotate-12" />
            <span className="font-mono text-sm tracking-wide">
              {profile.wordmark}
            </span>
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCommandOpen(true)}
            className="text-muted-foreground"
          >
            Command Menu
            <Kbd>{isMac ? "⌘K" : "Ctrl K"}</Kbd>
          </Button>
        </div>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="relative inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-muted-foreground outline-none transition-colors after:absolute after:bottom-1 after:left-3 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:text-foreground hover:after:w-[calc(100%-1.5rem)] focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
