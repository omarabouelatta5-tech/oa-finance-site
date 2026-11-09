"use client";

import dynamic from "next/dynamic";
import { Link } from "@/lib/link";
import { Reveal } from "../Reveal";
import { Kicker, CountUp, Cutout, Arrow } from "../ui";
import InvoiceDemo from "../InvoiceDemo";
import { Process, FinalCTA, FAQ } from "../sections";
import { project, business, audiences, why } from "@/lib/data";

const HeroScene = dynamic(() => import("../three/HeroScene"), { ssr: false });
const FlowScene = dynamic(() => import("../three/FlowScene"), { ssr: false });
const IconScene = dynamic(() => import("../three/IconScene"), { ssr: false });
const kinds = ["hotel", "business", "team"] as const;
const tints = [0xc9a35b, 0x3fb8a5, 0xc9a35b];

const systems = ["Xero", "QuickBooks", "Opera PMS", "Sun Systems", "Micros POS", "n8n", "Google Gemini", "Excel"];

export default function HomePage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-stage">
          <HeroScene />
        </div>
        <div className="wrap hero-in">
          <div className="hero-copy">
            <span className="avail">
              <span className="live" /> Taking on new clients · remote worldwide
            </span>
            <h1 className="hero-h1">
              <span className="ln">Your books,</span>
              <span className="ln">
                <em>reconciled</em> &amp;
              </span>
              <span className="ln">on time.</span>
            </h1>
            <p className="hero-lead">
              Bookkeeping, payables, receivables and month-end close for hotels, resorts and small businesses, plus{" "}
              <b>n8n automation</b> that takes the repetitive checking off your team. Built by an accountant who has
              run it in luxury-resort finance for six years.
            </p>
            <div className="hero-actions">
              <Link to="contact" className="btn gold lg">
                Book a free consultation <Arrow />
              </Link>
              <Link to="services" className="btn ghost-d lg">
                See services &amp; packages
              </Link>
            </div>
            <ul className="trust">
              <li>
                <b>Xero</b> Certified Specialist
              </li>
              <li>
                <b>Zero</b> unreconciled variances · 15 months
              </li>
              <li>
                <b>Human</b> approval on every automation
              </li>
            </ul>
          </div>
        </div>
        <div className="hero-foot">
          <span className="hf-label">Works in your systems</span>
          <div className="marquee">
            <div className="mq-track">
              {[...systems, ...systems].map((e, i) => (
                <span key={i}>{e}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span />
          Scroll to reconcile
        </div>
      </section>

      {/* ================= WHO WE HELP ================= */}
      <section className="who">
        <div className="wrap">
          <Reveal className="sec-head split">
            <div>
              <Kicker>Who we help</Kicker>
              <h2 className="h2">
                Finance work done properly, <em>whatever size you are.</em>
              </h2>
            </div>
            <p className="sec-lead">
              One standard, from a 500-vendor resort payables desk to a small business on Xero: clean ledgers, on-time
              payments and a calm month-end.
            </p>
          </Reveal>
          <div className="who-grid">
            {audiences.map((a, i) => (
              <Reveal className={`who-card ${i === 0 ? "dark" : ""} acc-${i}`} key={a.title} delay={i * 110}>
                <div className="who-3d">
                  <IconScene kind={kinds[i]} color={tints[i]} />
                </div>
                <span className="who-n">0{i + 1}</span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
                <ul>
                  {a.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Link to="services" className="link-arrow sm">
                  What&apos;s included <Arrow />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES BENTO ================= */}
      <section className="bento-sec">
        <div className="wrap">
          <Reveal className="sec-head split">
            <div>
              <Kicker>What we do</Kicker>
              <h2 className="h2">
                Clean ledgers, on-time payments, <em>a calm month-end.</em>
              </h2>
            </div>
            <p className="sec-lead">Hands-on accounting, plus automation built by an accountant, for accountants.</p>
          </Reveal>

          <div className="bento">
            <Reveal className="tile t-ap">
              <span className="t-tag">Accounts payable</span>
              <h3>Vendors paid on time, every time</h3>
              <p>Invoice receipt, 3-way PO match, approvals, payment runs and supplier-statement reconciliation, so nothing slips.</p>
              <div className="match" aria-hidden="true">
                {[
                  ["Purchase order", "PO-4471", "8,240.00"],
                  ["Goods received", "GRN-2210", "8,240.00"],
                  ["Supplier invoice", "INV-90318", "8,240.00"],
                ].map(([a, b, c], i) => (
                  <div className="m-row" key={a} style={{ animationDelay: `${0.3 + i * 0.35}s` }}>
                    <span className="m-ck">✓</span>
                    <span className="m-a">{a}</span>
                    <span className="m-b">{b}</span>
                    <span className="m-c">{c}</span>
                  </div>
                ))}
                <div className="m-ok">Approved for payment run</div>
              </div>
              <div className="t-metric">Track record: overdue invoices cut 15% → 5% in 3 months</div>
            </Reveal>

            <Reveal className="tile t-ar dark" delay={100}>
              <span className="t-tag">Receivables &amp; collections</span>
              <h3>Cash in faster</h3>
              <p>Billing checked against contracts before it goes out, structured follow-up and payment plans.</p>
              <div className="gauge" aria-hidden="true">
                <svg viewBox="0 0 200 110">
                  <path d="M15 100 A85 85 0 0 1 185 100" className="g-bg" />
                  <path d="M15 100 A85 85 0 0 1 185 100" className="g-fill" />
                </svg>
                <div className="g-num">
                  30<small>days DSO</small>
                </div>
                <span className="g-was">was 45</span>
              </div>
              <div className="t-metric">Track record: 95% collection rate · aged 60+ down 35%</div>
            </Reveal>

            <Reveal className="tile t-pay" delay={50}>
              <span className="t-tag">Payroll &amp; cash control</span>
              <h3>Payroll you can trust</h3>
              <p>Inputs verified against authorization forms, multi-currency deposits, petty cash and due backs reconciled.</p>
              <div className="big-num">
                &lt;0.5<em>%</em>
              </div>
              <div className="t-metric">error rate · 300–500 employees</div>
            </Reveal>

            <Reveal className="tile t-rec" delay={120}>
              <span className="t-tag">Reconciliations</span>
              <h3>Every account ties out</h3>
              <ul className="ticks" aria-hidden="true">
                {["Bank accounts", "Supplier statements", "Card settlements", "Commissions & VAT", "POS batches"].map((x, i) => (
                  <li key={x} style={{ animationDelay: `${0.4 + i * 0.25}s` }}>
                    <span>{x}</span>
                    <b>✓</b>
                  </li>
                ))}
              </ul>
              <div className="t-metric">Resolved before close, not after</div>
            </Reveal>

            <Reveal className="tile t-close" delay={180}>
              <span className="t-tag">Month-end &amp; audit</span>
              <h3>A close that doesn&apos;t slip</h3>
              <div className="cal" aria-hidden="true">
                {Array.from({ length: 30 }).map((_, i) => (
                  <i key={i} className={i === 29 ? "end" : i > 24 ? "busy" : ""} />
                ))}
              </div>
              <div className="t-metric">Accruals, journals, closing pack, audit-ready files</div>
            </Reveal>

            <Reveal className="tile t-auto ink" delay={60}>
              <span className="t-tag">Automation · a person still approves</span>
              <h3>Let the workflow do the checking</h3>
              <p>Intake from Excel and e-mail, contract checks, matching, aging and AI-drafted e-mails, all waiting for a manager&apos;s sign-off.</p>
              <div className="chain" aria-hidden="true">
                {["Gmail", "Excel", "Contract check", "Reconcile", "Gemini", "Approve"].map((c, i) => (
                  <span key={c} style={{ animationDelay: `${i * 0.5}s` }}>
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal className="tile t-soft" delay={140}>
              <span className="t-tag">Your systems</span>
              <h3>No migration needed</h3>
              <div className="soft-grid">
                {["Xero · Certified", "QuickBooks", "Sun Systems", "Opera PMS", "Micros POS", "Excel", "n8n", "Gemini"].map((s) => (
                  <span key={s} className={s.startsWith("Xero") ? "hl" : ""}>
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="bento-more">
            <Link to="services" className="link-arrow">
              All 18 services &amp; the three packages <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= SEE IT WORK ================= */}
      <section className="auto">
        <div className="wrap">
          <Reveal className="sec-head center">
            <Kicker dark>See it work</Kicker>
            <h2 className="h2 light">
              The wrong invoice, caught <em>before your client sees it.</em>
            </h2>
            <p className="sec-lead light">
              A 50-node n8n workflow built for Opera PMS receivables. It reads, checks and matches; a manager approves
              what goes out.
            </p>
          </Reveal>
        </div>
        <div className="flow-stage">
          <FlowScene />
        </div>
        <div className="wrap auto-grid">
          <Reveal>
            <ol className="auto-list">
              {project.bullets.map((b, i) => (
                <li key={b}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <p>{b}</p>
                </li>
              ))}
            </ol>
            <div className="chips-row">
              {project.chips.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <InvoiceDemo />
          </Reveal>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="whyus">
        <div className="wrap">
          <Reveal className="sec-head split">
            <div>
              <Kicker>Why {business.name}</Kicker>
              <h2 className="h2">
                Hotel-finance standards, <em>for any business.</em>
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
          <div className="record">
            <Reveal className="rec">
              <div className="rec-n">
                <CountUp to={6} />
                <em>+</em>
              </div>
              <p>years in luxury-resort finance</p>
            </Reveal>
            <Reveal className="rec" delay={80}>
              <div className="rec-n">
                <CountUp to={500} />
                <em>+</em>
              </div>
              <p>vendor invoices handled a month</p>
            </Reveal>
            <Reveal className="rec" delay={160}>
              <div className="rec-n">
                45<em>→</em>
                <CountUp from={45} to={30} />
              </div>
              <p>days DSO on city ledger</p>
            </Reveal>
            <Reveal className="rec" delay={240}>
              <div className="rec-n">
                <CountUp to={0} />
              </div>
              <p>unreconciled variances over 15 months</p>
            </Reveal>
          </div>
        </div>
      </section>

      <Process />

      {/* ================= FOUNDER ================= */}
      <section className="founder">
        <div className="wrap founder-grid">
          <Reveal className="arch-wrap">
            <div className="arch">
              <div className="arch-ring" aria-hidden="true" />
              <Cutout className="arch-img" />
            </div>
            <span className="float-chip c1">
              <b>Xero</b> Certified Specialist · L3
            </span>
            <span className="float-chip c2">Arabic · English</span>
            <span className="float-chip c3">
              <b>B.Com</b> Accounting
            </span>
          </Reveal>
          <Reveal className="about-copy" delay={120}>
            <Kicker>Meet the founder</Kicker>
            <h2 className="h2">
              Accountant first. <em>Automation where it saves real hours.</em>
            </h2>
            <p>
              <b>{business.founder}</b> spent six years in luxury-resort finance in Dubai, Marsa Alam and Sharm El
              Sheikh, most recently holding the full Accounts Payable Executive role at Centara Mirage Beach Resort:
              500 to 600 vendor invoices a month with zero unreconciled cash variances.
            </p>
            <p>
              {business.name} is that standard offered to hotels, resorts and small businesses, with n8n workflows built
              by someone who has done the work by hand.
            </p>
            <div className="founder-actions">
              <Link to="about" className="btn ghost">
                About the practice
              </Link>
              <Link to="contact" className="btn gold">
                Book a free consultation <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQ />
      <FinalCTA />
    </>
  );
}
