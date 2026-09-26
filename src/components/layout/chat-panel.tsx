"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SendHorizontal, X } from "lucide-react";

import { useUI } from "@/components/providers/ui-provider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! I'm Dee's portfolio assistant. Ask me about her projects, skills, experience or how to work with her.",
};

const SUGGESTIONS = [
  "What does Dee build?",
  "Tell me about Job Hive",
  "Is she available for freelance work?",
];

const MAX_INPUT = 500;

export function ChatPanel() {
  const { chatOpen, setChatOpen } = useUI();
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const list = listRef.current;
    list?.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  useEffect(() => {
    if (!chatOpen) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setChatOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [chatOpen, setChatOpen]);

  async function send(text: string) {
    const question = text.trim().slice(0, MAX_INPUT);
    if (!question || pending) return;

    const history = [...messages, { role: "user" as const, content: question }];
    setMessages(history);
    setInput("");
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is UI copy, not part of the conversation.
        body: JSON.stringify({ messages: history.slice(1).slice(-10) }),
      });
      const data: { reply?: string; error?: string } = await res
        .json()
        .catch(() => ({}));
      const reply =
        res.ok && data.reply
          ? data.reply
          : (data.error ?? "Something went wrong. Please try again in a moment.");
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I couldn't reach the server. Check your connection and try again.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <AnimatePresence>
      {chatOpen ? (
        <motion.section
          role="dialog"
          aria-label="Chat with Dee's portfolio assistant"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          className="flex h-[min(70dvh,520px)] w-[min(calc(100vw-2rem),380px)] origin-bottom-right flex-col overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl"
        >
          <header className="flex items-start justify-between gap-3 border-b px-4 py-3">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span aria-hidden="true" className="size-2 bg-brand" />
                Ask about Dee
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                An AI assistant that answers from this portfolio.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="-mr-1 rounded-full"
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
            >
              <X />
            </Button>
          </header>

          <div
            ref={listRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted text-foreground",
                )}
              >
                {message.content}
              </div>
            ))}
            {pending ? (
              <div className="flex w-fit items-center gap-1 rounded-lg bg-muted px-3 py-3" aria-label="Assistant is typing">
                {[0, 0.15, 0.3].map((delay) => (
                  <span
                    key={delay}
                    className="size-1.5 bg-muted-foreground motion-safe:animate-bounce"
                    style={{ animationDelay: `${delay}s` }}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {messages.length === 1 ? (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className="rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t p-3"
          >
            <Textarea
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={MAX_INPUT}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask about projects, skills…"
              aria-label="Your question"
              className="max-h-28 min-h-9 resize-none py-1.5"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || pending} aria-label="Send">
              <SendHorizontal />
            </Button>
          </form>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
