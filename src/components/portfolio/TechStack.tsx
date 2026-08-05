import { techStack } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "./primitives";

export function TechStack() {
  return (
    <section id="stack" className="section-pad relative px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools of the craft"
          subtitle="The languages, frameworks and platforms I reach for every day."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {techStack.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.05}>
              <article className="glass card-hover h-full rounded-3xl p-7">
                <header className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">{group.group}</h3>
                  <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                    {group.items.length}
                  </span>
                </header>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="group relative inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-3.5 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:text-foreground">
                        <span className="bg-brand-gradient h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-150" />
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
