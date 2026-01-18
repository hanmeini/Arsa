"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  LogOut,
  Grid,
  Package,
  Wand2,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Studio", href: "/studio", icon: Wand2 },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="hidden md:flex flex-col w-20 hover:w-64 bg-[#0F4C75] border-r border-[#00446b] h-screen sticky top-0 z-30 shadow-xl transition-all duration-300 group overflow-hidden shrink-0">
      <div className="flex items-center h-20 px-5 gap-4">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shrink-0">
          <Grid className="text-white w-6 h-6" />
        </div>
        <span className="font-bold text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Arsa
        </span>
      </div>

      <div className="flex-1 flex flex-col py-8 gap-2 overflow-y-auto overflow-x-hidden px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center h-12 rounded-xl transition-all duration-300 px-3 gap-4",
                isActive
                  ? "text-[#FF9600] bg-white/10"
                  : "text-white/50 hover:text-white hover:bg-white/5",
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 shrink-0",
                  isActive && "drop-shadow-[0_0_8px_rgba(255,150,0,0.5)]",
                )}
              />
              <span className="font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.name}
              </span>

              {isActive && (
                <div className="absolute right-0 w-1 h-8 bg-[#FF9600] rounded-l-full opacity-0 group-hover:opacity-0" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 pb-8 flex flex-col gap-2">
        <button
          onClick={handleLogout}
          className="flex items-center h-12 rounded-xl px-3 gap-4 text-white/50 hover:text-red-400 hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-6 h-6 shrink-0" />
          <span className="font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Sign Out
          </span>
        </button>
      </div>
    </div>
  );
}
