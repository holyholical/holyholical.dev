import type { Metadata } from "next";
import { DotGothic16, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import BgmButton from "@/components/BgmButton";
import Footer from "@/components/Footer";
import GrabButton from "@/components/GrabButton";
import HitCounter from "@/components/HitCounter";
import KonamiCode from "@/components/KonamiCode";
import Marquee from "@/components/Marquee";
import Oneko from "@/components/oneko";
import SideNav from "@/components/SideNav";
import Sparkles from "@/components/Sparkles";
import UnderConstruction from "@/components/UnderConstruction";
import UwuToggle from "@/components/UwuToggle";
import WaifuButton from "@/components/WaifuButton";
import { ShrineProvider } from "@/lib/shrine-context";
import { CAST } from "@/lib/sprites";

const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel", display: "swap" });
const dot = DotGothic16({ subsets: ["latin"], weight: "400", variable: "--font-dot", display: "swap" });
const vt = VT323({ subsets: ["latin"], weight: "400", variable: "--font-vt", display: "swap" });

export const metadata: Metadata = {
  title: "☆ Howwy's Homepage ☆ holyholical.dev",
  description: "Holy's kawaii corner of the web. Live projects from GitHub, pixel waifus, and a hit counter.",
};

const MARQUEE = [
  "Welcome to Holy's homepage!",
  "Every project here is live from GitHub",
  "Click the girls, they talk",
  "Turn on the BGM",
  "Sign the guestbook (there is no guestbook)",
  "Thank you for visiting",
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${pixel.variable} ${dot.variable} ${vt.variable}`}>
      <body>
        <ShrineProvider>
          <Sparkles />
          <Oneko />
          <KonamiCode />
          <div className="page">
            <header className="banner">
              <p className="banner__deco" aria-hidden="true">
                ･ﾟ✧ ☆ ･ﾟ✧ ☆ ･ﾟ✧
              </p>
              <h1 className="banner__title">
                <span className="banner__star" aria-hidden="true">
                  ★
                </span>{" "}
                Howwy&apos;s Homepage{" "}
                <span className="banner__star" aria-hidden="true">
                  ★
                </span>
              </h1>
              <p className="banner__sub">holyholical.dev</p>
              <UnderConstruction />
            </header>
            <Marquee items={MARQUEE} />
            <div className="frame">
              <aside className="side">
                <SideNav />
                <div className="side__mascot">
                  <WaifuButton waifu={CAST[0]} scale={4} />
                </div>
                <HitCounter />
                <div className="side__controls">
                  <BgmButton />
                  <UwuToggle />
                </div>
                <GrabButton />
              </aside>
              <main className="main">{children}</main>
            </div>
            <Footer />
          </div>
        </ShrineProvider>
      </body>
    </html>
  );
}
