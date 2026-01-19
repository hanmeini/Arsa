"use client";

import { useState } from "react";
import { Send, MessageSquare, Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

// --- Mock History ---
const chatHistory = [
  "Strategi Pemasaran Q1",
  "Optimasi Stok Lebaran",
  "Ide Konten Instagram",
  "Analisis Kompetitor",
  "Evaluasi SDM",
  "Budgeting 2026",
];

const suggestions = [
  "Bagaimana cara meningkatkan penjualan online?",
  "Strategi marketing untuk produk baru?",
  "Cara mengelola stok yang efisien?",
  "Tips pelayanan pelanggan yang baik?",
];

export default function ChatPage() {
  const { user } = useAuth();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    // Implement chat logic here
    console.log("Sending:", input);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-64px)] md:h-screen bg-white overflow-hidden">
      {/* Sidebar History (Hidden on mobile) */}
      <div className="hidden md:flex flex-col w-80 border-r border-gray-100 bg-[#f8f9fa] h-full">
        <div className="p-4 border-b border-gray-100">
          <button className="w-full flex items-center justify-center gap-2 bg-[#0F4C75] text-white py-3 rounded-xl font-medium hover:bg-[#0b3d61] transition-colors shadow-sm">
            <Plus className="w-5 h-5" />
            Percakapan Baru
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
            Histori
          </h3>
          <div className="space-y-1">
            {chatHistory.map((item, index) => (
              <button
                key={index}
                className="w-full text-left px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-3 group text-sm"
              >
                <MessageSquare className="w-4 h-4 text-gray-400 group-hover:text-[#0F4C75]" />
                <span className="truncate flex-1">{item}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-gray-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-green-400 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm">
              Pro
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">Upgrade to Plus</p>
              <p className="text-xs text-gray-500">Get better insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
          {/* Mascot & Greeting */}
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto relative mb-6">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              >
                <source src="/animations/mascot-arsa.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F4C75] mb-2 tracking-tight">
              Halo,{" "}
              {user?.displayName ? user.displayName.split(" ")[0] : "Partner"}!
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium">
              Ayo ceritakan keluhan bisnis Anda hari ini.
            </p>
          </div>

          {/* Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInput(suggestion)}
                className="p-4 text-left bg-white border border-gray-100 rounded-2xl hover:border-[#0F4C75] hover:shadow-md transition-all text-gray-600 text-sm md:text-base group"
              >
                <span className="group-hover:text-[#0F4C75] transition-colors">
                  {suggestion}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white border-t border-gray-100 w-full">
          <div className="max-w-4xl mx-auto relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ceritakan keluhan atau tanyakan apa saja..."
              className="w-full pl-5 pr-14 py-4 rounded-2xl border border-gray-200 focus:border-[#0F4C75] focus:ring-2 focus:ring-[#0F4C75]/20 outline-none transition-all resize-none shadow-sm min-h-[60px] text-gray-700"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-3 bottom-3 p-2.5 bg-[#0F4C75] text-white rounded-xl hover:bg-[#0b3d61] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            Arsa dapat memberikan saran, namun selalu verifikasi informasi
            penting.
          </p>
        </div>
      </div>
    </div>
  );
}
