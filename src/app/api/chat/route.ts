import { NextResponse } from "next/server";

import { buildAssistantContext } from "@/lib/assistant-context";

const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const MAX_MESSAGES = 10;
const MAX_CHARS = 1000;

type ChatMessage = { role: "user" | "assistant"; content: string };

type GeminiResponse = {
  candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[];
  error?: { message?: string };
};

// Best-effort rate limit. Serverless instances don't share memory, so this
// only slows down abuse of the API key; it isn't a hard quota.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT_PER_WINDOW = 20;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
    }
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT_PER_WINDOW;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw)) return null;

  const messages: ChatMessage[] = [];
  for (const item of raw.slice(-MAX_MESSAGES)) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (text) messages.push({ role, content: text });
  }

  // Gemini needs the conversation to end on the visitor's turn.
  if (messages.at(-1)?.role !== "user") return null;
  return messages;
}

const reply = (payload: { reply?: string; error?: string }, status = 200) =>
  NextResponse.json(payload, { status });

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return reply(
      { error: "The assistant is offline right now. You can still reach Dee through the contact form." },
      503,
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return reply({ error: "You're sending messages quickly. Please wait a few minutes and try again." }, 429);
  }

  const messages = parseMessages(await request.json().catch(() => null));
  if (!messages) return reply({ error: "That message couldn't be read. Please try again." }, 400);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildAssistantContext() }] },
          contents: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
        }),
        signal: AbortSignal.timeout(20_000),
      },
    );

    const data = (await res.json().catch(() => null)) as GeminiResponse | null;
    if (!res.ok) {
      console.error("Gemini API error", res.status, data?.error?.message);
      return reply({ error: "The assistant couldn't answer just now. Please try again in a moment." }, 502);
    }

    const text = data?.candidates?.[0]?.content?.parts
      ?.filter((part) => typeof part.text === "string" && !part.thought)
      .map((part) => part.text)
      .join("")
      .trim();

    if (!text) {
      return reply(
        { error: "I don't have a good answer for that one. Try asking about Dee's projects, skills or experience." },
        502,
      );
    }
    return reply({ reply: text });
  } catch (error) {
    console.error("Gemini request failed", error);
    return reply({ error: "The assistant couldn't answer just now. Please try again in a moment." }, 502);
  }
}
