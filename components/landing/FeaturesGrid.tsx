"use client";

import { motion } from "framer-motion";
import { Package, Wand2, TrendingUp, Wallet } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Manajemen Stok Pintar",
    description:
      "Pantau stok real-time, dapatkan notifikasi barang habis, dan kelola inventaris tanpa pusing.",
    icon: Package,
    color: "bg-slate-100 text-slate-600",
  },
  {
    title: "AI Content Creator",
    description:
      "Buat deskripsi produk menarik & ide konten sosial media dalam hitungan detik dengan AI.",
    icon: Wand2,
    color: "bg-slate-100 text-slate-600",
  },
  {
    title: "Laporan Keuangan",
    description:
      "Catat pemasukan & pengeluaran usaha secara otomatis. Pantau profit harianmu.",
    icon: Wallet,
    color: "bg-slate-100 text-slate-600",
  },
  {
    title: "Analisa Tren Pasar",
    description:
      "Prediksi produk yang akan laris berdasarkan data tren pasar terkini.",
    icon: TrendingUp,
    color: "bg-slate-100 text-slate-600",
  },
];

export function FeaturesGrid() {
  return (
    <section className="bg-[#0F4C75] py-24 relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#FFFFFF 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center p-3 mb-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
              <Image
                src="/icons/mingcute_chat-4-ai-fill.svg" // Using existing icon
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
          >
            Bantu UMKM Tumbuh Lebih{" "}
            <span className="italic text-[#FF9600]">Cepat</span> & Terarah
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-white/80 leading-relaxed"
          >
            Platform yang membantu UMKM mengelola usaha, memahami performa
            bisnis, dan mengambil keputusan lebih tepat dengan cara yang
            sederhana dan efisien.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-white/10 hover:shadow-2xl transition-all cursor-default relative overflow-hidden group"
            >
              <div
                className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#FF9600]/10 group-hover:text-[#FF9600]`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF9600] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
