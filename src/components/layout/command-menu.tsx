"use client";

import { useEffect, useRef } from "react";
import {
  Copy,
  ExternalLink,
  FileDown,
  Mail,
  MessageCircle,
  Moon,
  Pause,
  Play,
  Sun,
} from "lucide-react";
import { toast } from "sonner";

import { useAudio } from "@/components/providers/audio-provider";
import { useUI } from "@/components/providers/ui-provider";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { sections } from "@/data/navigation";
import { profile, socials } from "@/data/profile";
import { projects } from "@/data/projects";
import { useTheme } from "@/hooks/use-theme";
import { scrollToSection } from "@/lib/utils";

function openExternal(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

function downloadCv() {
  const link = document.createElement("a");
  link.href = profile.cv;
  link.download = profile.cvFileName;
  link.click();
}

export function CommandMenu() {
  const { commandOpen, setCommandOpen, setChatOpen } = useUI();
  const { theme, toggleTheme } = useTheme();
  const audio = useAudio();
  // Actions run after the dialog has closed so focus restoration can't
  // scroll the page back to the trigger.
  const pendingAction = useRef<(() => void) | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setCommandOpen]);

  const run = (action: () => void) => {
    pendingAction.current = action;
    setCommandOpen(false);
  };

  return (
    <CommandDialog
      open={commandOpen}
      onOpenChange={setCommandOpen}
      title="Command menu"
      description="Jump to a section, open a project or run a quick action."
      onCloseAutoFocus={(event) => {
        const action = pendingAction.current;
        if (!action) return;
        event.preventDefault();
        pendingAction.current = null;
        action();
      }}
    >
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {sections.map(({ id, label, icon: Icon }) => (
            <CommandItem key={id} value={`go ${label}`} onSelect={() => run(() => scrollToSection(id))}>
              <Icon />
              {label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem value="download cv resume" onSelect={() => run(downloadCv)}>
            <FileDown />
            Download CV
          </CommandItem>
          <CommandItem
            value="copy email address"
            onSelect={() =>
              run(() =>
                navigator.clipboard
                  .writeText(profile.email)
                  .then(() => toast.success("Email copied", { description: profile.email }))
                  .catch(() => toast.error("Couldn't copy. The address is " + profile.email)),
              )
            }
          >
            <Copy />
            Copy email address
          </CommandItem>
          <CommandItem value="send email" onSelect={() => run(() => (window.location.href = `mailto:${profile.email}`))}>
            <Mail />
            Send an email
          </CommandItem>
          <CommandItem value="ask chat assistant ai" onSelect={() => run(() => setChatOpen(true))}>
            <MessageCircle />
            Ask my portfolio assistant
          </CommandItem>
          <CommandItem value="music play pause song" onSelect={() => run(audio.toggle)}>
            {audio.playing ? <Pause /> : <Play />}
            {audio.playing ? "Pause music" : "Play music"}
            <CommandShortcut className="max-w-40 truncate tracking-normal">
              {audio.track.title}
            </CommandShortcut>
          </CommandItem>
          <CommandItem value="toggle theme light dark mode" onSelect={() => run(toggleTheme)}>
            {theme === "dark" ? <Sun /> : <Moon />}
            Switch to {theme === "dark" ? "light" : "dark"} theme
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {projects.map((project) => (
            <CommandItem
              key={project.id}
              value={`project ${project.title} ${project.tech.join(" ")}`}
              onSelect={() =>
                run(() =>
                  project.href ? openExternal(project.href) : scrollToSection("projects"),
                )
              }
            >
              <ExternalLink />
              {project.title}
              <CommandShortcut className="tracking-normal capitalize">
                {project.category}
              </CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Elsewhere">
          {socials.map(({ label, handle, href, icon: Icon }) => (
            <CommandItem key={href} value={`${label} ${handle}`} onSelect={() => run(() => openExternal(href))}>
              <Icon />
              {label}
              <CommandShortcut className="tracking-normal">{handle}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
