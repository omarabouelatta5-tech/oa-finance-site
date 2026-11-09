"use client";

import { useEffect, useState } from "react";
import { useInView } from "./Reveal";
import { project } from "@/lib/data";

const fmt = (n: number) => n.toFixed(2);

export default function InvoiceDemo() {
  const inv = project.invoice;
  const [fixed, setFixed] = useState(false);
  const [held, setHeld] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.4);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setHeld(true), 600);
    return () => clearTimeout(t);
  }, [inView]);

  const lines = inv.lines.map((l) => ({ ...l, shown: fixed ? l.contract : l.invoiced }));
  const totalC = inv.lines.reduce((a, l) => a + l.contract, 0);
  const total = lines.reduce((a, l) => a + l.shown, 0);
  const bad = total !== totalC;

  return (
    <div className="invoice-demo" ref={ref}>
      <div className="inv-top">
        <div>
          <span className="inv-k">Invoice · {inv.id}</span>
          <h4>{inv.title}</h4>
        </div>
        <span className={`stamp ${held ? "on" : ""} ${bad ? "held" : "ok"}`}>{bad ? "Held" : "Corrected"}</span>
      </div>
      <table>
        <caption className="sr-only">Contract versus invoiced amounts for demo invoice {inv.id}</caption>
        <thead>
          <tr>
            <th scope="col">Line</th>
            <th scope="col">Contract</th>
            <th scope="col">Invoiced</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((l) => (
            <tr key={l.label} className={l.shown !== l.contract ? "bad" : ""}>
              <td>{l.label}</td>
              <td>{fmt(l.contract)}</td>
              <td className="v">{fmt(l.shown)}</td>
            </tr>
          ))}
          <tr className={`total ${bad ? "bad" : "good"}`}>
            <td>Total</td>
            <td>{fmt(totalC)}</td>
            <td className="v">{fmt(total)}</td>
          </tr>
        </tbody>
      </table>
      <div className="why">
        <b>Why</b>
        <span>{inv.why}</span>
      </div>
      <div className="inv-actions">
        <button className="btn gold sm" onClick={() => setFixed((f) => !f)}>
          {fixed ? "Show the original invoice" : "Apply the contract rate"}
        </button>
        <span className="inv-k">Demo data · no real client</span>
      </div>
    </div>
  );
}
