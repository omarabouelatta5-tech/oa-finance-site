"use client";

import dynamic from "next/dynamic";
import { Link } from "@/lib/link";
import { Reveal } from "../Reveal";
import { Kicker, Cutout, Arrow } from "../ui";
import { FinalCTA } from "../sections";
import { experience, tools, credentials, why, business, places } from "@/lib/data";

const GlobeScene = dynamic(() => import("../three/GlobeScene"), { ssr: false });
const BgScene = dynamic(() => import("../three/BgScene"), { ssr: false });

export default function AboutPage() {
  return (
    <>
      <section className="about-hero tint-teal">
        <div className="ph-glow" aria-hidden="true" />
        <div className="bg-stage">
          <BgScene tint="teal" density={0.7} />
        </div>
        <div className="wrap ah-grid">
          <div className="ah-copy">
            <Kicker dark>About {business.name}</Kicker>
            <h1 className="display">
              Hotel-finance standards, <em>for any business.</em>
            </h1>
            <p className="ph-lead">
              {business.name} is a bookkeeping and accounting-automation practice founded by {business.founder}, built
              on six years in luxury-resort finance offices in the UAE and Egypt. We keep ledgers clean, payments on
              time and the month-end calm, and we automate the repetitive checking without taking decisions away
              from people.
            </p>
            <div className="founder-actions">
              <Link to="contact" className="btn gold">
                Book a free consultation <Arrow />
              </Link>
            </div>
          </div>
          <div className="ah-photo">
            <div className="ah-disc" aria-hidden="true" />
            <Cutout className="ah-img" />
            <span className="ah-cap">
              <b>{business.founder}</b>
              <small>Founder · Accountant · Paymaster</small>
            </span>
          </div>
        </div>
      </section>

      <section className="whyus">
        <div className="wrap">
          <Reveal className="sec-head split">
            <div>
              <Kicker>How we work</Kicker>
              <h2 className="h2">
                Four things you can <em>count on.</em>
              </h2>
            </div>
          </Reveal>
          <div className="why-grid">
            {why.map((w, i) => (
              <Reveal className="why-card" key={w.title} delay={i * 90}>
                <span className="why-n">0{i + 1}</span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="xp">
        <div className="wrap xp-grid">
          <div className="xp-sticky">
            <Kicker>Where the standard comes from</Kicker>
            <h2 className="h2">
              Six years in <em>resort finance offices.</em>
            </h2>
            <p className="sec-lead" style={{ marginTop: 18 }}>
              Centara Mirage Beach Resort in Dubai, Iberotel Costa Mares in Marsa Alam and Steigenberger Alcazar in
              Sharm El Sheikh. Today the practice runs from Chanthaburi, Thailand, remotely worldwide.
            </p>
            <div className="xp-globe">
              <GlobeScene />
            </div>
            <div className="places light">
              {places.map((p) => (
                <span key={p.name}>{p.name}</span>
              ))}
            </div>
          </div>
          <ol className="xp-list">
            {experience.map((j) => (
              <Reveal as="li" key={j.role} className={`xp-item ${j.current ? "now" : ""}`}>
                <div className="xp-meta">
                  <span>{j.dates}</span>
                  <span>{j.place}</span>
                </div>
                <h3>{j.role}</h3>
                <div className="xp-co">{j.company}</div>
                <ul>
                  {j.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {j.note && <p className="xp-note">{j.note}</p>}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="stack">
        <div className="wrap">
          <Reveal className="sec-head split">
            <div>
              <Kicker>Systems we work in</Kicker>
              <h2 className="h2">
                No migration <em>needed.</em>
              </h2>
            </div>
            <p className="sec-lead">We work inside the systems you already run, from cloud bookkeeping to hotel PMS, point-of-sale and automation.</p>
          </Reveal>
          <div className="tool-grid">
            {tools.map((t, i) => (
              <Reveal className={`tool ${t.certified ? "cert" : ""}`} key={t.name} delay={(i % 5) * 60}>
                <span className="tool-mono">{t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
                <h3>{t.name}</h3>
                <p>{t.note}</p>
                {t.certified && <span className="cert-tag">Certified</span>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="creds">
        <div className="wrap">
          <Reveal className="sec-head split">
            <div>
              <Kicker>Credentials</Kicker>
              <h2 className="h2">
                Certified, <em>not just experienced.</em>
              </h2>
            </div>
          </Reveal>
          <div className="cred-grid">
            <Reveal className="cred-feature">
              <span className="t-tag">Xero · all three levels</span>
              <div className="cred-levels">
                {credentials.certs
                  .filter((c) => c.org === "Xero")
                  .map((c, i) => (
                    <div key={c.name} className="lvl">
                      <span className="lvl-n">L{3 - i}</span>
                      <div>
                        <b>{c.name.replace("Xero Certified ", "")}</b>
                        <small>{c.date}</small>
                      </div>
                    </div>
                  ))}
              </div>
            </Reveal>
            <Reveal className="cred-list" delay={120}>
              <ul>
                {[...credentials.certs.filter((c) => c.org !== "Xero"), ...credentials.edu].map((c) => (
                  <li key={c.name}>
                    <div>
                      <b>{c.name}</b>
                      <span>{c.org}</span>
                    </div>
                    <small>{c.date}</small>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
