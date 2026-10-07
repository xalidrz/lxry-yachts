import { ImageResponse } from "next/og";

export const alt = "Orient Group Gulf: HVAC, electrical and fixing materials in Kuwait";
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
          justifyContent: "space-between",
          background: "#1B3747",
          color: "#FFFFFF",
          padding: 72,
          borderBottom: "14px solid #B4532A",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: 1 }}>
          Orient Group Gulf
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.08 }}>
            HVAC, electrical and fixing materials for Kuwait
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#C9D3D8" }}>
            Shuwaikh Industrial Area · Since 2010
          </div>
        </div>
      </div>
    ),
    size,
  );
}
