import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { profile, siteUrl } from "@/data/profile";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");
const [geistRegular, geistBold, card] = await Promise.all([
  readFile(join(fontDir, "Geist-Regular.ttf")),
  readFile(join(fontDir, "Geist-Bold.ttf")),
  readFile(join(process.cwd(), "src/assets/card-front.png"), "base64"),
]);

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          padding: "0 72px",
          background: "#0a0a0a",
          backgroundImage: "radial-gradient(circle at 80% 30%, rgba(140,141,227,0.22), transparent 55%)",
          color: "#fafafa",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
          <div style={{ fontSize: 22, color: "#8c8de3", letterSpacing: 5, textTransform: "uppercase" }}>
            {profile.role}
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, marginTop: 20, letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 28, color: "#a3a3a3", marginTop: 24, lineHeight: 1.35 }}>
            {profile.tagline}
          </div>
          <div style={{ fontSize: 22, color: "#737373", marginTop: 40 }}>{new URL(siteUrl).host}</div>
        </div>
        <img
          src={`data:image/png;base64,${card}`}
          width={504}
          height={288}
          alt=""
          style={{ borderRadius: 18, transform: "rotate(-4deg)", boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
        { name: "Geist", data: geistBold, weight: 700, style: "normal" },
      ],
    },
  );
}
