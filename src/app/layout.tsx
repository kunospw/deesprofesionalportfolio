import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { MotionProvider } from "@/components/motion";
import { UIProvider } from "@/components/providers/ui-provider";
import { Toaster } from "@/components/ui/sonner";
import { profile, siteUrl } from "@/data/profile";
import { themeScript } from "@/lib/theme-script";
import { cn } from "@/lib/utils";

const description = `${profile.name} (${profile.nickname}) is a full-stack developer with broad end-to-end experience building, integrating, deploying and supporting production applications with .NET, Next.js, Flutter and Epicor Kinetic ERP. Based in ${profile.location}.`;

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
    "Full-Stack Developer",
    "Software Developer",
    ".NET",
    "Next.js",
    "Flutter",
    "Epicor Kinetic",
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
    { media: "(prefers-color-scheme: dark)", color: "#111214" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
      )}
      style={{ colorScheme: "light" }}
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
            {children}
          </UIProvider>
        </MotionProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
