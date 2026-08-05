import { useState, type FormEvent } from "react";
import { Github, Linkedin, Loader2, Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/lib/portfolio-data";
import { submitForm, validateContact, type ContactErrors } from "@/lib/contact";
import { Reveal, SectionHeading } from "./primitives";

const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "Your full name", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+91 00000 00000", required: false },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "What's this about?",
    required: true,
  },
] as const;

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const fieldErrors = validateContact(payload);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setLoading(true);
    const id = toast.loading("Sending your message…");
    try {
      await submitForm(payload);
      toast.success("Message Sent Successfully", {
        id,
        description: "Thanks for reaching out — I'll reply shortly.",
      });
      form.reset();
      setErrors({});
    } catch (err) {
      toast.error("Failed to Send", {
        id,
        description: err instanceof Error ? err.message : "Please try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-pad relative px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          subtitle="Open to full-time roles, AEM engagements and full stack collaborations."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="glass h-full rounded-3xl p-8">
              <h3 className="font-display text-xl font-semibold">Reach out directly</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                I usually reply within a day. Share a little about the role or project and I'll get
                back with next steps.
              </p>

              <ul className="mt-8 space-y-4">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-secondary/40 p-4 transition-colors hover:border-cyan/50"
                  >
                    <Mail className="h-5 w-5 text-cyan" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground">
                      {profile.email}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, "")}`}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-secondary/40 p-4 transition-colors hover:border-teal/50"
                  >
                    <Phone className="h-5 w-5 text-teal" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground">
                      {profile.phone}
                    </span>
                  </a>
                </li>
              </ul>

              <div className="mt-8 flex gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub profile"
                  className="glass card-hover rounded-xl p-3"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn profile"
                  className="glass card-hover rounded-xl p-3"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="glass glow-ring rounded-3xl p-8 sm:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.name} className={f.name === "subject" ? "sm:col-span-2" : ""}>
                    <label
                      htmlFor={f.name}
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      {f.label}
                      {f.required ? <span className="text-teal"> *</span> : null}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      disabled={loading}
                      aria-invalid={errors[f.name] ? true : undefined}
                      aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                      placeholder={f.placeholder}
                      onChange={() => setErrors(({ [f.name]: _omit, ...rest }) => rest)}
                      className={`w-full rounded-xl border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-ring/30 disabled:opacity-60 ${
                        errors[f.name] ? "border-destructive" : "border-input focus:border-cyan/60"
                      }`}
                    />
                    {errors[f.name] ? (
                      <p id={`${f.name}-error`} className="mt-1.5 text-xs text-destructive">
                        {errors[f.name]}
                      </p>
                    ) : null}
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    Message<span className="text-teal"> *</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    disabled={loading}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    placeholder="Tell me about the opportunity…"
                    onChange={() => setErrors(({ message: _omit, ...rest }) => rest)}
                    className={`w-full resize-y rounded-xl border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-ring/30 disabled:opacity-60 ${
                      errors.message ? "border-destructive" : "border-input focus:border-cyan/60"
                    }`}
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-1.5 text-xs text-destructive">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-brand-gradient mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
