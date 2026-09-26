"use client";

import { Music, Pause, Play, SkipBack, SkipForward } from "lucide-react";

import { useAudio } from "@/components/providers/audio-provider";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Three pixel bars that bounce while music is playing. */
export function Equalizer({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("flex h-4 items-end gap-[3px]", className)}>
      {[0, 0.2, 0.4].map((delay) => (
        <span
          key={delay}
          className="h-full w-[3px] origin-bottom bg-brand motion-safe:animate-eq"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

export function MusicPlayer() {
  const { track, playing, currentTime, duration, toggle, next, prev, seek } =
    useAudio();

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label={playing ? `Music player, playing ${track.title}` : "Music player"}
            >
              {playing ? <Equalizer /> : <Music />}
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="top">Music</TooltipContent>
      </Tooltip>

      <PopoverContent side="top" align="end" sideOffset={12} className="w-72">
        <p className="font-pixel text-[10px] tracking-[0.2em] text-brand uppercase">
          {playing ? "Now playing" : "Dee's soundtrack"}
        </p>
        <p className="mt-2 truncate font-medium">{track.title}</p>
        <p className="truncate text-sm text-muted-foreground">{track.artist}</p>

        <div className="mt-4 space-y-2">
          <Slider
            aria-label="Seek"
            value={[Math.min(currentTime, duration || 0)]}
            max={duration || 1}
            step={1}
            disabled={!duration}
            onValueChange={([value]) => seek(value)}
          />
          <div className="flex justify-between font-mono text-[11px] text-muted-foreground tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={prev} aria-label="Previous track">
            <SkipBack />
          </Button>
          <Button size="icon-lg" className="rounded-full" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
            {playing ? <Pause /> : <Play />}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={next} aria-label="Next track">
            <SkipForward />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
