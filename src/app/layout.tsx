import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://contentcreationservice.ng"),
  title: {
    default: "CCS Ultra | Phone-First Creative Intelligence & Marketing Engine for Nigerian SMEs",
    template: "%s | CCS Ultra",
  },
  description:
    "CCS Ultra turns your SME brand positioning into a 20-day revenue-generating content engine. AI-calibrated brand DNA, psychological pricing, visual studio, and direct human strategy oversight.",
  keywords: [
    "Content Creation Service",
    "CCS Ultra",
    "SME Marketing Nigeria",
    "Lagos Brand Agency",
    "WhatsApp Marketing Strategy",
    "Instagram Content Generator",
    "Brand DNA Engine",
    "Psychological Pricing Nigeria",
    "Social Media Automation SME",
  ],
  authors: [{ name: "CCS Ultra Agency Team" }],
  creator: "CCS Ultra",
  publisher: "CCS Ultra",
  alternates: {
    canonical: "https://contentcreationservice.ng",
  },
  openGraph: {
    title: "CCS Ultra | Phone-First Creative Agency for Nigerian SMEs",
    description:
      "Stop posting random content. Build a 20-day brand positioning calendar with psychological pricing and automated visual studio generation.",
    url: "https://contentcreationservice.ng",
    siteName: "CCS Ultra",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "https://contentcreationservice.ng/og-image.png",
        width: 1200,
        height: 630,
        alt: "CCS Ultra Creative Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCS Ultra | Phone-First Creative Agency for Nigerian SMEs",
    description:
      "Build a 20-day brand positioning calendar with psychological pricing and automated visual studio generation.",
    creator: "@ccs_ultra",
    images: ["https://contentcreationservice.ng/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "CCS Ultra",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "5000",
        "priceCurrency": "NGN",
      },
      "description": "Phone-first creative intelligence engine generating brand DNA, 20-day marketing calendars, and visual assets for SMEs.",
    },
    {
      "@type": "ProfessionalService",
      "name": "CCS Ultra Creative Agency",
      "url": "https://contentcreationservice.ng",
      "logo": "https://contentcreationservice.ng/logo.png",
      "description": "Bespoke brand strategy, positioning, and content execution agency for businesses.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lagos",
        "addressCountry": "NG",
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+234-916-271-6205",
          "contactType": "Lead Strategist",
          "name": "Neye",
        },
        {
          "@type": "ContactPoint",
          "telephone": "+234-703-229-3819",
          "contactType": "Operations & Support",
          "name": "Iyiola",
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
