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
    <div className="min-h-screen flex bg-[#F0F9FF] overflow-hidden font-sans">
      {/* LEFT SIDE: Brand & Vision */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center px-16 bg-[#005587] text-white overflow-hidden">
        {/* Decorative Elements */}
        <Image
          src="/icons/dekor-login.svg"
          alt="dekor"
          width={232}
          height={143}
          className="absolute top-0 left-0"
        />
        <Image
          src="/icons/dekor-login.svg"
          alt="dekor"
          width={232}
          height={143}
          className="absolute bottom-0 right-0 rotate-180"
        />
        <Image
          src="/icons/meteocons_star.svg"
          alt="star"
          width={80}
          height={80}
          className="absolute right-10 top-10"
        />
        <Image
          src="/icons/stars2.svg"
          alt="star"
          width={80}
          height={80}
          className="absolute left-20 bottom-10"
        />
        <div className="absolute top-10 left-10">
          <div className="w-20 h-20 border border-dashed border-orange-400/30 rounded-full opacity-50" />
        </div>
        <div className="absolute bottom-10 right-10">
          <Image
            src="/icons/mage_stars-b.svg"
            alt="star"
            width={40}
            height={40}
            className="text-orange-400 opacity-80"
          />
        </div>

        <div className="relative z-10 max-w-lg">
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-3">
              <Image
                src="/icons/logo-login.svg"
                alt="Arsa Logo"
                width={40}
                height={40}
                className="w-12 h-12"
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Asisten cerdas <br />
            untuk arah usaha
          </h1>

          <p className="text-lg text-blue-100/80 leading-relaxed max-w-md">
            Otomatisasi proses bisnis dan tingkatkan performa toko Anda secara
            efisien
          </p>

          {/* Stylized connector lines */}
          <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] border border-orange-500/20 rounded-full opacity-30 pointer-events-none" />
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative p-6">
        <div className="w-full max-w-[420px] relative z-10 mx-auto">
          {/* Mascot Peeking */}
          <div className="flex justify-center mb-[-30px] relative z-0">
            <Image
              src="/icons/icon-login.svg"
              alt="Arsa Mascot"
              width={160}
              height={160}
              className="object-contain" // Adjust size as needed
            />
          </div>

          {/* Card */}
          <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-10 relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-[#0F4C75] mb-2">
                Masuk ke Arsa
              </h2>
              <p className="text-gray-400 text-sm">
                Silahkan masukan akun Anda disini
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="space-y-1">
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#FF9600] transition-colors" />
                  <input
                    type="email"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#F5F5F5] border-none focus:ring-2 focus:ring-[#FF9600]/20 text-gray-900 placeholder:text-gray-400 text-sm font-medium transition-all"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#FF9600] transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-[#F5F5F5] border-none focus:ring-2 focus:ring-[#FF9600]/20 text-gray-900 placeholder:text-gray-400 text-sm font-medium transition-all"
                    placeholder="Kata sandi"
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
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-500 text-xs rounded-lg text-center font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full py-3.5 rounded-xl text-white font-bold text-sm bg-[#F7931A] hover:bg-[#E68A00] transition-all shadow-lg shadow-orange-200 focus:ring-4 focus:ring-orange-100",
                  loading && "opacity-70 cursor-not-allowed",
                )}
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                ) : (
                  "Masuk"
                )}
              </button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <div className="flex items-center justify-center text-xs text-gray-400 uppercase tracking-widest font-semibold gap-2">
                <span className="w-8 border-t border-gray-200"></span>
                Hubungkan akun
                <span className="w-8 border-t border-gray-200"></span>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-auto mx-auto bg-[#FCF6E5] hover:bg-[#F5EBCF] text-[#5F6368] font-bold py-3 px-12 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                <Image
                  src="/icons/material-icon-theme_google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5 text-[#EA4335]"
                />
                {/* <span className="text-sm">Google</span> - Icon only logic or text? Mock shows icon only or simple button. Let's keep simpler. Mock shows just 'G' icon circle actually, but pill button is better for UX usually. Let's make it an icon circle button if following mockup exactly?
                  Mockup shows a pill button with 'G' icon inside. */}
              </button>

              <p className="text-sm text-gray-500 font-medium">
                Belum mengenal Arsa?{" "}
                <Link
                  href="/register"
                  className="text-[#0F4C75] font-bold hover:underline"
                >
                  Buat Akun
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
