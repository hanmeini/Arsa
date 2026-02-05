"use client";

import { motion } from "framer-motion";
import {
  Store,
  ShoppingBag,
  TrendingUp,
  Sparkles,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-32 pb-0 overflow-hidden bg-gradient-to-b from-[#89C0E0]/30 to-[#FFFFFF]/30">
      {/* Background Dots Pattern */}
      <div
        className="absolute inset-0 w-full h-full opacity-[0.9]"
        style={{
          backgroundImage: "radial-gradient(#CBD5E1 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow Effect */}
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-blue-100/50 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-1 py-1 pr-4 rounded-full bg-[#005587] text-white text-sm font-medium font-sans shadow-md">
            <div className="w-8 h-8 rounded-full bg-[#FF9600] p-1 flex items-center justify-center">
              <Image
                src="/icons/Kepala koxy.svg"
                alt="Logo"
                width={30}
                height={30}
              />
            </div>
            <Image src="/icons/suara.svg" alt="Logo" width={10} height={10} />
            Mulai perjalananmu
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold font-sans text-gray-900 tracking-tight leading-[1.1] mb-6"
        >
          Arsa, asisten{" "}
          <span className="relative inline-block whitespace-nowrap">
            <span className="relative z-10">cerdas</span>
            {/* Spark Accent positioned above 's' */}
            <svg
              className="absolute -top-7 -right-1 w-8 h-8 text-[#FF9600] hidden md:block"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L12 6" />
              <path d="M12 18L12 22" />
              <path d="M4.93 4.93L7.76 7.76" />
              <path d="M16.24 16.24L19.07 19.07" />
              <path d="M2 12L6 12" />
              <path d="M18 12L22 12" />
              <path d="M4.93 19.07L7.76 16.24" />
              <path d="M16.24 7.76L19.07 4.93" />
            </svg>
          </span>{" "}
          untuk
          <br className="hidden md:block" />{" "}
          <span className="relative inline-block px-1">
            <span className="relative z-10 text-[#7C2D12]">usahamu</span>

            {/* Selection Background (Beige/Cream) */}
            <motion.span
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
              className="absolute top-0 bottom-0 left-0 bg-[#FDE68A] -z-0 rounded-sm"
            />


          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-xl font-medium font-sans text-[#363B43]/80 max-w-2xl mx-auto mb-10"
        >
          Solusi modern untuk kebutuhan usaha Anda. Kelola stok, keuangan, dan tren pasar dalam satu platform pintar.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20"
        >
          <Link
            href="/register"
            className="group relative inline-flex items-center gap-2 bg-[var(--accent)] font-sans text-white px-8 py-3 rounded-full text-lg font-medium overflow-hidden transition-all shadow-lg hover:shadow-orange-300/50"
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
              Coba Gratis <Rocket className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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
        </motion.div>

        {/* Phone Mockup Area */}
        <div className="relative w-full max-w-[1200px] mx-auto min-h-[400px] md:min-h-[600px] flex justify-center items-end mt-0 md:mt-10">
          {/* Background Layer for Phone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160%] md:w-[1300px] max-w-[1300px] -z-10 flex items-end justify-center"
          >
            <Image
              src="/icons/bghp.svg"
              alt="Background Pattern"
              width={1200}
              height={1000}
              className="w-full h-auto object-contain opacity-100"
            />
          </motion.div>

          {/* Phone SVG */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="relative z-20 w-full max-w-[550px] md:max-w-none md:w-[650px] lg:w-[950px]"
          >
            <Image
              src="/icons/phone.svg"
              alt="Phone Mockup"
              width={1200}
              height={2000}
              className="w-full h-auto drop-shadow-2xl scale-110 md:scale-100 origin-top"
              priority
            />
          </motion.div>

          {/* Floating Card: Sales (Left) */}
          <motion.div
            className="absolute left-0 lg:left-0 top-1/2 -translate-y-1/2 z-30 hidden md:block"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="bg-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-4 min-w-[300px]">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                <Image
                  src="/icons/healthicons_money-bag.svg"
                  alt="Logo"
                  width={30}
                  height={30}
                />
              </div>
              <div>
                <h3 className="font-bold font-sans text-left text-gray-900 text-lg">
                  Penjualan
                </h3>
                <div className="flex items-center gap-1 text-sky-600 text-sm font-medium font-sans">
                  <span>▲</span> 12% dari kemarin
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Card: Design Trend (Right) */}
          <motion.div
            className="absolute right-0 lg:-right-15 top-0 z-10 hidden md:block"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <div className="bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[380px]">
              <div className="flex items-center gap-3 mb-1">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <span className="font-bold font-sans text-gray-900 text-lg">
                  Trend Desain
                </span>
              </div>
              <p className="text-sm font-medium font-sans text-gray-300 mb-6 w-[15rem] text-left">
                Mengikuti perubahan kebutuhan dan selera desain
              </p>
              <div className="flex gap-2 h-48 w-full">
                {/* Chart Area */}
                <div className="flex-1 relative">
                  {/* SVG Chart */}
                  <div className="absolute inset-0 pt-4">
                    <Image
                      src="/icons/chart-hero.svg"
                      alt="Trend Chart"
                      width={300}
                      height={200}
                      className="w-full h-full object-contain object-bottom"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay at Bottom - Moved to section level for full width */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-40 pointer-events-none"></div>
    </section>
  );
}
