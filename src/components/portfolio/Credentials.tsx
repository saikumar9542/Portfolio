import { Award, GraduationCap, ScrollText, Trophy } from "lucide-react";
import { achievements, certifications, education } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "./primitives";

export function Achievements() {
  return (
    <section id="achievements" className="section-pad relative px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Achievements" title="Recognition & milestones" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <article className="glass card-hover h-full rounded-3xl p-6">
                <span className="bg-brand-gradient inline-flex h-11 w-11 items-center justify-center rounded-xl">
                  <Trophy className="h-5 w-5 text-primary-foreground" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold leading-snug">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="section-pad relative px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Education" title="Academic foundation" />
        <ol className="relative mt-14 space-y-6 border-l border-border pl-6 sm:pl-10">
          {education.map((e, i) => (
            <li key={e.degree} className="relative">
              <span className="bg-brand-gradient absolute -left-[31px] top-8 flex h-4 w-4 items-center justify-center rounded-full sm:-left-[47px]">
                <span className="h-1.5 w-1.5 rounded-full bg-background" />
              </span>
              <Reveal delay={i * 0.07}>
                <article className="glass card-hover flex flex-wrap items-center justify-between gap-4 rounded-3xl p-7">
                  <div className="flex items-start gap-4">
                    <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-cyan" />
                    <div>
                      <h3 className="font-display text-lg font-semibold">{e.degree}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{e.school}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{e.period}</p>
                    <p className="font-display text-base font-semibold text-teal">{e.score}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="section-pad relative px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Certifications" title="Credentials earned" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <article className="glass card-hover flex h-full items-start gap-5 rounded-3xl p-7">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/50">
                  {i % 2 === 0 ? (
                    <Award className="h-5 w-5 text-cyan" />
                  ) : (
                    <ScrollText className="h-5 w-5 text-teal" />
                  )}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold leading-snug">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.issuer}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
