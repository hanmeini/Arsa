"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Send,
  MessageSquare,
  Plus,
  Loader2,
  LayoutDashboard,
  Menu,
  X,
  Trash,
  Lock,
  ChevronDown,
  Sparkles,
  Zap,
  Brain,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  createChat,
  sendMessage,
  subscribeToChats,
  subscribeToMessages,
  deleteChat,
  ChatSession,
  Message,
} from "@/lib/firebase/chat";
import { getChatResponse, ModelType } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const suggestions = [
  "Bagaimana cara meningkatkan penjualan online?",
  "Strategi marketing untuk produk baru?",
  "Cara mengelola stok yang efisien?",
  "Tips pelayanan pelanggan yang baik?",
];

const MODELS: {
  id: ModelType;
  name: string;
  icon: any;
  description: string;
  locked?: boolean;
}[] = [
  {
    id: "auto",
    name: "Arsa Auto",
    icon: Sparkles,
    description: "Cerdas & seimbang untuk setiap kebutuhan",
  },
  {
    id: "fast",
    name: "Arsa Cepat",
    icon: Zap,
    description: "Respon kilat untuk pertanyaan singkat",
  },
  {
    id: "reasoning",
    name: "Arsa Nalar",
    icon: Brain,
    description: "Analisis mendalam & logis",
  },
  {
    id: "pro",
    name: "Arsa Pro",
    icon: Crown,
    description: "Model tercanggih untuk masalah kompleks",
    locked: true,
  },
];

