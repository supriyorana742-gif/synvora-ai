import { ImageResponse } from "next/og";

export const alt = "Synvora AI — Intelligent Automation. Real Business Impact.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #080D19 0%, #101827 100%)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, color: "#A1A9BA" }}>
          <div style={{ width: 18, height: 18, borderRadius: 18, background: "#477BFF" }} />
          <div style={{ width: 18, height: 18, borderRadius: 18, background: "#9066FF", marginLeft: -6 }} />
          Synvora AI
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 36, maxWidth: 940 }}>
          Intelligent Automation. Real Business Impact.
        </div>
      </div>
    ),
    size,
  );
}
