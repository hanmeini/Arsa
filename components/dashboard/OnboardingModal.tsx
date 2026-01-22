"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, UserPlus } from "lucide-react";

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user has social media data saved
    const savedData = localStorage.getItem("user_social_media");

    // If no data exists (first time or skipped), show modal
    // You might want to more robustly check if it's an empty object '{}' too
    if (!savedData || savedData === "{}") {
      // Small delay to not be jarring on load
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleGoToProfile = () => {
    setIsOpen(false);
    router.push("/profile");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative"
          >
            <div className="relative pt-8 px-8 pb-8 flex flex-col items-center text-center">
              <div className="w-40 h-40 relative mb-4">
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

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Lengkapi Profil Anda
              </h2>

              <p className="text-gray-500 mb-8 leading-relaxed">
                Agar AI kami dapat bekerja maksimal untuk bisnis Anda, mohon
                lengkapi data sosial media dan kanal penjualan Anda.
              </p>

              <button
                onClick={handleGoToProfile}
                className="w-full bg-[#FF9600] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 hover:bg-[#e68a00] hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Isi Identitas Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-xs text-gray-400 hover:text-gray-600 font-medium"
              >
                Nanti Saja
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
