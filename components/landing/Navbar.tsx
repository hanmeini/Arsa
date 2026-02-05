"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Arsa", href: "/about" },
  { name: "Showcase", href: "/showcase" },
  { name: "Harga", href: "/pricing" },
  { name: "Kontak", href: "/contact" },
];

interface NavbarProps {
  visible?: boolean;
}

export function Navbar({ visible = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname = usePathname();
  const isShowcase = pathname?.startsWith("/showcase");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 20;
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{
          width: "100%",
          top: 0,
          borderRadius: 0,
          backgroundColor: "rgba(255, 255, 255, 0)",
          border: "1px solid rgba(255, 255, 255, 0)",
          maxWidth: "100%",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
        }}
        animate={{
          y: visible ? 0 : -200,
          opacity: visible ? 1 : 0,

          // Responsive Logic
          width: isMobile ? "100%" : (scrolled || mobileMenuOpen ? "92%" : "100%"),
          top: isMobile ? 0 : (scrolled || mobileMenuOpen ? 24 : 0),
          borderRadius: isMobile ? "0px" : (scrolled || mobileMenuOpen ? "9999px" : "0px"),

          // Mobile: Always White. Desktop: Transparent -> White
          backgroundColor: isMobile
            ? "rgba(255, 255, 255, 1)"
            : (scrolled || mobileMenuOpen ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)"),

          border: isMobile
            ? "1px solid rgba(0, 0, 0, 0)" // No border on mobile
            : (scrolled || mobileMenuOpen ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(255, 255, 255, 0)"),

          maxWidth: isMobile ? "100%" : (scrolled || mobileMenuOpen ? "62rem" : "100%"),
          paddingTop: isMobile ? "1rem" : (scrolled || mobileMenuOpen ? "1rem" : "2rem"),
          paddingBottom: isMobile ? "1rem" : (scrolled || mobileMenuOpen ? "1rem" : "2rem"),
        }}
        transition={{ duration: isMobile ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-50 font-sans",
          scrolled || mobileMenuOpen || isMobile ? "shadow-xl py-3" : "py-4 md:py-6" // Changed shadow-sm to shadow-xl
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 relative h-full flex flex-col justify-center">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group relative z-10 transition-transform hover:scale-105">
              <Image
                src="/icons/logo.svg"
                alt="Arsa Logo"
                width={100}
                height={32}
                className={cn(
                  "h-8 w-auto transition-all duration-300",
                  isShowcase && !scrolled && !mobileMenuOpen ? "brightness-0 invert group-hover:brightness-100 group-hover:invert-0" : ""
                )}
              />
            </Link>

            {/* Centered Navigation (Desktop) - Sliding Pill */}
            <div
              className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
              onMouseLeave={() => setHoveredPath(null)}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-full", // Reduced padding px-4 -> px-3
                      isActive
                        ? "text-gray-900"
                        : isShowcase && !scrolled ? "text-white hover:text-gray-900" : "text-gray-600 hover:text-gray-900"
                    )}
                    onMouseEnter={() => setHoveredPath(link.href)}
                  >
                    {link.name}
                    {hoveredPath === link.href && (
                      <motion.div
                        className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                        layoutId="navbar-hover"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    {isActive && !hoveredPath && (
                      <div className="absolute inset-0 bg-gray-100/50 rounded-full -z-10" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions (Desktop) */}
            <div className="hidden md:flex items-center gap-4 relative z-10">
              <Link
                href="/register"
                className={cn(
                  "font-medium text-sm transition-colors",
                  isShowcase && !scrolled ? "text-white hover:text-white/80" : "text-gray-900 hover:text-gray-600"
                )}
              >
                Daftar
              </Link>
              <Link
                href="/login"
                className="bg-[var(--accent)] text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md shadow-amber-500/20 flex items-center gap-2 group/btn relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Coba Gratis <Rocket className="w-4 h-4" />
                </span>
                <div className="absolute top-0 -left-[100%] w-full h-full group-hover/btn:left-[100%] transition-all duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  mobileMenuOpen ? "bg-gray-100 text-gray-900" : isShowcase && !scrolled ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"
                )}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown (Floating below the pill) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-2 mx-3 p-5 bg-white rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden md:hidden ring-1 ring-black/5"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-5 py-3.5 rounded-2xl text-[1rem] font-semibold transition-all duration-200 flex items-center justify-between group",
                      pathname === link.href
                        ? "bg-amber-50 text-amber-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2" />
                    )}
                  </Link>
                ))}

                <div className="h-px bg-gray-100 my-3" />

                <div className="flex flex-col gap-3 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3.5 rounded-xl text-[1rem] font-bold text-center bg-[#FE8B1D] text-white transition-transform active:scale-[0.98] shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                  >
                    Coba Gratis
                    <Rocket className="w-4 h-4 text-white/90" />
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 rounded-xl text-[0.95rem] font-semibold text-center text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Punya akun? <span className="text-gray-900 font-bold ml-1">Masuk</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
