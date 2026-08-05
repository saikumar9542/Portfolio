import { useEffect, useRef, useState } from "react";

/** Custom cursor: soft glow that trails the pointer, grows over interactives. */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest("a,button,input,textarea,[data-magnetic]");
      ringRef.current?.classList.toggle("scale-[2.1]", interactive);
      ringRef.current?.classList.toggle("opacity-90", interactive);
    };

    const loop = () => {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ringRef}
        className="absolute -ml-5 -mt-5 h-10 w-10 rounded-full border border-cyan/60 opacity-60 transition-[transform,opacity] duration-300 ease-out"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-cyan shadow-[0_0_24px_6px_color-mix(in_oklab,var(--cyan)_55%,transparent)]"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
