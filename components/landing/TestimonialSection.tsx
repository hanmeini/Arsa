"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Smile, MapPin, Quote } from "lucide-react";

// Testimonial Data with Coordinates (approximate % positions on the map)
const testimonials = [
  {
    id: 1,
    name: "Sari Wulandari",
    role: "Owner Kopi Kenangan Hati",
    location: "Jakarta",
    avatar: "/avatars/user-1.jpg",
    quote:
      "Sejak pakai Arsa, stok bahan baku jadi lebih teratur. Nggak ada lagi drama kehabisan susu pas lagi rame pembeli. Sangat membantu!",
    cx: 235, cy: 225, // Jakarta (West Java)
  },
  {
    id: 2,
    name: "Budi Santoso",
    role: "Founder Batik Modern",
    location: "Yogyakarta",
    avatar: "/avatars/user-2.jpg",
    quote:
      "Fitur AI Content Creator-nya juara! Bikin caption Instagram jadi cepet banget, engagement juga naik karena captionnya relevan.",
    cx: 305, cy: 235, // Yogyakarta (Central Java)
  },
  {
    id: 3,
    name: "Linda Kusuma",
    role: "CEO Snack Mantap",
    location: "Medan",
    avatar: "/avatars/user-3.jpg",
    quote:
      "Laporan keuangannya simpel tapi lengkap. Saya jadi tahu persis profit harian saya berapa tanpa harus hitung manual.",
    cx: 125, cy: 85, // Medan (North Sumatra)
  },
  {
    id: 4,
    name: "Rahmat Hidayat",
    role: "Toko Kelontong Berkah",
    location: "Makassar",
    avatar: "/avatars/user-4.jpg",
    quote:
      "Dulu pusing ngurusin bon bon manual. Sekarang semua tercatat otomatis. Arsa bener-bener asisten yang bisa diandelin.",
    cx: 440, cy: 195, // Makassar (South Sulawesi)
  },
  {
    id: 5,
    name: "Wayan Gede",
    role: "Pengrajin Bali Art",
    location: "Denpasar",
    avatar: "/avatars/user-5.jpg",
    quote:
      "Sangat mudah digunakan bahkan untuk orang gaptek seperti saya. Orderan dari luar negeri jadi lebih terkelola rapi.",
    cx: 390, cy: 250, // Bali
  },
  {
    id: 6,
    name: "Hendra Wijaya",
    role: "Juragan Tambak",
    location: "Balikpapan",
    avatar: "/avatars/user-6.jpg",
    quote:
      "Arsa membantu saya memantau hasil panen tambak secara real-time. Bisnis jadi lebih efisien dan terkontrol.",
    cx: 355, cy: 155, // Kalimantan
  },
  {
    id: 7,
    name: "Fransiskus Pigai",
    role: "Kopi Papua Maju",
    location: "Jayapura",
    avatar: "/avatars/user-7.jpg",
    quote:
      "Aplikasi ini sangat user-friendly. Sangat membantu kami memasarkan kopi asli Papua ke pasar yang lebih luas.",
    cx: 715, cy: 145, // Papua
  },
];

