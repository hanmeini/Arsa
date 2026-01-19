"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function ShowcasePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const video = videoRef.current;
    if (!video || !containerRef.current) return;

    const setupAnimation = () => {
      // Main Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=10000", // Balanced length
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Video Scrubbing
      tl.to(
        video,
        {
          currentTime: video.duration || 10,
          ease: "none",
          duration: 10, // Sync with text timeline (total ~8-9s)
        },
        0,
      );

      // 2. Text Animations (Sequenced - Centered)
      const texts = textsRef.current;

      // Text 1: Intro
      if (texts[0]) {
        tl.fromTo(
          texts[0],
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.5 },
          0,
        ).to(texts[0], { opacity: 0, y: -50, duration: 0.5 }, 1.5);
      }

      // Text 2: Middle Feature
      if (texts[1]) {
        tl.fromTo(
          texts[1],
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5 },
          2.5,
        ).to(texts[1], { opacity: 0, scale: 1.1, duration: 0.5 }, 4);
      }

      // Text 3: Outro
      if (texts[2]) {
        tl.fromTo(
          texts[2],
          { opacity: 0, filter: "blur(10px)" },
          { opacity: 1, filter: "blur(0px)", duration: 1 },
          6,
        );
      }
    };

    if (video) {
      // Prepare video
      video.pause();
      video.preload = "auto";

      if (video.readyState >= 1) {
        setupAnimation();
      } else {
        video.onloadedmetadata = () => setupAnimation();
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !textsRef.current.includes(el)) {
      textsRef.current.push(el);
    }
  };
  textsRef.current = [];

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <div
        ref={containerRef}
        className="h-screen w-full bg-black overflow-hidden relative flex items-center justify-center font-sans"
      >
        <video
          ref={videoRef}
          src="/animations/Chocolate_Drink_Product_Video_scrub.mp4"
          playsInline
          muted
          className="w-full h-full object-cover will-change-transform"
        />

        {/* Text Overlays Layer */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Text 1 */}
          <div ref={addToRefs} className="absolute text-center px-4">
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter drop-shadow-2xl">
              The Essence of <br />
              <span className="text-amber-500">Pure Chocolate</span>
            </h1>
            <p className="text-white/80 mt-4 text-xl font-light tracking-widest uppercase">
              Premium Collection
            </p>
          </div>

          {/* Text 2 */}
          <div ref={addToRefs} className="absolute text-center px-4 opacity-0">
            <h2 className="text-4xl md:text-7xl font-semibold text-white tracking-tight drop-shadow-lg">
              Velvet Texture.
            </h2>
            <p className="text-gray-300 mt-2 text-2xl font-light italic">
              Unmatched smoothness in every sip.
            </p>
          </div>

          {/* Text 3 */}
          <div ref={addToRefs} className="absolute text-center px-4 opacity-0">
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter mix-blend-overlay">
              TASTE IT
            </h2>
            <button className="mt-8 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform pointer-events-auto">
              Order Now
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">
            Scroll to Explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>

      <section className="bg-white py-32 px-4 text-center border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">
            Showcase Teknologi
          </p>
          <h2 className="text-5xl md:text-7xl font-medium text-black tracking-tighter mb-6">
            Ditenagai oleh{" "}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0A70AB] to-[#FE8B1D]">
                Arsa
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-[6px] bg-gradient-to-r from-[#0A70AB] to-[#FE8B1D] rounded-full"></span>
            </span>
            .
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Tampilan di atas adalah contoh showcase produk imersif yang dibangun
            menggunakan mesin web Arsa.
          </p>
          <div className="pt-8">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all transform bg-[#FE8B1D] rounded-full hover:scale-105 hover:bg-[#e47207] shadow-xl"
            >
              Mulai Sekarang
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white pb-24">
        <Footer />
      </div>
    </main>
  );
}
