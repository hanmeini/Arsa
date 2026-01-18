"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export function WelcomeBanner() {
  const { user } = useAuth();
  return (
    <div className="relative bg-[#0F4C75] rounded-[3rem] p-8 md:p-12 min-h-[400px] z-0 flex flex-col justify-center">
      {/* Content */}
      <div className="relative z-10 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Hai,{" "}
          {user?.displayName && user.displayName.length > 12
            ? `${user.displayName.substring(0, 12)}...`
            : user?.displayName || "User"}
        </h1>
        <p className="text-white/80 text-lg mb-10 max-w-md">
          Mulai kelola dan kembangkan konten usahamu hari ini
        </p>

        {/* Action Input */}
        <div className="relative w-full max-w-lg bg-white rounded-full p-2 pl-6 flex items-center shadow-lg">
          <input
            type="text"
            placeholder="Ex. buat desain minuman, caption Instagram, bold minimalism"
            className="flex-1 bg-transparent border-none outline-none text-gray-600 placeholder:text-gray-400 text-sm"
          />
          <button className="bg-[#FF9600] w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Mascot Image (Right Side) */}
      <div className="absolute top-10 z-10 right-4 md:right-10 md:top-6 lg:-top-10 lg:right-0 w-[200px] md:w-[250px] lg:w-[250px]">
        <Image
          src="/icons/mascot-arsa.svg" // Placeholder, needs full body fox ideally
          alt="Mascot"
          width={250}
          height={300}
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
}
