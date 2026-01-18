"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Database, Wand2, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Introduction } from "@/components/landing/Introduction";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Introduction Section */}
      <Introduction />

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Kenapa memilih Arsa?
            </h2>
            <p className="mt-4 text-gray-500">
              Fitur lengkap untuk membantu UMKM naik kelas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Intelligent Inventory",
                desc: "Kelola stok otomatis dengan peringatan dini saat barang menipis.",
                icon: Database,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                title: "AI Content Studio",
                desc: "Buat foto produk dan caption menarik dalam hitungan detik.",
                icon: Wand2,
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                title: "Predictive Dashboard",
                desc: "Pantau tren pasar dan prediksi permintaan produk Anda.",
                icon: TrendingUp,
                color: "text-green-600",
                bg: "bg-green-50",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
                    feature.bg
                  )}
                >
                  <feature.icon className={cn("w-6 h-6", feature.color)} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-2xl font-extrabold text-[#0D0E25]">ARSA</span>
            <p className="mt-2 text-sm text-gray-500">
              © 2024 Arsa Platform. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-gray-600">
            <Link href="#" className="hover:text-[var(--primary)]">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[var(--primary)]">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-[var(--primary)]">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
