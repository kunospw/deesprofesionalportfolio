"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, FileDown, MessageCircle } from "lucide-react";

import { ChatPanel } from "@/components/layout/chat-panel";
import { useUI } from "@/components/providers/ui-provider";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { profile } from "@/data/profile";
import { useScrolledPast } from "@/hooks/use-platform";
import { cn, scrollToSection } from "@/lib/utils";

function DockTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  );
}

/** Bottom-right quick actions: chat, CV and back-to-top. */
export function FloatingDock() {
  const { chatOpen, setChatOpen } = useUI();
  const pastHero = useScrolledPast(480);
  const showBackToTop = useScrolledPast(600);
  // On phones the dock would cover the hero, so it waits below it.
  const idle = !pastHero && !chatOpen;

  return (
    <div
      data-idle={idle}
      className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 transition-[opacity,translate] duration-300 max-md:data-[idle=true]:pointer-events-none max-md:data-[idle=true]:translate-y-4 max-md:data-[idle=true]:opacity-0 md:right-6 md:bottom-6"
    >
      <ChatPanel />

      <div
        role="toolbar"
        aria-label="Quick actions"
        className="flex animate-in items-center gap-0.5 rounded-none border border-foreground bg-background p-1 shadow-brutal duration-500 fill-mode-both fade-in-0 slide-in-from-bottom-4 [animation-delay:500ms]"
      >
        <DockTooltip label="Ask my assistant">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Ask my portfolio assistant"
            aria-expanded={chatOpen}
            onClick={() => setChatOpen((open) => !open)}
            className={cn("rounded-none", chatOpen && "bg-foreground text-background")}
          >
            <MessageCircle />
          </Button>
        </DockTooltip>

        <DockTooltip label="Download CV">
          <Button variant="ghost" size="icon" className="rounded-none" asChild>
            <a href={profile.cv} download={profile.cvFileName} aria-label="Download CV">
              <FileDown />
            </a>
          </Button>
        </DockTooltip>

        <AnimatePresence initial={false}>
          {showBackToTop ? (
            <motion.div
              key="back-to-top"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <DockTooltip label="Back to top">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none"
                  aria-label="Back to top"
                  onClick={() => scrollToSection("home")}
                >
                  <ArrowUp />
                </Button>
              </DockTooltip>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
