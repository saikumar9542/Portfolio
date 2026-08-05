import { useInView } from "motion/react";
import { useRef } from "react";
import { skills } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "./primitives";

const SIZE = 132;
const STROKE = 8;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

function Dial({ name, value, delay }: { name: string; value: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="glass card-hover flex flex-col items-center rounded-3xl p-6">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          className="-rotate-90"
          role="img"
          aria-label={`${name}: ${value} percent`}
        >
          <defs>
            <linearGradient id={`grad-${name.replace(/\W/g, "")}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="55%" stopColor="var(--cyan)" />
              <stop offset="100%" stopColor="var(--teal)" />
            </linearGradient>
          </defs>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="var(--border)"
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke={`url(#grad-${name.replace(/\W/g, "")})`}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={inView ? C - (C * value) / 100 : C}
            style={{
              transition: `stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
            }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold text-gradient">
          {value}%
        </span>
      </div>
      <p className="mt-4 text-sm font-medium text-muted-foreground">{name}</p>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-pad relative px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="Proficiency at a glance"
          subtitle="Depth across backend engineering, AEM and the modern web."
        />

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <Dial name={s.name} value={s.value} delay={i * 0.08} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
