import { LogoMark } from "@/components/icons";
import { sections } from "@/data/navigation";
import { profile, socials } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t px-6 pt-16 pb-28 sm:px-10 md:pr-12 md:pb-10 md:pl-32 lg:pr-20">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4 sm:col-span-2">
          <p className="flex items-center gap-2.5">
            <LogoMark className="size-6 text-brand" />
            <span className="font-pixel">{profile.wordmark}</span>
          </p>
          <p className="max-w-sm text-sm text-pretty text-muted-foreground">
            {profile.name} · {profile.role} from {profile.location}. {profile.tagline}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="transition-colors hover:text-foreground">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">Connect</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${profile.email}`} className="transition-colors hover:text-foreground">
                {profile.email}
              </a>
            </li>
            {socials.map(({ label, handle, href }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                  {label} <span className="text-muted-foreground/70">{handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and shadcn/ui.
        </p>
        <p className="font-pixel text-xs tracking-[0.15em] text-brand uppercase">{profile.quote}</p>
      </div>
    </footer>
  );
}
