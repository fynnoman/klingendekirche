import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Förderverein Klingende Kirche Saarlouis-Lisdorf e.V.",
    template: "%s · Klingende Kirche Lisdorf"
  },
  description:
    "Konzerte, Orgelmusik und Kirchenmusik aus Saarlouis-Lisdorf. Der Förderverein Klingende Kirche pflegt die MAYER-Orgel und ein international beachtetes Programm.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Förderverein Klingende Kirche Saarlouis-Lisdorf e.V.",
    description:
      "Konzerte, Orgelakademie, Kompositionswettbewerb. Kirchenmusik aus Lisdorf seit 1993."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans text-neutral-900 antialiased">
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
