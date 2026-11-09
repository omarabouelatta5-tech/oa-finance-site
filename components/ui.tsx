"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { useInView } from "./Reveal";

export function Kicker({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={`kicker ${dark ? "dark" : ""}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  );
}

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <span className="logo-mark" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 40 40" width={size} height={size}>
        <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.55" />
        <text x="20" y="26.5" textAnchor="middle" fontFamily="'Instrument Serif', Georgia, serif" fontStyle="italic" fontSize="20" fill="currentColor">
          OA
        </text>
        <g fill="#C9A35B">
          <rect x="27" y="30" width="2" height="4" rx="0.5" />
          <rect x="30" y="27.5" width="2" height="6.5" rx="0.5" />
          <rect x="33" y="25" width="2" height="9" rx="0.5" />
        </g>
      </svg>
    </span>
  );
}

/** Counts up once visible. */
export function CountUp({ to, from = 0, decimals = 0, duration = 1600 }: { to: number; from?: number; decimals?: number; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(to);
      return;
    }
    let raf = 0;
    const s = performance.now();
    const tick = (n: number) => {
      const k = Math.min(1, (n - s) / duration);
      setV(from + (to - from) * (1 - Math.pow(1 - k, 4)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from, duration]);
  return <span ref={ref}>{decimals ? v.toFixed(decimals) : Math.round(v)}</span>;
}

export function Cutout({ className = "" }: { className?: string }) {
  return (
    <Image
      className={className}
      src="/assets/omar-cutout.webp"
      alt="Omar Abouelatta in a navy suit"
      width={1000}
      height={970}
      sizes="(max-width: 900px) 80vw, 460px"
    />
  );
}

export function Arrow() {
  return (
    <svg className="arrow-ic" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
