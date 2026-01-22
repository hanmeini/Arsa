"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Check } from "lucide-react";
import { Toaster, toast } from "sonner";
import Image from "next/image";

export default function SocialProfilePage() {
  const [loading, setLoading] = useState(false);
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
  };

  const MinimalInput = ({
    label,
    name,
    placeholder,
    prefix,
  }: {
    label: string;
    name: string;
    placeholder: string;
    prefix?: string;
  }) => (
    <div className="space-y-4 group">
      <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase group-focus-within:text-black transition-colors">
        {label}
      </label>
      <div className="relative flex items-center pb-2 border-b border-gray-200 group-focus-within:border-black transition-colors duration-500">
        {prefix && (
          <span className="text-gray-400 font-serif mr-3 text-lg select-none">
            {prefix}
          </span>
        )}
        <input
          type="text"
          name={name}
          value={(formData as any)[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full bg-transparent border-none p-0 text-gray-900 placeholder:text-gray-300 focus:ring-0 text-lg font-serif font-light tracking-wide"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Toaster position="top-center" />

      {/* Hero Section with Vision */}
      <div className="w-full max-w-[1400px] mx-auto pt-16 md:pt-24 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left: Typography & Vision */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1] tracking-tight text-[#1a1a1a] mb-12">
              Setiap UMKM <br />
              dimulai dari <br />
              sebuah{" "}
              <span className="italic font-normal text-[#F59E0B]">cerita.</span>
            </h1>

            <div className="grid grid-cols-2 gap-6 mt-12 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="relative aspect-[3/4] overflow-hidden bg-gray-50"
              >
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                  fill
                  alt="Minimalist Office"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-4 left-4 text-white text-xs font-bold tracking-widest uppercase mix-blend-difference">
                  Visi
                </div>
              </motion.div>

              <div className="space-y-6 pt-12">
                <p className="text-sm leading-relaxed text-gray-500 font-mono">
                  Kesuksesan UMKM dimulai dengan langkah kecil yang konsisten.
                  Bukan hanya soal angka penjualan, tapi tentang dampak nyata
                  bagi komunitas dan ekonomi lokal. Wujudkan mimpi bisnis Anda
                  menjadi warisan masa depan.
                </p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="relative aspect-square overflow-hidden bg-gray-50"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80"
                    fill
                    alt="Success Meeting"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-xs font-bold tracking-widest uppercase mix-blend-difference">
                    Misi
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Minimalist Form */}
        <div className="lg:col-span-5 pt-12 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="sticky top-24"
          >
            <div className="mb-12">
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">
                Identitas Digital
              </h3>
              <p className="font-serif text-3xl md:text-3xl text-gray-900 leading-tight">
                Ayo bangun otomasi <br /> bersama kami.
              </p>
            </div>

            <div className="space-y-12">
              <MinimalInput
                label="AKUN INSTAGRAM"
                name="instagram"
                placeholder="username"
                prefix="@"
              />

              <MinimalInput
                label="AKUN TIKTOK"
                name="tiktok"
                placeholder="username"
                prefix="@"
              />

              <MinimalInput
                label="LINK TOKO SHOPEE"
                name="shopee"
                placeholder="shopee.co.id/tokoanda"
              />

              <MinimalInput
                label="CHANNEL YOUTUBE"
                name="youtube"
                placeholder="Nama Channel"
              />

              <MinimalInput
                label="WEBSITE / LINKTREE"
                name="website"
                placeholder="brandanda.com"
              />

              <div className="pt-8">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="group relative flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-black hover:text-[#c7a98d] transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      Menyimpan <Loader2 className="w-4 h-4 animate-spin" />
                    </span>
                  ) : (
                    <>
                      <span>Simpan Data</span>
                      <span className="w-12 h-[1px] bg-black group-hover:bg-[#c7a98d] transition-colors" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
