import { CommandMenu } from "@/components/layout/command-menu";
import { FloatingDock } from "@/components/layout/floating-dock";
import { Footer } from "@/components/layout/footer";
import { MobileHeader } from "@/components/layout/mobile-header";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SideRail } from "@/components/layout/side-rail";
import { TopNav } from "@/components/layout/top-nav";
import { About } from "@/components/sections/about";
import { Certificates } from "@/components/sections/certificates";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <TopNav />
      <MobileHeader />
      <SideRail />
      <CommandMenu />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certificates />
        <Services />
        <Contact />
      </main>

      <Footer />
      <FloatingDock />
    </>
  );
}
