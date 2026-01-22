"use client";

import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import {
  Mail,
  Lock,
  Loader2,
  Chrome,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  // Carousel Data
  const slides = [
    {
      id: 1,
      image: "/icons/mascot-1.svg",
      title: "Kelola Bisnis Lebih Cepat",
      description:
        "Otomatisasi proses bisnis dan tingkatkan performa toko Anda secara efisien",
    },
    {
      id: 2,
      image: "/icons/mascot-2.svg",
      title: "E-Commerce Berbasis AI",
      description:
        "Buat konten, kelola stok, dan pantau penjualan hanya dalam satu sistem.",
    },
    {
      id: 3,
      image: "/icons/mascot-3.svg",
      title: "Mulai Kelola Bisnis Anda Sekarang",
      description: "Semua alat penting tersedia dalam satu platform.",
    },
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to login");
      setLoading(false); // Only set loading false on error
    }
    // On success, keep loading true until redirect completes/unmounts
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to login with Google");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* LEFT SIDE: Mascot & Slogan */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden bg-white">
        <div className="relative z-10 max-w-lg text-center">
          {/* Mascot Image with Animation */}
          <motion.div
            key={`mascot-${currentSlide}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-80 h-80 mx-auto mb-8 relative"
          >
            <Image
              src={slides[currentSlide].image}
              alt={`Mascot ${currentSlide + 1}`}
              fill
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Slider Indicators (Moved between Mascot and Text) */}
          <div className="flex justify-center gap-2 mb-8 mt-[-20px]">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  currentSlide === index
                    ? "bg-[#0F4C75] w-6"
                    : "bg-gray-200 hover:bg-gray-300",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Title & Description with Animation */}
          <motion.div
            key={`text-${currentSlide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-left w-full pl-4"
          >
            <h2 className="text-3xl font-bold text-[#0F4C75] mb-4 leading-tight min-h-[80px] flex items-end justify-start">
              {slides[currentSlide].title}
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed min-h-[84px]">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE: Form with Curved Background */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bglogin.svg"
            alt="Login Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Curved Divider (SVG) - Visible only on Desktop to create the wave effect between white and blue (now background image) */}
        <div className="absolute left-[-1px] top-0 bottom-0 w-[10vw] hidden lg:block overflow-hidden z-20 pointer-events-none">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full fill-white"
          >
            <path d="M0,0 C40,30 60,70 0,100 L0,0 Z" />
          </svg>
        </div>

        {/* Mobile Top Curve (Optional, usually simple for mobile) */}
        <div className="absolute top-[-1px] left-0 right-0 h-[10vh] lg:hidden w-full fill-[#005096] z-0 bg-white">
          {/* Mobile specific styling if needed, currently kept clean */}
        </div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 relative z-30"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#0F4C75] mb-2">
                Selamat Datang
              </h2>
              <p className="text-gray-400 text-sm">
                Silahkan masukan akun Anda disini
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-5">
                {/* Email Input */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#0F4C75] ml-1">
                    Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#FF9600] transition-colors" />
                    <input
                      type="email"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF9600] focus:ring-2 focus:ring-[#FF9600]/20 outline-none transition-all duration-200 bg-gray-50/50 text-[#0D0E25]"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#0F4C75] ml-1">
                    Kata Sandi
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#FF9600] transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#FF9600] focus:ring-2 focus:ring-[#FF9600]/20 outline-none transition-all duration-200 bg-gray-50/50 text-[#0D0E25]"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="text-right">
                    <Link
                      href="#"
                      className="text-xs text-[#FF9600] hover:text-[#e68a00] font-medium"
                    >
                      Lupa Kata Sandi?
                    </Link>
                  </div>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-500 text-sm text-center font-medium"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-[#FF9600] to-[#FFB74D] hover:from-[#e68a00] hover:to-[#ffa726] transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9600]",
                  loading && "opacity-70 cursor-not-allowed transform-none",
                )}
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Masuk"
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-100" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-400 font-medium">
                    Atau masuk dengan
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className={cn(
                  "w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group",
                  loading && "opacity-70 cursor-not-allowed",
                )}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-500">
                  Belum memiliki akun?{" "}
                  <Link
                    href="/register"
                    className="text-[#0F4C75] font-bold hover:text-[#0A3D60] hover:underline"
                  >
                    Daftar
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
