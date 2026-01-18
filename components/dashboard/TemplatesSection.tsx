"use client";

import { Sparkles, Heart } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { DesignGeneratorModal } from "./DesignGeneratorModal";

const templates = [
  {
    id: 1,
    title: "Jus Semangka",
    desc: "1jt orang menyukai postingan ide ini di Instagram",
    users: [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    ],
    image: "/images/jus-semangka.png",
    trending: "#1 Trending",
    bgColor: "bg-red-50",
  },
  {
    id: 2,
    title: "Body Care",
    desc: "1jt orang menyukai postingan ide ini di Instagram",
    users: [
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    ],
    image: "/images/bodycare.png",
    trending: "#2 Trending",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    title: "Hair Care",
    desc: "1jt orang menyukai postingan ide ini di Instagram",
    users: [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    ],
    image: "/images/haircare.png",
    trending: "#3 Trending",
    bgColor: "bg-amber-50",
  },
];

export function TemplatesSection({ apiKey }: { apiKey: string }) {
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  return (
    <>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          Paling banyak dipakai
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          Ide desain yang banyak digunakan pelaku usaha di Instagram
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Image Area */}
              <div
                className={`aspect-square rounded-2xl mb-4 relative overflow-hidden ${template.bgColor} flex items-center justify-center`}
              >
                {template.image && !template.image.includes("template-") ? (
                  <Image
                    src={template.image}
                    alt={template.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* Placeholder for when actual image is missing */
                  <div className="text-center p-4">
                    <span className="text-3xl mb-2 block">
                      {template.id === 1
                        ? "🍉"
                        : template.id === 2
                          ? "🥑"
                          : "🧴"}
                    </span>
                    <p className="text-gray-500 font-bold text-lg leading-none">
                      {template.title.split(" ")[0]}
                    </p>
                    <p className="text-gray-400 font-bold text-xl uppercase tracking-wider">
                      {template.title.split(" ")[1]}
                    </p>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-1 text-orange-500 text-xs font-bold">
                      <Image
                        src="/icons/cuida_fire-outline.svg"
                        alt="fire"
                        width={12}
                        height={12}
                        className="w-4 h-4"
                      />{" "}
                      {template.trending}
                    </div>

                    {/* Avatars */}
                    <div className="flex -space-x-2">
                      {template.users.map((userImage, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white overflow-hidden relative"
                        >
                          <Image
                            src={userImage}
                            alt="User"
                            width={24}
                            height={24}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-sm relative z-10">
                        <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                      </div>
                    </div>
                  </div>

                  <h4 className="font-bold text-gray-900 text-lg mb-1">
                    {template.title}
                  </h4>
                </div>

                <div className="flex justify-between items-end gap-2">
                  <p className="text-[11px] text-gray-400 leading-tight flex-1">
                    {template.desc}
                  </p>

                  <button
                    onClick={() => setIsGeneratorOpen(true)}
                    className="bg-[#0F4C75] text-white text-[10px] font-bold py-2 px-4 rounded-full flex items-center gap-1 hover:bg-[#0a3655] transition-colors shrink-0"
                  >
                    <Sparkles className="w-3 h-3" />
                    Coba ide
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DesignGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        apiKey={apiKey}
      />
    </>
  );
}
