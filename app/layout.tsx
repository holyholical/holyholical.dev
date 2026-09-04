import type { Metadata } from "next";
import { DotGothic16, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { ShrineProvider } from "@/lib/shrine-context";
import { BASE_PATH } from "@/lib/site";

const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel", display: "swap" });
const dot = DotGothic16({ subsets: ["latin"], weight: "400", variable: "--font-dot", display: "swap" });
const vt = VT323({ subsets: ["latin"], weight: "400", variable: "--font-vt", display: "swap" });

export const metadata: Metadata = {
  title: "☆ Howwy's Homepage ☆ holyholical.dev",
  description: "Holy's homepage. A developer, a mascot, and projects pulled live from GitHub.",
};

/* The cutout is 303×524. Rendered at a third of that so she perches on the bar without eating the page. */
const WAIFU = { src: `${BASE_PATH}/waifu.png`, width: 303, height: 524 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${pixel.variable} ${dot.variable} ${vt.variable}`}>
      <body>
        <ShrineProvider>
          <div className="page">
            <header className="top">
              <div className="top__head">
                <h1 className="top__title">
                  <span className="top__star" aria-hidden="true">
                    ★
                  </span>{" "}
                  Howwy&apos;s Homepage{" "}
                  <span className="top__star" aria-hidden="true">
                    ★
                  </span>
                </h1>
                <p className="top__sub">holyholical.dev</p>
              </div>
              <div className="top__bar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="top__waifu" src={WAIFU.src} width={WAIFU.width} height={WAIFU.height} alt="" />
                <Nav />
              </div>
            </header>
            <main className="main">{children}</main>
            <Footer />
          </div>
        </ShrineProvider>
      </body>
    </html>
  );
}
