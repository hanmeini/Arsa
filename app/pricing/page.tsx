"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

const plans = [
  {
    name: "Bayar Sesuai Pemakaian",
    price: "Gratis",
    unit: "/ kredit",
    description: "Render apa yang Anda inginkan, kapan pun Anda mau",
    buttonText: "Mulai Sekarang",
    features: [
      "Akses Dasar Arsa AI",
      "Aplikasi Desktop",
      "Mendukung semua fitur",
      "Dukungan terbatas",
    ],
    popular: false,
  },
  {
    name: "Helio Studio 250",
    price: "IDR 200k",
    unit: "/ bulan",
    description: "Bayar di muka, lebih hemat untuk render banyak",
    buttonText: "Lebih Hemat",
    features: [
      "Semua Fitur Dasar",
      "Gambar Diam Tanpa Batas",
      "Manajer Akun Khusus",
      "Render wrangler khusus",
    ],
    popular: true,
  },
  {
    name: "Helio Unleashed",
    price: "Hubungi Kami",
    unit: "",
    description: "Harga yang disesuaikan dengan kebutuhan Anda",
    buttonText: "Hubungi Sales",
    features: [
      "Semua fitur Paket Studio",
      "Render 8k / 360 tanpa batas",
      "Dukungan Enterprise dengan SLA",
      "Syarat pembayaran fleksibel",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="min-h-screen font-sans text-[#0D0E25] relative selection:bg-orange-100 bg-gradient-to-b from-slate-50 via-white to-white overflow-hidden">
      <Navbar />

      {/* Background Patterns */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top: Grid Pattern (Header to Toggle) */}
        <div className="absolute top-0 inset-x-0 h-[800px] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,white_60%,transparent)]" />

        {/* Bottom: Dots Pattern (Pricing Cards area) */}
        <div
          className="absolute top-[600px] inset-x-0 bottom-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.1) 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative Orange Icons */}
      <div className="absolute top-32 left-8 md:left-20 animate-pulse delay-75 pointer-events-none z-0">
        <Check
          className="w-12 h-12 text-[#FE9600]/20 rotate-12"
          strokeWidth={3}
        />
      </div>
      <div className="absolute top-40 right-8 md:right-20 animate-bounce delay-100 pointer-events-none z-0">
        <div className="w-8 h-8 rounded-full border-4 border-[#FE9600]/20" />
      </div>
      <div className="absolute top-96 left-12 md:left-32 animate-pulse delay-75 pointer-events-none z-0 opacity-50">
        <div className="w-4 h-4 rounded-full bg-[#FE9600]/30" />
      </div>

      {/* Header */}
      <section className="pt-40 pb-20 text-center relative z-10">
        <div className="max-w-5xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-snug text-[#0D0E25]">
              Pilih Paket Harga yang Sesuai <br />
              <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 align-middle mx-2">
                <span>Kebutuhan UMKM</span>
                {/* Avatar Group */}
                <div className="flex -space-x-4 shrink-0">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/150?img=${i + 10}`}
                        alt="User"
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                  ))}
                </div>
                <span>Anda</span>
              </div>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-6 font-medium">
              Arsa beradaptasi dengan alur kerja Anda — baik Anda render setiap
              hari atau hanya sesekali.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button className="px-8 py-3 bg-[#FE9600] text-white rounded-full font-bold shadow-lg shadow-orange-500/30 hover:bg-[#e47207] transition-all w-full sm:w-auto">
                Mulai Sekarang
              </button>
              <button className="px-8 py-3 bg-white border border-gray-200 text-gray-600 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm w-full sm:w-auto">
                Butuh bantuan memilih?
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Toggle Year Switch */}
      <section className="pb-10 relative z-10">
        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start relative overflow-hidden group"
              >
                {/* Top Accents */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FE9600] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <h3 className="text-[#FE9600] font-bold uppercase tracking-wider text-sm mb-4">
                  {plan.name}
                </h3>

                <p className="text-gray-500 text-sm mb-8 h-10 font-medium">
                  {plan.description}
                </p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-[#0D0E25]">
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm font-bold">
                    {plan.unit}
                  </span>
                </div>

                <button className="w-full py-4 bg-[#0D0E25] text-white rounded-full font-bold mb-10 hover:bg-[#1a1c4b] transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  {plan.buttonText}
                </button>

                <div className="space-y-4 w-full">
                  <p className="font-bold text-sm text-[#0D0E25] mb-4 uppercase tracking-wide">
                    Termasuk...
                  </p>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#FE9600] shrink-0 stroke-[3]" />
                      <span className="text-gray-600 text-sm font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Project Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="bg-white rounded-full shadow-lg border border-gray-100 p-2 inline-flex flex-wrap justify-center items-center gap-4 pr-6 cursor-pointer hover:scale-105 transition-transform group">
            <div className="pl-4 md:pl-6 font-bold text-[#FE9600]">Proyek</div>
            <div className="hidden md:block h-4 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent group-hover:ring-[#FE9600]/20 transition-all">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-sm text-[#0D0E25]">
                Hubungi Tim Kami
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
