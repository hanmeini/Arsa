"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    question: "Apa saja yang bisa ARSA bantu?",
    answer:
      "Arsa dapat membantu mengelola stok, membuat konten promosi otomatis, dan memberikan prediksi tren pasar untuk usaha Anda.",
  },
  {
    question: "Bagaimana cara memulai?",
    answer:
      "Anda cukup memasukkan kebutuhan usaha, lalu ARSA akan memproses dan menyiapkan solusi yang dapat langsung digunakan.",
  },
  {
    question: "Bagaimana cara mendaftar?",
    answer:
      "Proses pendaftaran sangat mudah, cukup dengan email dan Anda bisa langsung mencoba fitur gratis kami.",
  },
];

export function Introduction() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1); // Default active index based on image

  // Mascot Interaction State
  const [isMascotHovered, setIsMascotHovered] = useState(false);
  const [mascotMessage, setMascotMessage] = useState("Hai, aku Nara! 👋");

  const mascotMessages = [
    "Hai, aku Nara! 👋",
    "Ada yang bisa dibantu? 🤔",
    "Yuk, majukan usahamu! 🚀",
    "Aku siap bantuin kamu! 💡",
  ];

  const handleMascotHover = () => {
    // Pick random message
    const randomIndex = Math.floor(Math.random() * mascotMessages.length);
    setMascotMessage(mascotMessages[randomIndex]);
    setIsMascotHovered(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-2">
            <h2 className="text-4xl md:text-5xl font-bold font-sans text-gray-900 leading-tight">
              <Image
                src="/icons/mdi_hand-wave.svg"
                alt="Wave Icon"
                width={48}
                height={48}
                className="inline-block w-10 h-10 md:w-12 md:h-12 mr-3 object-contain align-bottom pb-1"
              />
              Mari mengenal{" "}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0A70AB] to-[#FE8B1D] font-bold">
                  Arsa
                </span>
              </span>
              <br />
              lebih dekat
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Mascot */}
          <div className="relative flex justify-center md:justify-start">


            {/* Mascot Image Placeholder - Replacing with what we have or placeholder */}
            <div
              className="relative w-[300px] h-[400px] cursor-help group"
              onMouseEnter={handleMascotHover}
              onMouseLeave={() => setIsMascotHovered(false)}
            >
              <video
                src="/animations/mascot-arsa.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />

              {/* Dynamic Animated Speech Bubble */}
              <AnimatePresence mode="wait">
                {isMascotHovered && (
                  <motion.div
                    key={mascotMessage} // Re-animate when text changes
                    initial={{ opacity: 0, scale: 0.5, y: 10, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 10, rotate: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-10 -right-4 z-20 origin-bottom-left filter drop-shadow-xl"
                  >
                    <div className="relative bg-white px-5 py-3 rounded-2xl border border-gray-100/50">
                      <p className="text-[#0F4C75] font-bold text-sm whitespace-nowrap flex items-center gap-2">
                        {mascotMessage}
                      </p>

                      {/* Smooth SVG Tail */}
                      <svg
                        className="absolute -bottom-[13px] left-0 w-6 h-6 text-white transform rotate-6 translate-x-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M0 0C0 0 4 14 16 20C12 10 20 0 20 0H0Z" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className={cn(
                  "border rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer",
                  activeIndex === index
                    ? "bg-[#FF9600] border-[#FF9600] ring-4 ring-orange-100"
                    : "bg-white border-gray-200 hover:border-orange-200"
                )}
              >
                <div className="px-6 py-5 flex justify-between items-center">
                  <h3
                    className={cn(
                      "font-sans font-bold text-lg",
                      activeIndex === index ? "text-white" : "text-[#0F4C75]"
                    )}
                  >
                    {item.question}
                  </h3>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300",
                      activeIndex === index
                        ? "bg-white text-[#FF9600]"
                        : "bg-[#FF9600] text-white"
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 transition-transform duration-300",
                        activeIndex === index ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px w-full bg-white/20 mb-4"></div>
                        <p className="font-sans text-white/90 leading-relaxed font-medium">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
