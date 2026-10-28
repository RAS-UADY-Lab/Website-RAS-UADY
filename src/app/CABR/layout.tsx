//src/app/CABR/layout.tsx
import type { Metadata } from "next";

const URL_CANONICA = "https://rasuady.com/CABR";
const TITULO = "2do Concurso Anual de Batalla de Robots UADY | RAS UADY";
const DESCRIPCION =
  "Inscribe tu robot en el 2do Concurso Anual de Batalla de Robots UADY: Minisumo autónomo y Carrera de Caminantes. 25 de noviembre de 2026, Facultad de Ingeniería UADY, Mérida.";

export const metadata: Metadata = {
  title: { absolute: TITULO },
  description: DESCRIPCION,
  keywords: [
    "batalla de robots UADY",
    "concurso de robótica Mérida",
    "minisumo UADY",
    "carrera de caminantes",
    "IEEE RAS UADY",
    "concurso de robots Yucatán",
  ],
  alternates: { canonical: URL_CANONICA },
  openGraph: {
    type: "website",
    url: URL_CANONICA,
    title: TITULO,
    description: DESCRIPCION,
    siteName: "IEEE RAS UADY",
    locale: "es_MX",
    images: [
      {
        url: "/IMG/EVENTS/Default.jpg",
        width: 1200,
        height: 630,
        alt: "Capítulo Estudiantil IEEE RAS - UADY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: ["/IMG/EVENTS/Default.jpg"],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "2do Concurso Anual de Batalla de Robots UADY",
  description: DESCRIPCION,
  startDate: "2026-11-25T09:00:00-06:00",
  endDate: "2026-11-25T15:00:00-06:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Sala de posgrado Dr. Oscar M. González Cuevas, Facultad de Ingeniería UADY",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mérida",
      addressRegion: "Yucatán",
      addressCountry: "MX",
    },
  },
  image: ["https://rasuady.com/IMG/EVENTS/heroCABRMinisumo.jpg"],
  organizer: {
    "@type": "Organization",
    name: "IEEE RAS UADY",
    url: "https://rasuady.com",
  },
  offers: {
    "@type": "Offer",
    url: "https://forms.cloud.microsoft/r/GUZwxg3fAv",
    price: "200",
    priceCurrency: "MXN",
    availability: "https://schema.org/InStock",
    validThrough: "2026-11-24T23:59:00-06:00",
  },
};

export default function CABRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {children}
    </>
  );
}
