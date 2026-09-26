import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

/** Page section with the left gutter that keeps content clear of the side rail. */
export function Section({
  id,
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & { id: string }) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-6 py-20 sm:px-10 md:py-28 md:pr-12 md:pl-32 lg:pr-20",
        className,
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12 max-w-2xl space-y-4 md:mb-16", className)}>
      <p className="flex items-center gap-3 font-pixel text-xs tracking-[0.2em] text-brand uppercase">
        <span>{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-brand/40" />
        <span>{eyebrow}</span>
      </p>
      <h2 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-lg text-pretty text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  );
}
