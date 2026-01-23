"use client";

import { SectionContainer } from "@/components/dashboard/SectionContainer";
import { Wand2, Image as ImageIcon, FileText, Video } from "lucide-react";

const tools = [
  {
    title: "Product Description",
    description: "Buat deskripsi produk yang menarik dan SEO-friendly.",
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "AI Image Generator",
    description: "Buat foto produk profesional dari sketsa atau deskripsi.",
    icon: ImageIcon,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    title: "Video Script",
    description: "Buat skrip video TikTok/Reels dalam hitungan detik.",
    icon: Video,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    title: "Ad Copy",
    description: "Buat teks iklan yang meningkatkan konversi.",
    icon: Wand2,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

export default function ContentStudioPage() {
  return (
    <SectionContainer>
      <div className="space-y-12 pb-24">
        {/* Hero Header */}
        <div className="relative rounded-[3rem] bg-gray-900 overflow-hidden p-8 md:p-16 text-center animate-in fade-in zoom-in-95 duration-1000">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              Creative{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
                Magic
              </span>{" "}
              Studio
            </h1>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              Unleash the power of AI to generate compelling content for your
              brand. Select a tool below to get started.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-[2rem] p-8 border border-gray-100 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer overflow-hidden animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Gradient Background */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${tool.bg.replace("bg-", "from-")}/30 to-white`}
              />

              <div className="relative z-10">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${tool.bg} group-hover:scale-110 transition-transform duration-500 shadow-sm`}
                >
                  <tool.icon className={`w-8 h-8 ${tool.color}`} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {tool.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-light group-hover:text-gray-700 transition-colors">
                  {tool.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <span>Launch Tool</span>
                  <Wand2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
