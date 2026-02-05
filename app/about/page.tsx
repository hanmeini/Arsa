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
  const [imageRevealed, setImageRevealed] = useState(false); // New state for persistent image swap

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
            color: 0xffffff,
            backgroundColor: 0x154885,
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
    <div className="min-h-screen bg-white font-sans">
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

      {/* Mission Section (Redesigned: Holographic Tech Frame) */}
      <section
        ref={missionRef}
        className="py-16 md:py-32 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0F4C75] text-xs font-bold tracking-widest uppercase mb-6">
                <Target className="w-3 h-3" />
                <span>Misi Utama</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#0D0E25] leading-tight">
                Membuka Potensi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4C75] to-[#0A70AB]">
                  Ekonomi Digital.
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light max-w-lg">
                Arsa hadir untuk menjembatani kesenjangan teknologi. Kami mengubah kompleksitas AI menjadi solusi sederhana yang bisa digunakan oleh siapa saja, dari warung kopi hingga manufaktur.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Demokratisasi AI", desc: "Teknologi canggih untuk semua skala bisnis.", Icon: Lightbulb },
                  { title: "Pemberdayaan UMKM", desc: "Alat bantu digital yang praktis & berdampak.", Icon: Users },
                  { title: "Inovasi Berkelanjutan", desc: "Selalu beradaptasi dengan tren masa depan.", Icon: Target },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="group relative rounded-2xl p-[1px] overflow-hidden bg-transparent"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.setProperty("--x", `${x}px`);
                      e.currentTarget.style.setProperty("--y", `${y}px`);
                    }}
                  >
                    {/* Static Border (Faint) */}
                    <div className="absolute inset-0 bg-gray-200 rounded-2xl z-0" />

                    {/* Spotlight Border (Blue, Cursor-following) */}
                    <div
                      className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(400px circle at var(--x, 0px) var(--y, 0px), #0F4C75 0%, transparent 60%)`
                      }}
                    />

                    {/* Card Content (Inner) */}
                    <div className="relative z-10 flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-md h-full transition-colors group-hover:bg-white/90">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0F4C75] shrink-0 group-hover:bg-[#0F4C75] group-hover:text-white transition-all duration-300 shadow-sm">
                        <item.Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0D0E25] text-lg mb-1 group-hover:text-[#0F4C75] transition-colors">{item.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Visual Side (Holographic Frame) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative lg:order-1"
            >
              <div className="relative p-2 md:p-4">
                {/* Tech Brackets */}
                <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 border-t-[4px] md:border-t-[6px] border-l-[4px] md:border-l-[6px] border-[#FE9600] rounded-tl-[2rem] md:rounded-tl-[3rem] z-20" />
                <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 border-b-[4px] md:border-b-[6px] border-r-[4px] md:border-r-[6px] border-[#0F4C75] rounded-br-[2rem] md:rounded-br-[3rem] z-20" />

                {/* Main Image Container */}
                <motion.div
                  className="relative h-[350px] md:h-[500px] w-full bg-gray-900 rounded-tl-[2rem] md:rounded-tl-[3rem] rounded-br-[2rem] md:rounded-br-[3rem] rounded-tr-lg rounded-bl-lg overflow-hidden group z-10"
                  onMouseEnter={() => setImageRevealed(!imageRevealed)}
                >
                  {/* Image 1: Default (Base) */}
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                    alt="Team Mission Base"
                    fill
                    className="object-cover opacity-90 transition-transform duration-700"
                  />

                  {/* Image 2: Hover (Spread Reveal) */}
                  <motion.div
                    className="absolute inset-0 z-10"
                    initial="initial"
                    animate={imageRevealed ? "hover" : "initial"}
                    variants={{
                      initial: { opacity: 0, scale: 1.05 }, // Simple crossfade with subtle zoom
                      hover: { opacity: 1, scale: 1 }
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Team Mission Reveal"
                      fill
                      className="object-cover"
                    />
                    {/* Overlay Gradient for 2nd Image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E25]/90 via-transparent to-transparent" />
                  </motion.div>

                  {/* Overlay Gradient (Base) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E25]/90 via-transparent to-transparent z-0" />

                  {/* HUD Title Elements (Z-Index increased to stay on top) */}
                  <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 z-30 pointer-events-none">
                    <h3 className="text-white text-xl md:text-3xl font-bold max-w-sm leading-tight drop-shadow-md">
                      Membangun Ekosistem Digital Masa Depan
                    </h3>
                    <div className="h-1 w-12 md:w-20 bg-[#FE9600] mt-3 md:mt-4 rounded-full" />
                  </div>


                </motion.div>

                {/* Decorative Background Blob */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-500/10 rounded-full blur-[80px]" />
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
          <div className="text-center mb-16 relative z-10">
            {/* Arsa Blue Soft Glow for Contrast */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[120%] bg-[#0F4C75]/50 blur-[80px] -z-10 rounded-full pointer-events-none" />

            <h2 className="text-3xl lg:text-4xl font-bold mb-4 drop-shadow-lg">
              Terhubung dengan UMKM di Seluruh Indonesia
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto font-light text-lg drop-shadow-md">
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
                top: "12%",
                left: "10%",
                delay: 0,
                image: "/images/makaroningehe.jpg",
                name: "Makaroni Ngehe",
              },
              {
                id: 10,
                top: "8%",
                left: "40%",
                delay: 1.0,
                image: "/images/bojot.png",
                name: "Bojot",
              },
              {
                id: 2,
                top: "10%",
                left: "82%",
                delay: 1.2,
                image: "/images/roti gembong.png",
                name: "Roti Gembong",
              },
              {
                id: 3,
                top: "38%",
                left: "20%",
                delay: 0.5,
                image: "/images/kopi kenangan.jpg",
                name: "Kopi Kenangan",
              },
              {
                id: 4,
                top: "42%",
                left: "60%",
                delay: 2.1,
                image: "/images/janji jiw.png",
                name: "Janji Jiwa",
              },
              {
                id: 12,
                top: "45%",
                left: "85%",
                delay: 1.6,
                image: "/images/bakpiapathok.png",
                name: "Bakpia 25",
              },
              {
                id: 11,
                top: "68%",
                left: "40%",
                delay: 2.2,
                image: "/images/dkriuk.jpg",
                name: "Dkriuk",
              },
              {
                id: 5,
                top: "80%",
                left: "15%",
                delay: 1.5,
                image:
                  "/images/es-teh-nusantara-logo-png_seeklogo-438137-removebg-preview.png",
                name: "Es Teh Nusantara",
              },
              {
                id: 6,
                top: "85%",
                left: "78%",
                delay: 0.8,
                image: "/images/du anyam.png",
                name: "Du Anyam",
              },
            ].map((item, i) => (
              <motion.div
                key={item.id}
                className="absolute w-14 h-14 md:w-20 md:h-20 flex items-center justify-center perspective-[1000px] z-20 group"
                style={{ top: item.top, left: item.left }}
                animate={{
                  y: [-12, 12, -12], // Smooth levitation
                  rotate: [-3, 3, -3], // Subtle swaying
                }}
                transition={{
                  duration: 5 + (i % 4), // Slower, more organic duration
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
              >
                {/* 3D Tilting Logo Container */}
                <div className="relative w-full h-full p-3 bg-white backdrop-blur-sm rounded-full shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-x-[25deg] group-hover:scale-95 group-hover:shadow-[0_20px_30px_rgba(0,0,0,0.15)] transform-style-3d">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`Mitra UMKM ${item.id}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Holographic HUD Tooltip (High Contrast) */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom rotate-x-90 group-hover:rotate-x-0 pointer-events-none z-30">
                  {/* White Glass Tag */}
                  <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.4)] flex flex-col items-center">
                    <span className="text-[10px] md:text-xs font-bold text-[#0F4C75] tracking-widest uppercase whitespace-nowrap">
                      {item.name}
                    </span>
                    {/* Decorative micro-line */}
                    <div className="w-1/2 h-[2px] bg-[#FE9600] mt-1 rounded-full" />
                  </div>

                  {/* Hologram Beam Connector */}
                  <div className="w-[1px] h-4 bg-gradient-to-b from-white/80 to-transparent" />
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
