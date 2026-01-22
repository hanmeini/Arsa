"use client";

import { motion } from "framer-motion";

export function LoadingScreen({
  className,
  title = "Loading...",
  description = "Mohon tunggu sebentar, Arsa sedang menyiapkan data Anda!",
}: {
  className?: string;
  title?: string;
  description?: string;
}) {
  return (
    <div
      className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center text-center p-6 ${className}`}
    >
      <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
        {/* Spinner Border */}
        <div className="absolute inset-0 border-4 border-orange-100 border-t-[#FF9600] rounded-full animate-spin"></div>

        {/* Mascot Video - wrapper div added for padding if needed, or direct if video fits circle */}
        <div className="absolute inset-4 rounded-full overflow-hidden bg-white flex items-center justify-center">
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

      <div className="animate-pulse space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}
