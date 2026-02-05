"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const loadingMessages = [
  "Nara sedang menyiapkan...",
  "Hampir siap!",
  "Memproses data...",
  "Sebentar ya...",
  "Tunggu sebentar...",
];

export function LoadingScreen({
  className,
  title,
  description = "Mohon tunggu sebentar, Nara sedang menyiapkan data Anda!",
}: {
  className?: string;
  title?: string;
  description?: string;
}) {
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(
        loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
      );
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center text-center p-6 ${className}`}
    >
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)"
        }}
      />

      {/* Soft Glow behind Spinner */}
      <div className="absolute w-[300px] h-[300px] bg-orange-100/50 rounded-full blur-3xl -z-10 animate-pulse" />

      <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
        {/* Spinner Border - Default Style but Thicker (border-8) */}
        <div className="absolute inset-0 border-8 border-orange-100 border-t-[#FF9600] rounded-full animate-spin"></div>

        {/* Mascot Video */}
        <div className="absolute inset-4 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-sm">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transform scale-110"
          >
            <source src="/animations/mascot-thinking.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="space-y-2 font-sans">
        <motion.h2
          key={currentMessage}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold text-gray-900"
        >
          {title || currentMessage}
        </motion.h2>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}
