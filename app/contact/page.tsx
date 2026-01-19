"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 -z-10 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="py-10"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#0D0E25] mb-6">
                Hubungi Kami
              </h1>
              <p className="text-lg text-gray-500 mb-12 font-light leading-relaxed">
                Punya pertanyaan tentang Arsa atau ingin bermitra? Tim kami siap
                membantu Anda 24/7. Jangan ragu untuk menyapa!
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    info: "hello@arsa.ai",
                    sub: "Respon dalam 2 jam",
                  },
                  {
                    icon: Phone,
                    title: "Telepon",
                    info: "+62 812 3456 7890",
                    sub: "Senin-Jumat, 09:00 - 17:00",
                  },
                  {
                    icon: MapPin,
                    title: "Kantor",
                    info: "Jakarta Selatan, Indonesia",
                    sub: "Kunjungi kantor pusat kami",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-12 h-12 bg-[#0F4C75]/5 rounded-xl flex items-center justify-center text-[#0F4C75] group-hover:bg-[#0F4C75] group-hover:text-white transition-all duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0D0E25]">{item.title}</h4>
                      <p className="text-[#0F4C75] font-medium">{item.info}</p>
                      <p className="text-xs text-gray-400 font-light">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-[#0D0E25] mb-6">
                Kirim Pesan
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Nama Depan
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#FF9600] focus:ring-0 transition-all font-light"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Nama Belakang
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#FF9600] focus:ring-0 transition-all font-light"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#FF9600] focus:ring-0 transition-all font-light"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Pesan
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#FF9600] focus:ring-0 transition-all font-light resize-none"
                    placeholder="Ceritakan kebutuhan bisnis Anda..."
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="w-full py-4 bg-[#0F4C75] hover:bg-[#0A3A5E] text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Kirim Pesan
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-400">
          <MapPin className="w-12 h-12 mb-2 opacity-50" />
          <span className="font-light">
            Google Maps Integration Would Go Here
          </span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
