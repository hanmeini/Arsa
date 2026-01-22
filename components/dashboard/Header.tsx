"use client";

import { Search, ChevronDown, Bell, LogOut, X, UserRound } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export function Header() {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optional: Redirect is usually handled by AuthContext or protected route wrapper
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        {/* Search Section */}
        <div className="flex items-center gap-4 w-full md:w-[480px]">
          <div className="bg-[#FF9600] p-3 rounded-full shadow-sm text-white">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Cari #trend terkini"
            className="flex-1 px-6 py-3 bg-white text-gray-900 rounded-full border-none shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 placeholder:text-gray-400"
          />
        </div>

        {/* User Profile */}
        <div className="relative self-end md:self-auto" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-4 bg-white p-2 pr-4 rounded-full shadow-sm ml-auto md:ml-0 hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-gray-900 leading-none">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-gray-400 truncate max-w-[150px]">
                {user?.email}
              </p>
            </div>
            <div
              className={`w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
            >
              <ChevronDown className="w-3 h-3 text-white" />
            </div>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20"
              >
                <div className="p-2">
                  <button
                    onClick={() => router.push("/profile")}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <UserRound className="w-4 h-4" />
                    Profil
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Konfirmasi Keluar
                  </h3>
                  <button
                    onClick={() => setIsLogoutModalOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-600 mb-8">
                  Apakah Anda yakin ingin keluar dari akun ini? Anda harus masuk
                  kembali untuk mengakses dashboard.
                </p>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setIsLogoutModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                  >
                    Ya, Keluar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
