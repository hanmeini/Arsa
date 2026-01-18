"use client";

import { Search, ChevronDown, Bell } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      {/* Search Input */}
      <div className="relative w-full md:w-[480px]">
        <input
          type="text"
          placeholder="Cari #trend terkini"
          className="w-full pl-6 pr-14 py-3 bg-white rounded-full border-none shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 placeholder:text-gray-400"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF9600] p-2 rounded-full text-white hover:bg-amber-600 transition-colors">
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4 bg-white p-2 pr-4 rounded-full shadow-sm ml-auto md:ml-0">
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
        <div className="hidden sm:block">
          <p className="text-sm font-bold text-gray-900 leading-none">
            {user?.displayName || "User"}
          </p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
        <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
          <ChevronDown className="w-3 h-3 text-white" />
        </div>
      </div>
    </div>
  );
}
