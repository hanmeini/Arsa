"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Mail, MapPin, Phone, Send, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0D0E25] relative selection:bg-orange-100 overflow-hidden">
      <Navbar />

      {/* Background Patterns (Consistent with Pricing) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top: Grid Pattern */}
        <div className="absolute top-0 inset-x-0 h-[800px] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,white_60%,transparent)]" />

        {/* Bottom: Dots Pattern */}
        <div
          className="absolute top-[600px] inset-x-0 bottom-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.1) 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <section className="pt-32 pb-20 relative z-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#FE9600] font-bold text-sm tracking-widest uppercase mb-4">
              Hubungi Kami
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#0D0E25] mb-6">
              Mari Mulai <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D0E25] via-[#4a5568] to-[#0D0E25]">
                Kolaborasi Baru.
              </span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Kami siap mendengarkan ide-ide brilian Anda. Hubungi tim kami
              untuk konsultasi gratis atau sekadar menyapa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left Column: Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {[
                {
                  icon: Mail,
                  title: "Email Kami",
                  info: "hello@arsa.ai",
                  desc: "Respon cepat dalam 24 jam",
                  color: "bg-amber-50 text-black",
                },
                {
                  icon: Phone,
                  title: "Telepon / WA",
                  info: "+62 812 3456 7890",
                  desc: "Senin-Jumat, 09:00 - 17:00",
                  color: "bg-amber-50 text-black",
                },
                {
                  icon: MapPin,
                  title: "Kantor Pusat",
                  info: "Jakarta Selatan",
                  desc: "Kunjungi kami untuk kopi darat",
                  color: "bg-amber-50 text-black",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[#0D0E25] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[#0D0E25] font-medium text-lg mb-1">
                        {item.info}
                      </p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Proof / Trust */}
              <div className="bg-[#0D0E25] p-8 rounded-3xl text-white relative overflow-hidden mt-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FE9600] rounded-full blur-[60px] opacity-20" />
                <h4 className="font-bold text-lg mb-2 relative z-10">
                  Bergabung dengan Komunitas
                </h4>
                <p className="text-white/60 text-sm mb-6 relative z-10">
                  Lebih dari 1000+ kreator telah menggunakan Arsa.
                </p>
                <div className="flex -space-x-3 relative z-10">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/150?img=${i + 20}`}
                      className="w-10 h-10 rounded-full border-2 border-[#0D0E25]"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-[#FE9600] flex items-center justify-center text-xs font-bold border-2 border-[#0D0E25]">
                    +1k
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Dynamic Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden"
            >
              {/* Decorative Form BG */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-[80px] -z-10 opacity-50" />

              <h3 className="text-3xl font-bold text-[#0D0E25] mb-8">
                Kirim Pesan
              </h3>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group space-y-2">
                    <label className="text-sm font-bold text-[#0D0E25] uppercase tracking-wide">
                      Nama Depan
                    </label>
                    <input
                      type="text"
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-[#FE9600] transition-colors outline-none text-lg font-medium placeholder:text-gray-300"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0D0E25] uppercase tracking-wide">
                      Nama Belakang
                    </label>
                    <input
                      type="text"
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-[#FE9600] transition-colors outline-none text-lg font-medium placeholder:text-gray-300"
                      placeholder="Nama Anda"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0D0E25] uppercase tracking-wide">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-[#FE9600] transition-colors outline-none text-lg font-medium placeholder:text-gray-300"
                    placeholder="nama@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0D0E25] uppercase tracking-wide">
                    Ceritakan Keluhan Anda
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-[#FE9600] transition-colors outline-none text-lg font-medium placeholder:text-gray-300 resize-none"
                    placeholder="Saya ingin membuat..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    className="w-full md:w-auto px-10 py-5 bg-[#0D0E25] hover:bg-[#1a1c4b] text-white rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 group"
                  >
                    <span>Kirim Sekarang</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
