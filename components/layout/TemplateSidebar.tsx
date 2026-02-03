"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  History,
  Grid,
  LogOut,
  Sparkles,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  // Specific Templates
  { name: "Fresh & Natural", href: "/template/1", icon: LooksOneIcon },
  { name: "Luxury & Elegant", href: "/template/2", icon: LooksTwoIcon },
  { name: "Minimalist Studio", href: "/template/3", icon: Looks3Icon },
  { name: "Custom Design", href: "/template/custom", icon: Sparkles },
  { name: "History Generate", href: "/history", icon: History },
];

export function TemplateSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="hidden md:flex flex-col w-80 bg-white border-r border-gray-200 h-screen sticky top-0 z-30 shadow-xl shrink-0">
      {/* Top: Dashboard Button */}
      <div className="p-6 border-b border-gray-200">
        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center gap-2 bg-[#F59E0B] text-white py-4 rounded-xl font-bold text-lg transition-transform hover:scale-[1.02] shadow-lg shadow-orange-900/20 active:scale-[0.98]"
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
      </div>

      {/* Middle: Menu Items */}
      <div className="flex-1 overflow-y-auto p-4 py-6">
        <div className="mb-4 px-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Menu Template
          </h3>
        </div>

        <div className="space-y-2">
          {navItems
            .filter((item) => item.href !== "/dashboard")
            .map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden",
                    isActive
                      ? "bg-blue-50 text-[#0F4C75] shadow-md font-bold"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 shrink-0",
                      isActive
                        ? "text-[#0F4C75]"
                        : "text-gray-400 group-hover:text-gray-900",
                    )}
                  />
                  <span className="text-sm">{item.name}</span>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FF9600] rounded-r-full" />
                  )}
                </Link>
              );
            })}
        </div>
      </div>

      {/* Bottom: Pro Card */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm group-hover:scale-110 transition-transform">
            Pro
          </div>
          <Link href="/pricing" className="flex-1">
            <p className="text-sm font-bold text-gray-900 group-hover:text-[#FF9600] transition-colors">
              Upgrade to Plus
            </p>
            <p className="text-xs text-gray-500">Get better insights</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
