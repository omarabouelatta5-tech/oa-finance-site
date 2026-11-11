import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap nf-in">
        <span className="nf-code" aria-hidden="true">
          4<em>0</em>4
        </span>
        <h1 className="display">
          This page doesn&apos;t <em>tie out.</em>
        </h1>
        <p>The link is broken or the page has moved. The books are fine; the address isn&apos;t.</p>
        <div className="nf-actions">
          <Link href="/" className="btn gold">
            Back to home
          </Link>
          <Link href="/services" className="btn ghost-d">
            See services
          </Link>
        </div>
      </div>
    </section>
  );
}
