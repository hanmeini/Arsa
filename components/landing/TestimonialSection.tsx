"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

const voices = [
  {
    id: 1,
    name: "Sari Wulandari",
    role: "Owner Kopi Kenangan Hati",
    avatar: "/avatars/user-1.jpg",
    quote:
      "Sejak pakai Arsa, stok bahan baku jadi lebih teratur. Nggak ada lagi drama kehabisan susu pas lagi rame pembeli. Sangat membantu!",
  },
  {
    id: 2,
    name: "Budi Santoso",
    role: "Founder Batik Modern",
    avatar: "/avatars/user-2.jpg",
    quote:
      "Fitur AI Content Creator-nya juara! Bikin caption Instagram jadi cepet banget, engagement juga naik karena captionnya relevan.",
  },
  {
    id: 3,
    name: "Linda Kusuma",
    role: "CEO Snack Mantap",
    avatar: "/avatars/user-3.jpg",
    quote:
      "Laporan keuangannya simpel tapi lengkap. Saya jadi tahu persis profit harian saya berapa tanpa harus hitung manual sampai malam.",
  },
  {
    id: 4,
    name: "Rahmat Hidayat",
    role: "Pemilik Toko Kelontong Berkah",
    avatar: "/avatars/user-4.jpg",
    quote:
      "Dulu pusing ngurusin bon bon manual. Sekarang semua tercatat otomatis. Arsa bener-bener asisten yang bisa diandelin.",
  },
];

export function TestimonialSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(voices.length);

  // Handle scroll events to update 'current' index
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const index = Math.round(
        scrollLeft / (width / (window.innerWidth < 768 ? 1 : 3)),
      );
      // setCurrent(index);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 350;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      const newIndex =
        direction === "left"
          ? Math.max(0, current - 1)
          : Math.min(count - 1, current + 1);
      setCurrent(newIndex);
    }
  };

  const goTo = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 320;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setCurrent(index);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAFAFA] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Nav */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 relative z-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-light text-[#0D0E25] leading-tight mb-4">
              Cerita dan Pesan dari{" "}
              <span className="font-semibold text-[#0F4C75]">Mitra UMKM</span>
            </h2>
            <div className="h-1 w-28 bg-[#FF9600] rounded-full mb-6" />
            <p className="text-gray-500 font-normal text-lg leading-relaxed max-w-xl">
              Suara tulus dari para pelaku usaha yang berjuang dan bertumbuh
              bersama Arsa, membawa semangat kewirausahaan untuk masa depan yang
              lebih baik.
            </p>
          </div>

          {/* Desktop Nav Buttons */}
          <div className="hidden md:flex gap-4 shrink-0">
            <button
              onClick={() => scroll("right")} // Reversed
              className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-600 hover:text-[#0F4C75] hover:border-[#0F4C75] transition-all duration-200 shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("left")} // Reversed
              className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-600 hover:text-[#0F4C75] hover:border-[#0F4C75] transition-all duration-200 shadow-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative w-full flex flex-col md:block min-h-[450px]">
          {/* Mobile Featured Image */}
          <div className="block md:hidden w-full h-[250px] mb-8">
            <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-lg group">
              <div className="absolute inset-0 bg-[#0F4C75]" />
              <Image
                src="/icons/bghp.svg"
                alt="Cover"
                width={450}
                height={500}
                className="w-full h-full object-cover opacity-60 mix-blend-overlay"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/50">
                  <Play className="w-5 h-5 fill-current" />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Featured Image (Absolute Left) */}
          <div className="absolute left-0 top-0 bottom-0 w-[400px] lg:w-[450px] z-0 hidden md:block">
            <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-xl group">
              {/* Background Placeholder */}
              <div className="absolute inset-0 bg-[#0F4C75]">
                <Image
                  src="/icons/bghp.svg"
                  alt="Cover"
                  width={450}
                  height={500}
                  className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                />
              </div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/40 shadow-lg cursor-pointer transition-transform"
                >
                  <Play className="w-6 h-6 fill-current" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Carousel Scroll Container - Centered Items */}
          <div
            ref={scrollRef}
            className="flex flex-nowrap gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full md:w-screen md:ml-[calc(50%-50vw)] relative z-10 h-[450px] items-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Spacer for Desktop Layout - Fixed Width */}
            <div className="hidden md:block shrink-0 w-[450px] lg:w-[480px] snap-start" />

            {voices.map((voice) => (
              <motion.div
                key={voice.id}
                className="snap-start shrink-0 w-[300px] md:w-[320px] lg:w-[350px]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-full bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group min-h-[300px]">
                  <div>
                    <div className="flex items-center gap-2 text-[#0F4C75] font-normal text-lg mb-6 group-hover:text-[#FF9600] transition-colors">
                      <Smile className="w-5 h-5" />
                      <span>Suara dari Mitra</span>
                    </div>
                    <p className="text-gray-500 text-base leading-relaxed">
                      "{voice.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-6 border-t border-gray-100 mt-6">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                      {/* Avatar Placeholder */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold">
                        {voice.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0D0E25]">
                        {voice.name}
                      </h4>
                      <p className="text-xs font-light text-gray-500">
                        {voice.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Extra spacer at the end for smooth scrolling */}
            <div className="w-4 shrink-0" />
          </div>
        </div>

        {/* Controls: Dots & Mobile Buttons */}
        <div className="mt-8 flex items-center justify-between md:justify-center md:pl-[450px]">
          {/* Mobile Prev */}
          <button
            onClick={() => scroll("right")} // Reversed
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white text-[#0F4C75] shadow-sm active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {voices.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  current === idx
                    ? "w-8 h-2 bg-[#FF9600]"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400",
                )}
              />
            ))}
          </div>

          {/* Mobile Next */}
          <button
            onClick={() => scroll("left")} // Reversed
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white text-[#0F4C75] shadow-sm active:scale-95 transition-transform"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
