"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import cardBack from "@/assets/card-back.png";
import cardFront from "@/assets/card-front.png";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const STRAP_TEXT = "DYAH.RINI ✦ WEB & GAME DEV ✦ ".repeat(6);

type Gesture = { x: number; y: number; moved: boolean };

/**
 * Dee's ID card hanging from a lanyard: drag sideways to swing it,
 * hover to tilt it, click (or press Enter) to flip it.
 */
export function IdCard({ className }: { className?: string }) {
  const reduceMotion = usePrefersReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);

  // Pendulum angle around the top of the strap, in degrees.
  const swing = useMotionValue(0);
  const tiltX = useSpring(0, { stiffness: 180, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 180, damping: 18 });
  const flip = useSpring(0, { stiffness: 120, damping: 17 });
  const rotateY = useTransform(() => flip.get() + tiltY.get());

  const glareX = useMotionValue(30);
  const glareY = useMotionValue(20);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3), transparent 45%)`;

  const toggleFlip = () => {
    const next = !flipped;
    setFlipped(next);
    if (reduceMotion) flip.jump(next ? 180 : 0);
    else flip.set(next ? 180 : 0);
  };

  const release = () => {
    tiltX.set(0);
    tiltY.set(0);
    if (swing.get() !== 0) {
      animate(swing, 0, {
        type: "spring",
        stiffness: 55,
        damping: 4,
        velocity: swing.getVelocity(),
      });
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center [--card-w:min(84vw,380px)] [--strap:6rem]",
        className,
      )}
    >
      {/* Gentle idle sway; the drag swing sits on top of it. */}
      <div className="flex origin-top flex-col items-center motion-safe:animate-sway">
        <motion.div style={{ rotate: swing }} className="flex origin-top flex-col items-center">
          <div
            aria-hidden="true"
            className="relative h-(--strap) w-8 overflow-hidden bg-[#23245a] shadow-[inset_0_0_6px_rgba(0,0,0,0.5)] [mask-image:linear-gradient(to_bottom,transparent,black_40%)]"
          >
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-pixel text-[10px] leading-none tracking-[0.35em] whitespace-nowrap text-[#8c8de3] [writing-mode:vertical-rl]">
              {STRAP_TEXT}
            </span>
          </div>

          <div aria-hidden="true" className="relative z-10 -mt-1 flex flex-col items-center">
            <div className="h-5 w-11 rounded-md border border-zinc-500/60 bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-600 shadow-md" />
            <div className="-mt-0.5 h-4 w-2.5 rounded-b-sm bg-gradient-to-b from-zinc-400 to-zinc-600" />
          </div>

          <div className="-mt-2" style={{ perspective: 1100 }}>
            <motion.button
              type="button"
              aria-label={flipped ? "Flip ID card to the front" : "Flip ID card to the back"}
              aria-pressed={flipped}
              onClick={() => {
                if (suppressClick.current) {
                  suppressClick.current = false;
                  return;
                }
                toggleFlip();
              }}
              onPointerDown={(event) => {
                suppressClick.current = false;
                swing.stop();
                gesture.current = { x: event.clientX, y: event.clientY, moved: false };
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const px = clamp((event.clientX - rect.left) / rect.width, 0, 1);
                const py = clamp((event.clientY - rect.top) / rect.height, 0, 1);
                glareX.set(px * 100);
                glareY.set(py * 100);
                if (reduceMotion) return;

                const g = gesture.current;
                if (g) {
                  const dx = event.clientX - g.x;
                  if (Math.abs(dx) > 6 || Math.abs(event.clientY - g.y) > 6) g.moved = true;
                  swing.set(clamp(dx * 0.12, -26, 26));
                } else if (event.pointerType === "mouse") {
                  tiltX.set((0.5 - py) * 14);
                  tiltY.set((px - 0.5) * 18);
                }
              }}
              onPointerUp={() => {
                if (gesture.current?.moved) suppressClick.current = true;
                gesture.current = null;
                release();
              }}
              onPointerCancel={() => {
                gesture.current = null;
                release();
              }}
              onPointerLeave={() => {
                if (!gesture.current) release();
              }}
              style={{ rotateX: tiltX, rotateY, transformStyle: "preserve-3d" }}
              className="group relative block aspect-[1050/600] w-(--card-w) cursor-grab touch-pan-y rounded-xl outline-none select-none focus-visible:ring-[3px] focus-visible:ring-ring/60 active:cursor-grabbing"
            >
              <CardFace image={cardFront} glare={glare} />
              <CardFace image={cardBack} glare={glare} back />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <p className="mt-6 font-mono text-xs text-muted-foreground">
        drag to swing · click to flip
      </p>
    </div>
  );
}

function CardFace({
  image,
  glare,
  back = false,
}: {
  image: typeof cardFront;
  glare: ReturnType<typeof useMotionTemplate>;
  back?: boolean;
}) {
  return (
    <span
      className="absolute inset-0 overflow-hidden rounded-xl shadow-2xl ring-1 shadow-black/40 ring-white/10 [backface-visibility:hidden]"
      style={back ? { transform: "rotateY(180deg)" } : undefined}
    >
      <Image
        src={image}
        alt=""
        sizes="(min-width: 640px) 380px, 84vw"
        loading={back ? "lazy" : "eager"}
        placeholder="blur"
        draggable={false}
        className="size-full object-cover"
      />
      {/* Slot punched through the card for the lanyard clip. */}
      <span className="absolute top-2 left-1/2 h-2 w-12 -translate-x-1/2 rounded-full bg-black/75 ring-1 ring-white/15" />
      <motion.span
        aria-hidden="true"
        style={{ background: glare }}
        className="absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
      />
    </span>
  );
}
