import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";
import { AuthProvider } from "@/contexts/AuthContext";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codevarsity.shivamappstudio.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "CodeVarsity | Learn. Practice. Build. - Mobile Coding IDE",
  description: "Master coding with visual learning. Python, Java, Go, C with 28+ visualizers, ghost-code practice, and real offline runtimes on Android.",
  keywords: [
    "coding IDE",
    "learn programming",
    "Python",
    "Java",
    "offline coding",
    "mobile IDE",
    "visualizers",
    "programming tutorial",
    "coding practice",
    "Android app",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "CodeVarsity | Learn. Practice. Build. - Mobile Coding IDE",
    description: "Master coding with visual learning. Python, Java, Go, C with 28+ visualizers and real offline runtimes.",
    url: siteUrl,
    siteName: "CodeVarsity",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CodeVarsity Mobile Coding IDE",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeVarsity | Learn. Practice. Build. - Mobile Coding IDE",
    description: "Master coding with visual learning. Python, Java, Go, C with 28+ visualizers and real offline runtimes.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@shivamappstudio",
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "CodeVarsity",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Android",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Master coding with visual learning. Python, Java, Go, C with 20+ visualizers, ghost-code practice, and real offline runtimes."
      },
      {
        "@type": "Organization",
        "name": "Shivam App Studio",
        "url": "https://codevarsity.shivamappstudio.com",
        "logo": "https://codevarsity.shivamappstudio.com/assets/logo.png"
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <JsonLd data={schema} />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}


