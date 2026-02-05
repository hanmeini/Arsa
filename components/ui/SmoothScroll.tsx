"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { usePathname } from "next/navigation"; // Add import

export const SmoothScroll = () => {
  const pathname = usePathname(); // Get pathname

  useEffect(() => {
    // Disable smooth scroll on chat page to allow native div scrolling
    if (pathname === "/chat") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Synchronize Lenis scroll with GSAP's ScrollTrigger
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Event listener for custom scroll lock event
    const handleScrollLock = (e: CustomEvent) => {
      if (e.detail?.locked) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    window.addEventListener("toggle-scroll-lock" as any, handleScrollLock);

    return () => {
      window.removeEventListener("toggle-scroll-lock" as any, handleScrollLock);
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, [pathname]); // Re-run effect when pathname changes

  return null;
};