export default function ChatPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Model Selection State
  const [selectedModel, setSelectedModel] = useState<ModelType>("auto");
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  // Mock Pro Status (To be replaced with real subscription check)
  const isPro = false;

  // Delete Modal State
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Subscribe to chat list
  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToChats(user.uid, (data) => {
      setChats(data);
    });
    return () => unsubscribe();
  }, [user]);

  // For portal mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Subscribe to messages when active chat changes
  useEffect(() => {
    if (!activeChatId) {
      setMessages([]);
      return;
    }
    const unsubscribe = subscribeToMessages(activeChatId, (data) => {
      setMessages(data);
    });
    return () => unsubscribe();
  }, [activeChatId]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loadingResponse]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || !user || loadingResponse) return;

    setInput(""); // Clear input immediately
    setLoadingResponse(true);

    let chatId = activeChatId;

    try {
      // Create new chat if none active
      if (!chatId) {
        const title =
          textToSend.length > 30
            ? textToSend.substring(0, 30) + "..."
            : textToSend;
        chatId = await createChat(user.uid, title);
        setActiveChatId(chatId);
      }

      // 1. Send User Message to Firestore
      await sendMessage(chatId!, "user", textToSend);

      // 2. Get Gemini Response
      // Need to format current messages for history + the new message
      const historyForApi = messages.map((m) => ({
        role: m.role,
        parts: m.content,
      }));

      const reply = await getChatResponse(
        historyForApi,
        textToSend,
        selectedModel,
      );

      // 3. Send AI Response to Firestore
      await sendMessage(chatId!, "model", reply);
    } catch (error) {
      console.error("Chat failed:", error);

      // Fallback: Provide helpful tips when offline/busy
      const fallbackResponses = [
        "Halo, Arsa di sini! Koneksi internet sepertinya sedang lambat, tapi saya punya ide: coba gabungkan produk terlaris Anda dalam satu paket bundling untuk meningkatkan omzet hari ini.",
        "Hai, Partner! Arsa lagi agak susah terhubung, nih. Sambil menunggu, coba cek stok gudang sebentar yuk, biar nggak ada barang yang menumpuk atau malah kosong.",
        "Arsa menyapa! Sepertinya sinyal lagi kurang bersahabat. Tapi ingat, pelanggan setia itu emas lho. Jangan lupa sapa mereka hari ini ya!",
        "Halo! Arsa di sini. Sambil nunggu koneksi lancar, gimana kalau kita pikirkan konten 'behind-the-scene' untuk sosial media? Biasanya audiens suka banget lihat dapur bisnis kita.",
        "Hai, Arsa hadir! Maaf ya ada gangguan dikit. Oiya, jangan lupa cek arus kas hari ini. Cash flow yang sehat itu napasnya bisnis kita.",
        "Arsa siap bantu! Tapi sinyal lagi putus-nyambung nih. Ide kilat: bikin flash sale dadakan untuk produk yang lagi banyak stoknya, pasti seru!",
        "Halo Partner! Arsa disini. Sambil nunggu, coba review ulang kerjaan tim. Siapa tahu ada proses yang bisa dipersingkat biar makin efisien.",
      ];

      const randomFallback =
        fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

      // Send fallback message so user sees a response
      if (chatId && user) {
        await sendMessage(chatId, "model", randomFallback);
      }
    } finally {
      setLoadingResponse(false);
    }
  };

  const startNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setInput("");
  };

  const handleDeleteChat = async () => {
    if (!chatToDelete) return;
    try {
      await deleteChat(chatToDelete);
      if (activeChatId === chatToDelete) {
        startNewChat();
      }
      setShowDeleteModal(false);
      setChatToDelete(null);
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const handleModelSelect = (modelId: ModelType, locked?: boolean) => {
    if (locked && !isPro) {
      return; // Prevent selection if locked
    }
    setSelectedModel(modelId);
    setShowModelDropdown(false);
  };

  const currentModel = MODELS.find((m) => m.id === selectedModel) || MODELS[0];

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar History (Desktop) */}
      <div className="hidden md:flex flex-col w-80 border-r border-gray-100 bg-[#f8f9fa] h-full shrink-0">
        <div className="p-4 border-b border-gray-100 space-y-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full flex items-center justify-center gap-2 bg-[#FF9600] text-white py-3 rounded-xl font-medium hover:bg-[#e68a00] transition-colors shadow-sm"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
        </div>

        {/* Sidebar List - Scrollable */}
        <div className="p-4 overflow-y-auto flex-1 no-scrollbar">
          <div className="flex justify-between items-center mb-3 px-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Histori
            </h3>
            <button
              onClick={startNewChat}
              className="text-xs text-[#FF9600] hover:underline font-medium flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Baru
            </button>
          </div>

          <div className="space-y-1">
            {chats.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4 italic">
                Belum ada percakapan
              </p>
            ) : (
              chats.map((chat) => (
                <div key={chat.id} className="relative group">
                  <button
                    onClick={() => setActiveChatId(chat.id)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center gap-3 text-sm pr-8",
                      activeChatId === chat.id
                        ? "bg-white shadow-sm border border-gray-100 text-[#FF9600] font-medium"
                        : "text-gray-600 hover:bg-gray-100",
                    )}
                  >
                    <MessageSquare
                      className={cn(
                        "w-4 h-4 shrink-0",
                        activeChatId === chat.id
                          ? "text-[#FF9600]"
                          : "text-gray-400 group-hover:text-[#FF9600]",
                      )}
                    />
                    <span className="truncate flex-1">{chat.title}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setChatToDelete(chat.id);
                      setShowDeleteModal(true);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    title="Hapus Percakapan"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <Link
            href="/pricing"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-gray-200"
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm">
              Pro
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">Upgrade to Plus</p>
              <p className="text-xs text-gray-500">Get better insights</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Sticky Header with Model Selector */}
        <div className="sticky top-0 z-10 p-4 shrink-0 pointer-events-none">
          {/* Model Selector & Mobile Menu Trigger */}
          <div className="flex items-center gap-3 pointer-events-auto w-fit">
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="md:hidden p-2 bg-[#FF9600] text-white rounded-xl shadow-lg hover:bg-[#e68a00] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Model Selector */}
            <div className="relative">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all text-sm font-medium text-gray-700 hover:text-[#FF9600]"
              >
                <currentModel.icon className="w-4 h-4" />
                <span>{currentModel.name}</span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    showModelDropdown ? "rotate-180" : "",
                  )}
                />
              </button>

              <AnimatePresence>
                {showModelDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20 p-1"
                  >
                    {MODELS.map((model) => (
                      <button
                        key={model.id}
                        onClick={() =>
                          handleModelSelect(model.id, model.locked)
                        }
                        className={cn(
                          "w-full text-left p-2.5 rounded-xl flex items-start gap-3 transition-colors relative",
                          selectedModel === model.id
                            ? "bg-gray-50"
                            : "hover:bg-gray-50",
                          model.locked &&
                            !isPro &&
                            "opacity-60 cursor-not-allowed hover:bg-transparent",
                        )}
                      >
                        <div
                          className={cn(
                            "p-2 rounded-lg shrink-0",
                            selectedModel === model.id
                              ? "bg-white shadow-sm text-[#FF9600]"
                              : "bg-gray-100 text-gray-500",
                          )}
                        >
                          <model.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "font-semibold text-sm",
                                selectedModel === model.id
                                  ? "text-gray-900"
                                  : "text-gray-700",
                              )}
                            >
                              {model.name}
                            </span>
                            {model.locked && !isPro && (
                              <Lock className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                          <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                            {model.description}
                          </p>
                        </div>

                        {model.locked && !isPro && (
                          <div
                            className="absolute inset-0 z-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert("Upgrade ke Pro untuk akses model ini!");
                            }}
                          />
                        )}
                      </button>
                    ))}

                    {!isPro && (
                      <div className="mt-2 text-center p-2 border-t border-gray-100 bg-gray-50/50 rounded-b-lg">
                        <Link
                          href="/pricing"
                          className="text-xs font-bold text-[#FF9600] hover:underline flex items-center justify-center gap-1"
                        >
                          Upgrade to Pro <Crown className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Scrollable Message Container */}
        {activeChatId && (messages.length > 0 || loadingResponse) ? (
          <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-8 space-y-6 pt-0 no-scrollbar">
            {/* Spacer for Sticky Header */}
            <div className="h-4" />

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex w-full mb-6 gap-3 animate-in slide-in-from-bottom-2 fade-in duration-500 fill-mode-backwards",
                  msg.role === "user" ? "justify-end" : "justify-start",
                )}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Arsa Avatar */}
                {msg.role === "model" && (
                  <div className="w-12 h-12 flex shrink-0 items-center justify-center -ml-2 -mt-2">
                    <video
                      src="/animations/mascot-arsa.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain scale-150"
                    />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[80%] md:max-w-[70%] p-4 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm transform transition-all hover:scale-[1.01]",
                    msg.role === "user"
                      ? "bg-[#FF9600] text-white rounded-br-none"
                      : "bg-white border border-gray-100 text-gray-800 rounded-bl-none",
                  )}
                >
                  {msg.role === "model" ? (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>

                {/* User Avatar */}
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex shrink-0 items-center justify-center text-gray-500 font-bold text-xs ring-2 ring-white shadow-sm overflow-hidden mt-1">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{user?.displayName?.[0] || "U"}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
            {loadingResponse && (
              <div className="flex w-full justify-start gap-3 animate-in fade-in duration-500">
                <div className="w-12 h-12 flex shrink-0 items-center justify-center -ml-2 -mt-2">
                  <video
                    src="/animations/mascot-arsa.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain scale-150"
                  />
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none flex items-center gap-2 text-gray-500 text-sm shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Arsa sedang mengetik...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          // Empty State / Welcome View
          <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-center max-w-4xl mx-auto w-full no-scrollbar">
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
              <h1 className="text-3xl text-gray-900 md:text-4xl font-bold mb-2 tracking-tight">
                Halo,{" "}
                {user?.displayName ? user.displayName.split(" ")[0] : "Partner"}
                !
              </h1>
              <p className="text-[#FF9600] text-2xl md:text-xl font-bold">
                Ayo ceritakan keluhan bisnis Anda hari ini.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(suggestion)}
                  className="p-4 text-left bg-white border border-gray-100 rounded-2xl hover:border-[#FF9600] hover:shadow-md transition-all text-gray-600 text-sm md:text-base group animate-in slide-in-from-bottom-4 fade-in duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="group-hover:text-[#FF9600] transition-colors">
                    {suggestion}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area (Fixed/Sticky at Bottom relative to flex col) */}
        <div className="p-4 md:p-6 bg-white border-t border-gray-100 w-full shrink-0 z-20">
          <div className="max-w-4xl mx-auto relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ceritakan keluhan atau tanyakan apa saja..."
              className="w-full pl-5 pr-14 py-4 rounded-2xl border border-gray-200 focus:border-[#FF9600] focus:ring-2 focus:ring-[#FF9600]/20 outline-none transition-all resize-none shadow-sm min-h-[60px] max-h-[150px] text-gray-700"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loadingResponse}
              className="absolute right-3 bottom-3 p-2.5 bg-[#FF9600] text-white rounded-xl hover:bg-[#e68a00] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              {loadingResponse ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            Arsa dapat memberikan saran, namun selalu verifikasi informasi
            penting.
          </p>
        </div>
      </div>

      {/* Mobile Sidebar via Portal */}
      {mounted &&
        createPortal(
          <>
            <AnimatePresence>
              {showMobileSidebar && (
                <>
                  {/* Backdrop - z-[100] as requested */}
                  <div
                    onClick={() => setShowMobileSidebar(false)}
                    className="md:hidden fixed inset-0 bg-black/30 z-[100] backdrop-blur-sm"
                  />

                  {/* Drawer - z-[110] to be above backdrop */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "tween", duration: 0.3 }}
                    className="md:hidden fixed top-0 left-0 h-screen w-80 bg-[#f8f9fa] z-[110] shadow-2xl flex flex-col"
                  >
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                      <h2 className="text-lg font-bold text-gray-800">
                        Histori Chat
                      </h2>
                      <button
                        onClick={() => setShowMobileSidebar(false)}
                        className="p-2 text-gray-500 hover:text-gray-900 bg-gray-100 rounded-full"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-4 border-b border-gray-100">
                      <button
                        onClick={() => {
                          router.push("/dashboard");
                          setShowMobileSidebar(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-[#FF9600] text-white py-3 rounded-xl font-medium hover:bg-[#e68a00] transition-colors shadow-sm"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                      </button>
                    </div>

                    <div className="p-4 overflow-y-auto flex-1 no-scrollbar">
                      <div className="flex justify-between items-center mb-3 px-2">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Histori
                        </h3>
                        <button
                          onClick={() => {
                            startNewChat();
                            setShowMobileSidebar(false);
                          }}
                          className="text-xs text-[#FF9600] hover:underline font-medium flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Baru
                        </button>
                      </div>

                      <div className="space-y-1">
                        {chats.length === 0 ? (
                          <p className="text-sm text-gray-400 text-center py-4 italic">
                            Belum ada percakapan
                          </p>
                        ) : (
                          chats.map((chat) => (
                            <div key={chat.id} className="relative group">
                              <button
                                onClick={() => {
                                  setActiveChatId(chat.id);
                                  setShowMobileSidebar(false);
                                }}
                                className={cn(
                                  "w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center gap-3 text-sm pr-8",
                                  activeChatId === chat.id
                                    ? "bg-white shadow-sm border border-gray-100 text-[#FF9600] font-medium"
                                    : "text-gray-600 hover:bg-gray-100",
                                )}
                              >
                                <MessageSquare
                                  className={cn(
                                    "w-4 h-4 shrink-0",
                                    activeChatId === chat.id
                                      ? "text-[#FF9600]"
                                      : "text-gray-400 group-hover:text-[#FF9600]",
                                  )}
                                />
                                <span className="truncate flex-1">
                                  {chat.title}
                                </span>
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setChatToDelete(chat.id);
                                  setShowDeleteModal(true);
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                title="Hapus Percakapan"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-100">
                      <Link
                        href="/pricing"
                        onClick={() => setShowMobileSidebar(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                      >
                        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm">
                          Pro
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-800">
                            Upgrade to Plus
                          </p>
                          <p className="text-xs text-gray-500">
                            Get better insights
                          </p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>,
          document.body,
        )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={() => setShowDeleteModal(false)}
            />
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative z-50 shadow-2xl animate-in zoom-in-95 duration-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Hapus Percakapan?
              </h3>
              <p className="text-gray-500 mb-6 text-sm">
                Percakapan ini akan dihapus permanen dan tidak bisa
                dikembalikan.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteChat}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
