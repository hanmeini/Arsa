"use client";

import { Sparkles, Heart } from "lucide-react";
import Image from "next/image";

const templates = [
  {
    id: 1,
    title: "Jus Semangka",
    category: "Rising Star",
    likes: "1jt",
    users: ["/icons/Profile.png", "/icons/Profile.png", "/icons/Profile.png"], // Placeholders
    image: "/images/template-juice.png", // Will need placeholder or real image
    bgColor: "bg-red-50",
  },
  {
    id: 2,
    title: "Body Care",
    category: "Rising Star",
    likes: "1jt",
    users: ["/icons/Profile.png", "/icons/Profile.png", "/icons/Profile.png"],
    image: "/images/template-bodycare.png",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    title: "Hair Care",
    category: "Rising Star",
    likes: "1jt",
    users: ["/icons/Profile.png", "/icons/Profile.png", "/icons/Profile.png"],
    image: "/images/template-haircare.png",
    bgColor: "bg-yellow-50",
  },
];

export function TemplatesSection() {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Paling banyak dipakai
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        Ide desain yang banyak digunakan pelaku usaha di Instagram
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            {/* Image placeholder area */}
            <div
              className={`aspect-square rounded-2xl mb-4 relative overflow-hidden ${template.bgColor} flex items-center justify-center`}
            >
              <span className="text-gray-400 font-medium">
                Template Preview
              </span>
            </div>

            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-1 text-orange-500 text-xs font-bold mb-1">
                  <span className="text-lg">🔥</span> #{template.id} Trending
                </div>
                <h4 className="font-bold text-gray-900">{template.title}</h4>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"
                  />
                ))}
                <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white fill-white" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <p className="text-[10px] text-gray-400 leading-tight w-1/2">
                1jt orang menyukai postingan ide ini di Instagram
              </p>
              <button className="bg-[#0F4C75] text-white text-xs py-2 px-4 rounded-full flex items-center gap-1 hover:bg-[#0a3655] transition-colors">
                <Sparkles className="w-3 h-3" />
                Coba ide
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
