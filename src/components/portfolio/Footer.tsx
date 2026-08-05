import { useEffect, useState } from "react";
import { ArrowUp, FileText, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
const RESUME_URL = "/saikumar_resume.pdf";

export function Footer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const socials = [
    { href: profile.github, label: "GitHub", icon: Github },
    { href: profile.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
    { href: RESUME_URL, label: "Resume", icon: FileText },
  ];

  return (
    <footer className="relative px-6 pb-12">
      <div className="glass mx-auto max-w-6xl rounded-3xl px-8 py-10">
        <div className="flex flex-col items-center gap-7 text-center">
          <a href="#hero" className="font-display text-lg font-bold text-gradient">
            {profile.name}
          </a>
          <p className="max-w-md text-sm text-muted-foreground">
            Java · Spring Boot · Adobe Experience Manager · React — building scalable software with
            care.
          </p>
          <ul className="flex gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="inline-flex rounded-xl border border-border bg-secondary/40 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:text-cyan"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
          <p className="border-t border-border pt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Designed & built with attention to detail.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`bg-brand-gradient fixed bottom-6 right-6 z-40 rounded-full p-3.5 text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-500 ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
