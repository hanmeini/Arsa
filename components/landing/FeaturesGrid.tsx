"use client";

import { motion } from "framer-motion";
import { Package, Wand2, TrendingUp, Wallet } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Manajemen Stok Pintar",
    description:
      "Pantau stok real-time, dapatkan notifikasi barang habis, dan kelola inventaris tanpa pusing.",
    icon: Package,
    className: "md:col-span-2",
    visual: (
      <div className="absolute -right-12 -top-12 md:-right-14 md:-top-14">
        <Image
          src="/images/boxillust.png"
          alt="Box Illustration"
          width={180}
          height={180}
          className="w-36 h-36 md:w-45 md:h-45 object-contain rotate-12"
        />
      </div>
    ),
  },
  {
    title: "AI Content Creator",
    description:
      "Buat deskripsi produk menarik & ide konten sosial media dalam hitungan detik dengan AI.",
    icon: Wand2,
    className: "md:col-span-1 md:row-span-2",
    titleClassName: "text-2xl",
    visual: (
      <div className="absolute rotate-20 -right-12 -top-12 md:-right-14  md:-top-14">
        <Image
          src="/images/spark.png"
          alt="Spark Illustration"
          width={180}
          height={180}
          className="w-36 h-36 md:w-45 md:h-45 object-contain rotate-6"
        />
      </div>
    ),
  },
  {
    title: "Laporan Keuangan",
    description:
      "Catat pemasukan & pengeluaran usaha secara otomatis. Pantau profit harianmu.",
    icon: Wallet,
    className: "md:col-span-1",
    visual: (
      <div className="absolute -right-12 -top-12 md:-right-18 md:-top-14">
        <Image
          src="/images/diagram.png"
          alt="Financial Chart"
          width={180}
          height={180}
          className="w-44 h-44 md:w-52 md:h-52 object-contain -rotate-6"
        />
      </div>
    ),
  },
  {
    title: "Analisa Tren Pasar",
    description:
      "Prediksi produk yang akan laris berdasarkan data tren pasar terkini.",
    icon: TrendingUp,
    className: "md:col-span-1",
    visual: (
      <div className="absolute -right-12 -top-12 md:-right-14 md:-top-14">
        <Image
          src="/images/arrow.png"
          alt="Arrow Trend"
          width={180}
          height={180}
          className="w-36 h-36 md:w-45 md:h-45 object-contain -rotate-15"
          style={{ transform: "rotateY(180deg)" }} // Flip if needed for direction, or just rotate
        />
      </div>
    ),
  },
];

import { PixelTooltipCanvas } from "@/components/ui/PixelTooltipCanvas";

export function FeaturesGrid() {
  return (
    <section className="bg-[#0F4C75] py-24 relative overflow-hidden font-sans group">
      {/* Pixel Abstract Cursor Trail Background */}
      <PixelTooltipCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none">
        <div className="text-center max-w-3xl mx-auto mb-16 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm font-medium backdrop-blur-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF9600]" />
            Fitur Unggulan
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-sans text-white mb-6 leading-tight"
          >
            Bantu UMKM Tumbuh Lebih{" "}
            <span className="relative inline-block text-white">
              <span className="relative z-10">Cepat & Terarah</span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
                viewport={{ once: true }}
                style={{ originX: 0 }}
                className="absolute bottom-1 left-0 w-full h-4 bg-[#FF9600] -z-0 opacity-90 -rotate-1 rounded-sm"
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg font-sans text-white/70 leading-relaxed max-w-2xl mx-auto"
          >
            Platform all-in-one yang menyederhanakan operasional bisnis Anda dengan kekuatan teknologi modern.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative bg-white rounded-[2rem] p-8 overflow-hidden transform-gpu pointer-events-auto",
                feature.className
              )}
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F4C75]/5 flex items-center justify-center text-[#0F4C75] font-bold text-xl">
                    0{index + 1}
                  </div>

                </div>

                <div>
                  <h3 className={cn("text-xl font-bold font-sans text-[#0F4C75] mb-3", feature.titleClassName)}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 font-sans leading-relaxed text-sm md:text-base font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Decorative Background Elements (No Gradients as requested) */}
              {feature.visual}

              {/* Subtle Texture Overlay */}
              {/* Subtle Texture Overlay - Removed as per request to remove hover effects */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
