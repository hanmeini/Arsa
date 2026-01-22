import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const guton = localFont({
  src: [
    {
      path: "../public/fonts/Guton-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Guton-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Guton-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Guton-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Guton-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Guton-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-guton",
});

export const metadata: Metadata = {
  title: {
    default: "Arsa - Platform Digital Cerdas untuk UMKM",
    template: "%s | Arsa",
  },
  description:
    "Solusi all-in-one untuk UMKM Indonesia: Manajemen inventory otomatis, konten marketing berbasis AI, dan analisis pasar real-time. Mulai digitalisasi bisnis Anda bersama Arsa.",
  keywords: [
    "UMKM Indonesia",
    "Aplikasi Bisnis AI",
    "Manajemen Stok Otomatis",
    "Inventory Management",
    "Smart Business Assistant",
    "AI Content Generator",
    "Analisis Tren Pasar",
    "Digitalisasi UMKM",
    "Arsa Platform",
    "Generative AI untuk Bisnis",
  ],
  authors: [{ name: "Arsa Team" }],
  creator: "Arsa Team",
  publisher: "Arsa Platform",
  icons: {
    icon: "/icons/logo-login.svg",
    shortcut: "/icons/logo-login.svg",
    apple: "/icons/logo-login.svg",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://arsa.id",
    title: "Arsa - Platform Digital Cerdas untuk UMKM",
    description:
      "Transformasi bisnis UMKM Anda dengan teknologi AI. Kelola stok, buat konten promosi, dan pantau kompetitor dalam satu aplikasi.",
    siteName: "Arsa Platform",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dashboard Arsa Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsa - Platform Digital Cerdas untuk UMKM",
    description:
      "Transformasi bisnis UMKM Anda dengan teknologi AI. Kelola stok, buat konten promosi, dan pantau kompetitor dalam satu aplikasi.",
    creator: "@arsa_id",
    images: ["/og-image.jpg"],
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

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${guton.variable} antialiased`}>
        <CustomCursor />
        <SmoothScroll />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
