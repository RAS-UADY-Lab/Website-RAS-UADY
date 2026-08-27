import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageTransition from "@/components/ui/PageTransition";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rasuady.com"),
  title: "IEEE RAS UADY | Capítulo Estudiantil",
  description:
    "Sitio oficial de la Sociedad de Robótica y Automatización en la Facultad de Ingeniería de la UADY.",
  manifest: "/site.webmanifest?v=1.0",
  icons: {
    icon: [
      { url: "/favicon.ico?v=1.0" },
      { url: "/favicon.svg?v=1.0", type: "image/svg+xml" },
      { url: "/favicon-16x16.png?v=1.0", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png?v=1.0", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=1.0", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "IEEE RAS UADY | Capítulo Estudiantil",
    description:
      "Impulsando la innovación, la divulgación y el desarrollo tecnológico en robótica y automatización.",
    url: "https://rasuady.com",
    siteName: "IEEE RAS UADY",
    images: [
      {
        url: "/IMG/EVENTS/Default.jpg",
        width: 1200,
        height: 630,
        alt: "Logo IEEE RAS UADY",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${montserrat.className} min-h-screen flex flex-col bg-slate-50`}
      >
        <Navbar />

        <main className="flex-1 -mt-20">
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />
      </body>
    </html>
  );
}