"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import Image from "next/image";
import { CheckCircle, Users, Lightbulb, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Add types for Vanta
declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export default function AboutPage() {
  const visionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);
  const [vantaVision, setVantaVision] = useState<any>(null);
  const [vantaMission, setVantaMission] = useState<any>(null);
  const [vantaConnect, setVantaConnect] = useState<any>(null);
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [vantaGlobeLoaded, setVantaGlobeLoaded] = useState(false);
  const [vantaDotsLoaded, setVantaDotsLoaded] = useState(false);
  const [vantaNetLoaded, setVantaNetLoaded] = useState(false);

  useEffect(() => {
    // Only initialize if libs are loaded
    if (
      !threeLoaded ||
      !vantaGlobeLoaded ||
      !vantaDotsLoaded ||
      !vantaNetLoaded ||
      !window.VANTA
    )
      return;

    const cleanup = () => {
      if (vantaVision) vantaVision.destroy();
      if (vantaMission) vantaMission.destroy();
      if (vantaConnect) vantaConnect.destroy();
      setVantaVision(null);
      setVantaMission(null);
      setVantaConnect(null);
    };

    try {
      // Initialize Vision Vanta (Globe) for unified Hero + Vision section
      if (!vantaVision && visionRef.current) {
        setVantaVision(
          window.VANTA.GLOBE({
            el: visionRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xffbd3f,
            backgroundColor: 0xfcfcfc,
            THREE: window.THREE, // Pass THREE explicitly
          }),
        );
      }

      // Initialize Mission Vanta (Dots)
      if (!vantaMission && missionRef.current) {
        setVantaMission(
          window.VANTA.DOTS({
            el: missionRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xff8820, // Updated color per user request
            color2: 0xffffff,
            backgroundColor: 0xffffff,
            THREE: window.THREE,
          }),
        );
      }
      // Initialize Connect Vanta (Net)
      if (!vantaConnect && connectRef.current) {
        setVantaConnect(
          window.VANTA.NET({
            el: connectRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xff623f,
            backgroundColor: 0x101324,
            THREE: window.THREE,
          }),
        );
      }
    } catch (error) {
      console.error("[VANTA] Init error", error);
    }

    return cleanup;
  }, [threeLoaded, vantaGlobeLoaded, vantaDotsLoaded, vantaNetLoaded]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Load Scripts sequentially */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          setThreeLoaded(true);
          console.log("THREE Loaded");
        }}
        onError={(e) => console.error("THREE load failed", e)}
      />

      {threeLoaded && (
        <>
          <Script
            src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"
            strategy="afterInteractive"
            onLoad={() => setVantaGlobeLoaded(true)}
          />
          <Script
            src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js"
            strategy="afterInteractive"
            onLoad={() => setVantaDotsLoaded(true)}
          />
          <Script
            src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
            strategy="afterInteractive"
            onLoad={() => setVantaNetLoaded(true)}
          />
        </>
      )}

      {/* Unified Hero & Vision Section (Ref is here for Vanta Background) */}
      <section
        ref={visionRef}
        className="pt-32 pb-24 relative overflow-hidden min-h-[90vh] flex flex-col justify-center"
      >
        {/* Original Blurry Blobs (Kept but might be covered by Vanta, optional) */}
        {/* Note: Vanta might cover specific backgrounds if backgroundColor is set. 
            If the user wants these blobs visible, we'd need Vanta transparent or mix-blend modes.
            For now, keeping them in DOM as requested but Vanta sits on top usually. 
            Moving them inside creates better flow if Vanta is transparent.
            But Vanta Globe usually needs a BG color.
        */}

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0D0E25] mb-6 leading-tight"
          >
            Tentang{" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#0A70AB] to-[#FE8B1D]">
              Arsa
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Membangun masa depan bisnis melalui kecerdasan buatan, satu inovasi
            pada satu waktu. Kami percaya setiap UMKM berhak sukses.
          </motion.p>
        </div>

        {/* Vision Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0D0E25] mb-6">
                Visi Kami
              </h2>
              <p className="text-lg text-[#0D0E25]/80 leading-relaxed mb-6 font-light">
                Menjadi platform teknologi terbesar yang menghubungkan dan
                memberdayakan jutaan UMKM di seluruh dunia, menciptakan
                ekosistem bisnis yang inklusif, efisien, dan berkelanjutan.
              </p>
              <p className="text-lg text-[#0D0E25]/80 leading-relaxed font-light">
                Kami membayangkan dunia di mana setiap pengusaha, tidak peduli
                seberapa kecil, memiliki akses ke alat kelas dunia untuk
                mewujudkan impian mereka.
              </p>
            </motion.div>

            {/* Spacer for Vanta Globe visual on the right */}
            <div className="h-[400px] lg:h-auto" />
          </div>
        </div>
      </section>

      {/* Mission Section (Modified with Vanta Dots and White Theme) */}
      <section
        ref={missionRef}
        className="py-24 relative overflow-hidden text-[#0D0E25]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:order-2"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#0D0E25]">
                Misi Kami
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
                Arsa lahir dari keinginan sederhana: meratakan akses teknologi
                canggih bagi semua pelaku usaha. Kami melihat banyak potensi
                UMKM yang terhambat karena kurangnya alat yang tepat.
              </p>

              <div className="space-y-4">
                {[
                  "Demokratisasi Teknologi AI",
                  "Pemberdayaan UMKM Indonesia",
                  "Inovasi Berkelanjutan",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-[#0F4C75] w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-[#0D0E25]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative lg:order-1"
            >
              <div className="relative h-[400px] w-full bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Team Working"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-[#0F4C75]/20 mix-blend-overlay" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Connection with MSMEs Section (New with Vanta Net) */}
      <section
        ref={connectRef}
        className="py-24 relative overflow-hidden text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Terhubung dengan UMKM di Seluruh Indonesia
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto font-light text-lg">
              Kami bangga menjadi bagian dari perjalanan sukses ribuan pengusaha
              di seluruh Indonesia.
            </p>
          </div>

          {/* Container for Floating Logos */}
          <div className="relative h-[600px] w-full max-w-7xl mx-auto">
            {/* 
               PANDUAN MENGGANTI GAMBAR LOKAL:
               1. Siapkan logo Anda (misal: logo1.png, logo2.png) di folder public/images/
               2. Ganti link placeholder di bawah dengan path gambar Anda (contoh: "/images/logo1.png")
               3. Atau jika menggunakan import: 
                  - import logo1 from "@/assets/logo1.png";
                  - ganti string url dengan variable logo1
            */}
            {[
              {
                id: 1,
                top: "10%",
                left: "10%",
                delay: 0,
                image: "/images/tiebymin.png",
              },
              {
                id: 2,
                top: "15%",
                left: "80%",
                delay: 1.2,
                image: "/images/roti gembong.png",
              },
              {
                id: 3,
                top: "35%",
                left: "20%",
                delay: 0.5,
                image: "/images/kopi kenangan.jpg",
              },
              {
                id: 4,
                top: "40%",
                left: "70%",
                delay: 2.1,
                image: "/images/janji jiw.png",
              },
              {
                id: 5,
                top: "60%",
                left: "15%",
                delay: 1.5,
                image: "/images/es-teh-nusantara-logo-png_seeklogo-438137-removebg-preview.png",
              },
              {
                id: 6,
                top: "65%",
                left: "85%",
                delay: 0.8,
                image: "/images/du anyam.png",
              },
              {
                id: 7,
                top: "25%",
                left: "50%",
                delay: 1.8,
                image: "/images/Screen-Shot-2019-11-05-at-12.23.08-1024x962-removebg-preview.png",
              },
              {
                id: 8,
                top: "80%",
                left: "40%",
                delay: 2.5,
                image: "/images/",
              },
              {
                id: 9,
                top: "75%",
                left: "60%",
                delay: 0.3,
                image: "https://placehold.co/100x100/101324/FFFFFF?text=Logo+9",
              },
              {
                id: 10,
                top: "10%",
                left: "40%",
                delay: 1.0,
                image:
                  "https://placehold.co/100x100/101324/FFFFFF?text=Logo+10",
              },
              {
                id: 11,
                top: "50%",
                left: "5%",
                delay: 2.2,
                image:
                  "https://placehold.co/100x100/101324/FFFFFF?text=Logo+11",
              },
              {
                id: 12,
                top: "50%",
                left: "90%",
                delay: 1.6,
                image:
                  "https://placehold.co/100x100/101324/FFFFFF?text=Logo+12",
              },
            ].map((item, i) => (
              <motion.div
                key={item.id}
                // Removed bg-white/10, backdrop-blur, border, shadow to support transparent logos
                className="absolute w-24 h-24 flex items-center justify-center p-2"
                style={{ top: item.top, left: item.left }}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1], // Pulse animation preserved
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={item.image} // Menggunakan gambar dari konfigurasi array di atas
                    alt={`Mitra UMKM ${item.id}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
