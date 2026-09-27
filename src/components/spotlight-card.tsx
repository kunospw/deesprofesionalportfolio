import { cn } from "@/lib/utils";

/** Flat bordered card that lifts onto a hard ink shadow on hover. */
export function SpotlightCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border border-foreground bg-card transition-[translate,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
