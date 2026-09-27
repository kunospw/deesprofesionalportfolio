import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Smooth-scrolls to a section by id and keeps the URL hash in sync. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  const { pathname, search } = window.location;
  history.replaceState(null, "", id === "home" ? pathname + search : `#${id}`);
}
