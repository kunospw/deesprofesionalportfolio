"use client";

import { cn } from "@/lib/utils";

/** Bordered card with a soft brand-tinted light that follows the cursor. */
export function SpotlightCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      }}
      className={cn(
        "group/spot relative overflow-hidden rounded-xl border bg-card/40 transition-colors duration-300 hover:border-foreground/15",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x) var(--spot-y), color-mix(in oklab, var(--brand) 13%, transparent), transparent 45%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
