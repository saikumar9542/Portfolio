import { Briefcase } from "lucide-react";
import { experience } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "./primitives";

export function Experience() {
  return (
    <section id="experience" className="section-pad relative px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've shipped"
          subtitle="Enterprise AEM work today, full stack product foundations before it."
        />

        <ol className="relative mt-14 space-y-8 border-l border-border pl-6 sm:pl-10">
          {experience.map((job, i) => (
            <li key={job.role} className="relative">
              <span className="bg-brand-gradient absolute -left-[31px] top-7 flex h-4 w-4 items-center justify-center rounded-full sm:-left-[47px]">
                <span className="h-1.5 w-1.5 rounded-full bg-background" />
              </span>
              <Reveal delay={i * 0.08}>
                <article className="glass card-hover rounded-3xl p-7 sm:p-9">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold">{job.role}</h3>
                      <p className="mt-1 flex items-center gap-2 text-sm text-cyan">
                        <Briefcase className="h-4 w-4" />
                        {job.company}
                      </p>
                    </div>
                    <span className="rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-xs text-muted-foreground">
                      {job.period}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {job.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
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
