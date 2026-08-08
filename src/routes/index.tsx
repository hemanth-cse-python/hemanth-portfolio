"use client";
import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
// import { PageLoader } from "@/components/PageLoader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { CustomCursor } from "@/components/CustomCursor";
// import { MouseFollowGlow } from "@/components/MouseFollowGlow";
import { ThemeToggle } from "@/components/ThemeToggle";

// Lazy-load below-the-fold sections to shrink the initial JS bundle
// and improve LCP / TTI. Each chunk streams in as the user scrolls.
const About = lazy(() => import("@/components/About").then((m) => ({ default: m.About })));
const Skills = lazy(() => import("@/components/Skills").then((m) => ({ default: m.Skills })));
const Projects = lazy(() => import("@/components/Projects").then((m) => ({ default: m.Projects })));
const Experience = lazy(() => import("@/components/Experience").then((m) => ({ default: m.Experience })));
const Publication = lazy(() => import("@/components/Publication").then((m) => ({ default: m.Publication })));
const Certificates = lazy(() => import("@/components/Certificates").then((m) => ({ default: m.Certificates })));
const Resume = lazy(() => import("@/components/Resume").then((m) => ({ default: m.Resume })));
const Contact = lazy(() => import("@/components/Contact").then((m) => ({ default: m.Contact })));

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const SectionFallback = () => (
  <div aria-hidden="true" className="mx-auto w-full max-w-6xl px-4 py-24">
    <div className="h-6 w-40 animate-pulse rounded-full bg-white/5" />
    <div className="mt-6 h-48 w-full animate-pulse rounded-3xl bg-white/5" />
  </div>
);

function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-lg focus:bg-gradient-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      {/* <PageLoader /> */}
      <ScrollProgress />
      <CustomCursor />
      {/* <MouseFollowGlow /> */}
      <ParticlesBackground />
      <Navbar />
      <BackToTop />
      <ThemeToggle />

      <main id="main">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Publication />
          <Certificates />
          <Resume />
          <Contact />
        </Suspense>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sripathi Hemanth. Crafted with care.
          </div>
          <nav aria-label="Social links" className="flex items-center gap-3">
            <a href="https://github.com/hemanth-cse-python" target="_blank" rel="noreferrer noopener" className="grid h-10 w-10 place-items-center rounded-xl glass hover:bg-white/10" aria-label="GitHub profile">
              <Github size={16} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/hemanth-sripathi-9850a02bb" target="_blank" rel="noreferrer noopener" className="grid h-10 w-10 place-items-center rounded-xl glass hover:bg-white/10" aria-label="LinkedIn profile">
              <Linkedin size={16} aria-hidden="true" />
            </a>
            <a href="mailto:hemanthbunny023@gmail.com" className="grid h-10 w-10 place-items-center rounded-xl glass hover:bg-white/10" aria-label="Send email">
              <Mail size={16} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
