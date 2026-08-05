import { BadgeCheck, Boxes, Cloud, Code2 } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { Reveal, SectionHeading, TiltCard } from "./primitives";

const highlights = [
  {
    icon: Code2,
    title: "Enterprise Java",
    text: "Spring Boot, Hibernate, Data JPA and layered architectures built to scale.",
  },
  {
    icon: Cloud,
    title: "AEM Cloud Service",
    text: "Authorable components, Sling Models, OSGi services and Dispatcher tuning.",
  },
  {
    icon: Boxes,
    title: "Full Stack Delivery",
    text: "React frontends wired to secure REST APIs and MySQL persistence.",
  },
  {
    icon: BadgeCheck,
    title: "Quality First",
    text: "JUnit, Mockito, code standards, security guidelines and Agile rituals.",
  },
];

export function About() {
  return (
    <section id="about" className="section-pad relative px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Engineering with intent"
          subtitle="A snapshot of how I think, build and ship software."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <TiltCard max={5}>
              <article className="glass card-hover h-full rounded-3xl p-8 sm:p-10">
                <h3 className="font-display text-xl font-semibold">Professional Summary</h3>
                <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                  {profile.summary}
                </p>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                  {profile.summaryExtra}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Java", "Spring Boot", "AEM Cloud", "React", "MySQL", "Docker"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </TiltCard>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <article className="glass card-hover h-full rounded-3xl p-6">
                  <span className="bg-brand-gradient inline-flex h-11 w-11 items-center justify-center rounded-xl">
                    <h.icon className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <h4 className="mt-5 font-display text-base font-semibold">{h.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
