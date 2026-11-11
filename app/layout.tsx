import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import { site, business, faq } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Extras from "@/components/Extras";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oa-finance-site.vercel.app";

const description =
  "Bookkeeping, payables, receivables and month-end close for hotels, resorts and small businesses, plus n8n accounting automation with human approval. Xero Certified. Remote worldwide.";

export const metadata: Metadata = {
  // NEXT_PUBLIC_SITE_URL overrides the live address (used for social previews, sitemap, canonical links)
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "./" },
  title: { default: `${business.name} | Hotel Bookkeeping & Accounting Automation`, template: `%s | ${business.name}` },
  description,
  openGraph: {
    title: `${business.name} | Hotel Bookkeeping & Accounting Automation`,
    description,
    type: "website",
    siteName: business.name,
  },
  twitter: { card: "summary_large_image", title: business.name, description },
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

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Extras />
      </body>
    </html>
  );
}
