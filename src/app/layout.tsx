import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";

import "./globals.css";
import { MotionProvider } from "@/components/motion";
import { AudioProvider } from "@/components/providers/audio-provider";
import { UIProvider } from "@/components/providers/ui-provider";
import { Toaster } from "@/components/ui/sonner";
import { profile, siteUrl } from "@/data/profile";
import { themeScript } from "@/lib/theme-script";
import { cn } from "@/lib/utils";

const description = `${profile.name} (${profile.nickname}) is a ${profile.role.toLowerCase()} and Informatics student from ${profile.location}. ${profile.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description,
  applicationName: profile.wordmark,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Dee",
    "kunospw",
    "Web Developer",
    "Game Developer",
    "React",
    "Unity",
    "Pixel Art",
    "Portfolio",
    "Indonesia",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${profile.name} Portfolio`,
    title: `${profile.name} | ${profile.role}`,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        GeistPixelSquare.variable,
        "dark",
      )}
      style={{ colorScheme: "dark" }}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>
          <UIProvider>
            <AudioProvider>{children}</AudioProvider>
          </UIProvider>
        </MotionProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
