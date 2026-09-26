"use client";

import { useRef, useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Menu, Search, X } from "lucide-react";

import { LogoMark } from "@/components/icons";
import { useUI } from "@/components/providers/ui-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { sections } from "@/data/navigation";
import { profile, socials } from "@/data/profile";
import { scrollToSection } from "@/lib/utils";

function Wordmark() {
  return (
    <>
      <LogoMark className="size-5 text-brand" />
      <span className="font-pixel text-sm">{profile.wordmark}</span>
    </>
  );
}

export function MobileHeader() {
  const { setCommandOpen } = useUI();
  const [open, setOpen] = useState(false);
  // Scroll after the menu has closed, otherwise the scroll lock swallows it.
  const target = useRef<string | null>(null);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b bg-background/80 backdrop-blur-md md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <a href="#home" className="flex items-center gap-2">
          <Wordmark />
        </a>

        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Open command menu"
            onClick={() => setCommandOpen(true)}
          >
            <Search />
          </Button>
          <ThemeToggle className="size-9" />

          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open menu">
                <Menu />
              </Button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Content
                className="fixed inset-0 z-50 flex flex-col bg-background duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 md:hidden"
                onCloseAutoFocus={(event) => {
                  if (!target.current) return;
                  event.preventDefault();
                  scrollToSection(target.current);
                  target.current = null;
                }}
              >
                <div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
                  <DialogPrimitive.Title className="flex items-center gap-2">
                    <Wordmark />
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="sr-only">
                    Site navigation
                  </DialogPrimitive.Description>
                  <DialogPrimitive.Close asChild>
                    <Button variant="ghost" size="icon" className="rounded-full" aria-label="Close menu">
                      <X />
                    </Button>
                  </DialogPrimitive.Close>
                </div>

                <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-8">
                  <ol className="space-y-1">
                    {sections.map(({ id, label }, index) => (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          onClick={(event) => {
                            event.preventDefault();
                            target.current = id;
                            setOpen(false);
                          }}
                          className="group flex items-baseline gap-4 py-2 text-3xl font-semibold tracking-tight"
                        >
                          <span className="font-pixel text-xs text-brand">
                            {String(index).padStart(2, "0")}
                          </span>
                          <span className="transition-colors group-hover:text-muted-foreground">
                            {label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="flex flex-wrap gap-x-5 gap-y-2 border-t px-6 py-5 text-sm text-muted-foreground">
                  {socials.map(({ label, handle, href }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground"
                    >
                      {label} <span className="text-muted-foreground/70">{handle}</span>
                    </a>
                  ))}
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
