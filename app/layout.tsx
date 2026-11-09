import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import { site, business } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const description =
  "Bookkeeping, payables, receivables and month-end close for hotels, resorts and small businesses, plus n8n accounting automation with human approval. Xero Certified. Remote worldwide.";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to your live domain after deploying (used for social previews)
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${business.name} | Hotel Bookkeeping & Accounting Automation`, template: `%s | ${business.name}` },
  description,
  openGraph: {
    title: `${business.name} | Hotel Bookkeeping & Accounting Automation`,
    description,
    type: "profile",
    images: [{ url: "/assets/omar.jpg", width: 500, height: 500, alt: "Omar Abouelatta" }],
  },
  twitter: { card: "summary", title: business.name, description },
};

export const viewport: Viewport = { themeColor: "#15120F" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: business.name,
  description,
  founder: { "@type": "Person", name: business.founder, sameAs: [site.linkedinUrl] },
  email: `mailto:${site.email}`,
  telephone: site.phone,
  address: { "@type": "PostalAddress", addressLocality: "Chanthaburi", addressCountry: "TH" },
  areaServed: "Worldwide",
  knowsAbout: ["Accounts Payable", "Accounts Receivable", "Payroll", "Reconciliation", "Xero", "QuickBooks", "n8n", "Opera PMS"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
