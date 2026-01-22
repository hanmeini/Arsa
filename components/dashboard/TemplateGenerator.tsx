"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Loader2,
  Sparkles,
  Download,
  RefreshCw,
  ChevronLeft,
  Image as ImageIcon,
  CheckCircle2,
  MoveRight,
  Copy,
  Info,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { generateDesign } from "@/app/actions/generateDesign";

// Mock Data for "Case Studies" / Recipes
const TEMPLATE_DATA: Record<string, any> = {
  "1": {
    // Jus Semangka
    title: "Jus Semangka Segar",
    description:
      "Tampilkan kesegaran produk minuman dengan latar belakang natural dan pencahayaan cerah.",
    prompt:
      "Professional product photography of watermelon juice bottle, surrounded by fresh watermelon slices, water splashes, bright natural lighting, high resolution, 8k, advertising style",
    exampleImage: "/images/jus-semangka.png",
    steps: [
      "Upload foto botol produk Anda yang memiliki background polos atau transparan.",
      "Masukkan nama produk 'Jus Semangka' pada kolom input.",
      "Pilih style 'Organic & Natural' untuk hasil terbaik.",
      "Klik generate dan tunggu AI menyulap foto Anda.",
    ],
    recommendedStyle: "organic nature",
  },
  "2": {
    // Body Care
    title: "Body Care Premium",
    description:
      "Tonjolkan sisi elegan dan mewah dari produk perawatan tubuh Anda.",
    prompt:
      "Luxury skincare bottle product photography, podium stand, beige and gold color palette, soft studio lighting, elegant shadows, minimalist composition, 4k",
    exampleImage: "/images/bodycare.png",
    steps: [
      "Siapkan foto produk skincare dengan pencahayaan yang cukup.",
      "Input nama produk dan deskripsi singkat.",
      "Gunakan style 'Luxury & Elegant'.",
      "AI akan menambahkan elemen podium dan pencahayaan studio.",
    ],
    recommendedStyle: "luxury elegant",
  },
  "3": {
    // Hair Care
    title: "Hair Care Professional",
    description: "Visualisasikan hasil perawatan rambut profesional.",
    prompt:
      "Professional hair care product bottle, salon background with bokeh, soft backlight, sleek and modern design, commercial photography, high detail",
    exampleImage: "/images/haircare.png",
    steps: [
      "Pastikan foto produk terlihat jelas labelnya.",
      "Ketik jenis produk (misal: Shampoo, Conditioner).",
      "Pilih style 'Minimalist Studio' atau 'Magazine Editorial'.",
      "Dapatkan hasil foto katalog profesional instan.",
    ],
    recommendedStyle: "minimalist",
  },
};

interface TemplateGeneratorProps {
  apiKey: string;
  templateId?: string;
}

