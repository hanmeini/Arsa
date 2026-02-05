"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Mail, MapPin, Phone, Send, ArrowRight, User, AtSign, MessageSquare, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [activeField, setActiveField] = useState<"name" | "email" | "message" | "default">("default");

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#0D0E25] relative selection:bg-orange-100 overflow-hidden">
      <Navbar />

      {/* BACKGROUND: Clean with subtle kinetic blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Soft Kinetic Blob - Top Left */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-blue-100/40 rounded-full blur-3xl will-change-transform transform-gpu translate-z-0"
        />
        {/* Soft Kinetic Blob - Bottom Right */}
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-orange-100/30 rounded-full blur-3xl will-change-transform transform-gpu translate-z-0"
        />
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <section className="pt-24 pb-12 md:pt-32 md:pb-24 relative z-10 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#FE9600] font-bold text-sm tracking-widest uppercase mb-4">
            Hubungi Kami
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#0D0E25] mb-6">
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

        <div className="flex flex-col gap-12">

          {/* TOP: Contact Info (Centered) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 pb-8 md:pb-12 border-b border-gray-100 text-center"
          >
            {/* Box 1: Office */}
            <div className="flex flex-col items-center space-y-4">
              <MapPin className="w-8 h-8 text-orange-500 stroke-[1.5]" />
              <p className="text-xl text-[#0D0E25] font-medium leading-relaxed">
                Jakarta Selatan, <br />Indonesia
              </p>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[2px] bg-gray-200 h-16 self-center" />

            {/* Box 2: Email */}
            <div className="flex flex-col items-center space-y-4">
              <Mail className="w-8 h-8 text-orange-500 stroke-[1.5]" />
              <a href="mailto:hello@arsa.ai" className="block text-xl text-[#0D0E25] font-medium hover:text-blue-600 transition-colors underline decoration-gray-200 underline-offset-8 decoration-1 hover:decoration-blue-200 break-all">
                hello@arsa.ai
              </a>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[2px] bg-gray-200 h-16 self-center" />

            {/* Box 3: Phone */}
            <div className="flex flex-col items-center space-y-4">
              <Phone className="w-8 h-8 text-orange-500 stroke-[1.5]" />
              <p className="text-xl text-[#0D0E25] font-medium">
                +62 812 3456 7890
              </p>
            </div>
          </motion.div>

          {/* BOTTOM: Interactive Split Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center max-w-6xl mx-auto w-full"
          >
            {/* LEFT: Dynamic Icon Display */}
            <div className="hidden lg:flex lg:col-span-4 justify-center items-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative z-10 p-8">
                  <AnimatePresence mode="wait">
                    {activeField === "default" && (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img src="/images/send.png" alt="Send" className="w-[300px] h-[300px] object-contain drop-shadow-xl" />
                      </motion.div>
                    )}
                    {activeField === "name" && (
                      <motion.div
                        key="name"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img src="/images/userillust.png" alt="User" className="w-[300px] h-[300px] object-contain drop-shadow-xl" />
                      </motion.div>
                    )}
                    {activeField === "email" && (
                      <motion.div
                        key="email"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img src="/images/email.png" alt="Email" className="w-[300px] h-[300px] object-contain drop-shadow-xl" />
                      </motion.div>
                    )}
                    {activeField === "message" && (
                      <motion.div
                        key="message"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img src="/images/send.png" alt="Message" className="w-[300px] h-[300px] object-contain drop-shadow-xl" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="lg:col-span-8">
              <form className="space-y-8 md:space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {/* First Name */}
                  <div className="group relative">
                    <input
                      type="text"
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField("default")}
                      placeholder="John"
                      className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-lg md:text-2xl text-[#0D0E25] placeholder-transparent focus:outline-none focus:border-[#0D0E25] transition-colors"
                    />
                    <label className="pointer-events-none absolute left-0 top-3 text-base font-bold uppercase tracking-widest text-[#0D0E25] origin-left transition-all duration-300 ease-out peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#0D0E25] md:peer-focus:-translate-y-8 -translate-y-6 md:-translate-y-8 scale-75">
                      First Name
                    </label>
                  </div>

                  {/* Last Name */}
                  <div className="group relative">
                    <input
                      type="text"
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField("default")}
                      placeholder="Doe"
                      className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-lg md:text-2xl text-[#0D0E25] placeholder-transparent focus:outline-none focus:border-[#0D0E25] transition-colors"
                    />
                    <label className="pointer-events-none absolute left-0 top-3 text-base font-bold uppercase tracking-widest text-[#0D0E25] origin-left transition-all duration-300 ease-out peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#0D0E25] md:peer-focus:-translate-y-8 -translate-y-6 md:-translate-y-8 scale-75">
                      Last Name
                    </label>
                  </div>
                </div>

                {/* Email */}
                <div className="group relative">
                  <input
                    type="email"
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField("default")}
                    placeholder="john@example.com"
                    className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-lg md:text-2xl text-[#0D0E25] placeholder-transparent focus:outline-none focus:border-[#0D0E25] transition-colors"
                  />
                  <label className="pointer-events-none absolute left-0 top-3 text-base font-bold uppercase tracking-widest text-[#0D0E25] origin-left transition-all duration-300 ease-out peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#0D0E25] md:peer-focus:-translate-y-8 -translate-y-6 md:-translate-y-8 scale-75">
                    Email Address
                  </label>
                </div>

                {/* Message */}
                <div className="group relative">
                  <textarea
                    rows={3}
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField("default")}
                    placeholder="Tell us about your project..."
                    className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-lg md:text-2xl text-[#0D0E25] placeholder-transparent focus:outline-none focus:border-[#0D0E25] transition-colors resize-none"
                  />
                  <label className="pointer-events-none absolute left-0 top-3 text-base font-bold uppercase tracking-widest text-[#0D0E25] origin-left transition-all duration-300 ease-out peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#0D0E25] md:peer-focus:-translate-y-8 -translate-y-6 md:-translate-y-8 scale-75">
                    Message
                  </label>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    className="relative px-8 py-3 bg-[#0D0E25] text-white rounded-full font-bold text-sm tracking-wide hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-3 group overflow-hidden"
                  >
                    <span className="relative z-10">Kirim Pesan</span>
                    <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-500" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
