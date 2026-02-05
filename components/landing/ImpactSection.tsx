"use client";

import { motion, useSpring, useTransform, useInView, useVelocity, useMotionTemplate, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function RollingNumber({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 20 });
  const velocity = useVelocity(spring);
  const blurAmount = useTransform(velocity, [-500, 0, 500], [4, 0, 4], { clamp: true });
  const filter = useMotionTemplate`blur(${blurAmount}px)`;

  const display = useTransform(spring, (current) => {
    // If it's a number like 1.200, we want to format it with dots
    return Math.round(current).toLocaleString("id-ID");
  });

  useEffect(() => {
    if (isInView) {
      // Extract number: "1.200+" -> 1200
      const numericValue = parseInt(value.replace(/\./g, "").replace(/\D/g, ""));
      if (!isNaN(numericValue)) {
        spring.set(numericValue);
      }
    }
  }, [isInView, value, spring]);

  // Split value into number part and suffix (e.g., "+" or "/7")
  const match = value.match(/^([\d\.]+)(.*)$/);
  if (!match) return <span>{value}</span>;

  const [, , suffix] = match;

  // Special case for 24/7 -> just render static or it might be parsed as 24
  if (value.includes("/")) return <span>{value}</span>;

  return (
    <span ref={ref} className="inline-flex items-baseline overflow-hidden">
      <motion.span style={{ filter }}>{display}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

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

const companies = [
  {
    name: "Kopi Janji Jiwa",
    logo: "/images/du anyam.png",
  },
  {
    name: "Haus!",
    logo: "/images/es-teh-nusantara-logo-png_seeklogo-438137-removebg-preview.png",
  },
  {
    name: "Kebab Turki Baba Rafi",
    logo: "/images/janji jiw.png",
  },
  {
    name: "Sabana",
    logo: "/images/du anyam.png",
  },
  {
    name: "Teh Poci",
    logo: "/images/kopi kenangan.jpg",
  },
  {
    name: "Geprek Bensu",
    logo: "/images/du anyam.png",
  },
  {
    name: "Fore Coffee",
    logo: "/images/roti gembong.png",
  },
  {
    name: "Ngikan",
    logo: "/images/du anyam.png",
  },
  {
    name: "Tahu Jeletot",
    logo: "/images/tiebymin.png",
  },
  {
    name: "Bebek Kaleyo",
    logo: "/images/jus-semangka.png",
  },
];

export function ImpactSection() {
  const [isHovered, setIsHovered] = useState(false);
  const progress = useMotionValue(0);
  const x = useTransform(progress, (v) => `${-v}%`);

  useAnimationFrame((time, delta) => {
    const baseSpeed = 50 / 45; // 50% over 45 seconds (approx 1.11%/sec)
    const hoverSpeed = 50 / 200; // Slow down factor (approx 4x slower)

    const currentSpeed = isHovered ? hoverSpeed : baseSpeed;

    let newProgress = progress.get() + currentSpeed * (delta / 1000);
    if (newProgress >= 50) {
      newProgress %= 50;
    }
    progress.set(newProgress);
  });

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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light font-sans text-[#0D0E25] leading-tight mb-2">
              Dampak Nyata
              <br />
              <span className="relative inline-block mt-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0A70AB] to-[#FE8B1D] font-semibold">
                  Arsa
                </span>
                <span className="absolute -bottom-2 left-0 w-1/2 h-[3px] bg-gradient-to-r from-[#0A70AB] to-[#FE8B1D] rounded-full"></span>
              </span>
            </h2>
            <p className="mt-6 text-gray-500 text-lg font-light font-sans leading-relaxed max-w-sm">
              Kami berkomitmen untuk mendorong pertumbuhan bisnis Anda melalui
              teknologi yang tepat guna.
            </p>
          </motion.div>

          {/* Right Cards */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl p-[1px] overflow-hidden bg-gray-100" // Outer container for border
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty("--x", `${x}px`);
                  e.currentTarget.style.setProperty("--y", `${y}px`);
                }}
              >
                {/* Spotlight Border Layer */}
                <div
                  className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(500px circle at var(--x, 0px) var(--y, 0px), #0F4C75 0%, #ffffff 40%, transparent 80%)`
                  }}
                />



                {/* Content Container (Inner Bg) */}
                <div className="relative z-10 bg-white rounded-2xl p-8 h-full min-h-[200px] flex flex-col justify-center overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAFAFA] rounded-full -mr-16 -mt-16 transition-transform duration-700 ease-out" />

                  <div className="relative z-10">
                    <h3 className="text-4xl md:text-5xl font-light font-sans text-[#0F4C75] mb-2 tracking-tight transition-transform duration-300 origin-left">
                      <RollingNumber value={stat.number} />
                    </h3>
                    <p className="text-lg font-medium font-sans text-[#0D0E25] mb-2">
                      {stat.label}
                    </p>
                    <p className="text-gray-500 text-sm font-light font-sans leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Company Logos Slider */}
        <div className="mt-20 border-t border-gray-100 pt-16">
          <p className="text-center text-gray-500 text-lg font-medium font-sans mb-10">
            Dipercaya oleh 1000+ UMKM di seluruh Indonesia
          </p>

          <div
            className="relative w-full overflow-hidden mask-linear-fade"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex overflow-hidden">
              <motion.div
                style={{ x }}
                className="flex gap-12 sm:gap-16 md:gap-20 whitespace-nowrap pr-12 sm:pr-16 md:pr-20"
              >
                {[...companies, ...companies].map((company, index) => (
                  <div
                    key={index}
                    className="relative w-32 h-12 md:w-40 md:h-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                  >
                    <Image
                      src={company.logo}
                      alt={company.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
