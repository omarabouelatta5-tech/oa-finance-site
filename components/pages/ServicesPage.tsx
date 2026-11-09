"use client";

import { useEffect, useState } from "react";
import { Reveal } from "../Reveal";
import { Kicker } from "../ui";
import { PageHero, Process, FinalCTA, FAQ } from "../sections";
import { Link } from "@/lib/link";
import { Arrow } from "../ui";
import { groups, services, packages } from "@/lib/data";

const titles: Record<string, string> = {
  accounting: "Accounting",
  automation: "Accounting Automation",
  software: "Software",
};
const nums: Record<string, string> = { accounting: "01", automation: "02", software: "03" };

export default function ServicesPage() {
  const [active, setActive] = useState("accounting");

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id.replace("g-", ""))),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    groups.forEach((g) => {
      const el = document.getElementById(`g-${g.id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const jump = (id: string) => document.getElementById(`g-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <PageHero
        tint="sky"
        kicker="Services & packages"
        title={
          <>
            Everything your books need, <em>in one place.</em>
          </>
        }
      >
        Three ways to work together, built from eighteen services: hands-on accounting, automation built by an
        accountant, and day-to-day work in the systems you already run.
      </PageHero>

      <section className="packages">
        <div className="wrap">
          <Reveal className="sec-head split">
            <div>
              <Kicker>Packages</Kicker>
              <h2 className="h2">
                Pick the <em>engagement</em> that fits.
              </h2>
            </div>
            <p className="sec-lead">Every package starts with a free consultation and a clear written proposal. No surprises.</p>
          </Reveal>
          <div className="pkg-grid">
            {packages.map((p, i) => (
              <Reveal className={`pkg ${p.featured ? "feat" : ""}`} key={p.name} delay={i * 100}>
                {p.featured && <span className="pkg-badge">Most requested</span>}
                <span className="t-tag">{p.for}</span>
                <h3>{p.name}</h3>
                <p>{p.body}</p>
                <ul>
                  {p.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <Link to="contact" className={`btn ${p.featured ? "gold" : "ghost"}`}>
                  Get a proposal <Arrow />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="svc">
        <div className="wrap svc-layout">
          <aside className="svc-side" aria-label="Service groups">
            <div className="svc-side-in">
              {groups.map((g) => (
                <button key={g.id} className={active === g.id ? "on" : ""} onClick={() => jump(g.id)}>
                  <span>{nums[g.id]}</span>
                  {titles[g.id]}
                  <small>{services.filter((s) => s.group === g.id).length} services</small>
                </button>
              ))}
            </div>
          </aside>

          <div className="svc-main">
            {groups.map((g) => (
              <div className="svc-group" id={`g-${g.id}`} key={g.id}>
                <Reveal className="svc-ghead">
                  <span className="svc-num">{nums[g.id]}</span>
                  <div>
                    <Kicker>{g.label}</Kicker>
                    <h2 className="h2">{titles[g.id]}</h2>
                    <p>{g.intro}</p>
                  </div>
                </Reveal>
                <div className="svc-cards">
                  {services
                    .filter((s) => s.group === g.id)
                    .map((s, i) => (
                      <Reveal as="article" className={`svc-card ${s.featured ? "feat" : ""}`} key={s.title} delay={(i % 2) * 90}>
                        <div className="sc-top">
                          <span className="t-tag">{s.tag}</span>
                          <span className="sc-i">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <h3>{s.title}</h3>
                        <p>{s.body}</p>
                        <div className="sc-metric">{s.metric}</div>
                      </Reveal>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <FAQ />
      <FinalCTA />
    </>
  );
}
