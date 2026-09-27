import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { profile, siteUrl } from "@/data/profile";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts");
const [geistRegular, geistBlack, geistMono, portrait] = await Promise.all([
  readFile(join(fontDir, "geist-sans/Geist-Regular.ttf")),
  readFile(join(fontDir, "geist-sans/Geist-Black.ttf")),
  readFile(join(fontDir, "geist-mono/GeistMono-Regular.ttf")),
  readFile(join(process.cwd(), "src/assets/portrait.jpg"), "base64"),
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
          background: "#f6f7fb",
          color: "#1c1f24",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
          <div style={{ fontFamily: "Geist Mono", fontSize: 24, color: "#585d68" }}>{"{hello, world!}"}</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 900, lineHeight: 0.92, marginTop: 12, letterSpacing: -4 }}>
            {profile.name.split(" ").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <div style={{ fontFamily: "Geist Mono", fontSize: 26, marginTop: 32 }}>
            {`// ${profile.focus.join(" // ")} //`}
          </div>
          <div style={{ fontFamily: "Geist Mono", fontSize: 20, color: "#585d68", marginTop: 28 }}>{new URL(siteUrl).host}</div>
        </div>
        <div style={{ display: "flex", border: "3px solid #1c1f24", boxShadow: "12px 12px 0 #1c1f24" }}>
          <img src={`data:image/jpeg;base64,${portrait}`} width={330} height={465} alt="" style={{ filter: "grayscale(1)" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
        { name: "Geist", data: geistBlack, weight: 900, style: "normal" },
        { name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
      ],
    },
  );
}
