"use client";

import localFont from "next/font/local";
import { motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const modernNegra = localFont({
  src: "../../public/fonts/Modern Negra Demo.ttf",
  variable: "--font-modern-negra",
});

export default function ShowcasePage() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const poweredByRef = useRef<HTMLElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textsRef = useRef<(HTMLDivElement | null)[]>([]);
  const leftIconRef = useRef<HTMLDivElement>(null);
  const rightIconRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const video = videoRef.current;
    if (!video || !containerRef.current) return;

    // Navbar Visibility Trigger
    if (poweredByRef.current) {
      ScrollTrigger.create({
        trigger: poweredByRef.current,
        start: "top 80%", // Show slightly before it fully enters
        onEnter: () => setIsNavbarVisible(true),
        onLeaveBack: () => setIsNavbarVisible(false),
      });
    }

    const setupAnimation = () => {
      // Main Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // Reduced from 1.5 for more responsive scrubbing
        },
      });

      // Check for mobile
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      // 1. Video Behavior
      if (!isMobile) {
        // Desktop: Scrubbing (Link video time to scroll)
        tl.to(
          video,
          {
            currentTime: video.duration || 10,
            ease: "none",
            duration: 10, // Sync with text timeline
          },
          0,
        );
      } else {
        // Mobile: Autoplay loop (Smooth performance, no scrubbing cost)
        video.loop = true;
        video.play().catch(() => { });
      }

      // 2. Text Animations (Sequenced - Centered)
      const texts = textsRef.current;

      // Text 1: MOKAMISHU
      if (texts[0]) {
        // Scrolls up continuously until off-screen (Mentok ke atas)
        tl.to(texts[0], { y: -3500, ease: "none", duration: 10 }, 0);
      }

      // Description Texts Animation (Matches MOKAMISHU)
      if (leftTextRef.current) {
        tl.to(leftTextRef.current, { y: -3500, ease: "none", duration: 10 }, 0);
      }
      if (rightTextRef.current) {
        tl.to(
          rightTextRef.current,
          { y: -3500, ease: "none", duration: 10 },
          0,
        );
      }

      // Text 2: The Essence
      if (texts[1]) {
        tl.fromTo(
          texts[1],
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
          1.5,
        ).to(texts[1], { opacity: 0, y: -50, duration: 1 }, 3.5);
      }

      // Text 3: Velvet Texture
      if (texts[2]) {
        tl.fromTo(
          texts[2],
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1 },
          4.5,
        ).to(texts[2], { opacity: 0, scale: 1.1, duration: 1 }, 6);
      }

      // Text 4: Outro
      if (texts[3]) {
        tl.fromTo(
          texts[3],
          { opacity: 0, filter: "blur(10px)" },
          { opacity: 1, filter: "blur(0px)", duration: 1 },
          7,
        );
        // Fade out at the very end to clean up before footer reveal
        tl.to(texts[3], { opacity: 0, duration: 0.5 }, 9.5);
      }

      // 3. Floating Icons Animation (Parallax - Simulate Normal Scroll)
      // Differential Scroll: Right moves faster than Left, both move UP.
      if (leftIconRef.current) {
        tl.to(
          leftIconRef.current,
          { y: -3000, rotation: -20, ease: "none", duration: 10 },
          0,
        );
      }
      if (rightIconRef.current) {
        tl.fromTo(
          rightIconRef.current,
          { y: 100 },
          { y: -4500, rotation: 20, ease: "none", duration: 10 },
          0,
        );
      }
    };

    if (video) {
      // Prepare video
      video.pause();
      video.preload = "auto";

      if (video.readyState >= 1) {
        setupAnimation();
        ScrollTrigger.refresh();
      } else {
        video.onloadedmetadata = () => setupAnimation();
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Re-structure: I will just inject the state and ref, and the trigger logic inside the existing useEffect for simplicity, 
  // or a new useEffect. A new useEffect is safer to avoid conflict with the return cleanup if not careful.

  // Let's try to edit the COMPONENT START and the NAVBAR usage first.

  // Wait, replace_file_content is better for contiguous blocks. 
  // I will add state top level, and update Navbar usage.

  // Re-structure: Helper to add refs
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !textsRef.current.includes(el)) {
      textsRef.current.push(el);
    }
  };
  textsRef.current = []; // Reset on re-render to ensure fresh list

  return (
    <main className="w-full relative">
      <Navbar visible={isNavbarVisible} />


      {/* Fixed Background Layer (Video & Content) */}
      <div
        className="fixed inset-0 h-screen w-full bg-black overflow-hidden flex items-center justify-center font-sans z-0"
      >
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dzp6gu46f/video/upload/v1769152622/Chocolate_Drink_Product_Video_scrub_mzgc16.mp4"
          playsInline
          muted
          preload="auto"
          className="w-full h-full object-cover"
        />

        {/* Text Overlays Layer */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Text 1: MOKAMISHU (New Start) */}
          <div ref={addToRefs} className="absolute text-center px-4 top-[20%]">
            <h1
              className={`${modernNegra.className} text-6xl md:text-9xl font-semibold tracking-[0em] scale-y-[1.25] origin-center bg-gradient-to-b from-white via-gray-300 to-gray-600 text-transparent bg-clip-text drop-shadow-2xl opacity-100 uppercase`}
            >
              MOKAMISHU
            </h1>
          </div>

          {/* Text 2 */}
          <div ref={addToRefs} className="absolute text-center px-4 opacity-0">
            <h1 className="text-4xl md:text-7xl font-semibold text-white tracking-tight drop-shadow-lg">
              Esensi dari <br />
              Cokelat Murni
            </h1>
            <p className="text-white/80 mt-4 text-xl font-light tracking-widest uppercase">
              Koleksi Premium
            </p>
          </div>

          {/* Text 3 */}
          <div ref={addToRefs} className="absolute text-center px-4 opacity-0">
            <h2 className="text-4xl md:text-7xl font-semibold text-white tracking-tight drop-shadow-lg">
              Tekstur Lembut.
            </h2>
            <p className="text-gray-300 mt-2 text-2xl font-light italic">
              Kelembutan tak tertandingi di setiap tegukan.
            </p>
          </div>

          {/* Text 4 */}
          <div ref={addToRefs} className="absolute text-center px-4 opacity-0">
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter mix-blend-overlay">
              TASTE IT
            </h2>
            <button className="mt-8 px-8 py-4 bg-white text-[#363B43] rounded-full font-bold text-lg hover:scale-105 transition-transform pointer-events-auto">
              Pesan Sekarang
            </button>
          </div>
        </div>

        {/* Floating Icons & Text */}
        <div
          ref={leftIconRef}
          className="absolute -left-24 md:-left-10 top-[15%] w-48 h-48 md:w-80 md:h-80 opacity-90 pointer-events-none mix-blend-normal z-0"
        >
          <img
            src="/icons/cocktail-left-leaf.png"
            alt="Leaf Left"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Left Description Text */}
        <div
          ref={leftTextRef}
          className="absolute left-4 bottom-[45%] md:bottom-[20%] md:left-20 text-left pointer-events-none z-10 max-w-[200px] md:max-w-xs"
        >
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">
            Sejuk. Segar. Klasik.
          </p>
          <h3
            className={`${modernNegra.className} text-4xl text-white leading-tight`}
          >
            Kaya <br /> Lembut <br /> Murni
          </h3>
        </div>

        <div
          ref={rightIconRef}
          className="absolute -right-24 md:-right-10 top-[15%] w-56 h-56 md:w-96 md:h-96 opacity-90 pointer-events-none mix-blend-normal z-0"
        >
          <img
            src="/icons/cocktail-right-leaf.png"
            alt="Leaf Right"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right Description Text */}
        <div
          ref={rightTextRef}
          className="absolute right-4 bottom-[10%] md:bottom-[20%] md:right-20 text-right pointer-events-none z-10 max-w-[200px] md:max-w-xs"
        >
          <p className="text-gray-300 text-lg font-light leading-relaxed">
            Dibuat dari biji Ghana pilihan single-origin, menawarkan simfoni
            rasa kakao yang dalam dan sentuhan akhir yang lembut.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 mt-4 text-white hover:text-amber-500 transition-colors pointer-events-auto group"
          >
            <span className="text-sm font-bold uppercase tracking-widest">
              Lihat Detail
            </span>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </div>

        {/* Scroll Indicator */}

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-70">
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/50">
            Scroll to Explore
          </span>
          <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-white to-transparent"
            />
          </div>
        </div>
      </div>

      {/* Scroll Spacer to drive animation */}
      <div ref={containerRef} className="relative z-10 w-full pointer-events-none" style={{ height: '400vh' }}></div>

      <section ref={poweredByRef} className="relative z-20 bg-white py-32 px-4 text-center shadow-2xl -mt-32">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">
            Showcase Teknologi
          </p>
          <h2 className="text-5xl md:text-7xl font-medium text-[#363B43] tracking-tighter mb-6" style={{ fontFamily: 'var(--font-guton)' }}>
            Ditenagai oleh{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0A70AB] to-[#FE8B1D]">
              Arsa
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-guton)' }}>
            Tampilan di atas adalah contoh showcase produk imersif yang dibangun
            menggunakan mesin web Arsa.
          </p>
          <div className="pt-8">
            <a
              href="/register"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 transform bg-[#FE8B1D] rounded-full shadow-xl overflow-hidden"
              style={{ fontFamily: 'var(--font-guton)' }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                btn.style.setProperty("--x", `${x}px`);
                btn.style.setProperty("--y", `${y}px`);
              }}
            >
              <span className="relative z-10 flex items-center gap-2 pointer-events-none">
                Mulai Sekarang
              </span>
              {/* Ripple Effect */}
              <span
                className="absolute w-0 h-0 bg-[#0F4C75] rounded-full transition-all duration-700 ease-out group-hover:w-[450px] group-hover:h-[450px]"
                style={{
                  left: "var(--x)",
                  top: "var(--y)",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </main>
  );
}
