"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-none text-muted-foreground outline-none transition-colors hover:bg-foreground hover:text-background focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    >
      <Sun className="size-[18px] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[18px] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
