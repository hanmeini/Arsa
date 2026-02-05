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
    name: "Arsa Flex",
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
    free: true,
  },
  {
    name: "Arsa Pro",
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
    name: "Arsa Enterprise",
    price: "IDR 500k",
    unit: "/ bulan",
    description: "Harga yang disesuaikan dengan kebutuhan Anda",
    buttonText: "Hubungi Kami",
    features: [
      "Semua fitur Paket Studio",
      "Render 8k / 360 tanpa batas",
      "Dukungan Enterprise dengan SLA",
      "Syarat pembayaran fleksibel",
    ],
    popular: false,
    enterprise: true,
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-snug text-[#0D0E25]">
              Pilih Paket Harga yang Sesuai
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
              <Link
                href="/register"
                className="group relative inline-flex items-center justify-center gap-2 bg-[#FE9600] font-sans text-white px-8 py-3 rounded-full text-lg font-bold overflow-hidden transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-300/50 w-full sm:w-auto"
                onMouseEnter={(e) => {
                  const btn = e.currentTarget;
                  const rect = btn.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  btn.style.setProperty("--x", `${x}px`);
                  btn.style.setProperty("--y", `${y}px`);
                }}
              >
                <span className="relative z-10 flex items-center gap-2 pointer-events-none">
                  Mulai Sekarang
                </span>

                <span
                  className="absolute w-0 h-0 bg-[#0F4C75] rounded-full transition-all duration-1000 ease-in-out group-hover:w-[450px] group-hover:h-[450px]"
                  style={{
                    left: "var(--x)",
                    top: "var(--y)",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </Link>
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
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  card.style.setProperty("--mouse-x", `${x}px`);
                  card.style.setProperty("--mouse-y", `${y}px`);
                }}
                className={cn(
                  "group relative rounded-[2.5rem] p-8 md:p-10 border transition-all duration-300 flex flex-col items-start overflow-hidden h-full",
                  // Conditional Styling
                  plan.popular
                    ? "bg-white border-[#FE9600] shadow-xl z-10"
                    : plan.enterprise
                      ? "bg-white border-[#0D0E25] shadow-xl hover:shadow-2xl z-10"
                      : plan.free
                        ? "bg-white border-gray-200 shadow-md hover:shadow-lg hover:border-gray-300"
                        : "bg-white border-gray-100 shadow-lg hover:border-gray-200"
                )}
              >
                {/* Spotlight Overlay */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${plan.popular ? 'rgba(254, 150, 0, 0.1)' :
                      plan.enterprise ? 'rgba(13, 14, 37, 0.05)' :
                        'rgba(0, 0, 0, 0.03)'
                      }, transparent 40%)`
                  }}
                />

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#FE9600] text-white text-[10px] font-bold px-3 pr-6 py-1 rounded-bl-xl uppercase tracking-widest z-20">
                    Recommended
                  </div>
                )}

                {/* Enterprise Badge */}
                {plan.enterprise && (
                  <div className="absolute top-0 right-0 bg-[#0D0E25] text-white text-[10px] font-bold px-3 pr-6 py-1 rounded-bl-xl uppercase tracking-widest z-20">
                    Ultimate
                  </div>
                )}

                {/* Free Badge */}
                {plan.free && (
                  <div className="absolute top-0 right-0 bg-gray-200 text-gray-600 text-[10px] font-bold px-3 pr-6 py-1 rounded-bl-xl uppercase tracking-widest z-20">
                    Basic
                  </div>
                )}

                {/* Top Shine (Subtle) */}
                <div className={cn(
                  "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity",
                  plan.popular ? "via-[#FE9600]" :
                    plan.enterprise ? "via-[#0D0E25]" :
                      plan.free ? "via-gray-300" : "via-[#0F4C75]"
                )} />

                <h3 className={cn(
                  "font-bold uppercase tracking-wider text-sm mb-4",
                  plan.popular ? "text-[#FE9600]" :
                    plan.enterprise ? "text-[#0D0E25]" : "text-[#0F4C75]"
                )}>
                  {plan.name}
                </h3>

                <p className="text-gray-500 text-sm mb-8 h-10 font-medium relative z-10">
                  {plan.description}
                </p>

                <div className="mb-8 relative z-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-[#0D0E25]">
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm font-bold">
                    {plan.unit}
                  </span>
                </div>

                <button className={cn(
                  "w-full py-4 rounded-full font-bold mb-10 relative z-10 overflow-hidden group/btn transition-colors duration-300",
                  plan.popular
                    ? "bg-[#FE9600] text-white shadow-lg shadow-orange-200 hover:bg-[#e47207]"
                    : plan.enterprise
                      ? "bg-[#0D0E25] text-white hover:bg-[#1a1c4b] shadow-lg"
                      : "bg-[#0D0E25] text-white hover:bg-[#1a1c4b]"
                )}>
                  <span className="relative z-10">{plan.buttonText}</span>

                  {/* Shine Effect */}
                  <div className="absolute top-0 -left-[100%] w-full h-full group-hover/btn:left-[100%] transition-all duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </button>

                <div className="space-y-4 w-full relative z-10">
                  <p className="font-bold text-sm text-[#0D0E25] mb-4 uppercase tracking-wide">
                    Termasuk...
                  </p>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className={cn(
                        "w-5 h-5 shrink-0 stroke-[3]",
                        plan.popular ? "text-[#FE9600]" :
                          plan.enterprise ? "text-[#0D0E25]" : "text-[#0F4C75]"
                      )} />
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



      <Footer />
    </div>
  );
}
