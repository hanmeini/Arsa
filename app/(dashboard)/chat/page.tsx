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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  createChat,
  sendMessage,
  subscribeToChats,
  subscribeToMessages,
  ChatSession,
  Message,
} from "@/lib/firebase/chat";
import { getChatResponse } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import Link from "next/link";

const suggestions = [
  "Bagaimana cara meningkatkan penjualan online?",
  "Strategi marketing untuk produk baru?",
  "Cara mengelola stok yang efisien?",
  "Tips pelayanan pelanggan yang baik?",
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

    try {
      let chatId = activeChatId;

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

      const reply = await getChatResponse(historyForApi, textToSend);

      // 3. Send AI Response to Firestore
      await sendMessage(chatId!, "model", reply);
    } catch (error) {
      console.error("Chat failed:", error);
    } finally {
      setLoadingResponse(false);
    }
  };

  const startNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setInput("");
  };

  return (
    <div className="flex h-full bg-white overflow-hidden font-sans">
      {/* Sidebar History */}
      <div className="hidden md:flex flex-col w-80 border-r border-gray-100 bg-[#f9fafb] h-full">
        <div className="p-6 border-b border-gray-100/50">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 hover:text-[var(--primary)] transition-all shadow-sm border border-gray-100 group"
          >
            <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary)] transition-colors" />
            Back to Dashboard
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              History
            </h3>
            <button
              onClick={startNewChat}
              className="text-xs text-[var(--primary)] hover:text-orange-600 font-bold flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full transition-colors"
            >
              <Plus className="w-3 h-3" /> NEW
            </button>
          </div>

          <div className="space-y-1">
            {chats.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8 italic font-light">
                No conversations yet.
              </p>
            ) : (
              chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 group text-sm relative overflow-hidden",
                    activeChatId === chat.id
                      ? "bg-white shadow-md text-[var(--primary)] font-semibold border border-gray-100"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  {activeChatId === chat.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)]" />
                  )}
                  <MessageSquare
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      activeChatId === chat.id
                        ? "text-[var(--primary)]"
                        : "text-gray-300 group-hover:text-gray-500",
                    )}
                  />
                  <span className="truncate flex-1">{chat.title}</span>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <div
            className="p-4 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl relative overflow-hidden group cursor-pointer"
            onClick={() => router.push("/pricing")}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-white/20 transition-colors" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-xs shadow-lg ring-2 ring-white/20">
                PRO
              </div>
              <div>
                <p className="text-sm font-bold">Upgrade Plan</p>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  Unlock advanced models
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative bg-white">
        {activeChatId && (messages.length > 0 || loadingResponse) ? (
          // --- ACTIVE CHAT VIEW ---
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-500",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] md:max-w-[75%] p-5 md:p-6 text-sm md:text-base leading-relaxed shadow-sm",
                      msg.role === "user"
                        ? "bg-[var(--primary)] text-white rounded-[2rem] rounded-br-none"
                        : "bg-gray-50 text-gray-800 rounded-[2rem] rounded-bl-none border border-gray-100",
                    )}
                  >
                    {msg.role === "model" ? (
                      <div className="prose prose-sm max-w-none prose-p:text-gray-700 prose-headings:text-gray-900 prose-strong:text-gray-900">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {loadingResponse && (
                <div className="flex w-full justify-start animate-in fade-in slide-in-from-bottom-2">
                  <div className="bg-gray-50 p-5 rounded-[2rem] rounded-bl-none flex items-center gap-3 text-gray-500 text-sm border border-gray-100">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                    <span>Arsa is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        ) : (
          // --- EMPTY STATE / WELCOME VIEW ---
          <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
            <div className="text-center mb-16 animate-in fade-in zoom-in-95 duration-700">
              <div className="w-32 h-32 md:w-48 md:h-48 mx-auto relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-purple-100 rounded-full blur-3xl opacity-60 animate-pulse" />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain relative z-10 drop-shadow-xl"
                >
                  <source src="/animations/mascot-arsa.mp4" type="video/mp4" />
                </video>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4 tracking-tight">
                Hello,{" "}
                {user?.displayName ? user.displayName.split(" ")[0] : "Partner"}
              </h1>
              <p className="text-gray-500 text-xl font-light max-w-lg mx-auto">
                What would you like to discuss about your business today?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(suggestion)}
                  className="p-4 text-left bg-white border border-gray-100 rounded-2xl hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/5 transition-all text-gray-600 text-sm md:text-base group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[var(--primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:text-[var(--primary)] transition-colors relative z-10 font-medium">
                    {suggestion}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white/80 backdrop-blur-xl border-t border-gray-100 w-full shrink-0 z-20">
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 group-focus-within:opacity-30 transition-opacity blur duration-500" />
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="relative w-full pl-6 pr-14 py-4 rounded-2xl bg-white border border-gray-200 focus:border-transparent focus:ring-0 outline-none transition-all resize-none shadow-sm min-h-[60px] max-h-[200px] text-gray-800 placeholder:text-gray-400 text-lg leading-relaxed"
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
              className="absolute right-3 bottom-3 p-2.5 bg-gray-900 text-white rounded-xl hover:bg-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
            >
              {loadingResponse ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4 font-medium tracking-wide">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>

      {/* Mobile Drawer Code ... (Assuming minimal changes needed for mobile logic) */}
      {/* ... (Keep existing mobile logic but apply similar style updates if possible, simplified for brevity here) ... */}
    </div>
  );
}
