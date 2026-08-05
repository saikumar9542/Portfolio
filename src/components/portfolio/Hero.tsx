import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Download, FolderGit2, Mail, MapPin } from "lucide-react";
import { profile, stats } from "@/lib/portfolio-data";
import { Counter, Magnetic } from "./primitives";
const RESUME_URL = "/saikumar_resume.pdf";

/** Typewriter cycling through the role list. */
function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length] ?? "";
    const done = !deleting && text === word;
    const cleared = deleting && text === "";
    const delay = done ? 1500 : cleared ? 250 : deleting ? 40 : 85;

    const t = setTimeout(() => {
      if (done) return setDeleting(true);
      if (cleared) {
        setDeleting(false);
        setI((v) => v + 1);
        return;
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return text;
}

const floatingTech = [
  { label: "Java", x: "8%", y: "18%", d: "0s" },
  { label: "Spring Boot", x: "78%", y: "12%", d: "-1.4s" },
  { label: "AEM", x: "86%", y: "62%", d: "-2.6s" },
  { label: "React", x: "4%", y: "70%", d: "-3.8s" },
  { label: "Docker", x: "62%", y: "84%", d: "-2s" },
];

export function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32"
    >
      {/* floating tech chips */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {floatingTech.map((t) => (
          <span
            key={t.label}
            className="glass animate-float-slow absolute rounded-xl px-3.5 py-2 text-xs font-medium text-cyan/90"
            style={{ left: t.x, top: t.y, animationDelay: t.d }}
          >
            {t.label}
          </span>
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            Available for new opportunities
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            <span className="block text-muted-foreground/80 text-2xl font-medium sm:text-3xl">
              Hi, I'm
            </span>
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            className="mt-5 font-display text-xl text-foreground sm:text-2xl"
          >
            <span className="text-muted-foreground">Software Engineer · </span>
            <span className="text-cyan">{typed}</span>
            <span className="animate-caret ml-0.5 inline-block h-6 w-[2px] translate-y-1 bg-teal" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24 }}
            className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground"
          >
            I build enterprise-grade experiences with Java, Spring Boot and Adobe Experience Manager
            Cloud Service — from resilient REST APIs to authorable, headless-ready content
            platforms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href={RESUME_URL}
                download="Saikumar-Kathraj-Resume.pdf"
                className="bg-brand-gradient glow-ring inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#projects"
                className="glass card-hover inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-foreground"
              >
                <FolderGit2 className="h-4 w-4 text-cyan" /> View Projects
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-teal/60 hover:text-teal"
              >
                <Mail className="h-4 w-4" /> Hire Me
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MapPin className="h-4 w-4 text-teal" /> {profile.location}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="glass glow-ring relative rounded-3xl p-7"
        >
          <div className="flex items-center gap-2 pb-5">
            <span className="h-3 w-3 rounded-full bg-destructive/70" />
            <span className="h-3 w-3 rounded-full bg-chart-5/70" />
            <span className="h-3 w-3 rounded-full bg-teal/70" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">Developer.java</span>
          </div>
          <pre className="overflow-x-auto font-mono text-[13px] leading-relaxed text-muted-foreground">
            <code>
              {`@Component
public class Developer {
  String name = "`}
              <span className="text-cyan">Saikumar Kathraj</span>
              {`";
  String[] core = {"`}
              <span className="text-teal">Java</span>
              {`", "`}
              <span className="text-teal">Spring Boot</span>
              {`",
                   "`}
              <span className="text-teal">AEM Cloud</span>
              {`", "`}
              <span className="text-teal">React</span>
              {`"};

  public String build() {
    return "scalable, clean, shipped";
  }
}`}
            </code>
          </pre>

          <div className="mt-7 grid grid-cols-2 gap-3 border-t border-border pt-6">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-secondary/50 p-4">
                <p className="font-display text-2xl font-bold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-cyan md:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
