import type { ComponentType } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { Section, SectionHeading } from "@/components/section";
import { profile, socials } from "@/data/profile";

type ContactLink = { text: string; href: string };

const instagram = socials.filter((social) => social.label === "Instagram");
const byLabel = (label: string) => socials.find((social) => social.label === label)!;

const channels: { label: string; icon: ComponentType<{ className?: string }>; links: ContactLink[] }[] = [
  { label: "Email", icon: Mail, links: [{ text: profile.email, href: `mailto:${profile.email}` }] },
  { label: "Phone", icon: Phone, links: [{ text: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` }] },
  { label: "LinkedIn", icon: LinkedInIcon, links: [{ text: byLabel("LinkedIn").handle, href: byLabel("LinkedIn").href }] },
  { label: "GitHub", icon: GitHubIcon, links: [{ text: byLabel("GitHub").handle, href: byLabel("GitHub").href }] },
  { label: "Instagram", icon: InstagramIcon, links: instagram.map(({ handle, href }) => ({ text: handle, href })) },
  { label: "Location", icon: MapPin, links: [{ text: profile.location, href: profile.mapsUrl }] },
];

export function Contact() {
  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            index="06"
            eyebrow="Contact"
            title="Get in Touch"
            description="Have a role, a project or a question about my work? Send me a message and I'll get back to you."
            className="md:mb-12"
          />
          <Reveal>
            <ul className="grid gap-6 sm:grid-cols-2">
              {channels.map(({ label, icon: Icon, links }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="flex flex-wrap gap-x-2 text-sm text-muted-foreground">
                      {links.map(({ text, href }) => (
                        <a
                          key={href}
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="truncate transition-colors hover:text-foreground"
                        >
                          {text}
                        </a>
                      ))}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-16">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
