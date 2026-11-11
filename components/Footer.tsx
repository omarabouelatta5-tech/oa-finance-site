"use client";

import { Link } from "@/lib/link";
import { Logo } from "./ui";
import { site, business } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div className="ftr-brand">
          <Logo size={48} />
          <p className="serif">
            Books that close <em>at zero.</em>
          </p>
          <span className="pill-live">
            <span className="live" /> Taking on new clients
          </span>
        </div>
        <div>
          <h4>Pages</h4>
          <ul>
            <li><Link to="home">Home</Link></li>
            <li><Link to="services">Services</Link></li>
            <li><Link to="about">About</Link></li>
            <li><Link to="contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                WhatsApp {site.whatsapp}
              </a>
            </li>
            <li>
              <a href={`tel:+${site.phone.replace(/\D/g, "")}`}>Phone {site.phone}</a>
            </li>
            <li>
              <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
                LinkedIn · {site.linkedin}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Based in</h4>
          <ul>
            <li>{site.location}</li>
            <li>Remote worldwide</li>
            <li>Open to relocation</li>
          </ul>
        </div>
      </div>
      <div className="wrap ftr-bottom">
        <span>© 2026 {business.name} · {business.founder}</span>
        <span>{business.tagline}</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button>
      </div>
    </footer>
  );
}
