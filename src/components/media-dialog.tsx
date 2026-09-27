"use client";

import Image, { type StaticImageData } from "next/image";
import { ExternalLink } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type Media =
  | { kind: "image"; src: StaticImageData; alt: string }
  | { kind: "youtube"; id: string }
  | { kind: "game"; src: string };

function MediaFrame({ media, title }: { media: Media; title: string }) {
  if (media.kind === "image") {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        sizes="(min-width: 1024px) 960px, 100vw"
        placeholder="blur"
        className="max-h-[80dvh] w-full object-contain"
      />
    );
  }

  const src =
    media.kind === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${media.id}?autoplay=1&rel=0`
      : media.src;

  return (
    <iframe
      src={src}
      title={title}
      className={cn("w-full", media.kind === "game" ? "aspect-[16/10.5]" : "aspect-video")}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gamepad; gyroscope; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

/** A trigger (passed as `children`) that opens an image, video or game in a dialog. */
export function MediaDialog({
  title,
  description,
  media,
  href,
  children,
}: {
  title: string;
  description?: string;
  media: Media;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="gap-0 overflow-hidden bg-card p-0 outline-none sm:max-w-4xl"
        // Focus the dialog itself rather than the first focusable element:
        // an embedded game would otherwise swallow Escape.
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          (event.currentTarget as HTMLElement | null)?.focus();
        }}
      >
        <div className="flex items-center justify-between gap-4 border-b py-3 pr-12 pl-4">
          <div className="min-w-0">
            <DialogTitle className="truncate text-base">{title}</DialogTitle>
            <DialogDescription className={cn("truncate", !description && "sr-only")}>
              {description ?? title}
            </DialogDescription>
          </div>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              Open in new tab <ExternalLink className="size-3.5" />
            </a>
          ) : null}
        </div>
        <div className="bg-black">
          <MediaFrame media={media} title={title} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
