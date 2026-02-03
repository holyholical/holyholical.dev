import type { Metadata } from "next";
import Footer from "../components/Footer";
import { GlobalEffects } from "../components/GlobalEffects";
import TopBar from "@/components/TopBar";
import "./globals.css";
import Oneko from "@/components/oneko/oneko";

export const metadata: Metadata = {
  title: "holyholical.dev",
  description: "Holy's personal website and portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased flex flex-col min-h-screen bg-black text-white`}
      >
        <Oneko />
        <TopBar
          buttons={[
            { label: "home", path: "/" },
            { label: "projects", path: "/projects" },
            { label: "keys", path: "/keys" },
            { label: "qna", path: "/qna" },
            { label: "skills", path: "/skills" },
            { label: "donate", path: "/donate" },
          ]}
        />
        {children}
        <div>
          <GlobalEffects />
        </div>
        <Footer />
      </body>
    </html>
  );
}
