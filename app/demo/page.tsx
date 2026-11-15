import type { Metadata } from "next";
import { Link } from "@/lib/link";
import { PageHero } from "@/components/sections";
import { Arrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Demo: Hotel AR automation in n8n",
  description:
    "A two-minute demo of an n8n workflow that checks every hotel invoice against its contract, matches bank receipts and builds the aging report. Fictional data.",
};

const points = [
  { k: "Rate check", v: "Every room night is priced from the signed contract and compared with what Opera posted. Wrong invoices are held before they are sent." },
  { k: "Bank matching", v: "Each bank receipt is matched to its invoice. Unidentified deposits go to suspense and are never guessed." },
  { k: "Aging with reasons", v: "Every invoice older than 60 days carries a reason and a next action." },
  { k: "People stay in control", v: "The workflow never writes to Opera, and no e-mail leaves before the AR manager approves." },
];

export default function Page() {
  return (
    <>
      <PageHero kicker="Demo · 2 minutes" title={<>Invoice vs contract check, <em>in n8n.</em></>} tint="teal">
        A real run of an 84-node n8n workflow for hotel accounts receivable. The hotel, companies and amounts in the
        video are fictional; the workflow and the execution are real.
      </PageHero>
      <section className="demo-sec">
        <div className="wrap">
          <video className="demo-video" controls playsInline preload="metadata" poster="/demo/hotel-ar-automation.jpg">
            <source src="/demo/hotel-ar-automation.mp4" type="video/mp4" />
          </video>
          <div className="demo-grid">
            {points.map((p) => (
              <div className="demo-card" key={p.k}>
                <h3>{p.k}</h3>
                <p>{p.v}</p>
              </div>
            ))}
          </div>
          <div className="demo-cta">
            <Link to="contact" className="btn gold">
              Talk about your process <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
