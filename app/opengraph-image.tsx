import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { business } from "@/lib/data";

export const alt = "OA Finance: hotel bookkeeping and accounting automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (f: string) => readFile(join(process.cwd(), "node_modules/@fontsource/instrument-serif/files", f));

export default async function Image() {
  const [regular, italic] = await Promise.all([
    font("instrument-serif-latin-400-normal.woff"),
    font("instrument-serif-latin-400-italic.woff"),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #15120f 0%, #221d19 60%, #2a2520 100%)",
          color: "#f4efe3",
          fontFamily: "Serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "2px solid rgba(244,239,227,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontStyle: "italic",
            }}
          >
            OA
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34 }}>{business.name}</div>
            <div style={{ fontSize: 20, color: "#a79f94", letterSpacing: 3, textTransform: "uppercase" }}>{business.tagline}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 118, lineHeight: 1.02 }}>
          <div>Your books,</div>
          <div style={{ display: "flex" }}>
            <span style={{ fontStyle: "italic", color: "#e3c88f" }}>reconciled</span>
            <span style={{ marginLeft: 26 }}>&amp; on time.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "#cfc7bb" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {["Xero Certified", "Hotels & small businesses", "n8n automation"].map((t) => (
              <div key={t} style={{ display: "flex", padding: "10px 22px", borderRadius: 999, border: "1.5px solid rgba(201,163,91,0.55)" }}>
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", width: 150, height: 6, borderRadius: 3, background: "#3fb8a5" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Serif", data: regular, style: "normal", weight: 400 },
        { name: "Serif", data: italic, style: "italic", weight: 400 },
      ],
    }
  );
}
