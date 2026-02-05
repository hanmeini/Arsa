"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, LogOut, AlertCircle } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

// Moved outside to prevent re-renders losing focus
const MinimalInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  prefix,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  prefix?: string;
}) => (
  <div className="space-y-4 group">
    <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase group-focus-within:text-[#363B43] transition-colors">
      {label}
    </label>
    <div className="relative flex items-center pb-2 border-b border-gray-200 group-focus-within:border-[#363B43] transition-colors duration-500">
      {prefix && (
        <span className="text-gray-400 font-serif mr-3 text-lg select-none">
          {prefix}
        </span>
      )}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent border-none outline-none p-0 text-gray-900 placeholder:text-gray-300 focus:ring-0 text-lg font-serif font-light tracking-wide"
      />
    </div>
  </div>
);

export default function SocialProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [formData, setFormData] = useState({
    instagram: "",
    tiktok: "",
    shopee: "",
    youtube: "",
    website: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("user_social_media");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    localStorage.setItem("user_social_media", JSON.stringify(formData));
    toast.success("Identitas Tersimpan", {
      description: "Profil digital Anda berhasil diperbarui.",
      className: "bg-white border border-gray-100 shadow-xl",
      icon: <Check className="w-4 h-4 text-green-600" />,
    });
    setLoading(false);
    setTimeout(() => router.push("/dashboard"), 1000); // Redirect after short delay
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut(auth);
      toast.success("Berhasil Keluar", {
        description: "Anda telah keluar dari akun.",
        className: "bg-white border border-gray-100 shadow-xl",
        icon: <Check className="w-4 h-4 text-green-600" />,
      });
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Gagal keluar", {
        description: "Terjadi kesalahan, silakan coba lagi.",
      });
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Toaster position="top-center" />

      {/* Hero Section with Vision */}
      <div className="w-full max-w-[1400px] mx-auto pt-10 md:pt-16 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-start">
          {/* Left: Typography & Explanation */}
          <div className="lg:col-span-6 flex flex-col justify-between lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 relative mb-2 -ml-4">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                >
                  <source src="/animations/mascot-arsa.mp4" type="video/mp4" />
                </video>
              </div>
              <h1 className="text-4xl md:text-6xl font-sans font-bold leading-[1.1] tracking-tight text-[#363B43] mb-8">
                Lengkapi Profil <br />
                Digital Anda.
              </h1>

              <div className="space-y-8 max-w-xl">
                <div className="pl-6 border-l-2 border-[#F59E0B]/30">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Mengapa ini penting?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Informasi sosial media dan e-commerce Anda akan menjadi
                    fondasi bagi AI kami untuk memahami identitas brand Anda.
                    Semakin lengkap data yang diberikan, semakin personal dan
                    akurat konten yang dihasilkan.
                  </p>
                </div>

                <div className="pl-6 border-l-2 border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Otomasi Penuh
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Dengan menghubungkan akun Anda, Binara dapat membantu
                    mengelola jadwal posting, menganalisis tren pasar yang
                    relevan dengan niche Anda, dan memberikan rekomendasi
                    strategi pertumbuhan yang spesifik.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Minimalist Form */}
          <div className="lg:col-span-6 pt-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="mb-12">
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">
                  Formulir Data
                </h3>
                <p className="font-serif text-2xl text-gray-900 leading-tight">
                  Hubungkan kanal penjualan <br /> dan sosial media.
                </p>
              </div>

              <div className="space-y-10 bg-gray-50/50 p-8 rounded-3xl border border-gray-100">
                <MinimalInput
                  label="AKUN INSTAGRAM"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="username"
                  prefix="@"
                />

                <MinimalInput
                  label="AKUN TIKTOK"
                  name="tiktok"
                  value={formData.tiktok}
                  onChange={handleChange}
                  placeholder="username"
                  prefix="@"
                />

                <MinimalInput
                  label="LINK TOKO SHOPEE"
                  name="shopee"
                  value={formData.shopee}
                  onChange={handleChange}
                  placeholder="shopee.co.id/tokoanda"
                />

                <MinimalInput
                  label="CHANNEL YOUTUBE"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleChange}
                  placeholder="Nama Channel"
                />

                <MinimalInput
                  label="WEBSITE / LINKTREE"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="brandanda.com"
                />

                <div className="pt-4">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full py-4 text-center bg-[#0F4C75] text-white font-bold rounded-xl shadow-lg hover:bg-[#0a3554] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        Menyimpan <Loader2 className="w-5 h-5 animate-spin" />
                      </>
                    ) : (
                      "Simpan Perubahan"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Logout Button - Fixed Position */}
      <motion.button
        onClick={() => setShowLogoutModal(true)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed top-6 right-6 group flex items-center gap-3 px-5 py-3 bg-white border-2 border-[#FF9600] text-[#FF9600] rounded-full shadow-lg hover:bg-[#FF9600] hover:text-white transition-all duration-300 hover:shadow-xl hover:scale-105 z-50"
      >
        <LogOut className="w-5 h-5 transition-transform group-hover:rotate-12" />
        <span className="font-bold text-sm tracking-wide hidden sm:inline">
          Keluar
        </span>
      </motion.button>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !loggingOut && setShowLogoutModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              >
                {/* Decorative Top Bar */}
                <div className="h-2 bg-gradient-to-r from-[#FF9600] via-[#F59E0B] to-[#FF9600]" />

                {/* Modal Content */}
                <div className="p-8">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF9600]/10 to-[#F59E0B]/10 flex items-center justify-center relative">
                      <AlertCircle className="w-10 h-10 text-[#FF9600] relative z-10" />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-center text-[#FF9600] mb-3">
                    Konfirmasi Keluar
                  </h2>

                  {/* Description */}
                  <p className="text-center text-gray-600 mb-8 leading-relaxed">
                    Apakah Anda yakin ingin keluar dari akun? Anda perlu login
                    kembali untuk mengakses dashboard.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      disabled={loggingOut}
                      className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="flex-1 px-6 py-3 rounded-xl bg-[#FF9600] text-white font-bold hover:bg-[#e68a00] transition-all shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loggingOut ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Keluar...
                        </>
                      ) : (
                        <>
                          <LogOut className="w-4 h-4" />
                          Ya, Keluar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
