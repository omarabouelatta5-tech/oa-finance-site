"use client";

import { useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { Link } from "@/lib/link";
import { Reveal } from "./Reveal";
import { Kicker, Arrow } from "./ui";
import { site, process, faq, business } from "@/lib/data";

const BgScene = dynamic(() => import("./three/BgScene"), { ssr: false });
const ProcessScene = dynamic(() => import("./three/ProcessScene"), { ssr: false });

export function PageHero({ kicker, title, children, tint = "gold" }: { kicker: string; title: ReactNode; children?: ReactNode; tint?: "gold" | "teal" | "coral" | "sky" }) {
  return (
    <section className={`page-hero tint-${tint}`}>
      <div className="ph-glow" aria-hidden="true" />
      <div className="bg-stage">
        <BgScene tint={tint} />
      </div>
      <div className="wrap ph-in">
        <Kicker dark>{kicker}</Kicker>
        <h1 className="display">{title}</h1>
        {children && <p className="ph-lead">{children}</p>}
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="process">
      <div className="wrap">
        <Reveal className="sec-head split">
          <div>
            <Kicker dark>How we&apos;ll work</Kicker>
            <h2 className="h2 light">
              Four steps to <em>calmer</em> books.
            </h2>
          </div>
          <p className="sec-lead light">Scroll to walk the path: from the first call to a month-end that closes itself on schedule.</p>
        </Reveal>
      </div>
      <div className="process-stage">
        <ProcessScene />
      </div>
      <div className="wrap">
        <ol className="steps">
          {process.map((p, i) => (
            <Reveal as="li" className="step" key={p.n} delay={i * 110}>
              <span className="step-n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const copy = async (k: string, v: string) => {
    try {
      await navigator.clipboard.writeText(v);
      setToast(`${k} copied`);
    } catch {
      setToast(v);
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2200);
  };
  const digits = (s: string) => s.replace(/\D/g, "");
  const rows = [
    { k: "E-mail", v: site.email, href: `mailto:${site.email}` },
    { k: "WhatsApp", v: site.whatsapp, href: `https://wa.me/${digits(site.whatsapp)}` },
    { k: "Phone", v: site.phone, href: `tel:+${digits(site.phone)}` },
    { k: "LinkedIn", v: site.linkedin, href: site.linkedinUrl },
  ];
  return (
    <section className="final">
      <div className="final-glow" aria-hidden="true" />
      <div className="bg-stage">
        <BgScene tint="teal" density={0.8} />
      </div>
      <div className="wrap final-grid">
        <Reveal>
          <Kicker dark>Let&apos;s talk</Kicker>
          <h2 className="display">
            Let&apos;s clean up <br />
            your <em>ledgers.</em>
          </h2>
          <p className="final-lead">
            Tell us about your books and your systems. You get a clear proposal, and your month-end gets calmer.
          </p>
          <div className="final-actions">
            <Link to="contact" className="btn gold">
              Book a free consultation <Arrow />
            </Link>
            <Link to="services" className="btn ghost-d">
              See packages
            </Link>
          </div>
        </Reveal>
        <Reveal className="final-card" delay={140}>
          {rows.map((r) => (
            <div className="fc-row" key={r.k}>
              <span>{r.k}</span>
              <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {r.v}
              </a>
              <button onClick={() => copy(r.k, r.v)} aria-label={`Copy ${r.k}`}>
                Copy
              </button>
            </div>
          ))}
          <div className="fc-foot">
            <span className="live" /> {site.location} · remote worldwide
          </div>
        </Reveal>
      </div>
      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">
        ✓ {toast}
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq">
      <div className="wrap faq-grid">
        <Reveal>
          <Kicker>Questions</Kicker>
          <h2 className="h2">
            Before you <em>book.</em>
          </h2>
          <p className="sec-lead" style={{ marginTop: 20 }}>
            Anything else, ask on the call. The first consultation is free.
          </p>
        </Reveal>
        <Reveal className="faq-list" delay={100}>
          {faq.map((f, i) => (
            <div className={`faq-item ${open === i ? "open" : ""}`} key={f.q}>
              <h3 className="faq-q">
                <button id={`faq-q-${i}`} onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={`faq-a-${i}`}>
                  <span>{f.q}</span>
                  <i aria-hidden="true" />
                </button>
              </h3>
              <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} inert={open !== i}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
