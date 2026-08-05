import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { Reveal, SectionHeading, TiltCard } from "./primitives";

export function Projects() {
  return (
    <section id="projects" className="section-pad relative px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          subtitle="Enterprise CMS builds, backend platforms and crafted frontends."
        />

        <div className="mt-14 space-y-8">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <TiltCard max={4}>
                <article className="glass card-hover group relative overflow-hidden rounded-3xl p-8 sm:p-10">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-[90px] transition-opacity duration-700 group-hover:opacity-100 sm:opacity-60"
                  />
                  <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                    <div>
                      <span className="text-xs font-medium uppercase tracking-[0.18em] text-cyan">
                        {p.category}
                      </span>
                      <h3 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{p.name}</h3>
                      <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                        {p.blurb}
                      </p>

                      <div className="mt-7 flex flex-wrap gap-3">
                        <a
                          href={p.links.github}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-cyan/60 hover:text-cyan"
                        >
                          <Github className="h-4 w-4" /> GitHub
                        </a>
                        {p.links.demo ? (
                          <a
                            href={p.links.demo}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
                          >
                            <ExternalLink className="h-4 w-4" /> Live Demo
                          </a>
                        ) : null}
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-teal/60 hover:text-teal"
                        >
                          Case Study <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-secondary/40 p-6">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Highlights
                      </h4>
                      <ul className="mt-4 space-y-3">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex gap-3 text-sm text-muted-foreground">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-lg bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