export function TemplateGenerator({
  apiKey,
  templateId,
}: TemplateGeneratorProps) {
  // Ensure templateId matches the keys (strings)
  const currentId = templateId ? String(templateId) : "1";
  const data = TEMPLATE_DATA[currentId] || TEMPLATE_DATA["1"];

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState(data.recommendedStyle || ""); // Pre-fill style
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setGeneratedImage(null);
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(data.prompt);
    // Ideally use a toast here
    alert("Prompt copied to clipboard!");
  };

  /* New State for Success Modal */
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /* New State for Upload Logic */
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);

  const handleUpload = async () => {
    if (!generatedImage) return;

    setIsUploading(true);
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setShowUploadSuccess(true);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Gagal mengunggah konten");
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerate = async () => {
    // Check if user has filled social media profile
    const socialProfile = localStorage.getItem("user_social_media");
    if (!socialProfile) {
      alert(
        "Anda belum mengisi Data Diri Sosmed! Harap lengkapi profil sosmed Anda di menu 'Data Diri Sosmed' sebelum membuat konten.",
      );
      // Optionally redirect: window.location.href = "/profile";
      return;
    }

    if (
      !file ||
      !productName ||
      !style ||
      !category ||
      !price ||
      !description
    ) {
      alert("Mohon lengkapi semua data dalam formulir");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    setShowSuccessModal(false);

    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Use the specific template result image
      setGeneratedImage(`/images/template${currentId}.png`);
      setShowSuccessModal(true); // Trigger modal

      /*
      // SERVER ACTION DISABLED
      const formData = new FormData();
      formData.append("image", file);
      
      const prompt = `Professional product photography of ${productName} (${category}), ${description}. Style: ${style}. Commercial advertisement style, high quality, photorealistic, 8k.`;
      formData.append("prompt", prompt);

      const result = await generateDesign(formData, apiKey);
      setGeneratedImage(result);
      */
    } catch (error: any) {
      console.error("Generation failed:", error);
      alert(error.message || "Something went wrong during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 relative">
      {/* 1. Header / Navigation */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0F4C75] transition-colors mb-6 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#FF9600] text-xs font-bold uppercase tracking-wider mb-3 border border-orange-100">
              <Sparkles className="w-3 h-3" />
              Template Recipe
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {data.title}
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl">
              {data.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* 2. Recipe Showcase (Prompt -> Output) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Info className="w-5 h-5 text-[#0F4C75]" />
          Bedah Prompt
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Prompt Box */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={copyPrompt}
                className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-500"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">
              Prompt yang digunakan
            </span>
            <p className="text-gray-700 font-medium leading-relaxed font-mono text-sm">
              "{data.prompt}"
            </p>
          </div>

          {/* Right: Output Arrow + Image */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-center justify-center text-gray-300">
              <MoveRight className="w-8 h-8" />
              <span className="text-xs font-medium uppercase mt-1">Output</span>
            </div>

            <div className="relative aspect-square w-full max-w-[280px] bg-gray-100 rounded-2xl overflow-hidden mx-auto shadow-md rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src={data.exampleImage}
                alt="Example Result"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end p-4">
                <span className="text-white text-xs font-bold bg-white/20 backdrop-blur px-2 py-1 rounded">
                  Hasil AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Langkah-langkah
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {data.steps.map((step: string, i: number) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-[#0F4C75]/20 transition-colors"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-6xl font-black text-[#0F4C75] leading-none -mr-4 -mt-4 block">
                  {i + 1}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0F4C75] flex items-center justify-center font-bold text-sm mb-3 relative z-10">
                {i + 1}
              </div>
              <p className="text-gray-600 text-sm font-medium relative z-10">
                {step}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 4. Generator Form (The Action Area) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        id="generator-area"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
      >
        {/* Left Card: Input Form */}
        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_2px_40px_-12px_rgba(0,0,0,0.08)] border border-gray-100/50 relative overflow-hidden">
          {/* Decorative top gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F4C75] to-[#FF9600]" />

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Generate Content
            </h2>
            <p className="text-gray-500 text-sm">
              Isi form berikut untuk menghasilkan konten
            </p>
            <div className="h-px w-full bg-gray-100 mt-6" />
          </div>

          <div className="space-y-6">
            {/* Row 1: Style & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">
                  Gaya Konten
                </label>
                <div className="relative">
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[#FF9600] focus:ring-4 focus:ring-[#FF9600]/10 transition-all outline-none appearance-none cursor-pointer font-medium text-gray-700 text-sm"
                  >
                    <option value="" disabled>
                      Pilih gaya konten
                    </option>
                    <option value="minimalist">Minimalist Studio</option>
                    <option value="vibrant pop art">Vibrant Pop Art</option>
                    <option value="luxury elegant">Luxury & Elegant</option>
                    <option value="organic nature">Organic & Natural</option>
                    <option value="magazine editorial">
                      Magazine Editorial
                    </option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">
                  Kategori
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[#FF9600] focus:ring-4 focus:ring-[#FF9600]/10 transition-all outline-none font-medium text-gray-700 text-sm placeholder:text-gray-400"
                  placeholder="Kategori Produk"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>

            {/* Row 2: Name & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">
                  Nama Produk
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[#FF9600] focus:ring-4 focus:ring-[#FF9600]/10 transition-all outline-none font-medium text-gray-700 text-sm placeholder:text-gray-400"
                  placeholder="Isi nama produk Anda"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">
                  Harga
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[#FF9600] focus:ring-4 focus:ring-[#FF9600]/10 transition-all outline-none font-medium text-gray-700 text-sm placeholder:text-gray-400"
                  placeholder="Tentukan harga"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Row 3: Photo */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Foto Produk
              </label>
              <div
                className={`group border-2 border-dashed rounded-2xl p-4 transition-all cursor-pointer flex items-center justify-between
                  ${
                    file
                      ? "border-[#FF9600] bg-orange-50/30"
                      : "border-gray-200 hover:border-[#FF9600] hover:bg-gray-50"
                  }
                `}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div className="flex items-center gap-4">
                  {file ? (
                    <div className="w-12 h-12 rounded-xl bg-gray-100 relative overflow-hidden shadow-sm">
                      <Image
                        src={previewUrl!}
                        fill
                        alt="Preview"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#FF9600] transition-colors">
                      <Upload className="w-5 h-5" />
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-[#FF9600] transition-colors">
                      {file ? file.name : "Unggah foto"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {file ? "Klik untuk ganti" : "Format JPG/PNG"}
                    </p>
                  </div>
                </div>
                {!file && (
                  <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1.5 rounded-lg group-hover:bg-[#FF9600] group-hover:text-white transition-all">
                    Browse
                  </span>
                )}
              </div>
            </div>

            {/* Row 4: Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Deskripsi
              </label>
              <textarea
                className="w-full h-32 px-4 py-3.5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[#FF9600] focus:ring-4 focus:ring-[#FF9600]/10 transition-all outline-none font-medium text-gray-700 text-sm placeholder:text-gray-400 resize-none"
                placeholder="Jelaskan detail produk anda..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF9600] to-[#FFB347] text-white font-bold text-lg hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </span>
              ) : (
                "Simpan"
              )}
            </button>
          </div>
        </div>

        {/* Right Card: Preview Form */}
        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_2px_40px_-12px_rgba(0,0,0,0.08)] border border-gray-100/50 h-full flex flex-col relative overflow-hidden">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Lihat Hasil Tampilan
            </h2>
            <p className="text-gray-500 text-sm">
              Lihat tampilan desain kamu yang sedang dibuat
            </p>
            <div className="h-px w-full bg-gray-100 mt-6" />
          </div>

          {/* Preview Area */}
          <div className="flex-1 flex flex-col">
            <div
              className={`flex-1 min-h-[400px] rounded-3xl border-2 border-dashed transition-all duration-500 relative overflow-hidden
                ${
                  generatedImage
                    ? "border-transparent bg-gray-50 ring-4 ring-orange-100"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {generatedImage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      duration: 0.8,
                    }}
                    className="relative w-full h-full p-4"
                  >
                    <motion.div
                      className="w-full h-full relative shadow-2xl rounded-xl overflow-hidden"
                      initial={{ boxShadow: "0px 0px 0px rgba(255,150,0,0)" }}
                      animate={{
                        boxShadow: "0px 20px 50px -10px rgba(255,150,0,0.3)",
                      }}
                      transition={{ delay: 0.5, duration: 1 }}
                    >
                      <Image
                        src={generatedImage}
                        fill
                        alt="Result"
                        className="object-contain"
                      />
                    </motion.div>

                    {/* Fun Sparkles Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: [0, 90, 0] }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="absolute -top-4 -right-4 text-[#FF9600]"
                      >
                        <Sparkles className="w-12 h-12 fill-orange-200" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: [0, -45, 0] }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="absolute bottom-10 -left-6 text-[#0F4C75]"
                      >
                        <Sparkles className="w-8 h-8 fill-blue-200" />
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center p-8 max-w-sm mx-auto">
                    {isGenerating ? (
                      <div className="flex flex-col items-center">
                        <video
                          src="/animations/mascot-thinking.mp4"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-48 h-48 mb-6 object-contain animate-pulse"
                        />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          Sedang Membuat Konten...
                        </h3>
                        <p className="text-sm text-gray-500">
                          Mohon tunggu sebentar, AI kami sedang bekerja
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <video
                          src="/animations/mascot-thinking.mp4"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-48 h-48 mb-6 object-contain"
                        />
                        <h3 className="text-xl font-bold text-[#0F4C75] mb-3">
                          Mulai Buat Konten Kamu
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          Isi form terlebih dahulu untuk melihat tampilan konten
                          Anda disini
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 flex justify-center">
              <button
                disabled={!generatedImage}
                onClick={handleUpload}
                className="px-8 py-3 rounded-full border border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50 hover:text-[#0F4C75] hover:border-[#0F4C75] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 group"
              >
                Unggah
                <span className="text-xs group-hover:translate-x-1 transition-transform">
                  &gt;
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      {/* LOADING OVERLAY */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <LoadingScreen className="h-full w-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* UPLOAD LOADING OVERLAY */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70]"
          >
            <LoadingScreen
              className="h-full w-full"
              title="Sedang Mengunggah..."
              description="Arsa sedang memposting konten Anda ke sosial media!"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* UPLOAD SUCCESS MODAL */}
      <AnimatePresence>
        {showUploadSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowUploadSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-50 to-transparent opacity-50" />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-6 ring-8 ring-amber-50">
                  <Upload className="w-10 h-10 text-amber-600" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Berhasil Upload!
                </h3>
                <p className="text-gray-500 mb-8">
                  Konten Anda telah berhasil diunggah ke semua sosial media yang
                  terhubung.
                </p>

                <button
                  onClick={() => setShowUploadSuccess(false)}
                  className="w-full py-3.5 rounded-xl bg-[#F59E0B] text-white font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-900/20"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()} // Prevent close on modal click
              className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
            >
              {/* Confetti / Burst Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-orange-50 to-transparent opacity-50" />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 ring-8 ring-green-50">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Desain Selesai!
                </h3>
                <p className="text-gray-500 mb-8">
                  AI telah berhasil membuat desain produk Anda. Keren kan?
                </p>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3.5 rounded-xl bg-[#F59E0B] text-white font-bold hover:bg-[#F59E0A] transition-colors shadow-lg shadow-orange-900/20"
                >
                  Lihat Hasil
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
