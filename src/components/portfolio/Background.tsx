import { useEffect, useRef } from "react";

/**
 * Ambient background: GPU-friendly gradient blobs + a lightweight
 * canvas particle field with mouse parallax. Capped to 60fps work.
 */
export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    const mouse = { x: 0, y: 0 };

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: P[] = [];

    const seed = () => {
      const count = Math.min(90, Math.round((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.7 + 0.4,
        a: Math.random() * 0.5 + 0.15,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const near = dist < 140;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + (near ? 0.8 : 0), 0, Math.PI * 2);
        ctx.fillStyle = near
          ? `rgba(56,189,248,${Math.min(0.9, p.a + 0.4)})`
          : `rgba(148,197,255,${p.a})`;
        ctx.fill();

        if (near) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(20,184,166,${(1 - dist / 140) * 0.18})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) {
      window.addEventListener("mousemove", onMove, { passive: true });
      raf = requestAnimationFrame(draw);
    } else {
      draw();
      cancelAnimationFrame(raf);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      {/* gradient blobs */}
      <div className="animate-blob absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-primary/25 blur-[120px]" />
      <div
        className="animate-blob absolute -right-32 top-1/4 h-[32rem] w-[32rem] rounded-full bg-cyan/20 blur-[130px]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="animate-blob absolute bottom-0 left-1/3 h-[34rem] w-[34rem] rounded-full bg-teal/15 blur-[140px]"
        style={{ animationDelay: "-14s" }}
      />
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--cyan) 22%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--cyan) 22%, transparent) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 10%, transparent 70%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
