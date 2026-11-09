"use client";

import { useEffect, useState } from "react";
import { Link, useRoute, type Route } from "@/lib/link";
import { Logo, Arrow } from "./ui";
import { business } from "@/lib/data";

const nav: Array<[Route, string]> = [
  ["home", "Home"],
  ["services", "Services"],
  ["about", "About"],
  ["contact", "Contact"],
];

export default function Header() {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [route]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`hdr ${solid ? "solid" : ""} ${open ? "open" : ""}`}>
      <div className="hdr-in">
        <Link to="home" className="brand">
          <Logo size={40} />
          <span className="brand-t">
            <b>{business.name}</b>
            <small>{business.tagline}</small>
          </span>
        </Link>
        <nav aria-label="Main" className="nav">
          <ul>
            {nav.map(([r, l]) => (
              <li key={r}>
                <Link to={r} aria-current={route === r ? "page" : undefined}>
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="contact" className="btn gold hdr-cta">
          Book a free consultation <Arrow />
        </Link>
        <button className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
        </button>
      </div>
      <div className="drawer" aria-hidden={!open}>
        <ul>
          {nav.map(([r, l], i) => (
            <li key={r} style={{ transitionDelay: `${open ? 80 + i * 60 : 0}ms` }}>
              <Link to={r} aria-current={route === r ? "page" : undefined}>
                <span>0{i + 1}</span>
                {l}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="contact" className="btn gold">
          Book a free consultation <Arrow />
        </Link>
      </div>
    </header>
  );
}
