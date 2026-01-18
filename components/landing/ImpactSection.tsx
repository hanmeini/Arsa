"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "500+",
    label: "Usaha Terbantu",
    description: "UMKM telah bergabung dan tumbuh bersama Arsa",
  },
  {
    number: "1.200+",
    label: "Insight Bisnis",
    description: "Rekomendasi strategis dihasilkan setiap hari",
  },
  {
    number: "24/7",
    label: "Asisten AI Aktif",
    description: "Siap membantu menjawab pertanyaan bisnismu kapanpun",
  },
];

export function ImpactSection() {
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-shrink-0 text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0D0E25] leading-tight">
              Dampak Nyata
              <br />
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0A70AB] to-[#FE8B1D] font-bold">
                  Arsa
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-[6px] bg-gradient-to-r from-[#0A70AB] to-[#FE8B1D] rounded-full"></span>
              </span>
            </h2>
          </motion.div>

          {/* Right Cards */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-[#0F4C75] rounded-3xl p-8 text-center text-white shadow-xl hover:shadow-2xl transition-all cursor-default flex flex-col justify-center min-h-[220px] relative overflow-hidden group"
              >
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />

                <h3 className="text-4xl md:text-5xl font-extrabold text-[#FF9600] mb-2 tracking-tight">
                  {stat.number}
                </h3>
                <p className="text-xl font-bold mb-3">{stat.label}</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
