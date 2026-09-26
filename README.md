# dyah.rini

Personal portfolio of **Dyah Puspo Rini (Dee)**, web & game developer from Bekasi, Indonesia.

## Stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **Tailwind CSS v4** and **shadcn/ui** components in `src/components/ui` (Radix primitives, `cmdk` command menu, `sonner` toasts)
- **Motion** for scroll reveals, the lanyard ID card and layout animations
- **Geist Sans, Geist Mono and Geist Pixel** from the `geist` package
- **EmailJS** for the contact form and **Gemini** for the "Ask about Dee" assistant (server route, key never reaches the browser)

## Getting started

```bash
npm install
cp .env.example .env.local   # add GEMINI_API_KEY to enable the chat assistant
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Editing content

Everything on the page is driven by the files in `src/data/`:

| File | What it holds |
| --- | --- |
| `profile.ts` | Name, roles, bio, contact details, socials and the About highlights |
| `projects.ts` | Project cards (screenshots live in `src/assets/`) |
| `experience.ts` | Timeline entries and their photos or videos |
| `certificates.ts` | Certificates and achievements |
| `skills.ts` | Skill tree branches and the "used in" notes |
| `services.ts` | Freelance services and work policy; set `fiverrUrl` once a gig is live |
| `songs.ts` | Music player tracks (audio files in `public/songs/`) |

The chat assistant builds its knowledge from the same files (`src/lib/assistant-context.ts`), so updating the data updates the assistant too.

## Adding components

`components.json` is configured for the shadcn CLI, including the [React Bits](https://reactbits.dev) registry:

```bash
npx shadcn@latest add tabs
npx shadcn@latest add @react-bits/BlurText-TS-TW
```

## Environment variables

See `.env.example`. `GEMINI_API_KEY` is read only on the server by `src/app/api/chat/route.ts`; never give it a `NEXT_PUBLIC_` prefix. Without it the site works normally and the assistant replies that it is offline.

## Deploying

On Vercel, `vercel.json` pins the framework preset to Next.js. Add `GEMINI_API_KEY` (and optionally `NEXT_PUBLIC_SITE_URL`) under Project Settings → Environment Variables.
