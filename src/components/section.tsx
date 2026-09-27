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
        "relative border-t border-foreground px-6 py-20 sm:px-10 md:py-28 md:pr-12 md:pl-32 lg:pr-20",
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
      <p className="font-mono text-sm text-muted-foreground">
        <span className="bg-foreground px-1.5 py-0.5 text-background">{index}</span>
        <span className="ml-2">{`// ${eyebrow.toLowerCase()}`}</span>
      </p>
      <h2 className="text-5xl font-extrabold tracking-[-0.04em] text-balance sm:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="text-lg text-pretty text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  );
}
