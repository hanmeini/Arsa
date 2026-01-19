"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "0",
    period: "/bulan",
    description: "Untuk UMKM yang baru memulai digitalisasi",
    features: [
      "Akses Dasar Arsa AI",
      "5 Generate Konten/hari",
      "Laporan Harian Sederhana",
      "Support Komunitas",
    ],
    notIncluded: ["Analisis Kompetitor", "Integrasi POS"],
    color: "gray",
    buttonText: "Börja Gratis",
    popular: false,
  },
  {
    name: "Pro",
    price: "199k",
    period: "/bulan",
    description: "Untuk bisnis yang sedang bertumbuh pesat",
    features: [
      "Akses Penuh Arsa AI",
      "Unlimited Generate Konten",
      "Laporan Keuangan Detail",
      "Analisis Kompetitor",
      "Prioritas Support 24/7",
    ],
    notIncluded: ["Integrasi POS"],
    color: "blue",
    buttonText: "Pilih Paket Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Solusi lengkap untuk skala bisnis besar",
    features: [
      "Semua Fitur Pro",
      "Custom AI Training",
      "Integrasi POS & ERP",
      "Dedicated Account Manager",
      "API Access",
    ],
    notIncluded: [],
    color: "orange",
    buttonText: "Hubungi Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-20 text-center bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#0D0E25] mb-6">
              Investasi Cerdas untuk Bisnis
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
              Pilih paket yang sesuai dengan tahapan bisnis Anda. Upgrade kapan
              saja seiring pertumbuhan usaha.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={cn(
                  "relative p-8 rounded-3xl border transition-all duration-300",
                  plan.popular
                    ? "bg-white border-[#0F4C75] shadow-2xl scale-105 z-10"
                    : "bg-white border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1",
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#0F4C75] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl">
                    POPULAR
                  </div>
                )}

                <h3 className="text-xl font-bold text-[#0D0E25] mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-[#0D0E25]">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 mb-1 font-light">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-8 font-light min-h-[40px]">
                  {plan.description}
                </p>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#FF9600] shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 opacity-50">
                      <X className="w-5 h-5 text-gray-400 shrink-0" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/register"
                  className={cn(
                    "w-full py-3 rounded-xl font-bold text-sm block text-center transition-all",
                    plan.popular
                      ? "bg-[#0F4C75] text-white hover:bg-[#0A3A5E] shadow-lg shadow-blue-900/20"
                      : "bg-gray-100 text-[#0D0E25] hover:bg-gray-200",
                  )}
                >
                  {plan.buttonText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#0D0E25] mb-12">
            Pertanyaan Umum
          </h2>
          <div className="grid gap-6 text-left">
            {[
              {
                q: "Apakah ada biaya tersembunyi?",
                a: "Tidak ada. Harga yang Anda lihat adalah yang Anda bayar.",
              },
              {
                q: "Bisa batalkan kapan saja?",
                a: "Ya, Anda bisa berhenti berlangganan kapan saja tanpa denda.",
              },
              {
                q: "Apakah data saya aman?",
                a: "Keamanan data adalah prioritas utama kami dengan enkripsi standar industri.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h4 className="font-bold text-[#0D0E25] mb-2">{item.q}</h4>
                <p className="text-gray-500 font-light text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
