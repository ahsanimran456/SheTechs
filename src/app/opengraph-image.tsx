import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = "Maham Shakeel - AI & Tech Content Creator, Dubai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #f4f2ee 0%, #e8f1f0 48%, #ebe7e0 100%)",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#1f6b66",
            fontWeight: 600,
          }}
        >
          {siteConfig.brand}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "#14181f",
              fontWeight: 700,
              maxWidth: 900,
            }}
          >
            Maham Shakeel - AI & Tech Content Creator, Dubai
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#5a616c", maxWidth: 820 }}>
            Making AI and tech make sense.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#164f4b" }}>
          mahamshakeel.tech
        </div>
      </div>
    ),
    { ...size },
  );
}
