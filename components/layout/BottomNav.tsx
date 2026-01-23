"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  BarChart3,
  History,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Chat", href: "/chat", icon: MessageSquare, special: true },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Riwayat", href: "/sales-history", icon: History },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-2 py-2 bg-white/90 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl ring-1 ring-black/5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group",
                isActive
                  ? "bg-[#FF9600] text-white shadow-lg shadow-orange-500/30 scale-105"
                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive ? "scale-110" : "group-hover:scale-110"
                )}
              />
              {isActive && (
                <span className="absolute -top-10 px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 animate-in fade-in slide-in-from-bottom-2 duration-200 whitespace-nowrap pointer-events-none">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
