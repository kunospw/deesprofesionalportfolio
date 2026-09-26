"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/** Types and deletes each word in turn, ending on a blinking pixel cursor. */
export function Typewriter({ words }: { words: readonly string[] }) {
  const reduceMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const word = words[index];

    let delay = deleting ? 35 : 75;
    let step = () =>
      setText(word.slice(0, text.length + (deleting ? -1 : 1)));

    if (!deleting && text === word) {
      delay = 1800;
      step = () => setDeleting(true);
    } else if (deleting && text === "") {
      delay = 350;
      step = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      };
    }

    const timer = window.setTimeout(step, delay);
    return () => window.clearTimeout(timer);
  }, [text, deleting, index, words, reduceMotion]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {reduceMotion ? words[0] : text}
        <span className="ml-1 inline-block h-[0.85em] w-[0.42em] translate-y-[0.1em] bg-brand motion-safe:animate-blink" />
      </span>
    </>
  );
}
