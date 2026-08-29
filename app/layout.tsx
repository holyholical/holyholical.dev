import type { Metadata } from "next";
import { Bricolage_Grotesque, Courier_Prime, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import AisleNav from "@/components/AisleNav";
import Footer from "@/components/Footer";
import Oneko from "@/components/oneko";
import RackSign from "@/components/RackSign";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-display",
  display: "swap",
});

const body = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const stamp = Courier_Prime({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-stamp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "holyholical.dev",
  description: "Holy's seed rack: every packet is a live GitHub repository.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${stamp.variable}`}>
      <body>
        <Oneko />
        <div className="rack">
          <RackSign />
          <AisleNav />
          <main className="rack__main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
