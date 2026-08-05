import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";

import { Background } from "@/components/portfolio/Background";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { TechStack } from "@/components/portfolio/TechStack";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Achievements, Certifications, Education } from "@/components/portfolio/Credentials";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { profile } from "@/lib/portfolio-data";

const title = "Saikumar Kathraj — Java & AEM Full Stack Developer";
const description =
  "Portfolio of Saikumar Kathraj, Software Engineer specializing in Java, Spring Boot, Adobe Experience Manager (AEM Cloud Service) and full stack web development.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Saikumar Kathraj, Java Developer, AEM Developer, Spring Boot, Full Stack Developer, Adobe Experience Manager, Portfolio",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: "Software Engineer",
          email: `mailto:${profile.email}`,
          telephone: profile.phone,
          address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
          sameAs: [profile.github, profile.linkedin],
          knowsAbout: [
            "Java",
            "Spring Boot",
            "Hibernate",
            "Adobe Experience Manager",
            "React",
            "MySQL",
            "REST APIs",
          ],
        }),
      },
    ],
  }),
  component: Portfolio,
});

/** Premium entry loader shown while the first paint settles. */
function Preloader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-brand-gradient flex h-16 w-16 items-center justify-center rounded-2xl font-display text-xl font-bold text-primary-foreground"
          >
            SK
          </motion.span>
          <div className="mt-7 h-[3px] w-44 overflow-hidden rounded-full bg-secondary">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-brand-gradient h-full w-full"
            />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Loading</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Portfolio() {
  const [ready, setReady] = useState(false);

  // Smooth inertia scrolling (respects reduced-motion).
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onAnchor = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -90 });
    };
    document.addEventListener("click", onAnchor);

    return () => {
      document.removeEventListener("click", onAnchor);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Preloader done={ready} />
      <CursorGlow />
      <Background />
      <Nav />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
