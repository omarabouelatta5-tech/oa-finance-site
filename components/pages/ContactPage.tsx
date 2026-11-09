"use client";

import { useRef, useState } from "react";
import { Reveal } from "../Reveal";
import { Kicker, Arrow } from "../ui";
import { PageHero } from "../sections";
import { site } from "@/lib/data";

const digits = (s: string) => s.replace(/\D/g, "");

export default function ContactPage() {
  const [toast, setToast] = useState("");
  const [sent, setSent] = useState<"" | "mail" | "wa">("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`${label} copied`);
    } catch {
      setToast(value);
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2200);
  };

  const compose = (form: HTMLFormElement) => {
    const f = new FormData(form);
    const name = String(f.get("name") || "");
    const company = String(f.get("company") || "");
    const need = String(f.get("need") || "");
    const msg = String(f.get("message") || "");
    return {
      subject: `Bookkeeping enquiry${company ? ` · ${company}` : ""}`,
      body: `Hello Omar,\n\n${msg}\n\nService: ${need}\nName: ${name}${company ? `\nCompany: ${company}` : ""}`,
    };
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { subject, body } = compose(e.currentTarget);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent("mail");
  };

  const onWhatsApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (!form || !form.reportValidity()) return;
    const { body } = compose(form);
    window.open(`https://wa.me/${digits(site.whatsapp)}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
    setSent("wa");
  };

  const rows = [
    { k: "E-mail", v: site.email, href: `mailto:${site.email}` },
    { k: "WhatsApp", v: site.whatsapp, href: `https://wa.me/${digits(site.whatsapp)}` },
    { k: "Phone", v: site.phone, href: `tel:+${digits(site.phone)}` },
    { k: "LinkedIn", v: site.linkedin, href: site.linkedinUrl },
  ];

  return (
    <>
      <PageHero
        tint="coral"
        kicker="Contact"
        title={
          <>
            Let&apos;s clean up your <em>ledgers.</em>
          </>
        }
      >
        Tell us about your books and your systems. The first consultation is free, and you get a clear written
        proposal after it.
      </PageHero>

      <section className="contact-page">
        <div className="wrap contact-grid">
          <Reveal className="contact-info">
            <Kicker>Get in touch</Kicker>
            <h2 className="h2">
              Book a free <em>consultation.</em>
            </h2>
            <p>A short call about your business, your books and what takes up your team&apos;s time. You hear back as soon as possible.</p>
            <div className="c-rows">
              {rows.map((r) => (
                <div className="c-row" key={r.k}>
                  <span className="c-k">{r.k}</span>
                  <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {r.v}
                  </a>
                  <button onClick={() => copy(r.k, r.v)} aria-label={`Copy ${r.k}`}>
                    Copy
                  </button>
                </div>
              ))}
            </div>
            <div className="avail">
              <span className="live" /> Taking on new clients · {site.location} · remote worldwide
            </div>
          </Reveal>

          <Reveal className="form-card" delay={120}>
            <form onSubmit={onSubmit}>
              <div className="field-row">
                <label>
                  <span>Your name</span>
                  <input name="name" required autoComplete="name" />
                </label>
                <label>
                  <span>Company or hotel</span>
                  <input name="company" autoComplete="organization" />
                </label>
              </div>
              <label>
                <span>What do you need help with?</span>
                <select name="need" defaultValue="Accounts Payable">
                  <option>Accounts Payable</option>
                  <option>Accounts Receivable & Collections</option>
                  <option>Payroll & Cash Control</option>
                  <option>Reconciliations & Month-End Close</option>
                  <option>Xero / QuickBooks Bookkeeping</option>
                  <option>n8n Accounting Automation</option>
                  <option>A full-time or on-site role</option>
                  <option>Something else</option>
                </select>
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows={5} required placeholder="A few lines about your business and your books…" />
              </label>
              <div className="form-actions">
                <button type="submit" className="btn gold">
                  Send by e-mail <Arrow />
                </button>
                <button type="button" className="btn ghost" onClick={onWhatsApp}>
                  Send on WhatsApp
                </button>
              </div>
              {sent && (
                <p className="form-note" role="status">
                  {sent === "mail"
                    ? `Your e-mail app should open with the message ready. If it didn't, write to ${site.email}.`
                    : "WhatsApp should open with your message ready to send."}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">
        ✓ {toast}
      </div>
    </>
  );
}