export function TestimonialSection() {
  const [activeId, setActiveId] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false); // Disabled auto-play by default
  const scrollRef = useRef<HTMLDivElement>(null);

  // Center the map scroll on mount for mobile
  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const scrollPos = (scrollWidth - clientWidth) / 2;
      scrollRef.current.scrollLeft = scrollPos;
    }
  }, []);

  // Auto-cycle logic
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveId((current) => {
        const currentIndex = testimonials.findIndex((t) => t.id === current);
        const nextIndex = (currentIndex + 1) % testimonials.length;
        return testimonials[nextIndex].id;
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeTestimonial = testimonials.find((t) => t.id === activeId);

  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden font-sans relative">
      {/* Background Decor - Optimized (Static SVG or lighter blurs) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-100/50 rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-100/50 rounded-full mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-sans text-[#0D0E25] mb-4">
            Dipercaya Usaha di{" "}
            <span className="text-[#0F4C75] relative inline-block">
              Seluruh Indonesia
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#FF9600] opacity-60"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
          </h2>
          <p className="text-gray-500 text-lg font-medium font-sans max-w-xl mx-auto">
            Dari Sabang sampai Merauke, Arsa membantu ribuan UMKM naik kelas dengan teknologi pintar.
          </p>
        </div>

        {/* Map Container - Flex layout for mobile, Block/Absolute for desktop */}
        <div className="relative w-full flex flex-col md:block min-h-[500px] md:aspect-[2/1] md:h-[600px] group">

          {/* Stylized Map SVG & Hotspots Combined */}
          {/* Mobile: Scrollable horizontal container. Desktop: Absolute full container. */}
          <div ref={scrollRef} className="w-full overflow-x-auto md:overflow-visible h-[350px] md:h-full md:absolute md:inset-0 scrollbar-hide cursor-grab active:cursor-grabbing md:cursor-default">
            <div className="min-w-[900px] md:min-w-0 w-full h-full flex items-center justify-center md:scale-110 origin-center transition-transform duration-500 pb-0 md:pb-24">
              <svg viewBox="0 0 787 316" className="w-full h-full">
                {/* User's Map Image */}
                <image
                  href="/images/peta-indonesia.svg"
                  x="0"
                  y="0"
                  width="787"
                  height="316"
                  preserveAspectRatio="xMidYMid meet"
                />

                {/* Hotspots Rendered Inside SVG for perfect positioning */}
                {testimonials.map((t) => (
                  <g
                    key={t.id}
                    onClick={() => {
                      setActiveId(t.id);
                      setIsAutoPlaying(false);
                    }}
                    onMouseEnter={() => {
                      setActiveId(t.id);
                      setIsAutoPlaying(false);
                    }}
                    className="group/pin"
                    style={{ transformOrigin: `${t.cx}px ${t.cy}px` }}
                  >
                    {/* Pulse Effect */}
                    <circle
                      cx={t.cx} cy={t.cy} r="10"
                      className={`animate-ping opacity-75 ${activeId === t.id ? "fill-[#FF9600]" : "fill-[#0F4C75]"}`}
                      style={{
                        transformOrigin: `${t.cx}px ${t.cy}px`,
                        display: activeId === t.id ? 'block' : 'none',
                      }}
                    />

                    {/* Main Dot */}
                    <circle
                      cx={t.cx} cy={t.cy} r="6"
                      stroke="white" strokeWidth="2"
                      className={`transition-colors duration-300 ${activeId === t.id ? "fill-[#FF9600]" : "fill-[#0F4C75] group-hover/pin:fill-[#FF9600]"
                        }`}
                    />

                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Testimonial Card Display - Positioned Near Hotspot */}
          <div className="relative w-full md:absolute md:inset-0 pointer-events-none z-30 px-4 py-8 md:py-0">
            <AnimatePresence mode="wait">
              {activeTestimonial && (
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="hidden md:block absolute bg-white/95 backdrop-blur-md border border-gray-100/50 p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] max-w-xs w-full pointer-events-auto"
                  style={{
                    // Position card near the hotspot
                    // For far-right hotspots (>600), anchor to right edge; otherwise use left positioning
                    ...(activeTestimonial.cx > 600
                      ? { right: '5%', left: 'auto' }
                      : { left: `${Math.min((activeTestimonial.cx / 787) * 100, 70)}%` }
                    ),
                    top: `${(activeTestimonial.cy / 316) * 100}%`,
                    // Flip to left side if hotspot is on the right half
                    transform: activeTestimonial.cx > 400 ? 'translate(0, -50%)' : 'translate(20px, -50%)',
                  }}
                >
                  <div className="flex flex-col gap-3 items-start relative z-10">
                    {/* Header: Avatar + Info */}
                    <div className="flex items-center gap-3 w-full border-b border-gray-100 pb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0F4C75] to-[#0A3859] p-0.5 shadow-md shrink-0">
                        <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                          <span className="text-sm font-bold text-[#0F4C75]">{activeTestimonial.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#0F4C75] text-sm leading-tight truncate">{activeTestimonial.name}</h4>
                        <p className="text-[10px] font-medium text-gray-400 truncate">{activeTestimonial.role}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded-full shrink-0">
                        <MapPin className="w-2.5 h-2.5 text-[#FF9600]" />
                        <span className="text-[10px] font-bold text-[#FF9600] uppercase">{activeTestimonial.location}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-left w-full">
                      <p className="text-sm font-medium text-gray-700 leading-relaxed italic">
                        "{activeTestimonial.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Progress Indicator - only shows if auto playing (which is now off by default, but kept logic if needed) 
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-100 mt-6 md:mt-0">
                    <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear", repeat: 0 }}
                        key={activeTestimonial.id} // Re-run on id change
                        className="h-full bg-[#0F4C75]"
                    />
                  </div>
                  */}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Fallback Card (Below Map) */}
            {activeTestimonial && (
              <div className="md:hidden mt-4 bg-white/95 backdrop-blur-md border border-gray-100/50 p-5 rounded-2xl shadow-lg pointer-events-auto">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0F4C75] to-[#0A3859] p-0.5 shadow-md shrink-0">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <span className="text-sm font-bold text-[#0F4C75]">{activeTestimonial.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#0F4C75] text-sm truncate">{activeTestimonial.name}</h4>
                      <p className="text-xs text-gray-400 truncate">{activeTestimonial.role}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded-full">
                      <MapPin className="w-2.5 h-2.5 text-[#FF9600]" />
                      <span className="text-[10px] font-bold text-[#FF9600] uppercase">{activeTestimonial.location}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 italic">"{activeTestimonial.quote}"</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
