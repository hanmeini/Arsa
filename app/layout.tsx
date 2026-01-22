import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
    "Platform all-in-one untuk UMKM: Kelola inventory otomatis, buat konten pemasaran dengan AI, dan pantau tren pasar real-time. Tingkatkan bisnis Anda bersama Arsa.",
  keywords: [
    "UMKM",
    "Aplikasi Bisnis",
    "Manajemen Stok",
    "Inventory",
    "AI Content Generator",
    "Analisis Tren",
    "Digitalisasi UMKM",
    "Arsa Platform",
  ],
  authors: [{ name: "Arsa Team" }],
  creator: "Arsa Team",
  publisher: "Arsa Platform",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://arsa.id",
    title: "Arsa - Platform Digital Cerdas untuk UMKM",
    description:
      "Kelola inventory otomatis, buat konten pemasaran dengan AI, dan pantau tren pasar real-time.",
    siteName: "Arsa Platform",
    images: [
      {
        url: "/og-image.jpg", // Assuming we might have one or placeholder
        width: 1200,
        height: 630,
        alt: "Arsa Platform Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsa - Platform Digital Cerdas untuk UMKM",
    description:
      "Kelola inventory otomatis, buat konten pemasaran dengan AI, dan pantau tren pasar real-time.",
    creator: "@arsa_id",
  },
  robots: {
    index: true,
    follow: true,
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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
